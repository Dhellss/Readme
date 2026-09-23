const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];

const INTERESTS = ["Coding", "Programming", "Ethical Hacking", "Cyber Security", "Game Dev", "Web Dev", "Software Dev", "System Dev", "UI/UX Design", "AI"];
$("#interests").innerHTML = INTERESTS.map(i => `<li>${i}</li>`).join("");

const WORK = [
  ["2026", "Pixel Dungeon Runner", "2D roguelike with procedurally generated floors.", "C# · Unity"],
  ["2026", "Campus Event Board", "Responsive site to post and find campus events.", "HTML · CSS · JS"],
  ["2025", "Port Scan Visualizer", "Maps open ports on your own lab network.", "Python"],
  ["2025", "Study Buddy Bot", "Small AI helper that quizzes you from your notes.", "Python · AI"]
];
$("#work").innerHTML = WORK.map(([y, t, d, s]) => `<li><span class="yr">${y}</span><div><h3>${t}</h3><p>${d}</p></div><span class="stack">${s}</span></li>`).join("");

/* pages */
const pages = ["home", "portfolio", "contact"];
let first = true;
function route() {
  const p = pages.includes(location.hash.slice(1)) ? location.hash.slice(1) : "home";
  $$(".page").forEach(s => {
    s.hidden = s.dataset.page !== p;
    s.classList.toggle("in", !first && s.dataset.page === p);
  });
  $$(".nav a").forEach(a => a.dataset.link === p ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  if (!first) scrollTo(0, 0);
  first = false;
}
addEventListener("hashchange", route); route();

/* local time in Manila */
function tick() {
  const t = new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Manila", hour: "2-digit", minute: "2-digit" });
  $("#clock").textContent = "Manila · " + t;
}
tick(); setInterval(tick, 20000);

/* copy */
const toast = $("#toast"); let tt;
$$("[data-copy]").forEach(b => b.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(b.dataset.copy); toast.textContent = "copied"; }
  catch { toast.textContent = "couldn't copy — select the text instead"; }
  toast.hidden = false; clearTimeout(tt); tt = setTimeout(() => toast.hidden = true, 1500);
}));
