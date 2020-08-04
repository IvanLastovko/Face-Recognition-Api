const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const { json } = require('body-parser');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const postgres = knex({
   client: 'pg',
   connection: {
      host: process.env.DATABASE_URL,
      ssl:true
   }
});

// postgres.select('*').from('users').then(data => {
//    console.log(data);
// });

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => { res.send('it is working') });
app.post('/signin', (req, res) => { signin.handleSignin(req, res, postgres, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, postgres, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, postgres) });
app.put('/image', (req, res) => { image.handleImage(req, res, postgres) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });



app.listen(process.env.PORT || 3000, () => {
   console.log(`app is running on port ${process.env.PORT}`);
});