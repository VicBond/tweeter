/* eslint-disable no-undef */
const tweetData = [
  // {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png"
  //     ,
  //     "handle": "@SirIsaac"
  //   },
  //   "content": {
  //     "text": "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   "created_at": 1461116232227
  // },
  // {
  //   "user": {
  //     "name": "Descartes",
  //     "avatars": "https://i.imgur.com/nlhLi3I.png",
  //     "handle": "@rd" },
  //   "content": {
  //     "text": "Je pense , donc je suis"
  //   },
  //   "created_at": 1461113959088
  // }
];


const createTweetElement = function(tweet) {
  const timeAgo = timeago.format(new Date(tweet.created_at));
  const $tweet = `
  <article id="tweet-container">
  <header class="feed-header">
  <img src=${tweet.user.avatars}>
  <span class="avatar-name">${tweet.user.name}</span>
  <span class="user-name">${tweet.user.handle}</span>
  </header>
  <div class="feed-content">${tweet.content.text}</div>
  <footer class="feed-footer">
  <span class="days-counter">${timeAgo}</span>
  <div class="feed-icons">
  <i id="icon-flag" class="fas fa-flag" style="font-size: 1em"></i>
  <i id="icon-retweet" class="fas fa-retweet" style="font-size: 1em"></i>
  <i id="icon-heart" class="fas fa-heart" style="font-size: 1em"></i>
  </div>
  </footer>
  </article>
  `;
  return $tweet;
};


$(document).ready(function() {
  renderTweets(tweetData);
  $("form").submit("submit", function(event) {
    event.preventDefault();
    const str = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: str
    })
      .then(function() {
        console.log("POST request sent");
      });
  });
  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets",
      data: JSON
    })
      .then(function(data) {
        $("#tweets-container").empty();
        renderTweets(data);
      });
  };
  loadTweets();
});


const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $('#feed').append(createTweetElement(tweet));
  }
};