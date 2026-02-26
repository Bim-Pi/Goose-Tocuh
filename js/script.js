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
    
    let shedCost = 10000;
    let shedCostLevel = 0;
    const btn4 = document.getElementById('upgrade-shed');
    const shedCostDisplay = this.document.getElementById("upgrade4-cost");
    const shedCostLevelDisplay = this.document.getElementById("upgrade4-count");

    let farmCost = 100000;
    let farmCostLevel = 0;
    const btn5 = document.getElementById('upgrade-farm');
    const farmCostDisplay = this.document.getElementById("upgrade5-cost");
    const farmCostLevelDisplay = this.document.getElementById("upgrade5-count");



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
        if (shedCostLevel >= 17){
            btn4.classList.add('disabled');
            shedCostDisplay.textContent = "Ultimate Level";
        } else if(click < shedCost) {
            btn4.classList.add('disabled');
        } else {
            btn4.classList.remove('disabled');
        }
        if (farmCostLevel >= 17){
            btn5.classList.add('disabled');
            farmCostDisplay.textContent = "Ultimate Level";
        } else if(click < farmCost) {
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
            if (drugCostLevel > 24) {
                drugArea.style.fontSize = "15px";
            }
            if (drugCostLevel > 39) {
                drugArea.style.fontSize = "10px";
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
        btn4.title = "An extra goose shed will increase your points by 10 with each click, and automatically produces 100 eggs per second.";
    });

    btn4.addEventListener('click', function () {
        if (shedCostLevel >= 17){
            shedCostDisplay.textContent = "Ultimate Level";
        } else if(click >= shedCost) {
            click -= shedCost;
            shedCost += 20000;
            shedCostLevel++;
            eggsLaid += 10000;
            clickPower += 10;
            activeEggsLaid.textContent = eggsLaid;
            shedCostDisplay.textContent = shedCost;
            eggs.textContent = click;
            clickValue.textContent = clickPower;
            shedCostLevelDisplay.textContent = shedCostLevel;
            displayShed();
        }
    });

    btn5.addEventListener('mouseover', function () {
        btn5.title = "An extra farm will increase your points by 30 with each click, and automatically produces 1000 eggs per second.";
    });

    btn5.addEventListener('click', function () {
        if (farmCostLevel >= 17){
            farmCostDisplay.textContent = "Ultimate Level";
        } else if(click >= farmCost) {
            click -= farmCost;
            farmCost += 250000;
            farmCostLevel++;
            eggsLaid += 12500;
            clickPower += 30;
            activeEggsLaid.textContent = eggsLaid;
            farmCostDisplay.textContent = farmCost;
            eggs.textContent = click;
            clickValue.textContent = clickPower;
            farmCostLevelDisplay.textContent = farmCostLevel;
            displayFarm();
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
    

    const c3 = document.getElementById("badge3");
    const ctx3 = c3.getContext("2d");

    const shed = new Image();
    shed.src = "images/Goose_Shed.png";
    const farm = new Image();
    farm.src = "images/farm image.png";

    farm.onload = function () {
        ctx3.drawImage(farm, 0, 0, 560, 150);
    };

    let shed_x = 20;
    let shed_y = 70;
    function displayShed() {
        if(shedCostLevel == 1) {
            ctx3.drawImage(shed, shed_x, shed_y, 57, 42);
            c3.style.display = "flex";
            shed_x += 58;
        } else if(shedCostLevel % 2 == 0) {
            ctx3.drawImage(shed, shed_x, shed_y, 57, 42);
            shed_x -= 29;
            shed_y = 85;
        } else {
            ctx3.drawImage(shed, shed_x, shed_y, 57, 42);
            shed_x += 87;
            shed_y = 70;
        }
    }


    const c4 = document.getElementById("badge4");
    const ctx4 = c4.getContext("2d");

    const goose_Farm = new Image();
    goose_Farm.src = "images/Goose_Farm.png";
    const earth = new Image();
    earth.src = "images/earth.png";

    earth.onload = function () {
        ctx4.drawImage(earth, 0, 0, 560, 150);
    };
0
    let farm_x = 20;
    let farm_y = 70;
    function displayFarm() {
        if(farmCostLevel == 1) {
            ctx4.drawImage(goose_Farm, farm_x, farm_y, 53, 43);
            c4.style.display = "flex";
            farm_x += 58;
        } else if(farmCostLevel % 2 == 0) {
            ctx4.drawImage(goose_Farm, farm_x, farm_y, 53, 43);
            farm_x -= 29;
            farm_y = 85;
        } else {
            ctx4.drawImage(goose_Farm, farm_x, farm_y, 53, 43);
            farm_x += 87;
            farm_y = 70;
        }
    }
});