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

// Click ammo crate
clickBtn.addEventListener("click", () => {
  ammo += clickPower;
  updateScore();
  clickBtn.style.transform = "scale(1.2)";
  setTimeout(() => clickBtn.style.transform = "scale(1)", 100);
});

// Buy upgrades
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

// Buy troops
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

// Health upgrades and healing
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
document.getElementById("doubleClick").addEventListener("click", () => {
  if (ammo >= 30) {
    ammo -= 30;
    clickPower *= 2;
    setTimeout(() => { clickPower /= 2; }, 10000); // 10s boost
    updateScore();
  }
});

document.getElementById("nuke").addEventListener("click", () => {
  if (ammo >= 100) {
    ammo -= 100;
    invasionProgress = 0;
    invasionStrength = Math.max(1, invasionStrength - 2); // damage invasion
    updateScore();
  }
});

// Passive ammo
setInterval(() => {
  ammo += passivePower;
  updateScore();
}, 1000);

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
}, 100);

// Show damage numbers
function showDamage(text) {
  const dmg = document.createElement("div");
  dmg.textContent = text;
  dmg.style.position = "absolute";
  dmg.style.left = "50%";
  dmg.style.top = "50px";
  dmg.style.transform = "translateX(-50%)";
  dmg.style.color = "yellow";
  dmg.style.fontSize = "20px";
  damageEl.appendChild(dmg);
  setTimeout(() => dmg.remove(), 1000);
}

// Update display
function updateScore() {
  scoreEl.textContent = `Ammo: ${ammo}`;
  document.getElementById("buyClickPower").textContent = `Buy Ammo Upgrade (+1 per click) - Cost: ${clickPowerCost}`;
  document.getElementById("buyPassive").textContent = `Buy Ammo Supply (+1/sec) - Cost: ${passiveCost}`;
  document.getElementById("buySoldier").textContent = `Buy Soldier (Defense 1) - Cost: ${soldierCost}`;
  document.getElementById("buyTank").textContent = `Buy Tank (Defense 5) - Cost: ${tankCost}`;
}

// Update health bar
function updateHealthBar() {
  healthBar.style.width = `${(currentHealth / maxHealth) * 100}%`;
  if (currentHealth / maxHealth > 0.5) {
    healthBar.style.backgroundColor = "green";
  } else if (currentHealth / maxHealth > 0.2) {
    healthBar.style.backgroundColor = "orange";
  } else {
    healthBar.style.backgroundColor = "red";
  }
}

updateHealthBar();
updateScore();
