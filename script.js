let ammo = 0;
let clickPower = 1;
let passivePower = 0;
let troops = 0;
let invasionInterval;

// Elements
const scoreEl = document.getElementById("score");
const invasionEl = document.getElementById("invasion");

// Click button
document.getElementById("clickBtn").addEventListener("click", () => {
  ammo += clickPower;
  updateScore();
});

// Buy upgrades
document.getElementById("buyClickPower").addEventListener("click", () => {
  if (ammo >= 10) {
    ammo -= 10;
    clickPower += 1;
    updateScore();
  }
});

document.getElementById("buyPassive").addEventListener("click", () => {
  if (ammo >= 20) {
    ammo -= 20;
    passivePower += 1;
    updateScore();
  }
});

document.getElementById("buyTroop").addEventListener("click", () => {
  if (ammo >= 50) {
    ammo -= 50;
    troops += 1;
    updateScore();
  }
});

// Passive ammo every second
setInterval(() => {
  ammo += passivePower;
  updateScore();
}, 1000);

// Random invasions
function startInvasions() {
  invasionInterval = setInterval(() => {
    let enemyStrength = Math.floor(Math.random() * 5) + 1;
    if (troops >= enemyStrength) {
      invasionEl.textContent = `An invasion came! Your troops defeated ${enemyStrength} enemies!`;
    } else {
      ammo = Math.max(0, ammo - (enemyStrength - troops) * 5);
      invasionEl.textContent = `An invasion came! You lost ${(enemyStrength - troops) * 5} ammo!`;
    }
  }, 10000);
}

// Update display
function updateScore() {
  scoreEl.textContent = `Ammo: ${ammo}`;
  document.getElementById("buyClickPower").textContent = `Buy Ammo Upgrade (+1 per click) - Cost: 10`;
  document.getElementById("buyPassive").textContent = `Buy Ammo Supply (+1/sec) - Cost: 20`;
  document.getElementById("buyTroop").textContent = `Buy Troop (Defends against invasions) - Cost: 50`;
}

startInvasions();
