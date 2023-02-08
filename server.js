// Constants
const api_key = 'acf88eb6685dade595f0dfa8b54dcc6f';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
const url_for_icons = 'http://openweathermap.org/img/wn/10d@2x.png';
let queries = ``;
let projectData = {};


// Setup
const express = require('express');
const app = express();

//Middleware
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(express.static('front'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())


// Routes
app.get('/', (req, res)=> {
     console.log("home")
})

app.post('/post_weather', async (req, res)=> {
     const {country, unit} = req.body;
     queries = `q=${country}&appid=${api_key}&units=${unit}'`;
     console.log(queries)
     
     const response = await fetch(baseURL+queries);
     try {
          const resp = await response.json();
          projectData = resp;
          res.status(200).send();
     }catch(error){
          console.log("Error: ", error);
          res.status(404).send();
     }
})

app.get('/all', async(req, res)=> {
     console.log('get all')
     res.send(projectData);
})

// Server
const PORT = 3000;
const server = app.listen(PORT, ()=> {
     console.log(`Server is running on ${PORT}`)
})