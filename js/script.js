window.addEventListener('load', function () {
    const image = document.getElementById("goose-image");
    let click = 0;
    let clickPower = 1;
    let eggsLaid = 0;
    const eggs = this.document.getElementById("resource-count")

    image.addEventListener('click', function () {
        click += clickPower;
        eggs.textContent = click;
    });

    function eggsLaidPerSec() {
        click += eggsLaid;
        eggs.textContent = click;
        activeEggsLaid.textContent = eggsLaid;
    }
    setInterval(eggsLaidPerSec, 1000);


    let helpButton = document.getElementById("help-button");
    let helpModal = document.getElementById("help-modal");
    let closeHelpButton = document.getElementById("close-help");

    helpButton.addEventListener('click', function () {
        helpModal.style.display = "block"; 
    });

    closeHelpButton.addEventListener('click', function () {
        helpModal.style.display = "none";
    });



    let drugCost = 10;
    let drugCostLevel = 0;
    const btn1 = document.getElementById('upgrade-drugs');
    const clickValue = this.document.getElementById("click-value");
    const drugCostDisplay = this.document.getElementById("upgrade1-cost");
    const drugCostLevelDisplay = this.document.getElementById("upgrade1-count");
    const drugArea = document.getElementById('drug-sign');

    const activeEggsLaid = this.document.getElementById("active-upgrades-count");
    let gooseCost = 100;
    let gooseCostLevel = 0;
    const btn2 = document.getElementById('upgrade-geese');
    const gooseCostDisplay = this.document.getElementById("upgrade2-cost");
    const gooseCostLevelDisplay = this.document.getElementById("upgrade2-count");
    
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
});