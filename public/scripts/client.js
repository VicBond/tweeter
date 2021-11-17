/* eslint-disable no-undef */



$(document).ready(function() {

  const tweetData = [];

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

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $('#feed').prepend(createTweetElement(tweet));
    }
  };

  renderTweets(tweetData);

  $("form").submit("submit", function(event) {
    event.preventDefault();
    const str = $(this).serialize();
    const input = $("#tweet-text").val();
    if (!input || input.length > 140) {
      return alert("No empty tweets please and no more than 140 characters, Jack Dorsey said so.");
    }
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: str
    })
      .then(function() {
        loadAllTweets();
        $('textarea').val('');
        $('.counter').text(140);
      });
  });

  const loadAllTweets = function() {
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
  loadAllTweets();
  
 
});


