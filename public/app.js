document.addEventListener("click", (event) => {
    const id = event.target.dataset.id;

    switch (event.target.dataset.type) {
        case "remove":
            deleteNote(id).then(() => {
                event.target.closest("li").remove();
            });
            break;
        case "edit":
            const newTitle = prompt("Введите новый заголовок заметки")?.trim();

            if (newTitle) {
                updateNote(id, newTitle).then(() => {
                    const note = document.querySelector(`[data-value='${id}']`);
                    note.textContent = newTitle;
                });
            }
            break;
        default:
    }
});

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
