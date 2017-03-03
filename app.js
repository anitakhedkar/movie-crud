const express = require('express');
const app = express();
const low = require('lowdb');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const fileAsync = require('lowdb/lib/storages/file-async');
const db = low('db/db.json', {
  storage: fileAsync
});

  app.use(express.static('./public/', {'index': 'home.html'}))
  app.use(bodyParser.json())

  app.get('/movies', (req, res) => {
    const movies = db.get('movies');
    res.send(movies);
  });

  app.get(`/movies/:id`, (req,res) => {
    const id = req.params.id;
    console.log("id:" + id);
    const movies = db.get('movies').find({title: id});
  res.send(movies);
  });

  app.delete(`/movies/:id`, function (req, res) {
  const id = req.params.id;
  console.log("id:" + id);
  db.get('movies')
    .remove({title: id})
    .write()
    .then(deleted => {
      res.status(204).send();
    }).catch(err => {
      console.log(err);
    });

});

app.post('/movies', function (req, res) {
  console.log("req: ",req);
  console.log("inside app post");
  db.get('movies')
    .push(req.body)
    .write()
    .then(post => {
      res.status(201).send(post);
    }).catch(err => {
      console.log(err);
    });
});

app.put(`/movies/:id`, function (req, res) {
  const Id = req.params.id;
  db.get('movies')
  .find({ title: Id })
  .assign(req.body)
  .write()
  .then((updatedmovies) => {
    res.send(updatedmovies);
  })
  .catch((err) => {
    console.log(err);
  });
});

  app.listen(port, ()=>{
    console.log("server listening on port:",port);
  });

  module.exports = app;
