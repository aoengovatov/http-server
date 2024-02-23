document.addEventListener("click", (event) => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id;

        deleteNote(id).then(() => {
            event.target.closest("li").remove();
        });
    }
});

function deleteNote(id) {
    return fetch(`/${id}`, {
        method: "DELETE",
    });
}
