let ammo = 0;
let clickPower = 1;
let passivePower = 0;

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
const invasionSpeed = 0.5; // % per tick

// Elements
const scoreEl = document.getElementById("score");
const invasionBar = document.getElementById("invasionBar");
const invasionText = document.getElementById("invasionText");

// Ammo crate click
document.getElementById("clickBtn").addEventListener("click", () => {
  ammo += clickPower;
  updateScore();
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

// Passive ammo per second
setInterval(() => {
  ammo += passivePower;
  updateScore();
}, 1000);

// Invasion loop
setInterval(() => {
  invasionProgress += invasionSpeed;
  if (invasionProgress > 100) {
    // Troops defend
    let totalDefense = soldiers * 1 + tanks * 5;
    if (totalDefense >= invasionStrength) {
      invasionText.textContent = `Invasion defeated! Troops handled ${invasionStrength} enemies!`;
    } else {
      let lostAmmo = Math.max(0, (invasionStrength - totalDefense) * 10);
      ammo = Math.max(0, ammo - lostAmmo);
      invasionText.textContent = `Invasion! You lost ${lostAmmo} ammo!`;
    }
    // Reset invasion
    invasionProgress = 0;
    invasionStrength += 0.5; // get harder each wave
  }
  invasionBar.style.width = `${invasionProgress}%`;
}, 100);

// Update display
function updateScore() {
  scoreEl.textContent = `Ammo: ${ammo}`;
  document.getElementById("buyClickPower").textContent = `Buy Ammo Upgrade (+1 per click) - Cost: ${clickPowerCost}`;
  document.getElementById("buyPassive").textContent = `Buy Ammo Supply (+1/sec) - Cost: ${passiveCost}`;
  document.getElementById("buySoldier").textContent = `Buy Soldier (Defense 1) - Cost: ${soldierCost}`;
  document.getElementById("buyTank").textContent = `Buy Tank (Defense 5) - Cost: ${tankCost}`;
}
