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
const healthDisplay = document.getElementById("healthDisplay");
const troopDisplay = document.getElementById("troopDisplay");
const invasionBar = document.getElementById("invasionBar");
const invasionText = document.getElementById("invasionText");
const damageEl = document.getElementById("damageNumbers");
const gameOverEl = document.getElementById("gameOver");
const clickBtn = document.getElementById("clickBtn");

// Update displays
function updateDisplays() {
  scoreEl.textContent = `Ammo: ${ammo}`;
  healthDisplay.textContent = `Health: ${currentHealth} / ${maxHealth}`;
  troopDisplay.textContent = `Soldiers: ${soldiers} | Tanks: ${tanks}`;
  document.getElementById("buyClickPower").textContent = `Ammo Upgrade (+1/click) - ${clickPowerCost}`;
  document.getElementById("buyPassive").textContent = `Ammo Supply (+1/sec) - ${passiveCost}`;
  document.getElementById("buySoldier").textContent = `Buy Soldier (Defense 1) - ${soldierCost}`;
  document.getElementById("buyTank").textContent = `Buy Tank (Defense 5) - ${tankCost}`;
}

// Click ammo crate
clickBtn.addEventListener("click", () => {
  ammo += clickPower;
  clickBtn.style.transform = "scale(1.2)";
  setTimeout(() => clickBtn.style.transform = "scale(1)", 100);
  updateDisplays();
});

// Upgrade buttons
document.getElementById("buyClickPower").addEventListener("click", () => {
  if (ammo >= clickPowerCost) { ammo -= clickPowerCost; clickPower++; clickPowerCost = Math.floor(clickPowerCost*1.5); updateDisplays();}
});
document.getElementById("buyPassive").addEventListener("click", () => {
  if (ammo >= passiveCost) { ammo -= passiveCost; passivePower++; passiveCost = Math.floor(passiveCost*1.5); updateDisplays();}
});
document.getElementById("buySoldier").addEventListener("click", () => {
  if (ammo >= soldierCost) { ammo -= soldierCost; soldiers++; soldierCost = Math.floor(soldierCost*1.5); updateDisplays();}
});
document.getElementById("buyTank").addEventListener("click", () => {
  if (ammo >= tankCost) { ammo -= tankCost; tanks++; tankCost = Math.floor(tankCost*1.5); updateDisplays();}
});
document.getElementById("upgradeHealth").addEventListener("click", () => {
  if (ammo >= 50) { ammo -= 50; maxHealth += 20; currentHealth = maxHealth; updateDisplays();}
});
document.getElementById("healPlayer").addEventListener("click", () => {
  if (ammo >= 20) { ammo -= 20; currentHealth = Math.min(maxHealth, currentHealth + 30); updateDisplays();}
});

// Abilities
let doubleClickCooldown = false;
document.getElementById("doubleClick").addEventListener("click", () => {
  if (ammo >= 30 && !doubleClickCooldown) {
    ammo -= 30; clickPower *= 2; doubleClickCooldown = true; updateDisplays();
    setTimeout(() => { clickPower /= 2; doubleClickCooldown = false; }, 10000);
  }
});
document.getElementById("nuke").addEventListener("click", () => {
  if (ammo >= 100) { ammo -= 100; invasionProgress = 0; invasionStrength = Math.max(1, invasionStrength-2); updateDisplays();}
});

// Passive ammo
setInterval(() => { ammo += passivePower; updateDisplays(); }, 1000);

// Damage numbers
function showDamage(text){
  const dmg = document.createElement("div");
  dmg.textContent = text;
  damageEl.appendChild(dmg);
  setTimeout(()=> dmg.remove(),1000);
}

// Invasion loop
setInterval(() => {
  if(currentHealth <= 0) return;
  invasionProgress += invasionSpeed;
  if(invasionProgress > 100){
    let defense = soldiers*1 + tanks*5;
    if(defense >= invasionStrength){
      showDamage(`-${invasionStrength} enemies defeated!`);
    } else {
      let damage = Math.max(0, (invasionStrength-defense)*10);
      currentHealth -= damage;
      showDamage(`-${damage} HP`);
      if(currentHealth<=0){currentHealth=0;gameOverEl.style.display="block";}
    }
    invasionProgress=0;
    invasionStrength+=0.5;
  }
  invasionBar.style.width = `${invasionProgress}%`;
  updateDisplays();
},100);
