$(document).ready(function() {
  var topics = ['cat', 'dog', 'dolphin', 'horse', 'skunk'];
  var num;

  function displayTopic() {
    $('.gifs').empty();
    $('.gifs').css('height', null);
    var topic = $(this).attr('data-name');
    var gifURL = 'https://api.giphy.com/v1/gifs/search?q=' + topic + '&limit=12&api_key=dc6zaTOxFJmzC';
    $.ajax({
      method: 'GET',
      url: gifURL
    }).done(function(response) {
      for (var i = 0; i < 12; i++) {
        var still = response.data[i].images.fixed_height_still.url;
        var pic = $('<img>');
        pic.attr('src', still);
        pic.addClass('animals');
        pic.attr('data-num', i);
        pic.attr('data-state', 'still');
        $('.gifs').append(pic);
      }

      //adding the click toggle and the dragging options
      $('.animals').on('click', function() {
        var state = $(this).attr('data-state');
        console.log(state);
        if (state === 'still') {
          num = $(this).data('num');
          var link = response.data[num].images.fixed_height.url;
          $(this)
            .attr('src', link)
            .attr('data-state', 'animate');
        } else {
          num = $(this).data('num');
          var still = response.data[num].images.fixed_height_still.url;
          $(this)
            .attr('src', still)
            .attr('data-state', 'still');
        }
      }).draggable({
        containment: 'window',
        cursor: 'move',
        snap: '.drops',
        stack: 'img',
        distance: 0,
        revert: true
      });
      $('.drops').droppable({
        drop: function handleDrop(event, ui) {
          var draggable = ui.draggable;
          var still = response.data[num].images.fixed_height_still.url;
          var link = response.data[num].images.fixed_height.url
          $(this).attr('src', still);
          $(this).parent().attr('href', link);
        }
      });
    });
  }

  function renderButtons() {
    for (var i = 0; i < topics.length; i++) {
      var $a = $('<button>');
      $a.addClass('animal');
      $a.attr('data-name', topics[i]);
      $a.text(topics[i]);
      $('.top').append($a);
    }
  }
  renderButtons();

  $('.add-animal').on('click', function(event) {
    event.preventDefault();
    $('.gifs').css('height', null);
    $('.top').empty();
    var animal = $('#animal-input').val().trim();
    topics.push(animal);
    renderButtons();
    $('#animal-input').val('');
  });

  //click for buttons
  $(document).on('click', '.animal', displayTopic);

  //effects for animal buttons
  $(document).on('mousedown', '.animal, .add-animal', function() {
    $(this).css({
      'top': '5px',
      'left': '5px',
      'box-shadow': 'none'
    });
  });
  $(document).on('mouseup', '.animal, .add-animal', function() {
    var hexValue = getHexValue($(this));
    $(this).css({
      'top': '0px',
      'left': '0px',
      'box-shadow': '5px 5px 0px ' + hexValue
    });
  });

  //function to get the hex value
  function getHexValue($element) {
    if ($element.hasClass('animal')) {
      return '#4f2d42';
    } else if ($element.hasClass('add-animal')) {
      return '#668f9e';
    }
  }
});
