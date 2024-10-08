const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');



// ROUTE 1: get all the notes using :GET "/api/notes/fetchallnotes". Login required.

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 2:add the new notes using :POST "/api/notes/addnote". Login required.

router.post('/addnote', fetchuser, [
    body('title', "Enter a Valid Title").isLength({ min: 3 }),
    body('description', "Enter a Valid description").isLength({ min: 5 }),

], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()

        res.json(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 3: Update a Existing notes using :PUT "/api/notes/updatenote/:id". Login required.

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 4: Delete a Existing notes using :DELETE "/api/notes/deletenote/:id". Login required.

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        // const newNote = {};
        // if (title) { newNote.title = title };
        // if (description) { newNote.description = description };
        // if (tag) { newNote.tag = tag };

        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success":"Note has been Deleted",note:note });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router