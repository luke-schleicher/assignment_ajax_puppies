/* globals $ */

$('#refresh').click(function() {
  $.ajax({
    url: 'https://ajax-puppies.herokuapp.com/puppies.json',
    method: "GET",
    dataType: "json",
    complete: function(xhr) {
      console.log(xhr);
    },
    success: function(data) {
      populatePuppiesList(data);
    }
  });
});

var populatePuppiesList = function(arrayOfPuppies) {
  for (var i = 0; i < arrayOfPuppies.length; i++) {
    var puppy = arrayOfPuppies[i];
    var $puppyName = $('<strong>').text(puppy.name);
    var timeAgo = $.timeago(puppy.created_at);
    var liText = ` (${puppy.breed.name}), created ${timeAgo} -- `;
    var $adoptLink = $('<a>').text("adopt").attr('href', '#');
    $('<li>')
      .text(liText)
      .prepend($puppyName)
      .append($adoptLink)
      .appendTo('#puppy-list');
  }
};
