const router = require("express").Router();
const { createNote, deleteNoteById, validateNote } = require("../../lib/notes");
let { notes } = require("../../db/db.json");
const uniqid = require("uniqid");

router.get("/notes", (req, res) => {
  res.json(notes);
});

router.delete("/notes/:id", (req, res) => {
  let updatedNotes = deleteNoteById(req.params.id, notes);
  if (updatedNotes) {
    notes = updatedNotes;
    res.json(notes);
  } else {
    res.send(404);
  }
});

router.post("/notes", (req, res) => {
  req.body.id = uniqid();

  if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    const note = createNote(req.body, notes);
    res.json(note);
  }
});

module.exports = router;
