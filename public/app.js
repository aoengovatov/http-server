document.addEventListener("click", (event) => {
    const id = event.target?.dataset?.id;
    const title = event.target.closest("li")?.dataset?.title;
    const datasetType = event.target?.dataset?.type;

    if (datasetType) {
        switch (datasetType) {
            case "remove":
                deleteNote(id).then(() => {
                    event.target.closest("li").remove();
                });
                break;
            case "edit":
                const note = event.target.closest("li");
                oldNoteContent = document.querySelector(`[data-value='${id}']`);
                const noteTitle = oldNoteContent.textContent;
                note.innerHTML = editNoteMode(id, noteTitle);
                break;
            case "save":
                const newTitle = document.querySelector(`[data-input='${id}']`).value;

                if (newTitle) {
                    updateNote(id, newTitle).then(() => {
                        const note = event.target.closest("li");
                        note.innerHTML = defaultNoteMode(id, newTitle);
                    });
                }
                break;
            case "cancel":
                const noteOld = event.target.closest("li");
                noteOld.innerHTML = defaultNoteMode(id, title);
                break;
            default:
        }
    }
});

function editNoteMode(id, title) {
    return `
    <input data-input="${id}" value="${title}" type="text">
    <div>
        <button class="btn btn-success" data-type="save" data-id="${id}">Сохранить</button>
        <button class="btn btn-danger" data-type="cancel" data-id="${id}">Отмена</button>
     </div>`;
}

function defaultNoteMode(id, title) {
    return `
    <div data-value="${id}">${title}</div>
    <div>
        <button class="btn btn-primary" data-type="edit" data-id="${id}">Обновить</button>
        <button class="btn btn-danger" data-type="remove" data-id="${id}">&times;</button>
     </div>`;
}

function updateNote(id, title) {
    return fetch(`/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            id,
            title,
        }),
    });
}

function deleteNote(id) {
    return fetch(`/${id}`, {
        method: "DELETE",
    });
}
