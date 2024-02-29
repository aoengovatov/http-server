const chalk = require("chalk");
const note = require("./models/note");

async function addNote(title, owner) {
    note.create({ title, owner });

    console.log(chalk.bgGreen("Note was added!"));
}

async function deleteNoteById(id, owner) {
    result = await note.deleteOne({ _id: id, owner });

    if (result.matchedCount === 0) {
        throw new Error("No notes to delete");
    }
    console.log(chalk.bgRed("Note was not found"));
}

async function editNoteById(id, title, owner) {
    const result = await note.updateOne({ _id: id, owner }, { title });

    if (result.matchedCount === 0) {
        throw new Error("No notes to edit");
    }
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
