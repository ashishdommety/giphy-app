$(document).ready(function() {
  var topics = ['cat', 'dog', 'dolphin', 'horse', 'skunk'];
  var num;
  var flip;
  var changeBack;

  function displayTopic() {
    $('.gifs').empty();
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
        $('.gifs').append(pic);
      }
      flip = true;
      $('.animals').on('click', function() {
          if (flip) {
            num = $(this).data('num');
            var link = response.data[num].images.fixed_height.url;
            $(this).attr('src', link);
            flip = false;
          } else {
            num = $(this).data('num');
            var still = response.data[num].images.fixed_height_still.url;
            $(this).attr('src', still);
            flip = true;
          }
      }).draggable({
        start: function getLink(event, ui) {
          num = $(this).data('num');
        },
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
      var a = $('<button>');
      a.addClass('animal');
      a.attr('data-name', topics[i]);
      a.text(topics[i]);
      $('.top').append(a);
    }
  }
  renderButtons();

  $('#add-animal').on('click', function(event) {
    event.preventDefault();
    $('.gifs').css('height', null);
    $('.top').empty();
    var animal = $('#animal-input').val().trim();
    topics.push(animal);
    renderButtons();
    $('#animal-input').val('')
  })

  $(document).on('click', '.animal', displayTopic);
});
