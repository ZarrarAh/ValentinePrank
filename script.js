// script.js (full fil med bilde på start + GIF etter Yes)

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

  // Yes vokser "for alltid" (juster 0.06 om du vil)
  const scale = 1.0 + noMoves * 0.06;
  yesBtn.style.transform = `scale(${scale})`;
}

// Desktop
noBtn.addEventListener("mouseenter", moveNo);

// Mobil
noBtn.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    moveNo();
  },
  { passive: false }
);

// YES -> resultat med GIF
yesBtn.addEventListener("click", () => {
  // Bytt "yay.gif" til din gif (evt assets/yay.gif)
  const gifSrc = "Assets/christucker-dance.gif";

  card.innerHTML = `
    <h1 style="margin:0 0 12px;font-size:32px;">Yay! 🥰</h1>

    <img
      src="${gifSrc}"
      alt="Celebration GIF"
      style="width:min(320px, 80vw); height:auto; display:block; margin:0 auto 14px; border-radius:16px;"
      loading="eager"
    />

    <p style="margin:0 0 14px;font-size:18px;opacity:.85;">
      ASTAGHFIRULLAH <b>15. februar</b>?
    </p>

    <div style="font-size:18px;line-height:1.6;">
       <b>HARAM!</b><br/>
        Not good, not good at all!<br/>
    </div>
  `;
});

// Hvis skjermstørrelse endres
window.addEventListener("resize", () => {
  if (activated) moveNo();
});
