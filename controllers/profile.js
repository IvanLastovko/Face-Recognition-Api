
const handlePRofileGet = (req, res, postgres) => {
   const { id } = req.params;
   postgres.select('*').from('users').where({ id })
      .then(user => {
         if (user.length) {
            console.log(user);
            res.json(user[0]);
         } else {
            res.status(400).json('Error Getting User')
         }
      })
}

module.exports = {
   handlePRofileGet: handlePRofileGet
}