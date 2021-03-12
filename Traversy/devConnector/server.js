const express = require('express')

const app = express();

app.get('/', (req, res)=>{
    res.send("API Running")
})

const PORT = process.env.PORT || 3500;

app.listen(PORT, ()=>console.log(`Port started on port ${PORT}`))