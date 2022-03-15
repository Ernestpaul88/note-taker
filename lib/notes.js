const fs = require("fs");
const path = require("path");

function createNote(body, notesArray) {
  note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

function deleteNoteById(id, notesArray) {
  notesArray = notesArray.filter((note) => note.id !== id);
  fs.writeFile(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2),
    (err) => {
      if (err) throw err;
    }
  );

  return notesArray;
}

function validateNote(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  if (!note.id || typeof note.id !== "string") {
    return false;
  }
  return true;
}

module.exports = {
  createNote,
  deleteNoteById,
  validateNote,
};
