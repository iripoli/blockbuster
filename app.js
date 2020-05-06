const express = require('express')
const Joi = require('joi')

const app = express()

app.use(express.json())

const genres = [
  {id: 1, name: 'Action'},
  {id: 2, name: 'Terror'},
  {id: 3, name: 'Science Fiction'}
]

app.get('/', (req, res)=>{
  res.send('Welcome to Blockbuster')
  res.end()
})

//GET ALL GENRES
app.get('/api/genres', (req, res)=>{
  res.send(genres)
})
//GET ONE GENRE
app.get('/api/genres/:id', (req, res)=>{
  const genre = genres.find(genre => genre.id === parseInt(req.params.id) )
  res.send(genre.name)
})

//POST A NEW GENRE
app.post('/api/genres', (req, res)=>{
  const {error} = validateData(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const data = {
    id: genres.length + 1,
    name: req.body.name
  }
  genres.push(data)
  res.send(data)
})

//UPDATE ONE GENRE
app.put('/api/genres/:id', (req, res)=>{
  const genre = genres.find(genre => genre.id === parseInt(req.params.id) )
  if (!genre) return res.status(404).send("Couldn't find any genre with that id") 
  const {error} = validateData(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  genre.name = req.body.name
  res.send(genre.name)
})

//DELETE ONE GENRE
app.delete('/api/genres/:id', (req, res)=>{
  const genre = genres.find(genre => genre.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send("Couldn't find any genre with that id") 
  const index = genres.indexOf(genre)
  genres.splice(index, 1)
  res.send(genres)
})


function validateData(data){
  const schema = {
    name: Joi.string().min(4).required()
  }
  return Joi.validate(data, schema)
}


//PORT
const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`Listening to port ${port}`))