$(document).ready(function(){
    var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
  var title = decodeURIComponent(getUrlParameter('title'));
  console.log('/movies/'+title);

    $.get(`/movies/${title}`)
      .then(function(movies){
      console.log(movies);
      var movies_length = Object.keys(movies).length
      var url = movies.poster_url;
      var title = movies.title;
      var director = movies.director;
      var year = movies.year;
      var rating = movies.rating;
      console.log(title);
      $('.append_title').append(`<b>"${title}"<b>`);

      // $('.title').append(title);
      console.log(`${director}`);
      $('.director').val(`${director}`);
      $('.year').val(`${year}`);
      $('.rating').val(`${rating}`);
      $('.poster_url').val(`${url}`);


    }).catch(err=> {
      console.log("not working");
    })

    $(".editMovies").on('click', function(e){
       e.preventDefault();
      console.log("in editmovies");
      if($('.director').val()=="" || $('.year').val()=="" || $('.rating').val()=="" || $('.poster_url').val()==""){
            alert("please fill in all the fields.");
      }
      else{
      console.log("in editmovies-else");
        var valData = {}
        valData['title'] = `${title}`;
        valData['director'] = $('.director').val();
        valData['year'] = $('.year').val();
        valData['rating'] = $('.rating').val();
        valData['url'] = $('.poster_url').val();
        console.log(valData);
        debugger
        $.ajax({
          type:'PUT',
          url:"/movies/"+title,
          crossDomain: true,
          data: JSON.stringify(valData),
          contentType: 'application/json; charset=utf-8',
          success:function(returnValue){
            location.href = "index.html"
          },
          error:function(){
            console.log("failure");
          }
        })
      }

    })


});
