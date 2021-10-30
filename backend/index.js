const express = require('express')
const app = express()
const connectToMongo=require('./db');
const port = 3000
connectToMongo();


//Availaible routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})