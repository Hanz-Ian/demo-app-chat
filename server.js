// Assigning Express framework to a var
var express = require('express')
var bodyParser = require('body-parser')
// Using Express on a var
var app = express()


// Serving a static file for Express (index.html)
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


var messages = [
    {name: 'Jin', message: "BALLER"},
    {name: 'Ronnie', message: "hi"}
]

// Handling GET Requests
app.get('/messages', (req, res) => {
    res.send(messages)
})

// Handling POST Requests
app.post('/messages', (req, res) => {
    messages.push(req.body)
    res.sendStatus(200)
})


// Start the Express server and listen for port 3000
var server = app.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})