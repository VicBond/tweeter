/* eslint-disable no-undef */
$(document).ready(function() {
  $("#tweet-text").on('input' ,function() {
    const remainChar = 140 - $(this).val().length;
    $(".counter").val(remainChar).css("color","#000000");
    if (remainChar < 0) {
      $(".counter").css("color","#FF0000");
    }
  });
});