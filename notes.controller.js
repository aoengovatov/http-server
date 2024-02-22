const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notePath = path.join(__dirname, "db.json");

async function addNote(title) {
    const notes = await getNotes();

    const note = {
        title,
        id: Date.now().toString(),
    };

    notes.push(note);

    await fs.writeFile(notePath, JSON.stringify(notes));
    console.log(chalk.bgGreen("Note was added!"));
}

async function deleteNoteById(id) {
    const notes = await getNotes();
    const notesIds = notes.map((note) => note.id);
    console.log(notesIds);
    if (notesIds.includes(id)) {
        const filteredNotes = notes.filter((note) => note.id !== id);

        await fs.writeFile(notePath, JSON.stringify(filteredNotes));

        console.log(chalk.bgGreen("Note was deleted!"));
        return;
    }
    console.log(chalk.bgRed("Note was not found"));
}

async function getNotes() {
    const notes = await fs.readFile(notePath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
    const notes = await getNotes();

    console.log(chalk.bgBlue("Here is the list of notes:"));
    notes.forEach((note) => console.log(chalk.blue(note.title)));
}

module.exports = {
    addNote,
    printNotes,
    deleteNoteById,
};
