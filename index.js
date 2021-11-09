var express = require("express");
const axios = require("axios");

var old_match_id = "";
var mocked_name = "";

const quest_endpoint = "http://192.168.1.197:6721/session";
const mock_endpoint = "http://localhost:6725/session";

var app = express();
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/session", (req, res, next) => {
  axios
    .get(mock_endpoint)
    .then((response) => {
      var match_data = response.data;

      if (old_match_id != match_data.sessionid) {
        pick_random_name(match_data);
        old_match_id = match_data.sessionid;
      }

      match_data.client_name = mocked_name;
      res.json(match_data);
    })
    .catch((error) => {
      res.json({});
    });
});

function pick_random_name(match_data) {
  if (match_data.map_name != "mpl_arena_a") {
    mocked_name = "Sphinxed";
    console.log("Choosing player: Sphinxed");
    return;
  }

  var random_team = getRandomInt(2);
  var team_player_data = match_data.teams[random_team].players;
  var random_player = getRandomInt(team_player_data.length);
  var player_data = team_player_data[random_player];
  mocked_name = player_data.name;
  console.log("Choosing player: " + mocked_name);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
