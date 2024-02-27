const chalk = require("chalk");
const note = require("./models/note");

async function addNote(title) {
    note.create({ title });

    console.log(chalk.bgGreen("Note was added!"));
}

async function deleteNoteById(id) {
    await note.deleteOne({ _id: id });
    console.log(chalk.bgRed("Note was not found"));
}

async function editNoteById(id, title) {
    await note.updateOne({ _id: id }, { title });
    console.log(chalk.bgGreen("Note was edited!"));
}

async function getNotes() {
    const notes = await note.find();
    return notes;
}

module.exports = {
    addNote,
    getNotes,
    deleteNoteById,
    editNoteById,
};
