// dashboard.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Chart = require('chart.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve static files from the 'public' directory

// Sample data for demonstration
let dataPoints = [];

// Endpoint to simulate data generation
app.get('/generate-data', (req, res) => {
    const newDataPoint = Math.floor(Math.random() * 100);
    dataPoints.push(newDataPoint);
    io.emit('dataUpdate', newDataPoint); // Emit new data to clients
    res.send({ data: newDataPoint });
});

// Serve the dashboard HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/dashboard.html');
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
