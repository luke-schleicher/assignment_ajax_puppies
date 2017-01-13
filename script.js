/* globals $ */

var Puppies = (function() {

  var init = function() {
    _fetchBreeds();
    _refreshListener();
    _addPuppyListener();
  };

  var _fetchBreeds = function _fetchBreeds() {
    $.ajax({
      url: 'https://ajax-puppies.herokuapp.com/breeds.json',
      method: 'GET',
      dataType: 'json',
      success: _pupulateBreedsList,
      complete: function(xhr) { console.log(xhr); }
    });
  };

  var _pupulateBreedsList = function _pupulateBreedsList(data) {
    for (var i = 0; i < data.length; i++) {
      $('<option>')
        .text(data[i].name)
        .attr('value', data[i].id)
        .appendTo('#breed');
    }
  };

  var _addPuppyListener = function() {
    $('#add-puppy').click(function(e) {
      e.preventDefault();
      var name = $('#name').val();
      var breedId = $('#breed option:selected').val();
      console.log(name, breedId);
      $.ajax({
        url: 'https://ajax-puppies.herokuapp.com/puppies.json',
        method: "POST",
        dataType: 'json',
        contentType: 'application/json',

        // needs to be a string before it's sent
        data: JSON.stringify({name: name, breed_id: breedId}),
        success: function(data) {
          $('#flash').text("Puppy added");
        },
        error: function(data) {
          $('#flash').text("Puppy not added");
        },
        complete: function(xhr) {
          console.log(xhr);
        },
      });
    });

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
          _pupulatePuppiesList(data);
        }
      });
    });
  };

  var _pupulatePuppiesList = function(arrayOfPuppies) {
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
  };

})();
