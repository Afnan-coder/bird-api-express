const express = require('express');
const app = express();

app.use(express.json()); // to parse JSON

// Dummy data
let birds = [
  { id: 1, name: 'Sparrow' },
  { id: 2, name: 'Peacock' },
  { id: 3, name: 'Woodcutter' },
  { id: 4, name: 'Eagle' }
];

// GET all birds
app.get('/birds', (req, res) => {
  res.json(birds);
});


// GET one bird
app.get('/birds/:id', (req, res) => {
  //Check all items in birds array and return the bird whose id match with id(req.params.id) from url
  const bird = birds.find((b) => {
    return b.id === parseInt(req.params.id)
  });

  //now we check if the id match with url id then return that bird else return not found
  if (bird) {
    res.json(bird)
  } else {
    res.status(404).send("bird not found");
    return;
  }
})

// POST a new bird
app.post('/birds', (req, res) => {
  const newBird = {
    id: birds.length + 1,
    name: req.body.name
  }
  birds.push(newBird);
  res.status(201).json(newBird)
})


// PUT (update) a bird

app.put('/birds/:id', (req, res) => {
  const bird = birds.find((b) => {
    return b.id === parseInt(req.params.id)
  })
  if (bird) {
    bird.name = req.body.name;
    res.json(bird)
  } else {
    res.status(404).send("Bird not found")
  }
})

// DELETE a bird
app.delete('/birds/:id', (req, res) => {
  birds = birds.filter(b => b.id !== parseInt(req.params.id));
  res.send('Bird deleted');
});

app.delete("/birds/:id", (req,res)=>{
  birds = birds.filter((b)=>{
    return b.id !== parseInt(req.params.id)
  })
  res.send("Bird deleted")
})

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
