const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// a function created to get the notes from the database
const getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};

