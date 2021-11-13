const express = require('express')
const app = express()
const connectToMongo=require('./db');
const port = 5000;
connectToMongo();
//for reading req.body
app.use(express.json())
//Availaible routes
app.use('/api/auth/createuser',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})