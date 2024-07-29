const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: Get Logged in User Notes GET "/api/notes/fetchAllNotes" login required
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
});

// Route 2: Add a note POST "/api/notes/addNote" login required
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter a title with at least 5 characters").isLength({ min: 5 }),
    body("description", "Enter a description with at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // Create a new note
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      console.log('Note saved:', savedNote); // Added for debugging
      res.json(savedNote);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
  }
);

// Route 3: Update a note PUT "/api/notes/updateNote/:id" login required
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;

  // Create a newNote object
  const newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;

  try {
    // Find the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Ensure the user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized access to update denied!");
    }

    // Update the note
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json(note); // Send the updated note as a response
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
});

// Route 4: Delete a note delete "/api/notes/deleteNote/:id" login required
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
  
    try {
      // Find the note to be deleted
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Note not found");
      }
  
      // Ensure the user owns this note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized access to update denied!");
      }
  
      // delete the note
      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({"Success": "Note has been deleted", note:note});
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
  });
  


module.exports = router;
