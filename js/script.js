window.addEventListener('load', function () {
    const image = document.getElementById("goose-image");
    let click = 0;
    const honks = this.document.getElementById("resource-count")

    image.addEventListener('click', function () {
        click += 1;
        honks.textContent = click;
    });

    let helpButton = document.getElementById("help-button");
    let helpModal = document.getElementById("help-modal");
    let closeHelpButton = document.getElementById("close-help");

    helpButton.addEventListener('click', function () {
        helpModal.style.display = "block";
    });

    closeHelpButton.addEventListener('click', function () {
        helpModal.style.display = "none";
    });
});