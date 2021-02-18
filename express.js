const express = require('express');

const app = express();  // instantiate the server
const PORT = 3002;

//make the app listen to the server

app.listen(PORT, () => {
    console.log(`API server now listening to port ${PORT}`);
})

