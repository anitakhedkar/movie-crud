
function deleterow(title){
  console.log("title:" + title);
  $.ajax({
    url: "/movies/"+title,
    type: 'DELETE',
    success: function(result) {
        location.reload(true);
    }
  });
}


$(document).ready(function(){

  $.get('/movies', function(movies){
    console.log(movies);


          var tablehead =
               `<th> TITLE </th> <th> DIRECTOR </th> <th> YEAR </th> <th> MY RATING </th><th></th><th></th> </tr>`
               console.log("Tablehead" + tablehead)
               $(tablehead).appendTo("#listmovies thead");

        for(var i = 0; i < movies.length ; i++){
                console.log(movies[i]);
             var list = `<tr> <th scope='row'><a href = "show.html?title=${movies[i].title}"<td>${movies[i].title}</td><td> ${movies[i].director} </td> <td> ${movies[i].year} </td> <td>  ${movies[i].rating}  </td><td><a href="edit.html?title=${movies[i].title}" class="btn btn-primary">Edit</a></td><td><button data-title="${movies[i].title}" class="btn btn-danger">Delete</button></td></tr>`
             console.log("${movies[i].title}" + `${movies[i].title}`)
             console.log("List" + list)
              $(list).appendTo("#listmovies tbody");
        }

        $('.btn-danger').on('click', function(e){
        deleterow(e.target.dataset.title);
        })

  });

});
