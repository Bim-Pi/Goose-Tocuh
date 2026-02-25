// --------------------Clicking Settings---------------------------
// Function for Goose Image -----------------------
window.addEventListener('load', function () {
    const image = document.getElementById("goose-image");
    let click = 0;
    let clickPower = 1;
    let eggsLaid = 0;
    const eggs = this.document.getElementById("resource-count")

    const preloadSound = new Audio('SoundEffect/GooseHONK!_SoundEffect.mp3');
    preloadSound.preload = 'auto';
    preloadSound.load();

    // Functions for clicking--------------------------
    image.addEventListener('click', function () {
        const honk = new Audio('SoundEffect/GooseHONK!_SoundEffect.mp3');
        honk.play().catch(e => {
            console.warn("Audio play blocked:", e);
        });

        click += clickPower;
        eggs.textContent = click;
    });

    function eggsLaidPerSec() {
        click += eggsLaid;
        eggs.textContent = click;
        activeEggsLaid.textContent = eggsLaid;
    }
    setInterval(eggsLaidPerSec, 1000);

    const activeEggsLaid = this.document.getElementById("active-upgrades-count");

    // Help Button--------------------------------
    let helpButton = document.getElementById("help-button");
    let helpModal = document.getElementById("help-modal");
    let closeHelpButton = document.getElementById("close-help");

    helpButton.addEventListener('click', function () {
        helpModal.style.display = "block"; 
    });

    closeHelpButton.addEventListener('click', function () {
        helpModal.style.display = "none";
    });

    // ----------------------------------- Upgrades ----------------------------------------
    let drugCost = 10;
    let drugCostLevel = 0;
    const btn1 = document.getElementById('upgrade-drugs');
    const clickValue = this.document.getElementById("click-value");
    const drugCostDisplay = this.document.getElementById("upgrade1-cost");
    const drugCostLevelDisplay = this.document.getElementById("upgrade1-count");
    const drugArea = document.getElementById('drug-sign');

    let gooseCost = 100;
    let gooseCostLevel = 0;
    const btn2 = document.getElementById('upgrade-geese');
    const gooseCostDisplay = this.document.getElementById("upgrade2-cost");
    const gooseCostLevelDisplay = this.document.getElementById("upgrade2-count");

    let carcassCost = 1000;
    let carcassCostLevel = 0;
    const btn3 = document.getElementById('upgrade-carcass');
    const carcassCostDisplay = this.document.getElementById("upgrade3-cost");
    const carcassCostLevelDisplay = this.document.getElementById("upgrade3-count");
    
    let intimacy = 10000;
    let intimacyLevel = 0;
    const btn4 = document.getElementById('upgrade-intimacy');
    const intimacyCostDisplay = this.document.getElementById("upgrade4-cost");
    const intimacyLevelDisplay = this.document.getElementById("upgrade4-count");

    let feed = 100000;
    let gooseFeedLevel = 0;
    const btn5 = document.getElementById('upgrade-Feed');
    const feedCostDisplay = this.document.getElementById("upgrade5-cost");
    const feedLevelDisplay = this.document.getElementById("upgrade5-count");



    function updateUpgradeStatus() {
        if (drugCostLevel >= 50){
            btn1.classList.add('disabled');
            drugCostDisplay.textContent = "Ultimate Level";
        } else if(click < drugCost) {
            btn1.classList.add('disabled');
        } else {
            btn1.classList.remove('disabled');
        }
        if (gooseCostLevel >= 17){
            btn2.classList.add('disabled');
            gooseCostDisplay.textContent = "Ultimate Level";
        } else if(click < gooseCost) {
            btn2.classList.add('disabled');
        } else {
            btn2.classList.remove('disabled');
        }
        if (carcassCostLevel >= 17){
            btn3.classList.add('disabled');
            carcassCostDisplay.textContent = "Ultimate Level";
        } else if(click < carcassCost) {
            btn3.classList.add('disabled');
        } else {
            btn3.classList.remove('disabled');
        }
        if(click < intimacy) {
            btn4.classList.add('disabled');
        } else {
            btn4.classList.remove('disabled');
        }
        if(click < feed) {
            btn5.classList.add('disabled');
        } else {
            btn5.classList.remove('disabled');
        }
    }

    btn1.addEventListener('mouseover', function () {
        btn1.title = "The labor-inducing drug will increase your points by 0.5 with each click, and automatically produces 1 eggs per second.";
    });

    btn1.addEventListener('click', function () {
        if (drugCostLevel >= 50){
            drugCostDisplay.textContent = "Ultimate Level";
        } else if(click >= drugCost) {
            click -= drugCost;
            drugCost += 20;
            drugCostLevel++;
            eggsLaid += 10;
            clickPower += 0.5;
            activeEggsLaid.textContent = eggsLaid;
            drugCostDisplay.textContent = drugCost;
            eggs.textContent = click;
            clickValue.textContent = clickPower;
            drugCostLevelDisplay.textContent = drugCostLevel;
            if(drugArea.innerText == "") {
                drugArea.innerHTML = "🥚";
            } else {
                drugArea.innerHTML += "🥚";
            }
        }
    });
    setInterval(updateUpgradeStatus, 16);

    btn2.addEventListener('mouseover', function () {
        btn2.title = "An extra goose will increase your points by 1 with each click, and automatically produces 5 eggs per second.";
    });

    btn2.addEventListener('click', function () {
        if (gooseCostLevel >= 17){
            gooseCostDisplay.textContent = "Ultimate Level";
        } else if(click >= gooseCost) {
            click -= gooseCost;
            gooseCost += 100;
            gooseCostLevel++;
            eggsLaid += 50;
            clickPower += 1;
            activeEggsLaid.textContent = eggsLaid;
            gooseCostDisplay.textContent = gooseCost;
            eggs.textContent = click;
            clickValue.textContent = clickPower;
            gooseCostLevelDisplay.textContent = gooseCostLevel;
            displayGoose();
        }
    });

    btn3.addEventListener('mouseover', function () {
        btn3.title = "A extra goose carcass will increase your points by 5 with each click, and automatically produces 10 eggs per second.";
    });

    btn3.addEventListener('click', function () {
        if (carcassCostLevel >= 17){
            carcassCostDisplay.textContent = "Ultimate Level";
        } else if(click >= carcassCost) {
            click -= carcassCost;
            carcassCost += 2500;
            carcassCostLevel++;
            eggsLaid += 500;
            clickPower += 5;
            activeEggsLaid.textContent = eggsLaid;
            carcassCostDisplay.textContent = carcassCost;
            eggs.textContent = click;
            clickValue.textContent = clickPower;
            carcassCostLevelDisplay.textContent = carcassCostLevel;
            displayCarcass();
        }
    });

    btn4.addEventListener('mouseover', function () {
        btn4.title = "Improved Intimacy will increase your points by 10 with each click, and automatically produces 100 eggs per second.";
    });

    btn4.addEventListener('click', function () {
        if (intimacyLevel >= 100){
            btn4.classList.remove('disabled');
        } else if(click >= intimacy) {
            click -= intimacy;
            intimacy += 20000;
            intimacyLevel++;
            eggsLaid += 2500;
            clickPower += 10;
            activeEggsLaid.textContent = eggsLaid;
            intimacyCostDisplay.textContent = intimacy;
            eggs.textContent = click;
            clickValue.textContent = clickPower;
            intimacyLevelDisplay.textContent = intimacyLevel;
        }
    });

    btn5.addEventListener('mouseover', function () {
        btn5.title = "Feeding your geese will increase your points by 30 with each click, and automatically produces 1000 eggs per second.";
    });

    btn5.addEventListener('click', function () {
        if (gooseFeedLevel == 100){
            btn5.classList.remove('disabled');
        } else if(click >= feed) {
            click -= feed;
            feed += 250000;
            gooseFeedLevel++;
            eggsLaid += 12500;
            clickPower += 30;
            activeEggsLaid.textContent = eggsLaid;
            feedCostDisplay.textContent = feed;
            eggs.textContent = click;
            clickValue.textContent = clickPower;
            feedLevelDisplay.textContent = gooseFeedLevel;

        }
        
    });


    // ----------------------------------- Coup ----------------------------------------
    
    //Add new goose coup
    const c1 = document.getElementById("badge1");
    const ctx1 = c1.getContext("2d");

    const goose_Nest = new Image();
    goose_Nest.src = "images/Goose_Nest.png";
    const goose_Carcass = new Image();
    goose_Carcass.src = "images/goose carcass.png";

    goose_Carcass.onload = function () {
        ctx1.drawImage(goose_Carcass, 0, 0, 560, 150);
    };

    let goose_x = 30;
    let goose_y = 48;
    function displayGoose() {
        if(gooseCostLevel == 1) {
            ctx1.drawImage(goose_Nest, goose_x, goose_y, 57, 63);
            c1.style.display = "flex";
            goose_x += 55;
        } else if(gooseCostLevel % 2 == 0) {
            ctx1.drawImage(goose_Nest, goose_x, goose_y, 57, 63);
            goose_x -= 27;
            goose_y = 57;
        } else {
            ctx1.drawImage(goose_Nest, goose_x, goose_y, 57, 63);
            goose_x += 82;
            goose_y = 48;
        }
    }


    const c2 = document.getElementById("badge2");
    const ctx2 = c2.getContext("2d");

    const carcass = new Image();
    carcass.src = "images/Goose_Carcass.png";
    const goose_Shed = new Image();
    goose_Shed.src = "images/Inside goose shed.png";

    goose_Shed.onload = function () {
        ctx2.drawImage(goose_Shed, 0, 0, 560, 150);
    };

    let carcass_x = 30;
    let carcass_y = 80;
    function displayCarcass() {
        if(carcassCostLevel == 1) {
            ctx2.drawImage(carcass, carcass_x, carcass_y, 57, 52);
            c2.style.display = "flex";
            carcass_x += 58;
        } else if(carcassCostLevel % 2 == 0) {
            ctx2.drawImage(carcass, carcass_x, carcass_y, 57, 52);
            carcass_x -= 29;
            carcass_y = 92;
        } else {
            ctx2.drawImage(carcass, carcass_x, carcass_y, 57, 52);
            carcass_x += 87;
            carcass_y = 80;
        }
    }
    
});