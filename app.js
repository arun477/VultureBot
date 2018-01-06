const  Twitter = require('twitter');
const  config  = require('./config');

const  Vulture = new Twitter(config);

const  params  = {
                   q : "#india",
                   count : 10,
                   result_type : 'recent',
                   lang : 'en'
                 }
Vulture.get('search/tweets', params, (err, data, response) => {

    if(!err) {
       for(let i in  data.statuses){
          let twitId = { id : data.statuses[i].id_str };
          Vulture.post('favorites/create', twitId, (err, response) => {
             if(!err) {
               let username = response.user.screen_name;
               let tweetId = response.id_str;
               console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
             } else {
               console.log(err);
            }
          });
       }
    } else {
        console.log(err);
   }



});
