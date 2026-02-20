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

    let gooseNest = 500;
    let gooseNestLevel = 0;
    const btn3 = document.getElementById('upgrade-nest');
    const gooseNestCostDisplay = this.document.getElementById("upgrade3-cost");
    const gooseNestLevelDisplay = this.document.getElementById("upgrade3-count");
    
    let intimacy = 1500;
    let intimacyLevel = 0;
    const btn4 = document.getElementById('upgrade-intimacy');
    const intimacyCostDisplay = this.document.getElementById("upgrade4-cost");
    const intimacyLevelDisplay = this.document.getElementById("upgrade4-count");

    let feed = 5000;
    let gooseFeedLevel = 0;
    const btn5 = document.getElementById('upgrade-Feed');
    const feedCostDisplay = this.document.getElementById("upgrade5-cost");
    const feedLevelDisplay = this.document.getElementById("upgrade5-count");



    function updateUpgradeStatus() {
        if(click < drugCost) {
            btn1.classList.add('disabled');
        } else {
            btn1.classList.remove('disabled');
        }
        if(click < gooseCost) {
            btn2.classList.add('disabled');
        } else {
            btn2.classList.remove('disabled');
        }
        if(click < gooseNest) {
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
        btn1.title = "The labor-inducing drug will increase your points by 0.125 with each click, and automatically produces 0.25 eggs per second.";
    });

    btn1.addEventListener('click', function () {
        if(click >= drugCost) {
            click -= drugCost;
            drugCost += 20;
            drugCostLevel++;
            eggsLaid += 0.25;
            clickPower += 0.125;
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
        btn2.title = "An extra goose will increase your points by 0.25 with each click, and automatically produces 1 eggs per second.";
    });

    btn2.addEventListener('click', function () {
        if(click >= gooseCost) {
            click -= gooseCost;
            gooseCost += 100;
            gooseCostLevel++;
            eggsLaid += 1;
            clickPower += 0.25;
            activeEggsLaid.textContent = eggsLaid;
            gooseCostDisplay.textContent = gooseCost;
            eggs.textContent = click;
            clickValue.textContent = clickPower;
            gooseCostLevelDisplay.textContent = gooseCostLevel;
        }
    });

    btn3.addEventListener('mouseover', function () {
        btn3.title = "A goose nest will increase your points by 0.5 with each click, and automatically produces 2 eggs per second.";
    });

    btn3.addEventListener('click', function () {
        if(click >= gooseNest) {
            click -= gooseNest;
            gooseNest += 1000;
            gooseNestLevel++;
            eggsLaid += 2;
            clickPower += 0.5;
            activeEggsLaid.textContent = eggsLaid;
            gooseNestCostDisplay.textContent = gooseNest;
            eggs.textContent = click;
            clickValue.textContent = clickPower;
            gooseNestLevelDisplay.textContent = gooseNestLevel;
        }
    });

    btn4.addEventListener('mouseover', function () {
        btn4.title = "Improved Intimacy will increase your points by 1 with each click, and automatically produces 5 eggs per second.";
    });

    btn4.addEventListener('click', function () {
        if(click >= intimacy) {
            click -= intimacy;
            intimacy += 2500;
            intimacyLevel++;
            eggsLaid += 5;
            clickPower += 1;
            activeEggsLaid.textContent = eggsLaid;
            intimacyCostDisplay.textContent = intimacy;
            eggs.textContent = click;
            clickValue.textContent = clickPower;
            intimacyLevelDisplay.textContent = intimacyLevel;
        }
    });

    btn5.addEventListener('mouseover', function () {
        btn5.title = "Feeding your geese will increase your points by 2 with each click, and automatically produces 10 eggs per second.";
    });

    btn5.addEventListener('click', function () {
        if(click >= feed) {
            click -= feed;
            feed = feed + 5000;
            gooseFeedLevel++;
            eggsLaid += 50;
            clickPower += 3;
            activeEggsLaid.textContent = eggsLaid;
            feedCostDisplay.textContent = feed;
            eggs.textContent = click;
            clickValue.textContent = clickPower;
            feedLevelDisplay.textContent = gooseFeedLevel;

        }
    });
});