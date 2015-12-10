
var counter = 0;
var maxCounter = 20;

function addStory(){

  if(counter < maxCounter){

  $.getJSON("http://www.freecodecamp.com/news/hot", function(data){

      var grid = document.querySelector('#grid');
      var item = document.createElement('article');

      salvattore.appendElements(grid, [item]);

      var blockHTML = '<a href="'+data[counter].link+'">';
          blockHTML += '<div class="story-wrapper" data-upvotes="'+data[counter].rank+'"><h4>'+data[counter].headline+'</h4>';

      if(data[counter].image !== ""){
        blockHTML += '<div><img src="'+data[counter].image+'" class="limg" id="limg'+counter+'"></div>';
      } else {
        blockHTML += '<div><img src="'+data[counter].author.picture+'" class="limg" id="limg'+counter+'"></div>';
      }

      blockHTML += '</div></a>';
      item.outerHTML = blockHTML;

      var $currentImg = "#limg"+counter

      $($currentImg).imagesLoaded().fail( function( instance ) {

        $($currentImg).attr("src","http://www.marismith.com/wp-content/uploads/2014/07/facebook-profile-blank-face.jpeg")
        counter++
        addStory()
      });

      $($currentImg).imagesLoaded().done( function( instance ) {

        counter++
        addStory()
      });
    })
  } else {
    return
  }
}

addStory();

$("#grid").on("mouseover", ".story-wrapper", function() {

  var spanCheck = $(this).children().first();

  if (spanCheck[0].toString().indexOf("HTMLSpanElement") == -1){

    if($(this).data("upvotes") === 1){
      var insertable = "<span class='uv'>" + $(this).data("upvotes") + " vote</span>"
    } else {
      var insertable = "<span class='uv'>" + $(this).data("upvotes") + " votes</span>"
    }

    $(this).prepend(insertable);

    var localId = "#" + $(this).children().children().attr("id");
    var liParent = $(localId).parent().parent().children().first()
    var localHeight = $(this).height() - 20;

    $(liParent).css("top", localHeight);
    $(liParent).css("left", "20px");
    $(liParent).css("margin-top", "-20px")
  }
});

$("#grid").on("mouseleave", ".story-wrapper", function(){

  var spanCheck = $(this).children().first();

  if (spanCheck[0].toString().indexOf("HTMLSpanElement") !== -1){
    spanCheck[0].remove();
  }
});

$(window).scroll(function () {

  if (($(document).height() <= $(window).scrollTop() + $(window).height()) && counter === maxCounter) {
    maxCounter += 10;
    addStory();
  }
});
