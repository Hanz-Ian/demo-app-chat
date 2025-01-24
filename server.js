// Assigning Express framework to a var
var express = require('express')
// Using Express on a var
var app = express()


// Serving a static file for Express (index.html)
app.use(express.static(__dirname))

var messages = [
    {name: 'Jin', message: "BALLER"},
    {name: 'Ronnie', message: "hi"}
]

// Handling GET Requests
app.get('/messages', (req, res) => {
    res.send(messages)
})


// Start the Express server and listen for port 3000
var server = app.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})