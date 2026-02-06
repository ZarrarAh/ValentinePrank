// script.js (robust full fil)

const card = document.getElementById("card");
const buttons = document.getElementById("buttons");
const yesBtn = document.getElementById("yesBtn");
const noWrapper = document.getElementById("noWrapper");
const noBtn = document.getElementById("noBtn");

let noMoves = 0;
let activated = false;

function moveNo() {
  const area = buttons.getBoundingClientRect();

  if (!activated) {
    activated = true;
    noWrapper.style.position = "absolute";
    // Lås den til nåværende posisjon før vi begynner å flytte
    noWrapper.style.left = `${noWrapper.offsetLeft}px`;
    noWrapper.style.top = `${noWrapper.offsetTop}px`;
  }

  const rect = noWrapper.getBoundingClientRect();
  const padding = 10;

  const maxX = Math.max(padding, area.width - rect.width - padding);
  const maxY = Math.max(padding, area.height - rect.height - padding);

  const x = padding + Math.random() * (maxX - padding);
  const y = padding + Math.random() * (maxY - padding);

  noWrapper.style.left = `${x}px`;
  noWrapper.style.top = `${y}px`;

  noMoves++;
  const scale = 1.0 + noMoves * 0.06;
  yesBtn.style.transform = `scale(${scale})`;
}

// Desktop: flytt når musa nærmer seg
noBtn.addEventListener("mouseenter", moveNo);

// Mobil: flytt når man prøver å trykke
noBtn.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault(); // hindrer faktisk trykk
    moveNo();
  },
  { passive: false }
);

// YES: bytt hele kortet til "resultat-skjerm"
yesBtn.addEventListener("click", () => {
  card.innerHTML = `
    <h1 style="margin:0 0 14px;font-size:32px;">Yay! 🥰</h1>
    <p style="margin:0 0 18px;font-size:18px;opacity:.8;">
      Bli med ut <b>15. februar</b>? 🍽️✨
    </p>
    <div style="font-size:18px;line-height:1.6;">
      <br/>
      💌 Gleder meg!
    </div>
  `;
});

// Hvis skjermstørrelse endres (mobil roterer)
window.addEventListener("resize", () => {
  if (activated) moveNo();
});
