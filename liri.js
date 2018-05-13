require("dotenv").config();
var action = process.argv[2];
var value = process.argv[3];
var keys = require("./keys.js");
var Twitter = require("twitter");
var request = require("request");
var spotify = require('spotify');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Twitter

function myTweets() {
  var params = { screen_name: "MichaelFutsum" };
  client.get("statuses/user_timeline", params, function (
    error,
    tweets,
    response
  ) {
    if (error) {
      console.log(error);
    } else {
      console.log("\nTWEET ME\n");
      for (i = 0; i < tweets.length; i++) {
        console.log(i + 1 + ". " + tweets[i].text);
      }
    }
  });
}
//Spotify
function spotify() {

  var spotify = require('spotify');

  spotify.search({ type: 'track', query: value || 'I Want it That Way' }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }
    else {
      var spotifyCall = data.tracks.items[0];

      console.log("\n/////////////////SPOTIFY THIS////////////////\n");
      var artist = spotifyCall.artists[0].name;
      console.log("Artist: " + artist);
      var song = spotifyCall.name;
      console.log("Song name: " + song);
      var preview = spotifyCall.preview_url;
      console.log("Preview Link: " + preview);
      var album = spotifyCall.album.name;
      console.log("Album: " + album);

    }
  });
}

//OMDB (movies)
function movie() {
  var movieName = value;
  var movieDefault = "Mr.Nobody";

  var url = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json';
  var urlDefault = 'http://www.omdbapi.com/?t=' + movieDefault + '&y=&plot=short&r=json';


  if (movieName != null) {
    request(url, function (error, response, body) {
      // If the request is successful
      if (!error && response.statusCode == 200) {
        // Parse the body and pull for each attribute
        console.log("\n/////////////////MOVIE THIS////////////////\n")
        console.log("Title: " + value);
        console.log("Year: " + JSON.parse(body)["Year"]);
        console.log("Rating: " + JSON.parse(body)["imdbRating"]);
        console.log("Country of Production: " + JSON.parse(body)["Country"]);
        console.log("Language: " + JSON.parse(body)["Language"]);
        console.log("Plot: " + JSON.parse(body)["Plot"]);
        console.log("Actors: " + JSON.parse(body)["Actors"]);
      };
    });

    // if user doesn't enter a value
  } else {
    request(urlDefault, function (error, response, body) {
      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode == 200) {
        console.log("Title: " + movieDefault);
        console.log("Year: " + JSON.parse(body)["Year"]);
        console.log("Rating: " + JSON.parse(body)["imdbRating"]);
        console.log("Country of Production: " + JSON.parse(body)["Country"]);
        console.log("Language: " + JSON.parse(body)["Language"]);
        console.log("Plot: " + JSON.parse(body)["Plot"]);
        console.log("Actors: " + JSON.parse(body)["Actors"]);
      };
    });
  }
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      logOutput.error(err);
    } else {
      var randomArray = data.split(",");

      action = randomArray[0];
      argument = randomArray[1];
      start(action, argument);
    }
  });
}

function start() {
  switch (action) {
    case "my-tweets":
      myTweets();
      break;
    case "spotify-this-song":
      spotifyThis();
      break;
    case "movie-this":
      movieThis();
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
  }
}
start();
