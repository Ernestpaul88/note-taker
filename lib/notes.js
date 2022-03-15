const fs = require("fs");
const path = require("path");

function createNote(body, notesArray) {
  note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify({ notesArray }, null, 2)
  );
  return note;
}

function deleteNoteById(id, notesArray) {
  const notes = notesArray.filter((note) => note.id !== id);
  fs.writeFile(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify({ notes }, null, 2),
    (err) => {
      if (err) throw err;
    }
  );

  return notes;
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
