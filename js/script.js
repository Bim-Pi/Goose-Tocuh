document.addEventListener('DOMContentLoaded', function() {
    const image = document.getElementById("goose-image");
    let click = 0;
    
    image.addEventListener('click', function(){
        click += 1;
        console.log('Image was clicked ' + click + ' times');
    });
});