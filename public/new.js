$(".addMovies").on('click', function(e){
   e.preventDefault();
  console.log("in addmovies");
  if($('#title').val()=="" || $('#director').val()=="" || $('#year').val()=="" || $('#rating').val()=="" || $('#url').val()==""){
        alert("please fill in all the fields.");
  }
  else{
  console.log("in addmovies-else");
    var valData = {}
    valData['title'] = $('#title').val();
    valData['director'] = $('#director').val();
    valData['year'] = $('#year').val();
    valData['rating'] = $('#rating').val();
    valData['url'] = $('#url').val();
    console.log(valData);
    $.ajax({
      type:'POST',
      url:"/movies",
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
