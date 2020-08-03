

const handleRegister = (req, res, postgres, bcrypt) => {
   const { email, password, name } = req.body;
   // bcrypt.hash(password, null, null, function (err, hash) {
   //    console.log(hash);
   // });

   // database.users.push({
   //    id: '125',
   //    name: name,
   //    email: email,
   //    entries: 0,
   //    joined: new Date()
   // });

   if (!email || !name || !password) {
      return res.status(400).json('Incorrect form submission!!!');
   }

   const hash = bcrypt.hashSync(password);
   postgres.transaction(trx => {
      trx.insert({
         hash: hash,
         email: email
      })
         .into('login')
         .returning('email')
         .then(loginEmail => {
            return trx('users')
               .returning('*')
               .insert({
                  email: loginEmail[0],
                  name: name,
                  joined: new Date()
               })
               .then(user => {
                  res.json(user[0]);
               })
         })
         .then(trx.commit)
         .catch(trx.rollback)
   })
      .catch(err => res.status(400).json('unable to register'))

}

module.exports = {
   handleRegister: handleRegister
};