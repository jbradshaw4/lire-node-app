
var command= process.argv[2];

var values = process.argv[3];

var Twitter = require("twitter");

var twitterKeys = require("./keys.js")





switch(command) {
    case "my-tweets":
        tweets(values);
        break;
    case "spotify-this-song":
        spotify(values);
        break;
    default:console.log("command not found")
}


function spotify(values){
  console.log(values);

  var spotify = require("spotify");

  spotify.search({ type: 'track', query: values },

   function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
   
   var artists = data['tracks']['items'][1]['artists'][0]['name'];
   var album = data['tracks']['items'][1]['artists'][0]['name'];
   var songPreview = data['tracks']['items'][1]['external_urls']['spotify'];
   for(var i = 0; i<3; i++){
   var track = data['tracks']['items'][1]['artists'][0]['name'];

    
    
      console.log("---------------------");
      console.log('Artist: ' + artists);
      console.log("---------------------");
      console.log('Track ' + track);
      console.log("----------------------");
      console.log('Album ' + album);
      console.log('Song Preview: ' + songPreview);
    
}
});


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



	

