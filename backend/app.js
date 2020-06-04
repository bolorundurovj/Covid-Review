const express = require('express');

const app = express();

port = 2020;


app.get('/', (req, res, next) => {
    res.json("It Works!!")
})

app.listen(port, () => {
    console.log(`App is live on http://localhost:${port}`);    
})