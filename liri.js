

var request = require('request'); //this is the package for movie-this

var command= process.argv[2]; //not really sure- this is the command I use in bash

var values = process.argv[3]; // this is the value of what I type in- ie "star wars"

var Twitter = require("twitter"); // this is the twitter call

var twitterKeys = require("./keys.js"); // requires the api keys in keys.js

var fs = require ("fs"); // file system







switch(command) {

    case "my-tweets":
        tweets(values);
        break;

    case "spotify-this-song":
        spotify(values);
        break;

    case "movie-this":
        movieInfo(values);
        break;

    case "do-what-it-says":
      doWhatItSays(values);
        break;

    default:
    console.log("Invalid Entry. Please enter one of the following:");
    console.log("1. my-tweets");
    console.log("3. spotify-this-song and song name");
    console.log("4. movie-this and movie name");
    console.log("5. do-what-it-says");
}

function doWhatItSays(values){
  
  fs.readFile('random.txt', 'utf8', function(err, data){
    if (err){
      throw err;
    }
    
    var dataArr = data.split(",");
    spotify(dataArr[1]);
    
    
  });

}

function  movieInfo(values){

   
	request('http://www.omdbapi.com/?t=' + values + '&y=&plot=short&tomatoes=true&r=json',
   function (error, response, body) {

 
  // Print the response status code if a response was received
  var movie = JSON.parse(body);


  console.log('-----------------------------');
  console.log('Title: ' + movie.Title);
  console.log('Year: ' + movie.Year);
  console.log('IMDB Rating: ' + movie.Ratings[0].Value);
  console.log('Country Produced: ' + movie.Country);
  console.log('Language: ' + movie.Language );
  console.log('Plot: ' + movie.Plot);
  console.log('Actors: ' + movie.Actors);
  console.log('Rotten Tomatoes Rating: ' + movie.Ratings[1].Value);
  console.log('Rotten Tomatoes Link: ' + movie.tomatoURL);
  console.log('------------------------------');

  

});

}



function spotify(values){


  var spotify = require("spotify");

  spotify.search({ type: 'track', query: values },

   function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
   
   var artists = data['tracks']['items'][1]['artists'][0]['name'];

   var track = data['tracks']['items'][1]['name'];

   var album = data['tracks']['items'][1]['album']['name'];

   var songPreview = data['tracks']['items'][1]['external_urls']['spotify'];

  

   
    
      console.log("---------------------");
      console.log('Artist: ' + artists);
      console.log("---------------------");
      console.log('Track ' + track);
      console.log("----------------------");
      console.log('Album ' + album);
      console.log("----------------------");
      console.log('Song Preview: ' + songPreview);
      console.log("----------------------");
    
})
}



function tweets(){

var client = new Twitter({
  
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret
});


var params = {screen_name: 'jakebradshaw41', count: 21, retweet_count: 0};

client.get('statuses/user_timeline', params, function(error, tweets, response) {

console.log(error);
  if (!error) {
  	console.log(tweets);
  	for (var i = 1; i < 21; i++){
  		console.log("--------------------");
  		console.log("Tweet number " + i);
  		console.log(tweets[i]["text"]);
      console.log("--------------------");
  		
  	}
    
  }
});

}



	

