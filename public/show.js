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
      $('.movie_show').append(`<img src="${url}">`);
      $('.title').append(title);
      $('.director').append(director);
      $('.year').append(year);
      $('.rating').append(rating);

    }).catch(err=> {
      console.log("not working");
    })

});
