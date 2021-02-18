const express = require('express');

const app = express();  // instantiate the server

//make the app listen to the server

app.listen(3002, () => {
    console.log('API server now listening to port 3002');
})
