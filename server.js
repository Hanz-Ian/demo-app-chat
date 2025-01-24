// Assigning Express framework to a var
var express = require('express')
var bodyParser = require('body-parser')
const { Socket } = require('socket.io')
// Using Express on a var
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')


// Serving a static file for Express (index.html)
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

dbUrl = 'mongodb+srv://user:user@demoapp.98s4j.mongodb.net/?retryWrites=true&w=majority&appName=DemoApp'


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
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

mongoose.connect(dbUrl)


// Start the Express server and listen for port 3000
var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})