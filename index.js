const express = require('express')

const app = express()

app.get("/", (req, res)=>{
    res.status(200).send({
        message: "Welcome to stream hub"
    })
})

const PORT = 4000
app.listen(PORT, ()=>console.log(`Server started on PORT: ${PORT}`))