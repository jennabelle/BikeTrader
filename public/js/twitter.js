var twit = require('twitter');

twitter = new twit({
  consumer_key: 'vIWWtYpagZz1ceoevoReoYDFQ',
  consumer_secret: 'EY4frzRxk4macWbyEVMknaHU3kJwtzYctH1Y8cv4nplSWaUEuA',
  access_token_key: '710623884404334593-uUr0AaxISTPeA4BYyRg31bhyjKtWNHU',
  access_token_secret: 'ToZVApLXWpkiLRbjjGZViN9Q7WD9yAYFB8GlfusHvceUl'
});

// var count = 0;
var util = require('util');
var tweets = [];

twitter.stream('statuses/filter', {track: 'bike, biking, cycling, sf bike, sf biking, bay bike, bay biking'}, function(stream){

  stream.on('data', function(data){
    // console.log(util.inspect(data));
    tweets.push(data);
  });

  setTimeout(function(){
    for(var i = 0; i < tweets.length; i++){
      console.log(tweets[i].user.screen_name + ': ' + tweets[i].text);
    }
    stream.destroy();
    process.exit(0);
  }, 10000);

});
