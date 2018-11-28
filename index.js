const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const countryLanguage = require('country-language');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Recast will send a post request to /errors to notify important errors
// described in a json body
app.post('/errors', (req, res) => {
   console.error(req.body);
   res.sendStatus(200);
});

app.post('/pikachu', (req,res) => {

  //https://pokeapi.co/api/v2/pokemon/${name}/
console.log(req);

let pokemon = "pikachu";
params = {};
axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`, {params}).then(results => {

  let data = results.data;
  let name = data.name.toUpperCase();
  let type = data.types[0].type.name;
  let img = data.sprites.front_default;
  let moves = data.moves;

  let list_entries = [];

  for (var i = 0; i < moves.length; i++) {
    let entry = {
      title: moves[i].move.name,
      imageUrl: "",
      subtitle: "subtitle",
      buttons: []
    }
    list_entries.push(entry);
  }





  let answer = [
    {
    type: 'card',
    content: {
      title: name,
      subtitle: type,
      imageUrl:  img,
      buttons: [
        {
          type: 'web_url',
          value: '',
          title: 'more'
        }
      ]
    }
  },
    {
    type: 'list',
    content:{
      elements: list_entries
    }
    }
  ];

  return res.json({
    replies: answer
  });

});



});

//log.logMessage("info", "Server is listening on port %d", 3000);
app.listen(process.env.PORT || config.PORT, () => console.log("info", `Server running on port ${config.PORT}`));
