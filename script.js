/* globals $ */

var Puppies = (function() {

  var init = function() {
    _refreshListener();
    _addPuppyListener();
  }

  var _addPuppyListener = function(e) {

    e.preventDefault();

    var name = $('#name').val();
    var breed = $('#breed option:selected').val();

    $.ajax(

        url: 'https://ajax-puppies.herokuapp.com/puppies.json',
        method: "POST",
        dataType: 'json',
        contentType: ,

        // needs to be a string before it's sent
        data: {},
        complete: function(xhr) {

        };
        success: function(data) {

        };
        error: function(data) {

        }

      );

  };
 
  var _refreshListener = function() {
    $('#refresh').click(function(e) {

      e.preventDefault();

      $.ajax({
        url: 'https://ajax-puppies.herokuapp.com/puppies.json',
        method: "GET",
        dataType: "json",
        complete: function(xhr) {
          console.log(xhr);
        },
        success: function(data) {
          _populatePuppiesList(data);
        }
      });
    });
  }; 

  var _populatePuppiesList = function(arrayOfPuppies) {
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

  return {
    init: init,
  } 

})();
