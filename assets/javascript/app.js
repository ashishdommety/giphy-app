$(document).ready(function(){
  var topics = ['cat','dog','dolphin','horse','skunk'];

  function displayTopic(){
    $('.gifs').empty();
      var topic = $(this).attr('data-name');
      var gifURL = 'https://api.giphy.com/v1/gifs/search?q='+ topic +'&limit=10&api_key=dc6zaTOxFJmzC';
      $.ajax({
        method:'GET',
        url: gifURL
      }).done(function(response){
        for( var i = 0; i < 10; i++){
          var still = response.data[i].images.fixed_height_still.url;
          var pic = $('<img>');
          pic.attr('src', still);
          pic.addClass('animals');
          pic.attr('data-num',i);
          $('.gifs').append(pic);
        }
        var flip = true;
        $(document).on('click','.animals',function(){
          if(flip){
            var num = $(this).data('num');
            var link = response.data[num].images.fixed_height.url;
            $(this).attr('src',link);
            flip = false;
          }
          else{
            var num = $(this).data('num');
            var still = response.data[num].images.fixed_height_still.url;
            $(this).attr('src',still);
            flip = true;
          }
        });
      });
  }

  function renderButtons(){
    for( var i = 0; i < topics.length; i++){
      var a = $('<button>');
      a.addClass('animal');
      a.attr('data-name',topics[i]);
      a.text(topics[i]);
      $('.top').append(a);
    }
  }
  renderButtons();

  $('#add-animal').on('click', function(event){
    event.preventDefault();
    $('.top').empty();
    var animal = $('#animal-input').val().trim();
    topics.push(animal);
    renderButtons();
    $('#animal-input').val('')
  })

  $(document).on('click','.animal',displayTopic);
});
