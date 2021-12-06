/* eslint-disable no-undef */

$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    const timeAgo = timeago.format(new Date(tweet.created_at));
    const $tweet = `
  <article id="tweet-container">
  <header class="feed-header">
  <div class="feed-name">
  <img src=${tweet.user.avatars}>
  <span class="avatar-name">${tweet.user.name}</span>
  </div>
  <span class="user-name">${tweet.user.handle}</span>
  </header>
  <div class="feed-content">${escape(tweet.content.text)}</div>
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
    $('#feed').empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#feed').prepend($tweet);
    }
  };

  const loadAllTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(allTweets) {
        renderTweets(allTweets);
      });
  };
 
  
  
  $(".error-message").hide();


  $("form").submit("submit", function(event) {
    event.preventDefault();

    const str = $(this).serialize();
    const input = $("#tweet-text").val();

    if (!input || input.length > 140) {
      $('.error-message').slideDown(400).delay(2000).fadeOut(400);
      $('.error-message').text("🚫 No empty tweets please and no more than 140 characters, Jack Dorsey said so.");
      return;
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
  loadAllTweets();
});


