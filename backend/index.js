const express = require('express')
const app = express()
const connectToMongo=require('./db');
const port = 5000;
connectToMongo();
//for reading req.body
app.use(express.json())
//Availaible routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`backend listening at http://localhost:${port}`)
})