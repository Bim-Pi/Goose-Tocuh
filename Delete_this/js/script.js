// Load event listener - all code runs after page loads
document.addEventListener('DOMContentLoaded', () => {
    
    // ===== GAME STATE (MODEL) =====
    let gameState = {
        totalEggs: 0,
        clickValue: 1,
        autoClickRate: 0,
        autoClickInterval: null,
        upgradsPurchased: {}
    };

    // ===== UPGRADE DEFINITIONS =====
    const upgrades = [
        // Click Value Upgrades (increase eggs per click)
        {
            id: 'golden-basket',
            name: '🧺 Golden Basket',
            description: 'Doubles click value',
            type: 'click-value',
            baseCost: 10,
            effect: 2,
            icon: '🧺'
        },
        {
            id: 'stronger-hands',
            name: '💪 Stronger Hands',
            description: 'Triple your click power',
            type: 'click-value',
            baseCost: 50,
            effect: 3,
            icon: '💪'
        },
        {
            id: 'magic-touch',
            name: '✨ Magic Touch',
            description: 'Multiply click value by 5',
            type: 'click-value',
            baseCost: 200,
            effect: 5,
            icon: '✨'
        },
        {
            id: 'lucky-gloves',
            name: '🧤 Lucky Gloves',
            description: 'Increase click value by 10x',
            type: 'click-value',
            baseCost: 1000,
            effect: 10,
            icon: '🧤'
        },
        // Auto-Click Upgrades
        {
            id: 'egg-machine',
            name: '⚙️ Egg Machine',
            description: 'Auto-collect 1 egg every 2 seconds',
            type: 'auto-click',
            baseCost: 100,
            rate: 500,
            icon: '⚙️'
        },
        {
            id: 'super-egg-machine',
            name: '🚀 Super Egg Machine',
            description: 'Auto-collect 5 eggs every 1 second (replaces current)',
            type: 'auto-click',
            baseCost: 500,
            rate: 200,
            icon: '🚀'
        },
        {
            id: 'mega-egg-farm',
            name: '🏭 Mega Egg Farm',
            description: 'Auto-collect 20 eggs every 500ms (replaces current)',
            type: 'auto-click',
            baseCost: 2000,
            rate: 100,
            icon: '🏭'
        }
    ];

    // ===== REWARD DEFINITIONS =====
    const rewards = [
        {
            id: 'first-click',
            name: 'Egg Collector',
            description: 'Collect your first egg',
            icon: '🥚',
            condition: () => gameState.totalEggs >= 1
        },
        {
            id: 'first-upgrade',
            name: 'Entrepreneur',
            description: 'Buy your first upgrade',
            icon: '💰',
            condition: () => Object.keys(gameState.upgradsPurchased).length >= 1
        },
        {
            id: 'ten-eggs',
            name: 'Egg Hoarder',
            description: 'Collect 10 eggs',
            icon: '📦',
            condition: () => gameState.totalEggs >= 10
        },
        {
            id: 'hundred-eggs',
            name: 'Egg Millionaire',
            description: 'Collect 100 eggs',
            icon: '👑',
            condition: () => gameState.totalEggs >= 100
        },
        {
            id: 'auto-clicker',
            name: 'Automation Master',
            description: 'Buy an auto-click upgrade',
            icon: '🤖',
            condition: () => gameState.autoClickRate > 0
        },
        {
            id: 'thousand-eggs',
            name: 'Poultry Tycoon',
            description: 'Collect 1,000 eggs',
            icon: '🏗️',
            condition: () => gameState.totalEggs >= 1000
        },
        {
            id: 'five-upgrades',
            name: 'Mega Investor',
            description: 'Buy 5 different upgrades',
            icon: '📈',
            condition: () => Object.keys(gameState.upgradsPurchased).length >= 5
        }
    ];

    // ===== TRACKED REWARDS =====
    let earnedRewards = new Set();

    // ===== DOM ELEMENTS =====
    const clickBtn = document.getElementById('clickBtn');
    const totalEggsEl = document.getElementById('totalEggs');
    const clickValueEl = document.getElementById('clickValue');
    const autoClickRateEl = document.getElementById('autoClickRate');
    const activeUpgradesEl = document.getElementById('activeUpgrades');
    const upgradesContainer = document.getElementById('upgradesContainer');
    const rewardsContainer = document.getElementById('rewardsContainer');
    const clickFeedback = document.getElementById('clickFeedback');
    const helpBtn = document.getElementById('helpBtn');
    const helpModal = document.getElementById('helpModal');
    const closeBtn = document.querySelector('.close');
    const rewardNotification = document.getElementById('rewardNotification');
    const rewardMessage = document.getElementById('rewardMessage');

    // ===== UPDATE DISPLAY FUNCTIONS =====
    function updateScoreboard() {
        totalEggsEl.textContent = gameState.totalEggs;
        clickValueEl.textContent = gameState.clickValue;
        autoClickRateEl.textContent = gameState.autoClickRate > 0 
            ? `${(1000 / gameState.autoClickRate).toFixed(2)} eggs/sec` 
            : 'Off';
        
        // Update active upgrades list
        let activeList = '';
        for (const upgradeId in gameState.upgradsPurchased) {
            const upgrade = upgrades.find(u => u.id === upgradeId);
            if (upgrade && gameState.upgradsPurchased[upgradeId] > 0) {
                activeList += `<span>${upgrade.icon} x${gameState.upgradsPurchased[upgradeId]}</span>`;
            }
        }
        activeUpgradesEl.innerHTML = activeList || '<span style="color:#999;">None</span>';
    }

    function updateUpgrades() {
        upgradesContainer.innerHTML = '';
        upgrades.forEach(upgrade => {
            const currentCost = upgrade.baseCost * Math.pow(1.15, gameState.upgradsPurchased[upgrade.id] || 0);
            const canAfford = gameState.totalEggs >= currentCost;
            
            const upgradeCard = document.createElement('button');
            upgradeCard.className = 'upgrade-card';
            upgradeCard.disabled = !canAfford;
            
            upgradeCard.innerHTML = `
                <div class="upgrade-name">${upgrade.icon} ${upgrade.name} (x${gameState.upgradsPurchased[upgrade.id] || 0})</div>
                <div class="upgrade-description">${upgrade.description}</div>
                <div class="upgrade-cost">Cost: ${Math.floor(currentCost)} eggs</div>
            `;
            
            upgradeCard.addEventListener('click', () => buyUpgrade(upgrade));
            upgradesContainer.appendChild(upgradeCard);
        });
    }

    function updateRewards() {
        rewardsContainer.innerHTML = '';
        rewards.forEach(reward => {
            const earned = earnedRewards.has(reward.id);
            const rewardCard = document.createElement('div');
            rewardCard.className = `reward-card ${earned ? 'earned' : ''}`;
            rewardCard.innerHTML = `
                <div class="reward-icon">${reward.icon}</div>
                <div class="reward-name">${reward.name}</div>
            `;
            rewardsContainer.appendChild(rewardCard);
        });
    }

    function checkRewards() {
        rewards.forEach(reward => {
            if (!earnedRewards.has(reward.id) && reward.condition()) {
                earnedRewards.add(reward.id);
                showRewardNotification(reward);
                updateRewards();
            }
        });
    }

    function showRewardNotification(reward) {
        rewardMessage.textContent = `🏆 ${reward.name}! ${reward.description} 🏆`;
        rewardNotification.style.display = 'block';
        setTimeout(() => {
            rewardNotification.style.display = 'none';
        }, 3000);
    }

    // ===== GAME LOGIC FUNCTIONS =====
    function addEggs(amount) {
        gameState.totalEggs += amount;
        updateScoreboard();
        checkRewards();
        
        // Show feedback
        clickFeedback.textContent = `+${amount}`;
        setTimeout(() => {
            clickFeedback.textContent = '';
        }, 300);
    }

    function buyUpgrade(upgrade) {
        const currentCost = upgrade.baseCost * Math.pow(1.15, gameState.upgradsPurchased[upgrade.id] || 0);
        
        if (gameState.totalEggs < currentCost) return;
        
        // Deduct cost
        gameState.totalEggs -= currentCost;
        
        // Track purchase
        gameState.upgradsPurchased[upgrade.id] = (gameState.upgradsPurchased[upgrade.id] || 0) + 1;
        
        // Apply effect
        if (upgrade.type === 'click-value') {
            gameState.clickValue *= upgrade.effect;
        } else if (upgrade.type === 'auto-click') {
            startAutoClick(upgrade.rate);
            gameState.autoClickRate = upgrade.rate;
        }
        
        updateScoreboard();
        updateUpgrades();
        checkRewards();
    }

    function startAutoClick(rate) {
        // Stop previous auto-click
        if (gameState.autoClickInterval) {
            clearInterval(gameState.autoClickInterval);
        }
        
        // Start new auto-click
        const eggsPerTick = Math.max(1, Math.floor(gameState.clickValue / 10));
        gameState.autoClickInterval = setInterval(() => {
            addEggs(eggsPerTick);
        }, rate);
    }

    // ===== EVENT LISTENERS =====
    clickBtn.addEventListener('click', () => {
        addEggs(gameState.clickValue);
    });

    helpBtn.addEventListener('click', () => {
        populateHelpModal();
        helpModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        helpModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === helpModal) {
            helpModal.style.display = 'none';
        }
    });

    // ===== HELP MODAL POPULATION =====
    function populateHelpModal() {
        // Click upgrades
        const clickUpgrades = upgrades.filter(u => u.type === 'click-value');
        let clickList = clickUpgrades.map(u => 
            `<li><strong>${u.icon} ${u.name}:</strong> ${u.description}</li>`
        ).join('');
        document.getElementById('helpClickUpgrades').innerHTML = clickList;

        // Auto upgrades
        const autoUpgrades = upgrades.filter(u => u.type === 'auto-click');
        let autoList = autoUpgrades.map(u => 
            `<li><strong>${u.icon} ${u.name}:</strong> ${u.description}</li>`
        ).join('');
        document.getElementById('helpAutoUpgrades').innerHTML = autoList;

        // Rewards
        let rewardList = rewards.map(r => 
            `<li><strong>${r.icon} ${r.name}:</strong> ${r.description}</li>`
        ).join('');
        document.getElementById('helpRewards').innerHTML = rewardList;
    }

    // ===== INITIALIZE GAME =====
    updateScoreboard();
    updateUpgrades();
    updateRewards();
    populateHelpModal();
});

