window.addEventListener('load', function() {
    const image = document.getElementById("goose-image");
    let click = 0;
    
    image.addEventListener('click', function(){
        click += 1;
        console.log('Image was clicked ' + click + ' times');
    });

    let helpButton = document.getElementById("help-button");
    let helpModal = document.getElementById("help-modal");
    let closeHelpButton = document.getElementById("close-help");

    helpButton.addEventListener('click', function() {
        helpModal.style.display = "block";
    });
    
    closeHelpButton.addEventListener('click', function() {
        helpModal.style.display = "none";
    });
});