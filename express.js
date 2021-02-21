const express = require('express');
const path = require("path");
const fs = require("fs");
const notesdb = require("./db/db.json")

const app = express();  // instantiate the server
// Use heroku port or local port
const PORT = process.env.PORT || 3000;
// const apiRoutes = require("./routes/apiRoutes");
// const htmlRoutes = require("./routes/htmlRoutes");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets
app.use(express.static('public'))


//  HTML Routes
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

function writeToNotesdb(notes) {
    fs.writeFile("./db/db.json",JSON.stringify(notes),err => {
        if (err) throw err;
        return true;
    });
}
// API Routes
// Get method reads db.json file and return all saved notes as JSON
app.get('/api/notes',(req,res) => {
    res.json(notesdb);
    //console.log(notesdb);
})

// Post method should receive a note to save the request body
// add it to the db.json file
// return the new note to the client
// find a way to give each note a unique id when its saved.

app.post('/api/notes', (req,res) => {
    let newNotes = req.body;
    if (notesdb.length == 0){
        req.body.id = "0";
    } else{
        req.body.id = JSON.stringify(JSON.parse(notesdb[notesdb.length - 1].id) + 1);
    }
    //push the new note to db
    notesdb.push(newNotes);
    // Writes notes String to db.json
    writeToNotesdb(notesdb);
    // returns new note in JSON format.
    res.json(req.body);
})

// Delete method should receive a query parameter containing the id of a note to delete
// read all notes from the db.json file
// remove the note with the given id property
// then rewrite the notes to the db.json file.

app.delete('/api/notes/:id', (req,res) => {
    //let jsonFilePath = path.join(__dirname, "/db/db.json");
    // request to delete note by id.
    for (let i = 0; i < notesdb.length; i++) {
        if (notesdb[i].id == req.params.id) {
            // Splice takes i position, and then deletes the 1 note.
            notesdb.splice(i, 1);
            break;
        }
    }
    // Rewrite the db.json file again.
    writeToNotesdb(notesdb);
    res.json(notesdb);
})



//make the app listen to the server
app.listen(PORT, () => {
    console.log(`API server now listening to port ${PORT}`);
})

