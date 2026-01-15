// Player stats
let ammo = 0;
let clickPower = 1;
let passivePower = 0;
let maxHealth = 100;
let currentHealth = 100;

// Upgrade costs
let clickPowerCost = 10;
let passiveCost = 20;
let soldierCost = 50;
let tankCost = 200;

// Troops
let soldiers = 0;
let tanks = 0;

// Invasion
let invasionProgress = 0;
let invasionStrength = 1;
const invasionSpeed = 0.5;

// Elements
const scoreEl = document.getElementById("score");
const healthBar = document.getElementById("healthBar");
const invasionBar = document.getElementById("invasionBar");
const invasionText = document.getElementById("invasionText");
const damageEl = document.getElementById("damageNumbers");
const gameOverEl = document.getElementById("gameOver");
const clickBtn = document.getElementById("clickBtn");

// Troop display
function updateTroops() {
  document.getElementById("soldierCount").innerHTML = "Soldiers: " + soldiers + (soldiers > 0 ? "<img src='images/soldier.png'>" : "");
  document.getElementById("tankCount").innerHTML = "Tanks: " + tanks + (tanks > 0 ? "<img src='images/tank.png'>" : "");
}

// Click ammo crate
clickBtn.addEventListener("click", () => {
  ammo += clickPower;
  updateScore();
  clickBtn.style.transform = "scale(1.2)";
  setTimeout(() => clickBtn.style.transform = "scale(1)", 100);
});

// Upgrades
document.getElementById("buyClickPower").addEventListener("click", () => {
  if (ammo >= clickPowerCost) {
    ammo -= clickPowerCost;
    clickPower += 1;
    clickPowerCost = Math.floor(clickPowerCost * 1.5);
    updateScore();
  }
});
document.getElementById("buyPassive").addEventListener("click", () => {
  if (ammo >= passiveCost) {
    ammo -= passiveCost;
    passivePower += 1;
    passiveCost = Math.floor(passiveCost * 1.5);
    updateScore();
  }
});
document.getElementById("buySoldier").addEventListener("click", () => {
  if (ammo >= soldierCost) {
    ammo -= soldierCost;
    soldiers += 1;
    soldierCost = Math.floor(soldierCost * 1.5);
    updateScore();
  }
});
document.getElementById("buyTank").addEventListener("click", () => {
  if (ammo >= tankCost) {
    ammo -= tankCost;
    tanks += 1;
    tankCost = Math.floor(tankCost * 1.5);
    updateScore();
  }
});

// Health upgrades and heal
document.getElementById("upgradeHealth").addEventListener("click", () => {
  if (ammo >= 50) {
    ammo -= 50;
    maxHealth += 20;
    currentHealth = maxHealth;
    updateScore();
  }
});
document.getElementById("healPlayer").addEventListener("click", () => {
  if (ammo >= 20) {
    ammo -= 20;
    currentHealth = Math.min(maxHealth, currentHealth + 30);
    updateScore();
  }
});

// Abilities
let doubleClickCooldown = false;
document.getElementById("doubleClick").addEventListener("click", () => {
  if (ammo >= 30 && !doubleClickCooldown) {
    ammo -= 30;
    clickPower *= 2;
    doubleClickCooldown = true;
    updateScore();
    setTimeout(() => clickPower /= 2, 10000);
    setTimeout(() => doubleClickCooldown = false, 10000);
  }
});
document.getElementById("nuke").addEventListener("click", () => {
  if (ammo >= 100) {
    ammo -= 100;
    invasionProgress = 0;
    invasionStrength = Math.max(1, invasionStrength - 2);
    updateScore();
  }
});

// Passive ammo
setInterval(() => {
  ammo += passivePower;
  updateScore();
}, 1000);

// Enemy attack animation
function enemyAttack() {
  const enemyImg = document.getElementById("enemyImg");
  enemyImg.classList.add("attackAnimation");
  setTimeout(() => enemyImg.classList.remove("attackAnimation"), 300);
}

// Invasion loop
setInterval(() => {
  if (currentHealth <= 0) return;

  invasionProgress += invasionSpeed;

  if (invasionProgress > 100) {
    let totalDefense = soldiers * 1 + tanks * 5;
    if (totalDefense >= invasionStrength) {
      showDamage(`-${invasionStrength} enemies defeated!`);
    } else {
      let damage = Math.max(0, (invasionStrength - totalDefense) * 10);
      currentHealth -= damage;
      showDamage(`-${damage} HP`);
      enemyAttack();
      if (currentHealth <= 0) {
        currentHealth = 0;
        gameOverEl.style.display = "block";
      }
    }
    invasionProgress = 0;
    invasionStrength += 0.5;
  }

  invasionBar.style.width = `${invasionProgress}%`;
  updateHealthBar();
  updateTroops();
}, 100);

// Damage numbers
function showDamage(text) {
  const dmg = document.createElement("div");
  dmg.textContent = text;
  damageEl.appendChild(dmg);
  setTimeout(() => dmg.remove(), 1000);
}

// Update health bar
function updateHealthBar() {
  healthBar.style.width = `${(currentHealth / maxHealth) * 100}%`;
  if (currentHealth / maxHealth > 0.5) healthBar.style.backgroundColor = "green";
  else if (currentHealth / maxHealth > 0.2) healthBar.style.backgroundColor = "orange";
  else healthBar.style.backgroundColor = "red";
}

// Update score and buttons
function updateScore() {
  scoreEl.textContent = `Ammo: ${ammo}`;
  document.getElementById("buyClickPower").textContent = `Ammo Upgrade (+1/click) - ${clickPowerCost} ammo`;
  document.getElementById("buyPassive").textContent = `Ammo Supply (+1/sec) - ${passiveCost} ammo`;
  document.getElementById("buySoldier").textContent = `Soldier (Defense 1) - ${soldierCost} ammo`;
  document.getElementById("buyTank").textContent = `Tank (Defense 5) - ${tankCost} ammo`;
}

updateHealthBar();
updateScore();
updateTroops();
