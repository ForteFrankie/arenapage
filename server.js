const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 443; // Standard HTTPS port

const options = {
    key: fs.readFileSync(path.join(__dirname, 'certs/localhost.key')),
    cert: fs.readFileSync(path.join(__dirname, 'certs/localhost.cert')),
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start HTTPS server
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server running at https://localhost:${PORT}`);
});
