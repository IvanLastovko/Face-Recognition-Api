const Clarifai = require('clarifai');
const app = new Clarifai.App({
   apiKey: '0013f2a1b67f4a118f0aea50e0c3421d'
});

const handleApiCall = (req, res) => {
   app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
         res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, postgres) => {
   const { id } = req.body;
   postgres('users').where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
      .then(entries => {
         res.json(entries);
      })
      .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
   handleImage: handleImage,
   handleApiCall: handleApiCall
}