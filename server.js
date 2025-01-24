// Import required modules
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var socketIo = require('socket.io');
var mongoose = require('mongoose');

// Initialize app, and server using Socket.io
var app = express();
var server = http.Server(app);
var io = socketIo(server);

// Serve static files (index.html)
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// MongoDB connection URL
const dbUrl = 'mongodb+srv://user:user@demoapp.98s4j.mongodb.net/?retryWrites=true&w=majority&appName=DemoApp';

// Define Mongoose model for messages
var Message = mongoose.model('Message', {
    name: { type: String, required: true },
    message: { type: String, required: true }
});

// Connect to MongoDB
mongoose.connect(dbUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Handle GET requests to fetch messages
app.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find({});
        res.send(messages);
    } catch (err) {
        res.sendStatus(500);
        console.error(err);
    }
});

// Handle POST requests to save messages
app.post('/messages', async (req, res) => {
    try {
        // Validate the request body
        if (!req.body.name || !req.body.message) {
            return res.status(400).send('Name and message are required');
        }

        var message = new Message(req.body);
        await message.save();
        io.emit('message', req.body);
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
        console.error(err);
    }
});

// Handle socket connection
io.on('connection', (socket) => {
    console.log('a user connected');
});

// Start the server and listen on port 3000
server.listen(3000, () => {
    console.log('server is listening on port', server.address().port);
});