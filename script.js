var Puppies = (function($) {

  // Kicks off listeners
  // Gets available breeds
  // Shows available puppies
  var init = function() {
    _fetchPuppies();
    _fetchBreeds();
    _refreshListener();
    _addPuppyListener();
  };

  // Gets list of available breeds from server
  var _fetchBreeds = function _fetchBreeds() {
    $.ajax({
      url: 'https://ajax-puppies.herokuapp.com/breeds.json',
      method: 'GET',
      dataType: 'json',
      success: _pupulateBreedsList,
      complete: function(xhr) { console.log(xhr); }
    });
  };

  // Populates breed select tag
  var _pupulateBreedsList = function _pupulateBreedsList(data) {
    Puppies.breeds = data;
    for (var i = 0; i < data.length; i++) {
      $('<option>')
        .text(data[i].name)
        .attr('value', data[i].id)
        .appendTo('#breed');
    }
  };

  // Returns breed name given breed id
  var _lookupBreed = function(id) {
    for (var i = 0; i < Puppies.breeds.length; i++) {
      if (Puppies.breeds[i].id === id) {
        return Puppies.breeds[i].name;
      }
    }
  };

  // "Add puppy" button actions
  var _addPuppyListener = function() {

    $('#add-puppy').click(function(e) {

      e.preventDefault();
      _submitPuppy();

    });
  };

  // Submits new puppy data to server
  var _submitPuppy = function () {

    var name = $('#name').val();
    var breedId = $('#breed option:selected').val();
    var breedName = $('#breed option:selected').text();

    $.ajax({

      url: 'https://ajax-puppies.herokuapp.com/puppies.json',
      method: "POST",
      dataType: 'json',

      contentType: "application/x-www-form-urlencoded",
      // contentType: 'application/json',
      // data: JSON.stringify({name: name, breed_id: breedId}),

      data: {name: name, breed_id: breedId},
      success: _puppySuccessCallback,

      error: function(data) {
        $('#flash').text(data.statusText);
      },
      complete: function(xhr) {
        console.log(xhr);
      },

    });  
  }

  // "Update puppies" link actions
  var _refreshListener = function() {
    $('#refresh').click(function(e) {
      e.preventDefault();
      _fetchPuppies();
    });
  };

  // Gets all puppy data from server
  var _fetchPuppies = function fetchPuppies() {
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
  };
 
  // Updates view after successful puppy add
  var _puppySuccessCallback = function(data) {
    $('#flash').text("Puppy added");
    var puppy = data;
    puppy.breed = { name: _lookupBreed(puppy.breed_id) };
    _newPuppy(puppy);
    $('#name').val('');
  };

  // Append a puppy to the list of puppies
  var _newPuppy = function newPuppy(puppy) {
    var $puppyName = $('<strong>').text(puppy.name);
    var timeAgo = $.timeago(puppy.created_at);
    var liText = ` (${puppy.breed.name}), created ${timeAgo} -- `;
    var $adoptLink = $('<a>').text("adopt").attr('href', '#'); 
    $('<li>')
      .text(liText)
      .prepend($puppyName)
      .append($adoptLink)
      .appendTo('#puppy-list');
  };
 
  // Given server data, populates puppy list
  var _pupulatePuppiesList = function(arrayOfPuppies) {
    for (var i = 0; i < arrayOfPuppies.length; i++) {
      _newPuppy(arrayOfPuppies[i]);
    }
  };

  // Public functions
  return {
    init: init,
  };

})($);
