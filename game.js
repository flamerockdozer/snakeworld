(() => {
  "use strict";

  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const startEl = document.getElementById("start");
  const deadEl = document.getElementById("dead");
  const hudEl = document.getElementById("hud");
  const scorelineEl = document.getElementById("scoreline");
  const ranklineEl = document.getElementById("rankline");
  const boardEl = document.getElementById("board");
  const boardWrap = document.getElementById("board-wrap");
  const boardHideBtn = document.getElementById("board-hide");
  const boardShowBtn = document.getElementById("board-show");
  const boardResizeEl = document.getElementById("board-resize");
  const feedEl = document.getElementById("feed");
  const deadLineEl = document.getElementById("dead-line");
  const deadByEl = document.getElementById("dead-by");
  const bestTextEl = document.getElementById("best-text");
  const bestClearBtn = document.getElementById("best-clear");
  const nameInput = document.getElementById("player-name");
  const startForm = document.getElementById("start-form");
  const skinsEl = document.getElementById("skins");
  const againBtn = document.getElementById("again");
  const mapTypesEl = document.getElementById("map-types");
  const mapOutlinesEl = document.getElementById("map-outlines");
  const mapFillsEl = document.getElementById("map-fills");
  const mapTraditionalBtn = document.getElementById("map-traditional");
  const mapOpacityEl = document.getElementById("map-opacity");
  const mapOpacityValueEl = document.getElementById("map-opacity-value");
  const growRateEl = document.getElementById("grow-rate");
  const growRateValueEl = document.getElementById("grow-rate-value");
  const highscoresEl = document.getElementById("highscores");
  const deadScoresEl = document.getElementById("dead-scores");
  const tvBackBtn = document.getElementById("tv-back");
  const tvChannelBtn = document.getElementById("tv-channel");
  const tvOpenBtn = document.getElementById("tv-open");
  const hintEl = document.getElementById("hint");
  const tvHintEl = document.getElementById("tv-hint");
  const tvLiveEl = document.getElementById("tv-live");
  const killcamEl = document.getElementById("killcam");
  const menuKillEl = document.getElementById("menu-kill");
  const pauseBtn = document.getElementById("pause");
  const pausedEl = document.getElementById("paused");
  const lengthPopEl = document.getElementById("length-pop");

  const WORLD_R = 6800;
  const SPACING = 11;
  const LOOP_CLOSE = 0.165;
  const SNAKE_DOTS = 24;
  const BASE_SPEED = 205;
  const BOOST_SPEED = 365;
  const TURN = 7.6;
  const FOOD_TARGET = 9000;
  const FOOD_MID = 14000;
  const RUNNER_COUNT = 44;
  const RUNNER_VALUE = 28;
  const FOOD_GROW = 0.24;
  const LENGTH_RATE = 8;
  const HAZARD_COUNT = 30;
  const HAZARD_CHASE_R = 1120;
  const BOT_COUNT = 48;
  const MIN_MASS = 14;
  const BOOST_COST = 0.5;
  const BOOST_MIN_LENGTH = 25;
  const TAPE_SEC = 3.05;
  const SLOW_TAIL = 0.38;
  const SLOW_RATE = 0.28;
  const KILLCAM_HOLD = 0.28;
  function commas(n) {
    return Math.round(Number(n) || 0).toLocaleString("en-US");
  }

  const LENGTHS = [500, 750, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 7500, 10000, 12500, 15000, 17500, 20000, 25000, 30000, 35000, 45000, 60000].map(
    (n) => ({ n: n, label: commas(n) + " length" })
  );
  const DEATH_REPLAY_SEC = 1.15;
  const DEATH_TAPE_SEC = 0.62;
  const NEWS_TAPE_SEC = 0.85;
  const TV_DEATH_MIN = 48;
  const TV_DEATH_KEEP = 8;

  const SKINS = [
    { name: "Coral", color: "#ff5b3a" },
    { name: "Lagoon", color: "#1ec8b0" },
    { name: "Blush", color: "#ff4f8b" },
    { name: "Azure", color: "#2f7dff" },
    { name: "Gold", color: "#ffd056" },
    { name: "Jade", color: "#0ea472" },
    { name: "Violet", color: "#b46bff" },
    { name: "Ice", color: "#7ef0ff" },
    { name: "Pearl", color: "#f0f5ee" },
    { name: "Ember", color: "#ff7a45" },
    { name: "Lime", color: "#7dff4a" },
    { name: "Berry", color: "#c42b6e" },
    { name: "Midnight", color: "#3d5a9a" },
    { name: "Honey", color: "#f08a2a" },
    { name: "Mint", color: "#9dffd4" },
    { name: "Crimson", color: "#e1262d" },
    { name: "Sky", color: "#5ec4ff" },
    { name: "Tangerine", color: "#ff9a3c" },
    { name: "Bubblegum", color: "#ff9ad4" },
    { name: "Graphite", color: "#6b7c86" },
  ];

  const OUTLINES = [
    { name: "Gold", rim1: "#ffd056", rim2: "#ff5b3a", edge: "rgba(255, 70, 50, 0.28)" },
    { name: "Midnight", rim1: "#b46bff", rim2: "#5ec4ff", edge: "rgba(120, 90, 255, 0.32)" },
    { name: "Ember", rim1: "#ff9a3c", rim2: "#e1262d", edge: "rgba(255, 160, 40, 0.28)" },
    { name: "Bloom", rim1: "#ff9ad4", rim2: "#ff4f8b", edge: "rgba(255, 120, 180, 0.26)" },
    { name: "Ice", rim1: "#7ef0ff", rim2: "#ffffff", edge: "rgba(180, 240, 255, 0.22)" },
    { name: "Lime", rim1: "#c6ff4a", rim2: "#3aaa22", edge: "rgba(140, 220, 40, 0.28)" },
    { name: "Ruby", rim1: "#ff4d6a", rim2: "#8e1028", edge: "rgba(255, 40, 70, 0.28)" },
    { name: "Copper", rim1: "#f0a56a", rim2: "#8a3a14", edge: "rgba(220, 120, 50, 0.28)" },
    { name: "Violet", rim1: "#8d74ff", rim2: "#3a1888", edge: "rgba(110, 70, 255, 0.3)" },
    { name: "Mint", rim1: "#74ffd8", rim2: "#12886e", edge: "rgba(80, 230, 190, 0.26)" },
    { name: "Sun", rim1: "#ffe14a", rim2: "#d06800", edge: "rgba(255, 180, 20, 0.28)" },
    { name: "Magenta", rim1: "#ff4ad4", rim2: "#86145e", edge: "rgba(255, 50, 180, 0.28)" },
    { name: "Steel", rim1: "#d7e0e8", rim2: "#465462", edge: "rgba(180, 200, 214, 0.24)" },
    { name: "Lemon", rim1: "#f2ff62", rim2: "#7a9a10", edge: "rgba(210, 230, 40, 0.26)" },
    { name: "Ocean", rim1: "#3ec4ff", rim2: "#0a4c86", edge: "rgba(40, 150, 255, 0.28)" },
    { name: "Peach", rim1: "#ffb48a", rim2: "#d24e28", edge: "rgba(255, 140, 90, 0.26)" },
    { name: "Grape", rim1: "#e0a8ff", rim2: "#682894", edge: "rgba(180, 90, 255, 0.28)" },
    { name: "Crimson", rim1: "#ff3030", rim2: "#6a0c0c", edge: "rgba(255, 30, 30, 0.28)" },
    { name: "Jade", rim1: "#3dffb4", rim2: "#0c6a46", edge: "rgba(40, 230, 150, 0.26)" },
    { name: "Amber", rim1: "#ffc24a", rim2: "#a05600", edge: "rgba(255, 160, 20, 0.28)" },
    { name: "Sky", rim1: "#a6d8ff", rim2: "#2a68aa", edge: "rgba(120, 180, 255, 0.26)" },
    { name: "Rose", rim1: "#ff8aaa", rim2: "#c22656", edge: "rgba(255, 90, 130, 0.26)" },
    { name: "Ivory", rim1: "#fff6e4", rim2: "#c8b89a", edge: "rgba(255, 236, 200, 0.24)" },
    { name: "Toxic", rim1: "#d8ff32", rim2: "#5c8600", edge: "rgba(190, 255, 20, 0.26)" },
    { name: "Royal", rim1: "#5a78ff", rim2: "#121a72", edge: "rgba(50, 80, 255, 0.3)" },
    { name: "Traditional", rim1: "#000000", rim2: "#000000", edge: "rgba(0, 0, 0, 0.4)" },
  ];

  const MAP_TYPES = [
    {
      id: "hex",
      name: "Hexagon",
      svg: '<svg viewBox="0 0 36 36" aria-hidden="true"><polygon points="18,3 31,10.5 31,25.5 18,33 5,25.5 5,10.5"/></svg>',
    },
    {
      id: "square",
      name: "Square",
      svg: '<svg viewBox="0 0 36 36" aria-hidden="true"><rect x="6" y="6" width="24" height="24"/></svg>',
    },
    {
      id: "tri",
      name: "Triangle",
      svg: '<svg viewBox="0 0 36 36" aria-hidden="true"><polygon points="18,4 32,31 4,31"/></svg>',
    },
  ];

  const FILLS = [
    { name: "Lagoon", bg: ["#1d8f96", "#12747c", "#062f36"], arena: "#0e6e76", caustic: "rgba(210,255,255,0.11)" },
    { name: "Midnight", bg: ["#3d4a9a", "#1a2458", "#070b1c"], arena: "#16204a", caustic: "rgba(180,170,255,0.10)" },
    { name: "Ember", bg: ["#c45a2a", "#7a2418", "#1a0806"], arena: "#5a1c14", caustic: "rgba(255,180,80,0.10)" },
    { name: "Bloom", bg: ["#c45a88", "#6a2458", "#1a0818"], arena: "#5a2048", caustic: "rgba(255,180,220,0.10)" },
    { name: "Ice", bg: ["#7ec8d4", "#3a7a88", "#0c2a32"], arena: "#2d6b74", caustic: "rgba(230,255,255,0.14)" },
    { name: "Forest", bg: ["#3e9a48", "#1b5a26", "#07140a"], arena: "#16481e", caustic: "rgba(170,255,150,0.10)" },
    { name: "Sand", bg: ["#e2b15a", "#a87430", "#2a1808"], arena: "#8a5e24", caustic: "rgba(255,220,140,0.12)" },
    { name: "Void", bg: ["#4a3a78", "#221838", "#07060e"], arena: "#1a1430", caustic: "rgba(180,150,255,0.10)" },
    { name: "Cherry", bg: ["#d44555", "#8a2030", "#1c080c"], arena: "#6e1a26", caustic: "rgba(255,160,170,0.10)" },
    { name: "Moss", bg: ["#7a9a3a", "#4a6420", "#121808"], arena: "#3c5418", caustic: "rgba(210,230,120,0.10)" },
    { name: "Dusk", bg: ["#8a5aaa", "#4a2868", "#140818"], arena: "#3c204e", caustic: "rgba(230,180,255,0.10)" },
    { name: "Clay", bg: ["#c47848", "#7a4024", "#1c0e08"], arena: "#623418", caustic: "rgba(255,190,140,0.10)" },
    { name: "Glacier", bg: ["#8eb8d8", "#4a7490", "#0c1c28"], arena: "#3c647c", caustic: "rgba(220,240,255,0.14)" },
    { name: "Plum", bg: ["#a45a88", "#5c2848", "#160810"], arena: "#4a2038", caustic: "rgba(255,170,210,0.10)" },
    { name: "Citrus", bg: ["#e2c84a", "#a88818", "#241c06"], arena: "#8a7014", caustic: "rgba(255,240,140,0.12)" },
    { name: "Abyss", bg: ["#2a4a8a", "#122448", "#060810"], arena: "#0e1c3c", caustic: "rgba(140,180,255,0.10)" },
    { name: "Rose", bg: ["#e27898", "#a04060", "#240810"], arena: "#883450", caustic: "rgba(255,190,210,0.11)" },
    { name: "Olive", bg: ["#8a9440", "#545c22", "#141604"], arena: "#464e1c", caustic: "rgba(220,230,120,0.10)" },
    { name: "Berry", bg: ["#b04080", "#6a1848", "#180610"], arena: "#58143c", caustic: "rgba(255,140,200,0.10)" },
    { name: "Storm", bg: ["#6a7888", "#3a4450", "#101418"], arena: "#303840", caustic: "rgba(200,214,224,0.12)" },
    { name: "Canyon", bg: ["#d07048", "#8a3820", "#1c0c06"], arena: "#6e2e18", caustic: "rgba(255,170,120,0.10)" },
    { name: "Neon", bg: ["#2a9a6a", "#104838", "#041410"], arena: "#0c3c2c", caustic: "rgba(80,255,180,0.11)" },
    { name: "Cream", bg: ["#f0e2c0", "#c8b48a", "#3a3020"], arena: "#b8a478", caustic: "rgba(255,246,220,0.14)" },
    { name: "Kelp", bg: ["#2a8a62", "#14523c", "#04140e"], arena: "#104432", caustic: "rgba(120,255,190,0.10)" },
    { name: "Wine", bg: ["#8a2848", "#4e1428", "#14060a"], arena: "#401020", caustic: "rgba(255,120,150,0.10)" },
    { name: "Traditional", bg: ["#6a7888", "#3a4450", "#101418"], arena: "#303840", caustic: "rgba(200,214,224,0.12)" },
  ];

  const PELLET = [
    "#ff3d5a",
    "#ffd24a",
    "#6ef7ff",
    "#5dff8a",
    "#ff4fb8",
    "#4d8fff",
    "#ffe56b",
    "#c46bff",
    "#ff9a3c",
    "#fff6e8",
  ];

  const BOT_NAMES = [
    "Reef", "Koi", "Mango", "Lagoon", "Coral", "Pebble", "Drift", "Nectar",
    "Tidal", "Papaya", "Glimmer", "Kelp", "Saffron", "Nori", "Wavelet",
    "Citrus", "Anemone", "Pearl", "Marlin", "Guava", "Foam", "Sardine",
    "Nimbus", "Opal", "Zest", "Bloom", "Plume", "Dulse", "Cove", "Brine",
    "Fluke", "Pollen", "Riptide", "Mica", "Juniper", "Whelk", "Sundew",
    "Beryl", "Mako", "Lotus", "Fathom", "Quince", "Sprat", "Halo",
    "Thistle", "Current", "Aurora", "Mussel",
  ];

  const mouse = { x: 0, y: 0, down: false };
  const keys = new Set();
  const cam = { x: 0, y: 0, z: 1, tz: 1 };
  const food = [];
  const snakes = [];
  const particles = [];
  const bubbles = [];
  const reefs = [];
  const hazards = [];

  let state = "attract";
  let player = null;
  let spectate = null;
  let dpr = 1;
  let cssW = 1;
  let cssH = 1;
  let lastT = 0;
  let botSpawnT = 0;
  let best = Number(localStorage.getItem("sd-best") || 0);
  let scores = loadScores();
  let skinIndex = Number(localStorage.getItem("sd-skin") || 0);
  let outlineIndex = 0;
  let fillIndex = 0;
  let mapType = "hex";
  let mapOpacity = 0.55;
  let growRate = 1;
  let time = 0;
  let foodId = 1;
  let foodWave = 0;
  let snakeUid = 1;
  let shake = 0;
  let flash = 0;
  let shownScore = 0;
  let hudAcc = 1;
  let eatChain = 0;
  let lengthMark = 0;
  let eatChainT = 0;
  let leader = null;
  let liveCount = 0;
  let playerRank = 1;
  let audioCtx = null;
  let boostHum = null;
  let boostGain = null;
  let tape = [];
  let tapeAcc = 0;
  let replay = null;
  let pendingKillcam = false;
  let pendingKillcamLabel = "";
  let menuAcc = 1;
  let menuIds = "";
  let boardOrder = [];
  let boardWait = new Map();
  let paused = false;
  let tvAuto = true;
  let tvHold = 0;
  let tvEval = 0;
  let tvSnap = false;
  let tvReplayAt = -99;
  let tvHighlightT = 0;
  let tvHighlightIn = 7.5;
  const tvHeat = new Map();
  const tvDeaths = [];

  if (!Number.isInteger(skinIndex) || skinIndex < 0 || skinIndex >= SKINS.length) {
    skinIndex = 0;
  }
  {
    const legacy = Number(localStorage.getItem("sd-map") || 0);
    const fallback = Number.isInteger(legacy) && legacy >= 0 && legacy < FILLS.length ? legacy : 0;
    const outlineRaw = localStorage.getItem("sd-outline");
    const fillRaw = localStorage.getItem("sd-fill");
    const savedOutline = outlineRaw == null ? NaN : Number(outlineRaw);
    const savedFill = fillRaw == null ? NaN : Number(fillRaw);
    outlineIndex =
      Number.isInteger(savedOutline) && savedOutline >= 0 && savedOutline < OUTLINES.length
        ? savedOutline
        : fallback;
    fillIndex =
      Number.isInteger(savedFill) && savedFill >= 0 && savedFill < FILLS.length ? savedFill : fallback;
    const savedType = localStorage.getItem("sd-map-type");
    if (MAP_TYPES.some((type) => type.id === savedType)) mapType = savedType;
    const savedOpacity = Number(localStorage.getItem("sd-opacity"));
    if (Number.isFinite(savedOpacity)) mapOpacity = clamp(savedOpacity, 0.1, 1);
    const savedGrow = Number(localStorage.getItem("sd-grow"));
    if (Number.isFinite(savedGrow)) growRate = clamp(savedGrow, 0.2, 3);
    growRateEl.value = String(Math.round(growRate * 100));
    growRateValueEl.textContent = growRate.toFixed(1) + "x";
  }

  nameInput.value = localStorage.getItem("sd-name") || "";
  renderBest();
  renderScores();
  renderSkins();
  renderMapMaker();
  seedReefs();
  seedBubbles();

  function loadScores() {
    try {
      const raw = JSON.parse(localStorage.getItem("sd-scores") || "[]");
      return Array.isArray(raw) ? raw : [];
    } catch (e) {
      return [];
    }
  }

  function renderBest() {
    bestTextEl.textContent = best ? "Best length " + commas(best) : "Eat orbs. Grow. Survive.";
    bestClearBtn.classList.toggle("hidden", !best);
  }

  let bestHoldTimer = 0;

  function cancelBestHold() {
    if (bestHoldTimer) clearTimeout(bestHoldTimer);
    bestHoldTimer = 0;
    bestClearBtn.classList.remove("holding");
  }

  function deleteBest() {
    bestHoldTimer = 0;
    bestClearBtn.classList.remove("holding");
    best = 0;
    localStorage.removeItem("sd-best");
    renderBest();
  }

  bestClearBtn.addEventListener("pointerdown", (e) => {
    if (e.button != null && e.button !== 0) return;
    cancelBestHold();
    bestClearBtn.setPointerCapture(e.pointerId);
    bestClearBtn.classList.add("holding");
    bestHoldTimer = setTimeout(deleteBest, 2000);
  });
  bestClearBtn.addEventListener("pointerup", cancelBestHold);
  bestClearBtn.addEventListener("pointercancel", cancelBestHold);

  function renderScores() {
    const rows = scores.slice(0, 8);
    const html = rows.length
      ? rows
          .map((row, i) => {
            const place = i === 0 ? "hot" : i === 1 ? "place-2" : i === 2 ? "place-3" : "";
            const hot = place ? ' class="' + place + '"' : "";
            return (
              "<li" +
              hot +
              "><span>" +
              (i + 1) +
              "  " +
              (row.name || "You") +
              "</span><span>" +
              commas(row.score) +
              "</span></li>"
            );
          })
          .join("")
      : "<li><span>No scores yet</span><span>—</span></li>";
    deadScoresEl.innerHTML = html;
  }

  function liveMenuRow(s, i) {
    const mark = i === 0 ? "♛ " : "";
    return mark + (i + 1) + "  " + s.name;
  }

  function renderLiveMenu() {
    const ranked = snakes
      .filter((s) => s.alive)
      .sort((a, b) => b.mass - a.mass)
      .slice(0, 8);
    const ids = ranked.map((s) => s.uid).join(",");
    if (!ranked.length) {
      menuIds = "";
      highscoresEl.innerHTML = "<li><span>Arena empty</span><span>—</span></li>";
      return;
    }
    if (ids === menuIds && highscoresEl.children.length === ranked.length) {
      for (let i = 0; i < ranked.length; i++) {
        const s = ranked[i];
        const li = highscoresEl.children[i];
        li.setAttribute("data-id", String(s.uid));
        li.classList.toggle("hot", i === 0);
        li.classList.toggle("place-2", i === 1);
        li.classList.toggle("place-3", i === 2);
        li.classList.toggle("watch", !!(spectate && s.uid === spectate.uid));
        applyLengthFlash(li, s);
        li.children[0].textContent = liveMenuRow(s, i);
        li.children[0].style.color = s.c1;
        li.children[1].textContent = commas(scoreOf(s));
      }
      return;
    }
    menuIds = ids;
    highscoresEl.innerHTML = ranked
      .map((s, i) => {
        const cls = [];
        if (i === 0) cls.push("hot");
        else if (i === 1) cls.push("place-2");
        else if (i === 2) cls.push("place-3");
        if (spectate && s.uid === spectate.uid) cls.push("watch");
        const delay = nameFlashDelay(s);
        if (delay) cls.push("ate");
        const on = cls.length ? ' class="' + cls.join(" ") + '"' : "";
        const flash = delay
          ? ' data-flash="' + s.flashUntil + '" style="--flash-delay:' + delay + 'ms"'
          : "";
        return (
          '<li data-id="' +
          s.uid +
          '"' +
          on +
          flash +
          "><span style=\"color:" +
          s.c1 +
          "\">" +
          liveMenuRow(s, i) +
          "</span><span>" +
          commas(scoreOf(s)) +
          "</span></li>"
        );
      })
      .join("");
  }

  function rememberScore(name, score, kills) {
    scores.push({ name: name || "You", score: score, kills: kills || 0 });
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 8);
    localStorage.setItem("sd-scores", JSON.stringify(scores));
    if (score > best) {
      best = score;
      localStorage.setItem("sd-best", String(best));
    }
    renderBest();
    renderScores();
  }

  function currentMap() {
    const fill = FILLS[fillIndex];
    const outline = OUTLINES[outlineIndex];
    return {
      bg: fill.bg,
      arena: fill.arena,
      caustic: fill.caustic,
      edge: outline.edge,
      rim1: outline.rim1,
      rim2: outline.rim2,
    };
  }

  function renderMapMaker() {
    const tradOutline = OUTLINES.findIndex((o) => o.name === "Traditional");
    const tradFill = FILLS.findIndex((f) => f.name === "Traditional");
    mapTraditionalBtn.classList.toggle("on", outlineIndex === tradOutline && fillIndex === tradFill);
    const opacityPct = Math.round(mapOpacity * 100);
    mapOpacityEl.value = String(opacityPct);
    mapOpacityValueEl.textContent = opacityPct + "%";
    mapTypesEl.innerHTML = "";
    MAP_TYPES.forEach((type) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "map-shape" + (type.id === mapType ? " on" : "");
      btn.title = type.name;
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", type.id === mapType ? "true" : "false");
      btn.setAttribute("aria-label", type.name);
      btn.innerHTML = type.svg;
      btn.addEventListener("click", () => {
        mapType = type.id;
        localStorage.setItem("sd-map-type", mapType);
        renderMapMaker();
      });
      mapTypesEl.appendChild(btn);
    });

    mapOutlinesEl.innerHTML = "";
    OUTLINES.forEach((outline, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "skin ring" + (i === outlineIndex ? " on" : "");
      btn.style.borderColor = outline.rim1;
      btn.style.boxShadow =
        (i === outlineIndex ? "0 0 0 2px #fff8e8, " : "") + "inset 0 0 0 3px " + outline.rim2;
      btn.title = outline.name;
      btn.setAttribute("aria-label", outline.name + " outline");
      btn.addEventListener("click", () => {
        outlineIndex = i;
        localStorage.setItem("sd-outline", String(i));
        renderMapMaker();
      });
      mapOutlinesEl.appendChild(btn);
    });

    mapFillsEl.innerHTML = "";
    FILLS.forEach((fill, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "skin" + (i === fillIndex ? " on" : "");
      btn.style.background =
        "linear-gradient(160deg, " + fill.bg[0] + " 0%, " + fill.arena + " 55%, " + fill.bg[2] + " 100%)";
      btn.title = fill.name;
      btn.setAttribute("aria-label", fill.name + " filling");
      btn.addEventListener("click", () => {
        fillIndex = i;
        localStorage.setItem("sd-fill", String(i));
        renderMapMaker();
      });
      mapFillsEl.appendChild(btn);
    });
  }

  growRateEl.addEventListener("input", () => {
    growRate = clamp(Number(growRateEl.value) / 100, 0.2, 3);
    growRateValueEl.textContent = growRate.toFixed(1) + "x";
    localStorage.setItem("sd-grow", String(growRate));
  });

  mapOpacityEl.addEventListener("input", () => {
    mapOpacity = clamp(Number(mapOpacityEl.value) / 100, 0.1, 1);
    mapOpacityValueEl.textContent = Math.round(mapOpacity * 100) + "%";
    localStorage.setItem("sd-opacity", String(mapOpacity));
  });

  mapTraditionalBtn.addEventListener("click", () => {
    outlineIndex = OUTLINES.findIndex((o) => o.name === "Traditional");
    fillIndex = FILLS.findIndex((f) => f.name === "Traditional");
    localStorage.setItem("sd-outline", String(outlineIndex));
    localStorage.setItem("sd-fill", String(fillIndex));
    renderMapMaker();
  });

  function renderSkins() {
    skinsEl.innerHTML = "";
    SKINS.forEach((skin, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "skin" + (i === skinIndex ? " on" : "");
      btn.style.background = skin.color;
      btn.title = skin.name;
      btn.setAttribute("aria-label", skin.name);
      btn.addEventListener("click", () => {
        skinIndex = i;
        localStorage.setItem("sd-skin", String(i));
        renderSkins();
      });
      skinsEl.appendChild(btn);
    });
  }

  function seedReefs() {
    reefs.length = 0;
    for (let i = 0; i < 90; i++) {
      const p = randomInDisk(280);
      reefs.push({
        x: p.x,
        y: p.y,
        r: rand(28, 90),
        a: Math.random() * Math.PI * 2,
      });
    }
  }

  function seedBubbles() {
    bubbles.length = 0;
    for (let i = 0; i < 150; i++) {
      bubbles.push({
        x: rand(-WORLD_R, WORLD_R),
        y: rand(-WORLD_R, WORLD_R),
        r: rand(1.2, 4.5),
        s: rand(12, 38),
        phase: Math.random() * 10,
      });
    }
  }

  function rand(a, b) {
    return a + Math.random() * (b - a);
  }

  function pick(arr) {
    return arr[(Math.random() * arr.length) | 0];
  }

  function wrap(a) {
    while (a > Math.PI) a -= Math.PI * 2;
    while (a < -Math.PI) a += Math.PI * 2;
    return a;
  }

  function dist2(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
  }

  function clamp(v, a, b) {
    return v < a ? a : v > b ? b : v;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function hexA(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
  }

  function mixHex(hex, target, t) {
    const n = parseInt(hex.slice(1), 16);
    const m = parseInt(target.slice(1), 16);
    const ch = (shift) => {
      const a = (n >> shift) & 255;
      const b = (m >> shift) & 255;
      return clamp(Math.round(a + (b - a) * t), 0, 255);
    };
    const r = ch(16);
    const g = ch(8);
    const b = ch(0);
    return "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  const candyTones = new Map();

  function tonesOf(color) {
    let tone = candyTones.get(color);
    if (tone) return tone;
    tone = {
      hi: mixHex(color, "#fff6dc", 0.76),
      mid: mixHex(color, "#ffffff", 0.16),
      lo: mixHex(color, "#2a120c", 0.36),
    };
    candyTones.set(color, tone);
    return tone;
  }

  function inDisk(x, y, pad) {
    const r = WORLD_R - (pad || 0);
    return x * x + y * y < r * r;
  }

  function randomInDisk(pad) {
    const r = (WORLD_R - pad) * Math.sqrt(Math.random());
    const a = Math.random() * Math.PI * 2;
    return { x: Math.cos(a) * r, y: Math.sin(a) * r };
  }

  function snakeRadius(s) {
    const n = s && s.points ? s.points.length : SNAKE_DOTS;
    const extra = Math.max(0, n - SNAKE_DOTS);
    return 9.6 + Math.sqrt(extra) * 0.42;
  }

  function bodyRadiusAt(s, _i) {
    return snakeRadius(s);
  }

  function growGain(s, value) {
    const len = Math.max(0, s.mass * 10);
    const start = value * FOOD_GROW * 1.34 * 0.7;
    const floor = (value * (2 / 3)) / 10;
    const fade = 1 / (1 + len / 800);
    return (floor + Math.max(0, start - floor) * fade) * 0.7 * growRate;
  }

  function sizeRush(s) {
    if (!s || !s.player) return 1;
    const extra = Math.max(0, (s.points ? s.points.length : SNAKE_DOTS) - SNAKE_DOTS);
    return 1 + Math.sqrt(extra) / 26;
  }

  function scoreOf(s) {
    return Math.floor(s.mass * 10);
  }

  const NAME_FLASH_MS = 120;

  function noteScoreUp(s, before) {
    const gained = scoreOf(s) - before;
    if (gained <= 0) return;
    s.flashQueue = (s.flashQueue || 0) + gained;
    startNextFlash(s);
  }

  function startNextFlash(s) {
    const now = performance.now();
    if (s.flashUntil && now < s.flashUntil) return;
    if (!s.flashQueue) {
      if (s.flashUntil) s.flashUntil = 0;
      return;
    }
    const base = s.flashUntil || now;
    s.flashQueue--;
    s.flashUntil = base + NAME_FLASH_MS;
    while (s.flashQueue && s.flashUntil <= now) {
      s.flashQueue--;
      s.flashUntil += NAME_FLASH_MS;
    }
  }

  function nameFlashDelay(s) {
    startNextFlash(s);
    if (!s.flashUntil) return "";
    const left = s.flashUntil - performance.now();
    if (left <= 0) return "";
    return String(-(NAME_FLASH_MS - left));
  }

  function applyLengthFlash(li, s) {
    const delay = nameFlashDelay(s);
    const stamp = delay ? String(s.flashUntil) : "";
    if (li.dataset.flash === stamp) return;
    li.dataset.flash = stamp;
    if (li.classList.contains("ate")) li.classList.remove("ate");
    if (!delay) return;
    li.style.setProperty("--flash-delay", delay + "ms");
    void li.offsetWidth;
    li.classList.add("ate");
  }

  class SpatialHash {
    constructor(cell) {
      this.cell = cell;
      this.map = new Map();
    }

    clear() {
      this.map.clear();
    }

    key(ix, iy) {
      return ix * 100003 + iy;
    }

    insert(x, y, item) {
      const k = this.key(Math.floor(x / this.cell), Math.floor(y / this.cell));
      let bin = this.map.get(k);
      if (!bin) {
        bin = [];
        this.map.set(k, bin);
      }
      bin.push(item);
    }

    query(x, y, r, out) {
      out.length = 0;
      const c = this.cell;
      const minX = Math.floor((x - r) / c);
      const maxX = Math.floor((x + r) / c);
      const minY = Math.floor((y - r) / c);
      const maxY = Math.floor((y + r) / c);
      for (let ix = minX; ix <= maxX; ix++) {
        for (let iy = minY; iy <= maxY; iy++) {
          const bin = this.map.get(this.key(ix, iy));
          if (bin) for (let i = 0; i < bin.length; i++) out.push(bin[i]);
        }
      }
      return out;
    }
  }

  const foodHash = new SpatialHash(80);
  const bodyHash = new SpatialHash(36);
  const nearby = [];
  const hitQ = [];
  const NECK_SKIP = 2;

  function makeFood(x, y, value, color, scatter) {
    const f = {
      id: foodId++,
      x,
      y,
      vx: 0,
      vy: 0,
      value: value || 1,
      r: 3.8 + (value || 1) * 1.25,
      color: color || pick(PELLET),
      phase: Math.random() * Math.PI * 2,
      star: value >= 6,
      runner: false,
    };
    if (scatter) {
      const a = Math.random() * Math.PI * 2;
      const sp = rand(50, 210);
      f.vx = Math.cos(a) * sp;
      f.vy = Math.sin(a) * sp;
    }
    return f;
  }

  function makeRunner() {
    const p = randomInDisk(220);
    const f = makeFood(p.x, p.y, RUNNER_VALUE, "#ffe56b");
    f.runner = true;
    f.r = 10;
    f.star = true;
    return f;
  }

  function scatterRunners(n) {
    for (let i = 0; i < n; i++) food.push(makeRunner());
  }

  function scatterFood(n) {
    for (let i = 0; i < n; i++) {
      const p = randomInDisk(50);
      const star = Math.random() < 0.035;
      food.push(makeFood(p.x, p.y, star ? rand(6, 12) : Math.random() < 0.14 ? 2.4 : 1));
    }
  }

  function dumpSnake(s) {
    const pts = s.points;
    const origin = pts[0] || { x: s.x, y: s.y };
    const gap = 9;
    let lastX = Infinity;
    let lastY = Infinity;
    let drops = 0;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      if (dist2(p.x, p.y, lastX, lastY) < gap * gap) continue;
      food.push(makeFood(p.x, p.y, 1.8, s.c1, true));
      lastX = p.x;
      lastY = p.y;
      drops++;
    }
    const want = Math.max(10, Math.min(36, Math.floor(s.mass * 0.85)));
    for (let i = drops; i < want; i++) {
      food.push(makeFood(origin.x, origin.y, 1.8, s.c1, true));
    }
  }

  function burst(x, y, color, n, speed) {
    if (particles.length > 320) return;
    const room = 320 - particles.length;
    if (n > room) n = room;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = rand(30, speed);
      particles.push({
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        life: rand(0.22, 0.7),
        max: 0.7,
        r: rand(2.2, 6),
        color,
      });
    }
  }

  function makeSnake(opts) {
    const p = opts.pos || randomInDisk(900);
    const skin = opts.skin || pick(SKINS);
    const color = skin.color || skin[0] || skin;
    const angle = Math.random() * Math.PI * 2;
    const mass = opts.mass || rand(16, 38);
    const dots = opts.dots || SNAKE_DOTS;
    const points = [];
    const trail = [];
    let walked = 0;
    for (let i = dots - 1; i >= 0; i--) {
      const x = p.x - Math.cos(angle) * i * SPACING;
      const y = p.y - Math.sin(angle) * i * SPACING;
      points[i] = { x, y };
      if (trail.length) {
        const prev = trail[trail.length - 1];
        walked += Math.hypot(x - prev.x, y - prev.y);
      }
      trail.push({ x, y, d: walked });
    }
    const roll = Math.random();
    return {
      x: p.x,
      y: p.y,
      prevX: p.x,
      prevY: p.y,
      angle,
      desired: angle,
      mass,
      baseMass: mass,
      startDots: dots,
      points,
      trail,
      c1: color,
      c2: color,
      name: opts.name || "Snake",
      uid: snakeUid++,
      player: !!opts.player,
      alive: true,
      boosting: false,
      thrust: 0,
      glow: 0,
      killed: 0,
      think: rand(0, 0.4),
      target: null,
      panic: 0,
      boostDrop: 0,
      hunt: 0,
      killCool: 0,
      coilT: 0,
      straight: 0,
      lastAng: angle,
      vibe: roll < 0.18 ? "hunter" : roll < 0.72 ? "greedy" : "shy",
      prey: null,
      killedBy: null,
      cause: "",
    };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cssW = window.innerWidth;
    cssH = window.innerHeight;
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = cssW + "px";
    canvas.style.height = cssH + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function worldFromScreen(sx, sy) {
    return {
      x: cam.x + (sx - cssW / 2) / cam.z,
      y: cam.y + (sy - cssH / 2) / cam.z,
    };
  }

  function resetWorld(attract) {
    food.length = 0;
    snakes.length = 0;
    particles.length = 0;
    feedEl.innerHTML = "";
    spectate = null;
    shake = 0;
    flash = 0;
    shownScore = 0;
    eatChain = 0;
    tape.length = 0;
    pendingKillcam = false;
    pendingKillcamLabel = "";
    tvHold = 0;
    tvEval = 0;
    tvSnap = false;
    tvAuto = true;
    tvHeat.clear();
    tvDeaths.length = 0;
    tvHighlightT = 0;
    tvHighlightIn = 7.5;
    boardEl.innerHTML = "";
    boardOrder = [];
    boardWait = new Map();
    if (replay) {
      replay = null;
      killcamEl.classList.add("hidden");
      document.body.classList.remove("killcam");
    }
    menuIds = "";
    scatterFood(FOOD_TARGET);
    scatterRunners(RUNNER_COUNT);
    seedHazards();
    for (let i = 0; i < BOT_COUNT; i++) snakes.push(spawnBot(i < 5));
    player = null;
    if (!attract) {
      player = makeSnake({
        pos: clearPos(1600, 70),
        mass: 12.5,
        dots: 9,
        name: (nameInput.value.trim() || "You").slice(0, 16),
        player: true,
        skin: SKINS[skinIndex],
      });
      snakes.push(player);
      cam.x = player.x;
      cam.y = player.y;
      cam.z = 1.08;
      cam.tz = 1.08;
      shownScore = scoreOf(player);
    } else {
      const focus = snakes[0];
      cam.x = focus.x;
      cam.y = focus.y;
      cam.z = 0.42;
      cam.tz = 0.42;
    }
    rebuildFoodHash();
    rebuildBodyHash();
    if (attract) renderLiveMenu();
  }

  function spawnBot(apex) {
    const used = new Set(snakes.map((s) => s.name));
    let name = pick(BOT_NAMES);
    let n = 2;
    while (used.has(name)) name = pick(BOT_NAMES) + n++;
    return makeSnake({
      name,
      mass: apex ? rand(24, 38) : rand(16, 26),
      pos: clearPos(apex ? 1100 : 500, 80),
    });
  }

  function occupied(x, y, pad) {
    for (let i = 0; i < snakes.length; i++) {
      const s = snakes[i];
      if (!s.alive) continue;
      const hit = snakeRadius(s) + pad;
      const hit2 = hit * hit;
      if (dist2(x, y, s.x, s.y) < hit2) return true;
      const pts = s.points;
      const step = Math.max(1, (pts.length / 14) | 0);
      for (let j = 0; j < pts.length; j += step) {
        if (dist2(x, y, pts[j].x, pts[j].y) < hit2) return true;
      }
    }
    return false;
  }

  function clearPos(pad, avoid) {
    for (let i = 0; i < 48; i++) {
      const p = randomInDisk(pad);
      if (!occupied(p.x, p.y, avoid)) return p;
    }
    return randomInDisk(pad);
  }

  function makeHazard() {
    const p = randomInDisk(620);
    const a = Math.random() * Math.PI * 2;
    return {
      kind: "saw",
      x: p.x,
      y: p.y,
      vx: Math.cos(a) * rand(55, 105),
      vy: Math.sin(a) * rand(55, 105),
      spin: Math.random() * Math.PI * 2,
      spinSpd: 10,
      wobble: Math.random() * 10,
      charge: 0,
      cool: rand(0.8, 2.4),
      r: rand(18, 23),
      hunt: 0,
      give: rand(0, 1.8),
    };
  }

  function seedHazards() {
    hazards.length = 0;
    for (let i = 0; i < HAZARD_COUNT; i++) {
      const h = makeHazard();
      for (let n = 0; n < 48; n++) {
        const p = randomInDisk(620);
        let ok = true;
        for (let j = 0; j < hazards.length; j++) {
          const o = hazards[j];
          const gap = h.r + o.r + 90;
          if (dist2(p.x, p.y, o.x, o.y) < gap * gap) {
            ok = false;
            break;
          }
        }
        if (ok) {
          h.x = p.x;
          h.y = p.y;
          break;
        }
      }
      hazards.push(h);
    }
  }

  function hazardPrey(h) {
    let best = null;
    let bestD = HAZARD_CHASE_R * HAZARD_CHASE_R;
    for (let i = 0; i < snakes.length; i++) {
      const s = snakes[i];
      if (!s.alive) continue;
      const rush = sizeRush(s);
      const reach = HAZARD_CHASE_R * rush;
      const d2 = dist2(h.x, h.y, s.x, s.y);
      if (d2 < reach * reach && d2 / rush < bestD) {
        bestD = d2 / rush;
        best = s;
      }
    }
    return best;
  }

  function steerHazard(h, tx, ty, accel, maxSpd, dt) {
    const dx = tx - h.x;
    const dy = ty - h.y;
    const d = Math.hypot(dx, dy) || 1;
    h.vx += (dx / d) * accel * dt;
    h.vy += (dy / d) * accel * dt;
    const sp = Math.hypot(h.vx, h.vy) || 1;
    if (sp > maxSpd) {
      h.vx = (h.vx / sp) * maxSpd;
      h.vy = (h.vy / sp) * maxSpd;
    }
  }

  function burstAt(h, tx, ty, speed) {
    const dx = tx - h.x;
    const dy = ty - h.y;
    const d = Math.hypot(dx, dy) || 1;
    h.vx = (dx / d) * speed;
    h.vy = (dy / d) * speed;
  }

  function turnDash(h, tx, ty, speed, dt) {
    const heading = Math.atan2(h.vy, h.vx);
    const delta = wrap(Math.atan2(ty - h.y, tx - h.x) - heading);
    const step = clamp(delta, -0.95 * dt, 0.95 * dt);
    const ang = heading + step;
    h.vx = Math.cos(ang) * speed;
    h.vy = Math.sin(ang) * speed;
  }

  function steerToward(s, tx, ty, dt) {
    s.desired = Math.atan2(ty - s.y, tx - s.x);
    const delta = wrap(s.desired - s.angle);
    const extra = Math.max(0, (s.points ? s.points.length : SNAKE_DOTS) - SNAKE_DOTS);
    const t = extra / 420;
    const size = 1 / (1 + t * t * 2.6);
    const max = TURN * dt * (1 - 0.18 * (s.thrust || 0)) * clamp(size, 0.16, 1);
    s.angle += clamp(delta, -max, max);
  }

  function wrapSnake(s) {
    const r = Math.hypot(s.x, s.y);
    if (r <= WORLD_R) return;
    const dest = WORLD_R - 8;
    const tx = -(s.x / r) * dest;
    const ty = -(s.y / r) * dest;
    const dx = tx - s.x;
    const dy = ty - s.y;
    s.x = tx;
    s.y = ty;
    s.prevX += dx;
    s.prevY += dy;
    const pts = s.points;
    for (let i = 0; i < pts.length; i++) {
      pts[i].x += dx;
      pts[i].y += dy;
    }
    const trail = s.trail;
    if (trail) {
      for (let i = 0; i < trail.length; i++) {
        trail[i].x += dx;
        trail[i].y += dy;
      }
    }
    const view = state === "play" ? player : spectate;
    if (s === view) {
      cam.x += dx;
      cam.y += dy;
    }
  }

  function setLength(s) {
    const base = s.baseMass || s.mass;
    const gained = s.mass - base;
    const startDots = s.startDots || SNAKE_DOTS;
    const need = Math.max(s.player ? 4 : 8, startDots + Math.floor(gained * LENGTH_RATE));
    while (s.points.length < need) {
      const last = s.points[s.points.length - 1];
      s.points.push({ x: last.x, y: last.y });
    }
    if (s.points.length > need) s.points.length = need;
    if (s.player) checkLength(s);
  }

  function clearLengths() {
    lengthMark = 0;
    lengthPopEl.classList.add("hidden");
    lengthPopEl.classList.remove("pop");
  }

  function checkLength(s) {
    if (state !== "play" || !s.alive) return;
    const len = scoreOf(s);
    let hit = null;
    while (lengthMark < LENGTHS.length && len >= LENGTHS[lengthMark].n) {
      hit = LENGTHS[lengthMark];
      lengthMark++;
    }
    if (!hit) return;
    lengthPopEl.querySelector("strong").textContent = hit.label;
    lengthPopEl.classList.remove("pop");
    void lengthPopEl.offsetWidth;
    lengthPopEl.classList.remove("hidden");
    lengthPopEl.classList.add("pop");
  }

  function pushTrail(s) {
    let trail = s.trail;
    if (!trail) {
      trail = [];
      s.trail = trail;
    }
    const last = trail[trail.length - 1];
    if (!last) {
      trail.push({ x: s.x, y: s.y, d: 0 });
      return;
    }
    const step = Math.hypot(s.x - last.x, s.y - last.y);
    if (step < 0.2) {
      last.x = s.x;
      last.y = s.y;
      return;
    }
    trail.push({ x: s.x, y: s.y, d: last.d + step });
    const keep = s.points.length * SPACING + SPACING * 8;
    const minD = trail[trail.length - 1].d - keep;
    let cut = 0;
    while (cut < trail.length - 2 && trail[cut + 1].d < minD) cut++;
    if (cut > 0) trail.splice(0, cut);
  }

  function sampleTrail(trail, back) {
    const head = trail[trail.length - 1];
    const target = head.d - back;
    if (target <= trail[0].d) return trail[0];
    let lo = 0;
    let hi = trail.length - 1;
    while (lo < hi - 1) {
      const mid = (lo + hi) >> 1;
      if (trail[mid].d < target) lo = mid;
      else hi = mid;
    }
    const a = trail[lo];
    const b = trail[hi];
    const span = b.d - a.d || 1;
    const t = (target - a.d) / span;
    return {
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t,
      lo,
      hi,
    };
  }

  function placeOnTrail(s) {
    const trail = s.trail;
    const pts = s.points;
    if (!trail || trail.length < 1) return;
    const head = trail[trail.length - 1];
    for (let i = 0; i < pts.length; i++) {
      const back = i * SPACING;
      const p = sampleTrail(trail, back);
      pts[i].x = p.x;
      pts[i].y = p.y;
      pts[i].d = head.d - back;
    }
  }

  function closeLoops(s, dt) {
    const pts = s.points;
    const trail = s.trail;
    if (!trail || trail.length < 2 || pts.length < 14) return;
    const k = 1 - Math.exp(-LOOP_CLOSE * dt);
    if (k <= 0) return;
    const reach = snakeRadius(s) * 2.15;
    const reach2 = reach * reach;
    const step = pts.length > 240 ? 4 : pts.length > 90 ? 3 : 2;
    const cell = reach;
    const grid = new Map();
    for (let i = 0; i < pts.length; i += step) {
      const p = pts[i];
      const key = Math.floor(p.x / cell) + "," + Math.floor(p.y / cell);
      let bin = grid.get(key);
      if (!bin) {
        bin = [];
        grid.set(key, bin);
      }
      bin.push(i);
    }
    let bestI = -1;
    let bestJ = -1;
    let bestD = reach2;
    for (let i = 0; i < pts.length; i += step) {
      const p = pts[i];
      const ix = Math.floor(p.x / cell);
      const iy = Math.floor(p.y / cell);
      for (let ox = -1; ox <= 1; ox++) {
        for (let oy = -1; oy <= 1; oy++) {
          const bin = grid.get(ix + ox + "," + (iy + oy));
          if (!bin) continue;
          for (let n = 0; n < bin.length; n++) {
            const j = bin[n];
            if (j < i + 8) continue;
            const dx = pts[j].x - p.x;
            const dy = pts[j].y - p.y;
            const d = dx * dx + dy * dy;
            if (d < bestD) {
              bestD = d;
              bestI = i;
              bestJ = j;
            }
          }
        }
      }
    }
    if (bestI < 0) return;
    let cx = 0;
    let cy = 0;
    let n = 0;
    for (let i = bestI; i <= bestJ; i++) {
      cx += pts[i].x;
      cy += pts[i].y;
      n++;
    }
    cx /= n;
    cy /= n;
    const headD = trail[trail.length - 1].d;
    const far = headD - bestJ * SPACING;
    const near = headD - bestI * SPACING;
    for (let i = 0; i < trail.length - 1; i++) {
      const p = trail[i];
      if (p.d <= far || p.d >= near) continue;
      p.x += (cx - p.x) * k;
      p.y += (cy - p.y) * k;
    }
    placeOnTrail(s);
  }

  function moveSnake(s, dt) {
    s.prevX = s.x;
    s.prevY = s.y;
    const speed = BASE_SPEED + (BOOST_SPEED - BASE_SPEED) * (s.thrust || 0);
    s.x += Math.cos(s.angle) * speed * dt;
    s.y += Math.sin(s.angle) * speed * dt;
    wrapSnake(s);
    pushTrail(s);
    setLength(s);
    placeOnTrail(s);
    closeLoops(s, dt);
  }

  function pushFeed(text, clip) {
    if (state !== "play" && state !== "tv") return;
    const li = document.createElement("li");
    li.textContent = text;
    if (clip && clip.frames && clip.frames.length >= 2) {
      li.clip = clip;
      li.classList.add("story");
      li.title = "Replay kill";
    }
    feedEl.prepend(li);
    while (feedEl.children.length > 5) feedEl.lastChild.remove();
    setTimeout(() => {
      if (replay && replay.news && replay.label === text) return;
      li.remove();
    }, 7200);
  }

  function makeKillClip(victim, sec) {
    if (tape.length < 2) return null;
    const end = tape[tape.length - 1].t;
    const cutoff = end - (sec || NEWS_TAPE_SEC);
    const frames = [];
    for (let i = 0; i < tape.length; i++) {
      if (tape[i].t >= cutoff || frames.length) frames.push(tape[i]);
    }
    if (frames.length < 2) {
      frames.length = 0;
      frames.push(tape[tape.length - 2], tape[tape.length - 1]);
    }
    const last = captureFrame(victim);
    last.t = time + 0.05;
    frames.push(last);
    return { frames, victim: victim.uid };
  }

  function kill(s, by, cause) {
    if (!s.alive) return;
    s.alive = false;
    s.killedBy = by || null;
    s.cause = cause || (by ? "body" : "edge");
    dumpSnake(s);
    burst(s.x, s.y, s.c1, 36, 260);
    const clip = makeKillClip(s, NEWS_TAPE_SEC);
    if (by) {
      by.killed++;
      const line = by.name + " wrecked " + s.name;
      pushFeed(line, clip);
      bumpTvHeat(by, 120);
      bumpTvHeat(s, 36);
      if (by.player) {
        shake = Math.max(shake, 10);
        flash = 0.12;
        sfx("kill");
      }
      let shown = false;
      if (state === "tv" && !replay) {
        const watching =
          spectate && (spectate.uid === s.uid || spectate.uid === by.uid);
        if (watching && time - tvReplayAt > 6.5) {
          pendingKillcam = true;
          pendingKillcamLabel = line;
          tvReplayAt = time;
          shown = true;
        }
      }
      rememberTvDeath(s, by, line, clip, shown);
    } else if (cause === "hazard") {
      const line = "A saw got " + s.name;
      pushFeed(line, clip);
      rememberTvDeath(s, null, line, clip, false);
    } else if (state === "tv") {
      const line = s.name + " slipped off";
      rememberTvDeath(s, null, line, clip, false);
    }
    if (s.player) {
      shake = 16;
      flash = 0.28;
      sfx("die");
    } else if (!by || !by.player) {
      sfx("pop");
    }
  }

  function dropBoostFood(s, dt) {
    s.boostDrop += dt;
    if (s.boostDrop > 0.85) {
      s.boostDrop = 0;
      const tail = s.points[s.points.length - 1];
      if (!tail) return;
      const n = s.player ? 15 : 3;
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const d = rand(0, 36);
        const pellet = makeFood(tail.x + Math.cos(a) * d, tail.y + Math.sin(a) * d, 0.18, s.c1);
        pellet.owner = s.uid;
        food.push(pellet);
      }
    }
  }

  function dropSawDots(h, dt) {
    h.shed = (h.shed || 0) + dt;
    const sp = Math.hypot(h.vx, h.vy) || 1;
    const bx = -h.vx / sp;
    const by = -h.vy / sp;
    while (h.shed >= 0.045) {
      h.shed -= 0.045;
      for (let n = 0; n < 3; n++) {
        const side = rand(-h.r * 0.7, h.r * 0.7);
        const back = rand(4, h.r * 1.4);
        food.push(
          makeFood(h.x + bx * back - by * side, h.y + by * back + bx * side, 0.4, n === 0 ? "#ffd056" : "#e7eef2")
        );
      }
    }
  }

  function eatNearby(s, dt) {
    const r = snakeRadius(s);
    foodHash.query(s.x, s.y, r + 48, nearby);
    const pull = (250 + 90 * (s.thrust || 0)) * dt;
    for (let i = 0; i < nearby.length; i++) {
      const f = nearby[i];
      if (f._gone || f.owner === s.uid) continue;
      const d2 = dist2(s.x, s.y, f.x, f.y);
      if (f.runner) {
        if (d2 < (r + f.r) * (r + f.r)) {
          f._gone = true;
          const before = scoreOf(s);
          s.mass += growGain(s, f.value);
          noteScoreUp(s, before);
          if (s.player) {
            eatChain = Math.min(12, eatChain + 3);
            eatChainT = 0.5;
            burst(f.x, f.y, f.color, 16, 180);
            sfx("eat", eatChain);
          }
        }
        continue;
      }
      const magnet = r + (f.star ? 52 : 40);
      if (d2 < magnet * magnet) {
        const d = Math.sqrt(d2) || 1;
        f.x += ((s.x - f.x) / d) * pull;
        f.y += ((s.y - f.y) / d) * pull;
      }
      if (d2 < (r + f.r) * (r + f.r)) {
        f._gone = true;
        const before = scoreOf(s);
        s.mass += growGain(s, f.value);
        noteScoreUp(s, before);
        if (s.player) {
          eatChain = Math.min(12, eatChain + 1);
          eatChainT = 0.38;
          burst(f.x, f.y, f.color, f.star ? 10 : 4, f.star ? 160 : 90);
          sfx("eat", eatChain);
        }
      }
    }
    setLength(s);
  }

  function noteCoil(s, dt) {
    const step = Math.hypot(s.x - s.prevX, s.y - s.prevY);
    const turn = Math.abs(wrap(s.angle - (s.lastAng == null ? s.angle : s.lastAng)));
    s.lastAng = s.angle;
    const tight = step > 0.15 && turn / step > 0.012;
    if (tight) s.coilT = (s.coilT || 0) + dt;
    else s.coilT = Math.max(0, (s.coilT || 0) - dt * 2);
  }

  function breakCoil(s) {
    s.prey = null;
    s.hunt = 0;
    s.coilT = 0;
    s.straight = 1.3;
    s.killCool = Math.max(s.killCool || 0, 2);
    const a = s.angle;
    s.target = {
      x: s.x + Math.cos(a) * 1100,
      y: s.y + Math.sin(a) * 1100,
      _wander: true,
    };
  }

  function thinkBot(s, dt) {
    s.think -= dt;
    s.panic = Math.max(0, s.panic - dt);
    s.hunt = Math.max(0, s.hunt - dt);
    s.killCool = Math.max(0, (s.killCool || 0) - dt);
    if (s.straight > 0) {
      s.straight -= dt;
      s.prey = null;
      s.hunt = 0;
      if (s.target) steerToward(s, s.target.x, s.target.y, dt);
      s.boosting = false;
      s.lastAng = s.angle;
      return;
    }

    let hx = 0;
    let hy = 0;
    let hd = 0;
    for (let i = 0; i < hazards.length; i++) {
      const h = hazards[i];
      const d2 = dist2(s.x, s.y, h.x, h.y);
      if (d2 < 200 * 200) {
        const w = 1 / (d2 + 40);
        hx += (s.x - h.x) * w;
        hy += (s.y - h.y) * w;
        hd += w;
      }
    }
    if (hd > 0.0008) {
      s.prey = null;
      steerToward(s, s.x + hx, s.y + hy, dt);
      s.boosting = hd > 0.0022 && s.mass > MIN_MASS + 2;
      s.coilT = Math.max(0, (s.coilT || 0) - dt * 3);
      s.lastAng = s.angle;
      return;
    }

    bodyHash.query(s.x, s.y, 150, nearby);
    let dangerX = 0;
    let dangerY = 0;
    let danger = 0;
    for (let i = 0; i < nearby.length; i++) {
      const b = nearby[i];
      if (b.snake === s) continue;
      const d2 = dist2(s.x, s.y, b.x, b.y);
      if (d2 < 130 * 130) {
        const w = 1 / (d2 + 22);
        dangerX += (s.x - b.x) * w;
        dangerY += (s.y - b.y) * w;
        danger += w;
      }
    }
    if (danger > 0.0012) {
      s.panic = 0.55;
      s.prey = null;
      steerToward(s, s.x + dangerX, s.y + dangerY, dt);
      s.boosting = s.mass > MIN_MASS + 1;
      s.coilT = Math.max(0, (s.coilT || 0) - dt * 3);
      s.lastAng = s.angle;
      return;
    }

    noteCoil(s, dt);
    if (s.coilT >= 5) {
      breakCoil(s);
      if (s.target) steerToward(s, s.target.x, s.target.y, dt);
      s.boosting = false;
      s.lastAng = s.angle;
      return;
    }

    if (s.prey && (!s.prey.alive || s.hunt <= 0)) {
      s.prey = null;
      s.killCool = rand(3.2, 6.5);
    }
    if ((s.think <= 0 || !s.prey) && s.killCool <= 0) {
      s.think = rand(0.12, 0.28);
      let bestHunt = null;
      let bestH = 0;
      const range = s.vibe === "shy" ? 200 : s.vibe === "hunter" ? 380 : 280;
      for (let i = 0; i < snakes.length; i++) {
        const o = snakes[i];
        if (!o.alive || o === s) continue;
        const d2 = dist2(s.x, s.y, o.x, o.y);
        if (d2 > range * range || d2 < 40 * 40) continue;
        if (s.vibe === "shy" && !o.player) continue;
        if (s.mass < o.mass * 0.72 && !o.player) continue;
        const d = Math.sqrt(d2);
        const heading = Math.abs(wrap(Math.atan2(o.y - s.y, o.x - s.x) - s.angle));
        let score = (1 / (d + 40)) * (o.player ? 2.4 : 1);
        if (heading < 0.9) score *= 1.6;
        if (s.vibe === "hunter") score *= 1.35;
        if (score > bestH) {
          bestH = score;
          bestHunt = o;
        }
      }
      if (bestHunt && (s.vibe !== "shy" || bestH > 0.004)) {
        s.prey = bestHunt;
        s.hunt = s.vibe === "hunter" || bestHunt.player ? 0.5 : 0.28;
      }
    }

    if (s.prey && s.prey.alive && s.hunt > 0) {
      const o = s.prey;
      const d = Math.hypot(o.x - s.x, o.y - s.y) || 1;
      const lead = 80 + d * 0.32;
      steerToward(s, o.x + Math.cos(o.angle) * lead, o.y + Math.sin(o.angle) * lead, dt);
      s.boosting = d < 160 && s.mass > MIN_MASS + 3;
      return;
    }

    foodHash.query(s.x, s.y, 340, nearby);
    let bestF = null;
    let bestD = -1;
    for (let i = 0; i < nearby.length; i++) {
      const f = nearby[i];
      if (f._gone || f.owner === s.uid) continue;
      const d2 = dist2(s.x, s.y, f.x, f.y);
      const d = Math.sqrt(d2) + 10;
      if (f.runner && d2 > 260 * 260 && s.vibe !== "hunter") continue;
      let worth = f.value / (d * d);
      if (f.runner) worth *= 4;
      if (worth > bestD) {
        bestD = worth;
        bestF = f;
      }
    }
    if (bestF) {
      s.target = bestF;
      steerToward(s, bestF.x, bestF.y, dt);
      s.boosting = !!(bestF.runner && dist2(s.x, s.y, bestF.x, bestF.y) < 220 * 220 && s.mass > MIN_MASS + 2);
      return;
    }

    if (!s.target || s.target._gone || s.think <= 0.02) {
      const a = s.angle + rand(-0.35, 0.35);
      const span = rand(520, 980);
      s.target = {
        x: s.x + Math.cos(a) * span,
        y: s.y + Math.sin(a) * span,
        _wander: true,
      };
    }
    steerToward(s, s.target.x, s.target.y, dt);
    s.boosting = s.panic > 0 && s.mass > MIN_MASS + 1;
  }

  function rebuildFoodHash() {
    foodHash.clear();
    for (let i = 0; i < food.length; i++) {
      const f = food[i];
      foodHash.insert(f.x, f.y, f);
    }
  }

  function rebuildBodyHash() {
    bodyHash.clear();
    for (let s = 0; s < snakes.length; s++) {
      const sn = snakes[s];
      if (!sn.alive) continue;
      const pts = sn.points;
      const rad = bodyRadiusAt(sn, 0);
      const step = rad > 14 ? 2 : 1;
      for (let i = NECK_SKIP; i < pts.length; i += step) {
        const p = pts[i];
        p.snake = sn;
        p.r = rad;
        bodyHash.insert(p.x, p.y, p);
      }
    }
  }

  function headHitsBody(x, y, ra, self) {
    bodyHash.query(x, y, ra + 90, hitQ);
    for (let k = 0; k < hitQ.length; k++) {
      const b = hitQ[k];
      if (b.snake === self || !b.snake.alive) continue;
      const hitR = ra + b.r;
      if (dist2(x, y, b.x, b.y) < hitR * hitR) return b.snake;
    }
    return null;
  }

  function collideHeads() {
    for (let i = 0; i < snakes.length; i++) {
      const a = snakes[i];
      if (!a.alive) continue;
      const ra = snakeRadius(a) * 0.92;
      const dx = a.x - a.prevX;
      const dy = a.y - a.prevY;
      const moved = Math.hypot(dx, dy);
      const samples = Math.max(1, Math.ceil(moved / 4));
      let killer = null;
      for (let s = 0; s <= samples; s++) {
        const t = s / samples;
        killer = headHitsBody(a.prevX + dx * t, a.prevY + dy * t, ra, a);
        if (killer) break;
      }
      if (killer) kill(a, killer, "body");
    }
  }

  function maintainFood(dt) {
    let w = 0;
    let runners = 0;
    for (let i = 0; i < food.length; i++) {
      if (food[i]._gone) continue;
      food[w++] = food[i];
      if (food[i].runner) runners++;
    }
    food.length = w;
    if (runners < RUNNER_COUNT) {
      scatterRunners(RUNNER_COUNT - runners);
      runners = RUNNER_COUNT;
    }
    const pellets = food.length - runners;
    const live = state === "play" || state === "tv" || state === "attract";
    const goal = live ? FOOD_MID : FOOD_TARGET;
    if (pellets < goal) {
      if (!live) scatterFood(goal - pellets);
      else {
        foodWave += dt || 0;
        if (foodWave >= 0.4) {
          foodWave = 0;
          scatterFood(Math.min(160, goal - pellets));
        }
      }
    }
    if (pellets > goal + 900) {
      let drop = pellets - (goal + 900);
      let kept = 0;
      for (let i = 0; i < food.length; i++) {
        const f = food[i];
        if (!f.runner && drop > 0) {
          drop--;
          continue;
        }
        food[kept++] = f;
      }
      food.length = kept;
    }
  }

  function boostHeld() {
    return (
      mouse.down ||
      keys.has(" ") ||
      keys.has("space") ||
      keys.has("shift") ||
      keys.has("shiftleft") ||
      keys.has("shiftright")
    );
  }

  function updatePlayer(dt) {
    if (!player || !player.alive) return;
    const w = worldFromScreen(mouse.x, mouse.y);
    steerToward(player, w.x, w.y, dt);
    player.boosting = boostHeld() && scoreOf(player) > BOOST_MIN_LENGTH;
  }

  function updateFood(dt) {
    for (let i = 0; i < food.length; i++) {
      const f = food[i];
      if (f.runner) {
        updateRunner(f, dt);
        continue;
      }
      if (f.vx || f.vy) {
        f.x += f.vx * dt;
        f.y += f.vy * dt;
        f.vx *= Math.pow(0.08, dt);
        f.vy *= Math.pow(0.08, dt);
        if (f.vx * f.vx + f.vy * f.vy < 8) {
          f.vx = 0;
          f.vy = 0;
        }
      }
      const w = time * 2.8 + f.phase;
      f.x += Math.cos(w) * 34 * dt;
      f.y += Math.sin(time * 3.7 + f.phase * 1.7) * 34 * dt;
      if (f.x * f.x + f.y * f.y > (WORLD_R - 80) * (WORLD_R - 80)) clampInWorld(f, 40);
    }
  }

  function updateRunner(f, dt) {
    let ax = Math.cos(time * 1.15 + f.phase) * 48;
    let ay = Math.sin(time * 0.95 + f.phase) * 48;
    let pace = 0.42;
    for (let i = 0; i < snakes.length; i++) {
      const s = snakes[i];
      if (!s.alive) continue;
      const d2 = dist2(f.x, f.y, s.x, s.y);
      if (d2 < 340 * 340) {
        const d = Math.sqrt(d2) || 1;
        const panic = 340 / d;
        const rush = 0.42 + 1.2 * (s.thrust || 0);
        if (rush > pace) pace = rush;
        ax += ((f.x - s.x) / d) * 420 * panic * rush;
        ay += ((f.y - s.y) / d) * 420 * panic * rush;
      }
    }
    f.vx = lerp(f.vx, ax, 1 - Math.pow(0.08, dt));
    f.vy = lerp(f.vy, ay, 1 - Math.pow(0.08, dt));
    const sp = Math.hypot(f.vx, f.vy);
    const max = 250 * pace;
    if (sp > max) {
      f.vx = (f.vx / sp) * max;
      f.vy = (f.vy / sp) * max;
    }
    f.x += f.vx * dt;
    f.y += f.vy * dt;
    clampInWorld(f, 60);
  }

  function clampInWorld(p, pad) {
    const rr = Math.hypot(p.x, p.y);
    const max = WORLD_R - pad;
    if (rr > max) {
      p.x *= max / rr;
      p.y *= max / rr;
      p.vx = 0;
      p.vy = 0;
    }
  }

  function giveUp(h, prey) {
    h.give = rand(2.8, 4.2);
    h.hunt = 0;
    h.charge = 0;
    h.cool = rand(1.4, 2.4);
    if (prey) {
      const dx = h.x - prey.x;
      const dy = h.y - prey.y;
      const d = Math.hypot(dx, dy) || 1;
      h.vx = (dx / d) * 190;
      h.vy = (dy / d) * 190;
    }
  }

  function separateHazards() {
    for (let i = 0; i < hazards.length; i++) {
      const a = hazards[i];
      for (let j = i + 1; j < hazards.length; j++) {
        const b = hazards[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.hypot(dx, dy) || 0.001;
        const minD = a.r + b.r + 14;
        if (d >= minD) continue;
        const nx = dx / d;
        const ny = dy / d;
        const push = (minD - d) * 0.5;
        a.x += nx * push;
        a.y += ny * push;
        b.x -= nx * push;
        b.y -= ny * push;
        const vn = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
        if (vn < 0) {
          a.vx -= vn * nx;
          a.vy -= vn * ny;
          b.vx += vn * nx;
          b.vy += vn * ny;
        }
      }
    }
  }

  function avoidSaws(h, dt) {
    let ax = 0;
    let ay = 0;
    for (let i = 0; i < hazards.length; i++) {
      const o = hazards[i];
      if (o === h) continue;
      const dx = h.x - o.x;
      const dy = h.y - o.y;
      const d2 = dx * dx + dy * dy;
      const sep = h.r + o.r + 70;
      if (d2 >= sep * sep) continue;
      const d = Math.sqrt(d2) || 1;
      const w = (sep - d) / sep;
      ax += (dx / d) * w;
      ay += (dy / d) * w;
    }
    h.vx += ax * 520 * dt;
    h.vy += ay * 520 * dt;
  }

  function updateHazards(dt) {
    for (let i = 0; i < hazards.length; i++) {
      const h = hazards[i];
      h.cool = Math.max(0, h.cool - dt);
      h.give = Math.max(0, h.give - dt);
      const charging = h.charge > 0;
      h.charge = Math.max(0, h.charge - dt);
      let prey = h.give > 0 ? null : hazardPrey(h);

      if (charging && h.charge <= 0) {
        giveUp(h, prey);
        prey = null;
      } else if (prey) {
        h.hunt += dt;
        if (!charging && h.hunt > 2.8) {
          giveUp(h, prey);
          prey = null;
        }
      } else {
        h.hunt = 0;
      }

      const rush = sizeRush(prey);
      const px = prey ? prey.x + Math.cos(prey.angle) * 40 : h.x + h.vx;
      const py = prey ? prey.y + Math.sin(prey.angle) * 40 : h.y + h.vy;
      const d = prey ? Math.hypot(px - h.x, py - h.y) : 9999;

      h.spin += h.spinSpd * dt;
      if (h.charge > 0) {
        if (prey) turnDash(h, prey.x, prey.y, 325 * rush, dt);
      } else if (prey) {
        const ang = Math.atan2(h.y - prey.y, h.x - prey.x) + Math.PI * 0.5;
        const orbit = 300;
        const ox = prey.x + Math.cos(ang) * orbit;
        const oy = prey.y + Math.sin(ang) * orbit;
        const reach = 340 * rush;
        if (d > reach) steerHazard(h, ox, oy, 320 * rush, 185 * rush, dt);
        else if (h.cool <= 0) {
          burstAt(h, prey.x, prey.y, 325 * rush);
          h.charge = 0.8;
          h.cool = 2.2 / rush;
        } else {
          steerHazard(h, ox, oy, 260 * rush, 165 * rush, dt);
        }
      } else {
        const sp = Math.hypot(h.vx, h.vy) || 1;
        if (sp > 90) {
          const k = Math.pow(0.22, dt);
          h.vx *= k;
          h.vy *= k;
        }
      }

      if (h.charge <= 0) avoidSaws(h, dt);
      h.x += h.vx * dt;
      h.y += h.vy * dt;
      if (h.charge > 0) dropSawDots(h, dt);
      const rr = Math.hypot(h.x, h.y);
      if (rr > WORLD_R - 80) {
        h.x *= (WORLD_R - 90) / rr;
        h.y *= (WORLD_R - 90) / rr;
        h.vx *= -1;
        h.vy *= -1;
        h.charge = 0;
      }
    }
    separateHazards();
  }

  function collideHazards() {
    for (let i = 0; i < snakes.length; i++) {
      const a = snakes[i];
      if (!a.alive) continue;
      const ra = snakeRadius(a) * 0.9;
      const dx = a.x - a.prevX;
      const dy = a.y - a.prevY;
      const moved = Math.hypot(dx, dy);
      const samples = Math.max(1, Math.ceil(moved / 5));
      for (let s = 0; s <= samples; s++) {
        const t = s / samples;
        const x = a.prevX + dx * t;
        const y = a.prevY + dy * t;
        for (let k = 0; k < hazards.length; k++) {
          const h = hazards[k];
          const hit = ra + h.r * 0.7;
          if (dist2(x, y, h.x, h.y) < hit * hit) {
            kill(a, null, "hazard");
            s = samples + 1;
            break;
          }
        }
      }
    }
  }

  function updateBubbles(dt) {
    for (let i = 0; i < bubbles.length; i++) {
      const b = bubbles[i];
      b.y -= b.s * dt;
      b.x += Math.sin(time * 1.4 + b.phase) * 10 * dt;
      if (b.y < -WORLD_R || !inDisk(b.x, b.y, 20)) {
        const p = randomInDisk(80);
        b.x = p.x;
        b.y = p.y;
      }
    }
  }

  function cloneSnake(s) {
    const pts = s.points;
    const points = new Array(pts.length);
    for (let i = 0; i < pts.length; i++) {
      points[i] = { x: pts[i].x, y: pts[i].y };
    }
    return {
      x: s.x,
      y: s.y,
      angle: s.angle,
      desired: s.desired,
      mass: s.mass,
      c1: s.c1,
      c2: s.c2,
      name: s.name,
      uid: s.uid,
      player: s.player,
      alive: s.alive,
      boosting: s.boosting,
      thrust: s.thrust || 0,
      glow: s.glow || 0,
      killed: s.killed,
      points,
    };
  }

  function cloneFood(f) {
    return {
      id: f.id,
      x: f.x,
      y: f.y,
      vx: f.vx,
      vy: f.vy,
      r: f.r,
      color: f.color,
      phase: f.phase,
      star: f.star,
      runner: f.runner,
      value: f.value,
      owner: f.owner,
    };
  }

  function cloneHazard(h) {
    return {
      kind: h.kind,
      x: h.x,
      y: h.y,
      vx: h.vx,
      vy: h.vy,
      r: h.r,
      spin: h.spin,
      spinSpd: h.spinSpd,
      wobble: h.wobble,
      charge: h.charge,
      cool: h.cool,
    };
  }

  function cloneParticle(p) {
    return {
      x: p.x,
      y: p.y,
      vx: p.vx,
      vy: p.vy,
      life: p.life,
      max: p.max,
      r: p.r,
      color: p.color,
    };
  }

  function cloneFoodNear(cx, cy, rad) {
    const r2 = rad * rad;
    const out = [];
    for (let i = 0; i < food.length; i++) {
      const f = food[i];
      if (dist2(f.x, f.y, cx, cy) < r2) out.push(cloneFood(f));
    }
    return out;
  }

  function captureFrame(around) {
    const viewR = Math.hypot(cssW, cssH) / (2 * cam.z) + 220;
    const cx = around ? around.x : cam.x;
    const cy = around ? around.y : cam.y;
    const focus = around
      ? around.uid
      : state === "play" && player
        ? player.uid
        : spectate
          ? spectate.uid
          : 0;
    return {
      t: time,
      cam: around
        ? { x: around.x, y: around.y, z: cam.z, tz: cam.tz }
        : { x: cam.x, y: cam.y, z: cam.z, tz: cam.tz },
      focus,
      snakes: snakes.map(cloneSnake),
      food: cloneFoodNear(cx, cy, viewR),
      hazards: hazards.map(cloneHazard),
      particles: particles.map(cloneParticle),
      shake,
      flash,
    };
  }

  function pushTape() {
    tape.push(captureFrame());
    const cutoff = time - TAPE_SEC;
    while (tape.length > 2 && tape[0].t < cutoff) tape.shift();
  }

  function lerpAngle(a, b, t) {
    return a + wrap(b - a) * t;
  }

  function lerpPoints(a, b, t) {
    const n = Math.max(a.length, b.length);
    const out = new Array(n);
    for (let i = 0; i < n; i++) {
      const pa = a[Math.min(i, a.length - 1)];
      const pb = b[Math.min(i, b.length - 1)];
      out[i] = { x: lerp(pa.x, pb.x, t), y: lerp(pa.y, pb.y, t) };
    }
    return out;
  }

  function lerpSnake(a, b, t) {
    return {
      x: lerp(a.x, b.x, t),
      y: lerp(a.y, b.y, t),
      angle: lerpAngle(a.angle, b.angle, t),
      desired: lerpAngle(a.desired, b.desired, t),
      mass: lerp(a.mass, b.mass, t),
      c1: b.c1,
      c2: b.c2,
      name: b.name,
      uid: b.uid,
      player: b.player,
      alive: t < 1 ? a.alive : b.alive,
      boosting: t < 0.5 ? a.boosting : b.boosting,
      thrust: lerp(a.thrust || 0, b.thrust || 0, t),
      glow: lerp(a.glow || 0, b.glow || 0, t),
      killed: b.killed,
      points: lerpPoints(a.points, b.points, t),
    };
  }

  function mapBy(arr, key) {
    const m = new Map();
    for (let i = 0; i < arr.length; i++) m.set(arr[i][key], arr[i]);
    return m;
  }

  function lerpSnakes(a, b, t) {
    const mb = mapBy(b, "uid");
    const seen = new Set();
    const out = [];
    for (let i = 0; i < a.length; i++) {
      const sa = a[i];
      const sb = mb.get(sa.uid);
      seen.add(sa.uid);
      if (sb) out.push(lerpSnake(sa, sb, t));
      else if (t < 1) out.push(sa);
    }
    for (let i = 0; i < b.length; i++) {
      if (!seen.has(b[i].uid) && t > 0) out.push(b[i]);
    }
    return out;
  }

  function lerpFoodList(a, b, t) {
    const mb = mapBy(b, "id");
    const seen = new Set();
    const out = [];
    for (let i = 0; i < a.length; i++) {
      const fa = a[i];
      const fb = mb.get(fa.id);
      seen.add(fa.id);
      if (fb) {
        out.push({
          id: fb.id,
          x: lerp(fa.x, fb.x, t),
          y: lerp(fa.y, fb.y, t),
          vx: fb.vx,
          vy: fb.vy,
          r: lerp(fa.r, fb.r, t),
          color: fb.color,
          phase: fb.phase,
          star: fb.star,
          runner: fb.runner,
          value: fb.value,
        });
      } else if (t < 0.55) {
        out.push(fa);
      }
    }
    for (let i = 0; i < b.length; i++) {
      if (!seen.has(b[i].id) && t > 0.45) out.push(b[i]);
    }
    return out;
  }

  function lerpHazards(a, b, t) {
    const n = Math.min(a.length, b.length);
    const out = new Array(n);
    for (let i = 0; i < n; i++) {
      const ha = a[i];
      const hb = b[i];
      out[i] = {
        x: lerp(ha.x, hb.x, t),
        y: lerp(ha.y, hb.y, t),
        vx: hb.vx,
        vy: hb.vy,
        r: hb.r,
        spin: lerp(ha.spin, hb.spin, t),
        spinSpd: hb.spinSpd,
        wobble: hb.wobble,
        kind: hb.kind,
        charge: hb.charge,
        cool: hb.cool,
      };
    }
    return out;
  }

  function lerpParticles(a, b, t) {
    const n = Math.max(a.length, b.length);
    const out = [];
    for (let i = 0; i < n; i++) {
      const pa = a[i];
      const pb = b[i];
      if (pa && pb) {
        out.push({
          x: lerp(pa.x, pb.x, t),
          y: lerp(pa.y, pb.y, t),
          vx: pb.vx,
          vy: pb.vy,
          life: lerp(pa.life, pb.life, t),
          max: pb.max,
          r: lerp(pa.r, pb.r, t),
          color: pb.color,
        });
      } else if (pb && t > 0.4) {
        out.push(cloneParticle(pb));
      } else if (pa && t < 0.6) {
        out.push(cloneParticle(pa));
      }
    }
    return out;
  }

  function lerpFrame(a, b, t) {
    return {
      t: lerp(a.t, b.t, t),
      cam: {
        x: lerp(a.cam.x, b.cam.x, t),
        y: lerp(a.cam.y, b.cam.y, t),
        z: lerp(a.cam.z, b.cam.z, t),
        tz: lerp(a.cam.tz, b.cam.tz, t),
      },
      focus: t < 1 ? a.focus : b.focus,
      snakes: lerpSnakes(a.snakes, b.snakes, t),
      food: lerpFoodList(a.food, b.food, t),
      hazards: lerpHazards(a.hazards, b.hazards, t),
      particles: lerpParticles(a.particles, b.particles, t),
      shake: lerp(a.shake, b.shake, t),
      flash: lerp(a.flash, b.flash, t),
    };
  }

  function sampleTape(localT) {
    const frames = replay.frames;
    const abs = frames[0].t + localT;
    if (abs <= frames[0].t) return frames[0];
    const last = frames[frames.length - 1];
    if (abs >= last.t) return last;
    let i = 1;
    while (i < frames.length && frames[i].t < abs) i++;
    const a = frames[i - 1];
    const b = frames[i];
    const u = (abs - a.t) / (b.t - a.t || 1);
    return lerpFrame(a, b, u);
  }

  function holdLive() {
    return {
      snakes: snakes.slice(),
      food: food.slice(),
      hazards: hazards.slice(),
      particles: particles.slice(),
      cam: { x: cam.x, y: cam.y, z: cam.z, tz: cam.tz },
      time,
      shake,
      flash,
      spectate,
      leader,
      liveCount,
      shownScore,
    };
  }

  function restoreLive(h) {
    snakes.length = 0;
    for (let i = 0; i < h.snakes.length; i++) snakes.push(h.snakes[i]);
    food.length = 0;
    for (let i = 0; i < h.food.length; i++) food.push(h.food[i]);
    hazards.length = 0;
    for (let i = 0; i < h.hazards.length; i++) hazards.push(h.hazards[i]);
    particles.length = 0;
    for (let i = 0; i < h.particles.length; i++) particles.push(h.particles[i]);
    cam.x = h.cam.x;
    cam.y = h.cam.y;
    cam.z = h.cam.z;
    cam.tz = h.cam.tz;
    time = h.time;
    shake = h.shake;
    flash = h.flash;
    spectate = h.spectate;
    leader = h.leader;
    liveCount = h.liveCount;
    shownScore = h.shownScore;
    rebuildFoodHash();
    rebuildBodyHash();
  }

  function applyFrame(f) {
    snakes.length = 0;
    for (let i = 0; i < f.snakes.length; i++) snakes.push(f.snakes[i]);
    food.length = 0;
    for (let i = 0; i < f.food.length; i++) food.push(f.food[i]);
    hazards.length = 0;
    for (let i = 0; i < f.hazards.length; i++) hazards.push(f.hazards[i]);
    particles.length = 0;
    for (let i = 0; i < f.particles.length; i++) particles.push(f.particles[i]);
    cam.x = f.cam.x;
    cam.y = f.cam.y;
    cam.z = f.cam.z;
    cam.tz = f.cam.tz;
    time = f.t;
    shake = f.shake;
    flash = f.flash;
    const focusUid = (replay && replay.focusUid) || f.focus;
    spectate = snakes.find((s) => s.uid === focusUid) || snakes.find((s) => s.alive) || null;
    if (replay && replay.focusUid && spectate) {
      cam.x = spectate.x;
      cam.y = spectate.y;
      const rad = snakeRadius(spectate);
      cam.z = clamp(1.18 / (1 + rad / 48), 0.5, 1.22);
      cam.tz = cam.z;
    }
    leader = null;
    liveCount = 0;
    for (let i = 0; i < snakes.length; i++) {
      const s = snakes[i];
      if (!s.alive) continue;
      liveCount++;
      if (!leader || s.mass > leader.mass) leader = s;
    }
    if (spectate) shownScore = scoreOf(spectate);
  }

  function startKillcam(opts) {
    opts = opts || {};
    const death = !!opts.death;
    const news = !!opts.news;
    let frames = opts.frames ? opts.frames.slice() : tape.slice();
    if (frames.length < 2) return false;
    if (death && !opts.frames) {
      const end = frames[frames.length - 1].t;
      const cutoff = end - DEATH_TAPE_SEC;
      let i = 0;
      while (i < frames.length - 2 && frames[i].t < cutoff) i++;
      frames = frames.slice(i);
    }
    const span = frames[frames.length - 1].t - frames[0].t;
    if (span < 0.2) return false;
    const tail = Math.min(death ? span * 0.45 : SLOW_TAIL, span);
    const head = span - tail;
    let headWall;
    let tailWall;
    let wall;
    if (death) {
      const tailShare = head <= 0 ? 1 : 0.5;
      tailWall = DEATH_REPLAY_SEC * tailShare;
      headWall = DEATH_REPLAY_SEC - tailWall;
      wall = DEATH_REPLAY_SEC;
    } else {
      headWall = head;
      tailWall = tail / SLOW_RATE;
      wall = headWall + tailWall + KILLCAM_HOLD;
    }
    replay = {
      frames,
      span,
      head,
      tail,
      headWall,
      tailWall,
      clock: 0,
      hold: holdLive(),
      wall,
      death,
      news,
      focusUid: opts.focus || 0,
      label: opts.label || "",
    };
    killcamEl.textContent = replay.label || "Kill cam";
    killcamEl.classList.remove("hidden");
    document.body.classList.add("killcam");
    applyFrame(frames[0]);
    return true;
  }

  function playNewsClip(clip, label) {
    if (!clip || !clip.frames || clip.frames.length < 2) return false;
    if (state !== "play" && state !== "tv") return false;
    if (replay && replay.death) return false;
    if (replay) clearReplay();
    setPaused(false);
    setBoostHum(false);
    mouse.down = false;
    return startKillcam({
      frames: clip.frames,
      focus: clip.victim,
      news: true,
      label: label || "",
    });
  }

  function clearReplay() {
    if (!replay) return null;
    const info = replay;
    replay = null;
    restoreLive(info.hold);
    if (!info.news) tape.length = 0;
    killcamEl.textContent = "Kill cam";
    killcamEl.classList.add("hidden");
    document.body.classList.remove("killcam");
    return info;
  }

  function endKillcam() {
    const info = clearReplay();
    if (info && info.death) finishDeath();
  }

  function replayTapeTime(clock) {
    const span = replay.span;
    const head = replay.head;
    const tail = replay.tail;
    const headWall = replay.headWall;
    if (clock <= headWall) {
      if (headWall <= 0 || head <= 0) return 0;
      return (clock / headWall) * head;
    }
    const tailWall = replay.tailWall || 1;
    const u = (clock - headWall) / tailWall;
    return Math.min(span, head + u * tail);
  }

  function stepReplay(dt) {
    replay.clock += dt;
    if (replay.clock >= replay.wall) {
      endKillcam();
      update(dt);
      return;
    }
    applyFrame(sampleTape(replayTapeTime(replay.clock)));
  }

  function bumpTvHeat(s, amt) {
    if (!s) return;
    tvHeat.set(s.uid, Math.min(170, (tvHeat.get(s.uid) || 0) + amt));
  }

  function deathExcitement(victim, killer) {
    let score = 10 + victim.mass * 1.55;
    score += (victim.killed || 0) * 10;
    if (leader === victim) score += 62;
    if (victim.boosting) score += 18;
    if (killer) {
      score += (killer.killed || 0) * 4;
      if (leader === killer) score += 16;
      if (killer.boosting) score += 24;
      const ratio = killer.mass / (victim.mass || 1);
      if (ratio < 0.85) score += 48 * (1 - ratio);
      if (killer.prey === victim) score += 16;
    } else if (victim.cause === "hazard") {
      score += 20;
    }
    let near = 0;
    for (let i = 0; i < snakes.length; i++) {
      const o = snakes[i];
      if (!o.alive || o === victim) continue;
      if (dist2(victim.x, victim.y, o.x, o.y) < 270 * 270) near++;
    }
    score += Math.min(4, near) * 17;
    return score;
  }

  function pruneTvDeaths() {
    for (let i = tvDeaths.length - 1; i >= 0; i--) {
      if (time - tvDeaths[i].t > 55) tvDeaths.splice(i, 1);
    }
  }

  function rememberTvDeath(victim, killer, label, clip, shown) {
    if (state !== "tv") return;
    if (shown) return;
    if (!clip || !clip.frames || clip.frames.length < 2) return;
    const score = deathExcitement(victim, killer);
    if (score < TV_DEATH_MIN) return;
    pruneTvDeaths();
    tvDeaths.push({
      clip,
      label,
      score,
      t: time,
      played: !!shown,
    });
    tvDeaths.sort((a, b) => b.score - a.score);
    if (tvDeaths.length > TV_DEATH_KEEP) tvDeaths.length = TV_DEATH_KEEP;
  }

  function pickTvDeath() {
    let best = null;
    for (let i = 0; i < tvDeaths.length; i++) {
      const d = tvDeaths[i];
      if (d.played || time - d.t > 55) continue;
      if (!best || d.score > best.score) best = d;
    }
    return best;
  }

  function nextHighlightWait() {
    return 8.2 + Math.random() * 5.4;
  }

  function tickTvHighlights(dt) {
    pruneTvDeaths();
    tvHighlightT += dt;
    if (tvHighlightT < tvHighlightIn) return;
    if (time - tvReplayAt < 7) return;
    const pick = pickTvDeath();
    if (!pick) {
      tvHighlightT = tvHighlightIn - 2.4;
      return;
    }
    if (!playNewsClip(pick.clip, "Replay · " + pick.label)) {
      pick.played = true;
      tvHighlightT = tvHighlightIn - 1.6;
      return;
    }
    pick.played = true;
    tvReplayAt = time;
    tvHighlightT = 0;
    tvHighlightIn = nextHighlightWait();
  }

  function decayTvHeat(dt) {
    tvHeat.forEach((v, k) => {
      const n = v - 38 * dt;
      if (n <= 0) tvHeat.delete(k);
      else tvHeat.set(k, n);
    });
  }

  function nearestRival(s, maxD) {
    let best = null;
    let bestD = maxD * maxD;
    for (let i = 0; i < snakes.length; i++) {
      const o = snakes[i];
      if (!o.alive || o === s) continue;
      const d = dist2(s.x, s.y, o.x, o.y);
      if (d < bestD) {
        bestD = d;
        best = o;
      }
    }
    return best;
  }

  function tvInterest(s) {
    if (!s || !s.alive) return 0;
    let score = 8 + s.mass * 0.4;
    if (leader === s) score += 20;
    if (s.boosting) score += 28;
    if (s.prey && s.prey.alive) score += 40;
    if (s.panic > 0) score += 36;
    score += (s.killed || 0) * 3;
    score += tvHeat.get(s.uid) || 0;
    for (let i = 0; i < snakes.length; i++) {
      const o = snakes[i];
      if (!o.alive || o === s) continue;
      const d2 = dist2(s.x, s.y, o.x, o.y);
      if (d2 < 310 * 310) {
        score += 900 / (Math.sqrt(d2) + 26);
        if (o.boosting) score += 14;
      }
    }
    for (let i = 0; i < hazards.length; i++) {
      if (dist2(s.x, s.y, hazards[i].x, hazards[i].y) < 150 * 150) {
        score += 30;
        break;
      }
    }
    if (spectate && spectate.uid === s.uid) score += 14;
    return score;
  }

  function pickTvShot(skip) {
    let best = null;
    let bestS = -1;
    for (let i = 0; i < snakes.length; i++) {
      const s = snakes[i];
      if (!s.alive || (skip && s.uid === skip.uid)) continue;
      const sc = tvInterest(s);
      if (sc > bestS) {
        bestS = sc;
        best = s;
      }
    }
    return best;
  }

  function pickChannelCrash() {
    pruneTvDeaths();
    const fresh = [];
    for (let i = 0; i < tvDeaths.length; i++) {
      const d = tvDeaths[i];
      if (time - d.t > 55) continue;
      if (!d.played) fresh.push(d);
    }
    const pool = fresh.length ? fresh : tvDeaths;
    if (!pool.length) return null;
    return pool[(Math.random() * pool.length) | 0];
  }

  function playTvCrash(death) {
    if (!death || !death.clip) return false;
    if (!playNewsClip(death.clip, "Replay · " + (death.label || "crash"))) return false;
    death.played = true;
    tvReplayAt = time;
    tvHighlightT = 0;
    tvHighlightIn = nextHighlightWait();
    return true;
  }

  function changeChannel() {
    if (state !== "tv") return;
    if (replay && replay.death) return;
    if (paused) setPaused(false);
    if (replay) endKillcam();

    const skip = spectate && spectate.alive ? spectate : null;
    const crash = pickChannelCrash();
    const next = pickTvShot(skip) || pickTvShot();
    const flipCrash = crash && (!next || next === skip || Math.random() < 0.46);
    if (flipCrash && playTvCrash(crash)) return;

    if (next) watch(next, true);
    tvHold = 0;
  }

  function cycleWatch(dir) {
    const ranked = snakes.filter((s) => s.alive).sort((a, b) => b.mass - a.mass);
    if (!ranked.length) return;
    let i = ranked.findIndex((s) => spectate && s.uid === spectate.uid);
    if (i < 0) i = 0;
    else i = (i + dir + ranked.length) % ranked.length;
    watch(ranked[i], true);
  }

  function rankOf(s) {
    let r = 1;
    for (let i = 0; i < snakes.length; i++) {
      const o = snakes[i];
      if (o.alive && o.mass > s.mass) r++;
    }
    return r;
  }

  function directTv(dt) {
    if (state !== "attract") return;
    decayTvHeat(dt);
    tvHold += dt;
    tvEval += dt;

    if (spectate && !spectate.alive) {
      const next =
        (spectate.killedBy && spectate.killedBy.alive && spectate.killedBy) ||
        pickTvShot() ||
        leader ||
        snakes.find((s) => s.alive) ||
        null;
      if (next) watch(next);
      else spectate = null;
      tvHold = 0;
    }

    if (tvEval < 0.22) return;
    tvEval = 0;

    const cur = spectate && spectate.alive ? spectate : null;
    const next = pickTvShot();
    if (!next || next === cur) return;
    const curS = cur ? tvInterest(cur) : 0;
    const nextS = tvInterest(next);
    const holdNeed = curS > 80 ? 2.6 : 1.5;
    if (!cur || (tvHold >= holdNeed && nextS > curS * 1.28 + 10)) {
      watch(next);
      tvHold = 0;
    }
  }

  function menuTailClear(focus, ty) {
    const btn = startForm.querySelector(".play-btn");
    if (!btn) return ty;
    const rect = btn.getBoundingClientRect();
    if (!rect.height) return ty;
    const z = Math.max(cam.z, 0.4);
    const rad = snakeRadius(focus);
    let top = focus.y;
    let left = focus.x;
    let right = focus.x;
    const pts = focus.points;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      if (p.y < top) top = p.y;
      if (p.x < left) left = p.x;
      if (p.x > right) right = p.x;
    }
    const screenL = (left - cam.x) * z + cssW / 2 - rad;
    const screenR = (right - cam.x) * z + cssW / 2 + rad;
    if (screenR < rect.left - 8 || screenL > rect.right + 8) return ty;
    top -= rad + 10;
    const maxCamY = top - (rect.bottom + 14 - cssH / 2) / z;
    const minCamY = focus.y - (cssH * 0.94 - cssH / 2) / z;
    if (ty > maxCamY) ty = maxCamY;
    if (ty < minCamY && minCamY < maxCamY) ty = minCamY;
    return ty;
  }

  function followSpectator(dt) {
    if (state === "tv") decayTvHeat(dt);
    else directTv(dt);
    const focus =
      state === "tv"
        ? spectate
        : (spectate && spectate.alive && spectate) ||
          leader ||
          snakes.find((s) => s.alive);
    if (!focus) return;
    if (state === "attract" && focus.alive) spectate = focus;

    const live = !!focus.alive;
    const rival = live ? nearestRival(focus, 390) : null;
    const pair = rival && dist2(focus.x, focus.y, rival.x, rival.y) < 360 * 360;
    let tx;
    let ty;
    if (pair) {
      tx = (focus.x + rival.x) * 0.5;
      ty = (focus.y + rival.y) * 0.5;
    } else if (live) {
      const look = focus.boosting ? 88 : 62;
      tx = focus.x + Math.cos(focus.angle) * look;
      ty = focus.y + Math.sin(focus.angle) * look;
    } else {
      tx = focus.x;
      ty = focus.y;
    }

    if (state === "attract") ty = menuTailClear(focus, ty);

    if (tvSnap) {
      cam.x = tx;
      cam.y = ty;
      tvSnap = false;
    } else {
      const far = dist2(cam.x, cam.y, tx, ty) > 820 * 820;
      const k = far ? 11 : 5.4;
      cam.x += (tx - cam.x) * k * dt;
      cam.y += (ty - cam.y) * k * dt;
    }

    const rad = snakeRadius(focus);
    const attract = state === "attract";
    let z = 1.12;
    if (attract) z = pair ? 0.36 : 0.46;
    else if (pair) z = 0.76;
    else if (focus.boosting) z = 0.74;
    cam.tz = clamp(z / (1 + rad / 48), 0.28, attract ? 0.5 : 1.22);
    cam.z += (cam.tz - cam.z) * (focus.boosting || pair ? 5.6 : 3.2) * dt;
    shownScore = lerp(shownScore, scoreOf(focus), 1 - Math.pow(0.001, dt));
  }

  function updateThrust(s, dt) {
    const target = s.boosting ? 1 : 0;
    const rate = s.boosting ? 0.72 : 1.25;
    if (s.thrust < target) s.thrust = Math.min(target, s.thrust + rate * dt);
    else s.thrust = Math.max(target, s.thrust - rate * dt);
  }

  function updateBoostGlow(s, dt) {
    const target = s.boosting ? 1 : 0;
    const rate = s.boosting ? 1.15 : 2.4;
    if (s.glow < target) s.glow = Math.min(target, s.glow + rate * dt);
    else s.glow = Math.max(target, s.glow - rate * dt);
  }

  function update(dt) {
    if (replay) return;

    time += dt;
    shake = Math.max(0, shake - dt * 28);
    flash = Math.max(0, flash - dt);
    eatChainT -= dt;
    if (eatChainT <= 0) eatChain = 0;

    updateFood(dt);
    updateHazards(dt);
    updateBubbles(dt);
    rebuildFoodHash();

    if (state === "play") updatePlayer(dt);
    else followSpectator(dt);

    for (let i = 0; i < snakes.length; i++) {
      const s = snakes[i];
      if (!s.alive) continue;
      if (!s.player) thinkBot(s, dt);
      updateThrust(s, dt);
      if (s.boosting) {
        const floor = s.player ? BOOST_MIN_LENGTH / 10 : MIN_MASS + 1;
        if (s.mass > floor) {
          const spend = Math.max(s.thrust, 0.08);
          s.mass -= BOOST_COST * (s.player ? 1.75 : 0.52) * spend * dt;
          dropBoostFood(s, dt);
        }
        if (s.player && particles.length < 320 && Math.random() < 18 * s.thrust * dt) {
          const hx = Math.cos(s.angle);
          const hy = Math.sin(s.angle);
          particles.push({
            x: s.x - hx * 10,
            y: s.y - hy * 10,
            vx: -hx * rand(40, 120) + rand(-30, 30),
            vy: -hy * rand(40, 120) + rand(-30, 30),
            life: rand(0.15, 0.35),
            max: 0.35,
            r: rand(2, 5),
            color: s.c1,
          });
        }
        if (s.player && scoreOf(s) <= BOOST_MIN_LENGTH) s.boosting = false;
        else if (!s.player && s.mass <= floor) s.boosting = false;
      }
      updateBoostGlow(s, dt);
      s.mass = Math.max(s.player ? BOOST_MIN_LENGTH / 10 : MIN_MASS, s.mass);
      if (s.player) setBoostHum(s.boosting);
      moveSnake(s, dt);
      eatNearby(s, dt);
    }

    rebuildBodyHash();
    collideHeads();
    collideHazards();

    let pw = 0;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.life -= dt;
      if (p.life <= 0) continue;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.98;
      p.vy *= 0.98;
      particles[pw++] = p;
    }
    particles.length = pw;

    if (state !== "dead") {
      botSpawnT += dt;
      const liveBots = snakes.filter((s) => s.alive && !s.player).length;
      if (liveBots < BOT_COUNT && botSpawnT > 0.95) {
        botSpawnT = 0;
        snakes.push(spawnBot(Math.random() < 0.08));
      }
      if (snakes.length > BOT_COUNT + 30) {
        for (let i = snakes.length - 1; i >= 0 && snakes.length > BOT_COUNT + 8; i--) {
          if (!snakes[i].alive && !snakes[i].player) snakes.splice(i, 1);
        }
      }
    }

    maintainFood(dt);

    leader = null;
    liveCount = 0;
    playerRank = 1;
    for (let i = 0; i < snakes.length; i++) {
      const s = snakes[i];
      if (!s.alive) continue;
      liveCount++;
      if (!leader || s.mass > leader.mass) leader = s;
      if (player && player.alive && s.mass > player.mass) playerRank++;
    }

    if (state === "play" && player) {
      const thrust = player.thrust || 0;
      const look = 70 + 40 * thrust;
      const tx = player.x + Math.cos(player.angle) * look;
      const ty = player.y + Math.sin(player.angle) * look;
      cam.x += (tx - cam.x) * 5.2 * dt;
      cam.y += (ty - cam.y) * 5.2 * dt;
      const rad = snakeRadius(player);
      const zoom = 1.2 + (0.74 - 1.2) * thrust;
      const oldMax = zoom * 48;
      const oldScreen = (oldMax * rad) / (48 + rad);
      const t = oldScreen / oldMax;
      const maxScreen = oldMax * 5;
      const screen = Math.min(maxScreen, oldScreen + (maxScreen - oldMax) * Math.pow(t, 16));
      cam.tz = clamp(screen / rad, 0.32, 1.22);
      cam.z += (cam.tz - cam.z) * (3.2 + 3 * thrust) * dt;
      shownScore = lerp(shownScore, scoreOf(player), 1 - Math.pow(0.001, dt));
    }

    if (state === "attract") {
      menuAcc += dt;
      if (menuAcc > 0.15) {
        menuAcc = 0;
        renderLiveMenu();
      }
    }

    if (state === "play" || state === "tv") {
      tapeAcc += dt;
      if (tapeAcc >= 0.05) {
        tapeAcc = 0;
        pushTape();
      }
      if (state === "tv" && pendingKillcam) {
        pendingKillcam = false;
        startKillcam({ label: pendingKillcamLabel });
        pendingKillcamLabel = "";
        tvHighlightT = 0;
        tvHighlightIn = nextHighlightWait();
      } else if (state === "tv" && tvAuto) {
        tickTvHighlights(dt);
      }
    } else {
      tape.length = 0;
      pendingKillcam = false;
      pendingKillcamLabel = "";
    }

    if (state === "play" && player && !player.alive) beginDeath();
  }

  function killerLine() {
    const by = player && player.killedBy;
    if (player && player.cause === "edge") return "You slipped off the map";
    if (player && player.cause === "hazard") return "A saw got you";
    if (by) return "Wrecked by " + by.name;
    return "Someone got you";
  }

  function beginDeath() {
    if (replay) return;
    clearLengths();
    setBoostHum(false);
    const sc = player ? scoreOf(player) : 0;
    rememberScore(player ? player.name : "You", sc, player ? player.killed : 0);
    menuKillEl.textContent = killerLine();
    menuKillEl.classList.remove("hidden");
    renderBest();
    if (!startKillcam({ death: true })) finishDeath();
  }

  function finishDeath() {
    const by = player && player.killedBy;
    toMenu(by && by.alive ? by : leader);
  }

  function inView(x, y, pad) {
    const hx = cssW / (2 * cam.z) + pad;
    const hy = cssH / (2 * cam.z) + pad;
    return x > cam.x - hx && x < cam.x + hx && y > cam.y - hy && y < cam.y + hy;
  }

  function toScreen(x, y) {
    return {
      x: (x - cam.x) * cam.z + cssW / 2,
      y: (y - cam.y) * cam.z + cssH / 2,
    };
  }

  function snakeVisible(s) {
    const pts = s.points;
    if (inView(s.x, s.y, 240)) return true;
    if (inView(pts[pts.length - 1].x, pts[pts.length - 1].y, 80)) return true;
    for (let i = 0; i < pts.length; i += 10) {
      if (inView(pts[i].x, pts[i].y, 50)) return true;
    }
    return false;
  }

  function ensureAudio() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      audioCtx = new AC();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function tone(freq, dur, type, vol, slide) {
    const a = audioCtx;
    if (!a) return;
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(freq, a.currentTime);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq * slide), a.currentTime + dur);
    g.gain.setValueAtTime(vol || 0.05, a.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
    o.connect(g).connect(a.destination);
    o.start();
    o.stop(a.currentTime + dur + 0.02);
  }

  function eatSfx(n) {
    const a = audioCtx;
    if (!a) return;
    const step = Math.max(0, (n || 1) - 1);
    const notes = [523, 587, 659, 698, 784];
    const freq = notes[step % notes.length];
    const now = a.currentTime;
    tone(freq, 0.08, "sine", 0.06, 1.18);
  }

  function sfx(kind, n) {
    if (!audioCtx) return;
    if (kind === "eat") {
      eatSfx(n);
    } else if (kind === "kill") {
      tone(180, 0.18, "sawtooth", 0.05, 0.45);
      tone(520, 0.12, "square", 0.03, 1.8);
    } else if (kind === "die") {
      tone(220, 0.35, "sawtooth", 0.06, 0.28);
    } else if (kind === "pop") {
      tone(140, 0.08, "sine", 0.02, 0.6);
    }
  }

  function setBoostHum(on) {
    const a = audioCtx;
    if (!a) return;
    if (on) {
      if (!boostHum) {
        boostHum = a.createOscillator();
        boostGain = a.createGain();
        boostHum.type = "sine";
        boostHum.frequency.value = 62;
        boostGain.gain.value = 0.0001;
        boostHum.connect(boostGain).connect(a.destination);
        boostHum.start();
      }
      boostGain.gain.linearRampToValueAtTime(0.028, a.currentTime + 0.08);
    } else if (boostGain) {
      boostGain.gain.linearRampToValueAtTime(0.0001, a.currentTime + 0.12);
    }
  }

  function drawArena() {
    const m = currentMap();
    const g = ctx.createRadialGradient(
      cssW * 0.5,
      cssH * 0.34,
      20,
      cssW * 0.5,
      cssH * 0.55,
      Math.max(cssW, cssH) * 0.78
    );
    g.addColorStop(0, m.bg[0]);
    g.addColorStop(0.42, m.bg[1]);
    g.addColorStop(1, m.bg[2]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, cssW, cssH);

    const sx = shake ? rand(-shake, shake) : 0;
    const sy = shake ? rand(-shake, shake) : 0;

    ctx.save();
    ctx.translate(cssW / 2 + sx, cssH / 2 + sy);
    ctx.scale(cam.z, cam.z);
    ctx.translate(-cam.x, -cam.y);

    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, WORLD_R, 0, Math.PI * 2);
    ctx.clip();

    ctx.save();
    ctx.globalAlpha = mapOpacity;
    drawFloor();
    ctx.restore();
    drawCaustics();
    drawFood();

    const drawList = [];
    for (let i = 0; i < snakes.length; i++) if (snakes[i].alive) drawList.push(snakes[i]);
    drawList.sort((a, b) => a.mass - b.mass);
    for (let n = 0; n < drawList.length; n++) drawSnake(drawList[n]);

    drawHazards();
    drawParticles();
    drawBubbles();
    ctx.restore();

    drawRim();
    ctx.restore();

    if (flash > 0) {
      ctx.fillStyle = "rgba(255,245,230," + flash * 0.55 + ")";
      ctx.fillRect(0, 0, cssW, cssH);
    }
  }

  function traceHex(x, y, size, path) {
    const g = path || ctx;
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      const px = x + Math.cos(a) * size;
      const py = y + Math.sin(a) * size;
      if (i === 0) g.moveTo(px, py);
      else g.lineTo(px, py);
    }
    g.closePath();
  }

  function floorView() {
    return {
      minX: cam.x - cssW / cam.z,
      maxX: cam.x + cssW / cam.z,
      minY: cam.y - cssH / cam.z,
      maxY: cam.y + cssH / cam.z,
    };
  }

  function stampTile(fills, outline, tones, col, row, trace) {
    const color = tones[Math.abs((col * 5 + row * 3) % tones.length)];
    let path = fills.get(color);
    if (!path) {
      path = new Path2D();
      fills.set(color, path);
    }
    trace(path);
    trace(outline);
  }

  function traceSquare(x, y, side, path) {
    const h = side / 2;
    path.moveTo(x - h, y - h);
    path.lineTo(x + h, y - h);
    path.lineTo(x + h, y + h);
    path.lineTo(x - h, y + h);
    path.closePath();
  }

  function traceTri(x, y, side, h, up, path) {
    if (up) {
      path.moveTo(x, y + h);
      path.lineTo(x + side / 2, y);
      path.lineTo(x + side, y + h);
    } else {
      path.moveTo(x, y);
      path.lineTo(x + side / 2, y + h);
      path.lineTo(x + side, y);
    }
    path.closePath();
  }

  function drawFloor() {
    const m = currentMap();
    const view = floorView();
    const tones = [m.arena, m.arena, m.bg[1], m.arena, m.bg[0], m.bg[1], m.arena];
    const fills = new Map();
    const outline = new Path2D();

    if (mapType === "square") addSquareTiles(fills, outline, tones, view);
    else if (mapType === "tri") addTriTiles(fills, outline, tones, view);
    else addHexTiles(fills, outline, tones, view);

    for (const [color, path] of fills) {
      ctx.fillStyle = color;
      ctx.fill(path);
    }
    ctx.strokeStyle = m.rim1;
    ctx.lineWidth = 8;
    ctx.lineJoin = "miter";
    ctx.stroke(outline);

    ctx.beginPath();
    ctx.arc(0, 0, WORLD_R, 0, Math.PI * 2);
    const edge = ctx.createRadialGradient(0, 0, WORLD_R * 0.82, 0, 0, WORLD_R);
    edge.addColorStop(0, "rgba(255, 70, 50, 0)");
    edge.addColorStop(1, m.edge);
    ctx.fillStyle = edge;
    ctx.fill();
  }

  function addHexTiles(fills, outline, tones, view) {
    const size = 42;
    const colW = Math.sqrt(3) * size;
    const rowH = size * 1.5;
    const row0 = Math.floor(view.minY / rowH) - 1;
    const row1 = Math.ceil(view.maxY / rowH) + 1;
    for (let row = row0; row <= row1; row++) {
      const y = row * rowH;
      const shift = row & 1 ? colW * 0.5 : 0;
      const col0 = Math.floor((view.minX - shift) / colW) - 1;
      const col1 = Math.ceil((view.maxX - shift) / colW) + 1;
      for (let col = col0; col <= col1; col++) {
        const x = col * colW + shift;
        stampTile(fills, outline, tones, col, row, (path) => traceHex(x, y, size, path));
      }
    }
  }

  function addSquareTiles(fills, outline, tones, view) {
    const side = 73;
    const col0 = Math.floor(view.minX / side) - 1;
    const col1 = Math.ceil(view.maxX / side) + 1;
    const row0 = Math.floor(view.minY / side) - 1;
    const row1 = Math.ceil(view.maxY / side) + 1;
    for (let row = row0; row <= row1; row++) {
      const y = row * side;
      for (let col = col0; col <= col1; col++) {
        const x = col * side;
        stampTile(fills, outline, tones, col, row, (path) => traceSquare(x, y, side, path));
      }
    }
  }

  function addTriTiles(fills, outline, tones, view) {
    const side = 86;
    const h = (Math.sqrt(3) / 2) * side;
    const step = side / 2;
    const col0 = Math.floor(view.minX / step) - 2;
    const col1 = Math.ceil(view.maxX / step) + 2;
    const row0 = Math.floor(view.minY / h) - 2;
    const row1 = Math.ceil(view.maxY / h) + 2;
    for (let row = row0; row <= row1; row++) {
      const y = row * h;
      for (let col = col0; col <= col1; col++) {
        const x = col * step;
        const up = ((row + col) & 1) === 0;
        stampTile(fills, outline, tones, col, row, (path) => traceTri(x, y, side, h, up, path));
      }
    }
  }

  function drawCaustics() {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 5; i++) {
      const a = time * (0.12 + i * 0.025) + i * 1.7;
      const x = cam.x + Math.cos(a) * 520 + Math.sin(a * 0.6) * 240;
      const y = cam.y + Math.sin(a * 0.85) * 420;
      if (!inView(x, y, 380)) continue;
      const grd = ctx.createRadialGradient(x, y, 8, x, y, 380);
      grd.addColorStop(0, currentMap().caustic);
      grd.addColorStop(1, "rgba(210,255,255,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(x, y, 380, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawFood() {
    const beat = (Math.PI * 2) / 2.4;
    for (let i = 0; i < food.length; i++) {
      const f = food[i];
      if (!inView(f.x, f.y, f.runner ? 40 : 24)) continue;
      const amp = f.runner ? 0.045 : f.star ? 0.038 : 0.026;
      const pulse = 1 + Math.sin(time * beat + f.phase) * amp;
      drawCandy(f.x, f.y, f.r * pulse, f.color, f.phase, f.star, f.runner);
    }
  }

  function drawCandy(x, y, pr, color, phase, star, runner) {
    if (!star && !runner) {
      ctx.beginPath();
      ctx.arc(x, y, pr, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x - pr * 0.22, y - pr * 0.28, pr * 0.32, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 248, 230, 0.72)";
      ctx.fill();
      return;
    }
    const tone = tonesOf(color);
    const glowR = pr * (runner ? 2.15 : star ? 1.9 : 1.55);
    ctx.beginPath();
    ctx.arc(x, y, glowR, 0, Math.PI * 2);
    ctx.fillStyle = hexA(color, runner ? 0.14 : star ? 0.11 : 0.08);
    ctx.fill();

    const body = ctx.createRadialGradient(x, y - pr * 0.42, pr * 0.08, x, y + pr * 0.12, pr);
    body.addColorStop(0, tone.hi);
    body.addColorStop(0.4, tone.mid);
    body.addColorStop(0.74, color);
    body.addColorStop(1, tone.lo);
    ctx.beginPath();
    ctx.arc(x, y, pr, 0, Math.PI * 2);
    ctx.fillStyle = body;
    ctx.fill();
    ctx.lineWidth = Math.max(0.9, pr * 0.16);
    ctx.strokeStyle = "#fff6dc";
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(x - pr * 0.2, y - pr * 0.34, pr * 0.32, pr * 0.16, -0.55, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 248, 230, 0.62)";
    ctx.fill();

    if (star || runner) drawSheen(x, y, pr, phase);
  }

  function drawSheen(x, y, pr, phase) {
    const u = (time / 2.2 + phase * 0.16) % 1;
    if (u < 0.16 || u > 0.58) return;
    const t = (u - 0.16) / 0.42;
    const across = -0.58 + t * 1.16;
    ctx.beginPath();
    ctx.ellipse(x + across * pr * 0.62, y - pr * 0.16, pr * 0.3, pr * 0.13, -0.35, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 246, " + (Math.sin(t * Math.PI) * 0.36).toFixed(3) + ")";
    ctx.fill();
  }

  function traceSaw(r) {
    const teeth = 12;
    const step = (Math.PI * 2) / teeth;
    ctx.beginPath();
    for (let t = 0; t < teeth; t++) {
      const a = t * step - Math.PI / 2;
      const tip = a;
      const gullet = a + step * 0.16;
      ctx.lineTo(Math.cos(tip) * r * 1.05, Math.sin(tip) * r * 1.05);
      ctx.lineTo(Math.cos(gullet) * r * 0.62, Math.sin(gullet) * r * 0.62);
    }
    ctx.closePath();
  }

  function drawHazards() {
    for (let i = 0; i < hazards.length; i++) {
      const h = hazards[i];
      if (!inView(h.x, h.y, h.r * 2.4)) continue;
      ctx.save();
      ctx.translate(h.x, h.y);
      const hot = h.charge > 0 ? Math.min(1, h.charge) : 0;
      const pulse = 0.62 + 0.38 * (0.5 + 0.5 * Math.sin(time * 3.4 + h.wobble));

      ctx.beginPath();
      ctx.arc(0, 0, h.r * (hot ? 2.25 : 1.85), 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 72, 36, " + (hot ? 0.34 : 0.1 + 0.12 * pulse).toFixed(3) + ")";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, h.r * 1.22, 0, Math.PI * 2);
      ctx.strokeStyle = hot ? "#ffd056" : "rgba(255, 214, 120, " + (0.72 + 0.28 * pulse).toFixed(3) + ")";
      ctx.lineWidth = hot ? 3.6 : 2.6;
      ctx.stroke();

      ctx.save();
      ctx.translate(h.r * 0.07, h.r * 0.12);
      ctx.rotate(h.spin);
      traceSaw(h.r);
      ctx.fillStyle = "rgba(6, 8, 10, 0.5)";
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.rotate(h.spin);
      traceSaw(h.r);
      const steel = ctx.createRadialGradient(0, -h.r * 0.15, h.r * 0.1, 0, 0, h.r * 1.05);
      steel.addColorStop(0, "#3a4248");
      steel.addColorStop(0.62, "#6d767e");
      steel.addColorStop(0.86, hot ? "#a33a2c" : "#b7c0c6");
      steel.addColorStop(1, hot ? "#ff5a3a" : "#e4eaee");
      ctx.fillStyle = steel;
      ctx.fill();
      ctx.lineJoin = "miter";
      ctx.miterLimit = 2.5;
      ctx.lineWidth = Math.max(2.2, h.r * 0.1);
      ctx.strokeStyle = hot ? "#fff6dc" : "#ffe7a8";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, h.r * 0.58, 0, Math.PI * 2);
      const plate = ctx.createLinearGradient(-h.r * 0.4, -h.r * 0.5, h.r * 0.35, h.r * 0.45);
      plate.addColorStop(0, "#8b949c");
      plate.addColorStop(0.42, "#4a5258");
      plate.addColorStop(1, "#242a2e");
      ctx.fillStyle = plate;
      ctx.fill();
      ctx.lineWidth = Math.max(0.8, h.r * 0.028);
      ctx.strokeStyle = "rgba(10, 12, 14, 0.75)";
      ctx.stroke();
      ctx.restore();

      const hub = h.r * 0.2;
      ctx.beginPath();
      ctx.arc(0, 0, hub, 0, Math.PI * 2);
      const face = ctx.createLinearGradient(-hub, -hub, hub * 0.6, hub);
      face.addColorStop(0, "#8a9298");
      face.addColorStop(0.45, "#3e464c");
      face.addColorStop(1, "#161a1d");
      ctx.fillStyle = face;
      ctx.fill();
      ctx.lineWidth = Math.max(0.9, hub * 0.14);
      ctx.strokeStyle = "#101316";
      ctx.stroke();
      ctx.fillStyle = "#0c0e10";
      ctx.fillRect(-hub * 0.62, -hub * 0.13, hub * 1.24, hub * 0.26);

      ctx.restore();
    }
  }

  function drawBubbles() {
    ctx.strokeStyle = "rgba(220,255,255,0.28)";
    ctx.lineWidth = 1.2;
    for (let i = 0; i < bubbles.length; i++) {
      const b = bubbles[i];
      if (!inView(b.x, b.y, 8)) continue;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function drawParticles() {
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.globalAlpha = clamp(p.life / (p.max || 0.5), 0, 1);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r || 5, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawRim() {
    const m = currentMap();
    ctx.beginPath();
    ctx.arc(0, 0, WORLD_R, 0, Math.PI * 2);
    ctx.strokeStyle = m.rim1;
    ctx.lineWidth = 20;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, WORLD_R + 28, 0, Math.PI * 2);
    ctx.strokeStyle = m.rim2;
    ctx.lineWidth = 12;
    ctx.stroke();
  }

  function drawSnake(s) {
    const pts = s.points;
    if (pts.length < 2 || !snakeVisible(s)) return;

    const rad = snakeRadius(s) * (s.player ? 1.12 : 1);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if ((state === "tv" || state === "attract") && spectate === s) {
      const pulse = 0.5 + 0.5 * (0.5 + 0.5 * Math.sin(time * 4.2));
      ctx.beginPath();
      ctx.arc(s.x, s.y, rad * 2.15 + 12, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 208, 86," + (0.42 * pulse).toFixed(3) + ")";
      ctx.lineWidth = 3.5;
      ctx.stroke();
    }

    const glow = s.glow || 0;
    if (glow > 0.02) {
      const pulse = 0.62 + 0.38 * (0.5 + 0.5 * Math.sin(time * 17 + s.uid));
      const a = glow * pulse;
      const spread = 0.28 + 0.72 * glow;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.strokeStyle = hexA(s.c1, 0.34 * a);
      ctx.lineWidth = (rad * 3.1 + 18) * spread;
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255," + (0.2 * a).toFixed(3) + ")";
      ctx.lineWidth = (rad * 2.15 + 7) * spread;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(s.x, s.y, rad * (1.15 + 1.95 * glow), 0, Math.PI * 2);
      ctx.fillStyle = hexA(s.c1, 0.28 * a);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(s.x, s.y, rad * (0.85 + 0.7 * glow), 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255," + (0.16 * a).toFixed(3) + ")";
      ctx.fill();
      ctx.restore();
    }

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.strokeStyle = "rgba(6, 28, 34, 0.55)";
    ctx.lineWidth = rad * 2 + 5;
    ctx.stroke();

    const stride = pts.length > 420 ? 3 : pts.length > 140 ? 2 : 1;
    for (let i = pts.length - 1; i >= 0; i -= stride) {
      const p = pts[i];
      if (!inView(p.x, p.y, rad + 6)) continue;
      const rr = rad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, rr, 0, Math.PI * 2);
      ctx.fillStyle = s.c1;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x - rr * 0.22, p.y - rr * 0.28, rr * (0.22 + 0.08 * glow), 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255," + (0.16 + 0.26 * glow).toFixed(3) + ")";
      ctx.fill();
    }

    const look = s.player ? s.desired : s.angle;
    const hx = Math.cos(look);
    const hy = Math.sin(look);
    const px = -hy;
    const py = hx;
    const eyeR = rad * 0.34;
    const eyeD = rad * 0.44;
    ctx.beginPath();
    ctx.arc(s.x, s.y, rad * 0.98, 0, Math.PI * 2);
    ctx.fillStyle = s.c1;
    ctx.fill();
    drawEye(s.x + hx * rad * 0.3 + px * eyeD, s.y + hy * rad * 0.3 + py * eyeD, eyeR, hx, hy);
    drawEye(s.x + hx * rad * 0.3 - px * eyeD, s.y + hy * rad * 0.3 - py * eyeD, eyeR, hx, hy);

    if (leader === s) {
      ctx.save();
      ctx.translate(s.x, s.y - rad - 16);
      ctx.beginPath();
      ctx.moveTo(-8, 6);
      ctx.lineTo(-8, -2);
      ctx.lineTo(-3, 2);
      ctx.lineTo(0, -6);
      ctx.lineTo(3, 2);
      ctx.lineTo(8, -2);
      ctx.lineTo(8, 6);
      ctx.closePath();
      ctx.fillStyle = "#ffd056";
      ctx.fill();
      ctx.restore();
    }
  }

  function drawEye(x, y, r, hx, hy) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "#f7fff9";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + hx * r * 0.38, y + hy * r * 0.38, r * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = "#12343b";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x - r * 0.28, y - r * 0.3, r * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }

  function drawNames() {
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    for (let i = 0; i < snakes.length; i++) {
      const s = snakes[i];
      if (!s.alive || !inView(s.x, s.y, 48)) continue;
      const p = toScreen(s.x, s.y);
      const rad = snakeRadius(s) * cam.z;
      const size = clamp(12 + rad * 0.16, 12, 22);
      ctx.font = "700 " + size + "px Sora, sans-serif";
      const label = leader === s ? "♛ " + s.name : s.name;
      ctx.fillStyle = "rgba(7, 40, 46, 0.55)";
      ctx.fillText(label, p.x + 1, p.y - rad - 10);
      ctx.fillStyle = s.player || (spectate && s.uid === spectate.uid) ? "#ffd056" : "#f4fff8";
      ctx.fillText(label, p.x, p.y - rad - 11);
    }
  }

  function drawCursor() {
    if (state !== "play" || !player || !player.alive) return;
    const pulse = 8.5 + Math.sin(time * 6) * 1.2;
    ctx.beginPath();
    ctx.moveTo(cssW / 2, cssH / 2);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.strokeStyle = "rgba(255, 208, 86, 0.12)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, pulse, 0, Math.PI * 2);
    ctx.strokeStyle = player.boosting ? "#ff5b3a" : "rgba(255, 208, 86, 0.95)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = "#ffd056";
    ctx.fill();
  }

  function minimapGeom() {
    const size = Math.min(156, cssW * 0.28);
    const x = 16;
    const y = cssH - size - 16;
    const cx = x + size / 2;
    const cy = y + size / 2;
    return { size, x, y, cx, cy, r: size / 2, sc: (size / 2 - 7) / WORLD_R };
  }

  function inMinimap(sx, sy) {
    const m = minimapGeom();
    return dist2(sx, sy, m.cx, m.cy) <= m.r * m.r;
  }

  function snakeAtMinimap(sx, sy) {
    const m = minimapGeom();
    if (dist2(sx, sy, m.cx, m.cy) > m.r * m.r) return null;
    let best = null;
    let bestD = 16 * 16;
    for (let i = 0; i < snakes.length; i++) {
      const s = snakes[i];
      if (!s.alive) continue;
      const d = dist2(sx, sy, m.cx + s.x * m.sc, m.cy + s.y * m.sc);
      if (d < bestD) {
        best = s;
        bestD = d;
      }
    }
    return best;
  }

  function drawMinimap() {
    const m = minimapGeom();
    const size = m.size;
    const cx = m.cx;
    const cy = m.cy;
    const sc = m.sc;
    ctx.beginPath();
    ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(7, 32, 38, 0.62)";
    ctx.fill();
    ctx.strokeStyle = "#ffd056";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1;
    ctx.strokeRect(
      cx + (cam.x - cssW / (2 * cam.z)) * sc,
      cy + (cam.y - cssH / (2 * cam.z)) * sc,
      (cssW / cam.z) * sc,
      (cssH / cam.z) * sc
    );

    for (let i = 0; i < hazards.length; i++) {
      const h = hazards[i];
      ctx.beginPath();
      ctx.arc(cx + h.x * sc, cy + h.y * sc, 3.4, 0, Math.PI * 2);
      ctx.fillStyle = "#ff5b3a";
      ctx.fill();
    }

    const ranked = snakes
      .filter((s) => s.alive)
      .sort((a, b) => b.mass - a.mass)
      .slice(0, 8);

    for (let i = 0; i < snakes.length; i++) {
      const s = snakes[i];
      if (!s.alive) continue;
      const on = s.player || (spectate && s.uid === spectate.uid);
      ctx.beginPath();
      ctx.arc(cx + s.x * sc, cy + s.y * sc, on ? 4.2 : 2.1, 0, Math.PI * 2);
      ctx.fillStyle = on ? "#ffd056" : s.c1;
      ctx.fill();
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, size / 2 - 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.font = "700 11px Sora, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    for (let i = 0; i < ranked.length; i++) {
      const s = ranked[i];
      const n = i + 1;
      const on = s.player || (spectate && s.uid === spectate.uid);
      const px = cx + s.x * sc;
      const py = cy + s.y * sc - (on ? 5 : 3.5);
      ctx.fillStyle = "rgba(7, 32, 38, 0.9)";
      ctx.fillText(String(n), px + 0.7, py + 0.7);
      ctx.fillStyle = n === 1 ? "#ffd056" : "#f7fff9";
      ctx.fillText(String(n), px, py);
    }
    ctx.restore();
  }

  function syncBoardRow(li, s, i) {
    li.classList.toggle("hot", i === 0);
    li.classList.toggle("place-2", i === 1);
    li.classList.toggle("place-3", i === 2);
    li.classList.toggle("me", !!s.player);
    li.classList.toggle("watch", state === "tv" && !!(spectate && s.uid === spectate.uid));
    applyLengthFlash(li, s);
    const mark = i === 0 ? "♛ " : "";
    const name = mark + (i + 1) + "  " + s.name;
    const score = commas(scoreOf(s));
    if (li.children[0].textContent !== name) li.children[0].textContent = name;
    if (li.children[0].style.color !== s.c1) li.children[0].style.color = s.c1;
    if (li.children[1].textContent !== score) li.children[1].textContent = score;
  }

  function renderBoard() {
    const ranked = snakes
      .filter((s) => s.alive)
      .sort((a, b) => b.mass - a.mass)
      .slice(0, 18);
    const want = new Set(ranked.map((s) => String(s.uid)));
    const before = new Map();
    for (const li of boardEl.children) {
      if (!li.classList.contains("leaving")) before.set(li.dataset.id, li.offsetTop);
    }
    for (const li of [...boardEl.children]) {
      if (li.classList.contains("leaving") || want.has(li.dataset.id)) continue;
      const snake = snakes.find((s) => String(s.uid) === li.dataset.id);
      if (snake && !snake.alive) {
        li.style.top = before.get(li.dataset.id) + "px";
        li.classList.add("leaving");
        li.addEventListener(
          "transitionend",
          (e) => {
            if (e.propertyName === "opacity") li.remove();
          },
          { once: true }
        );
      } else li.remove();
    }
    const byId = new Map();
    for (const li of boardEl.children) {
      if (!li.classList.contains("leaving")) byId.set(li.dataset.id, li);
    }
    if (!boardOrder.length) boardOrder = ranked.map((s) => String(s.uid));
    const aliveOrder = [];
    for (const id of boardOrder) {
      if (byId.has(id) && want.has(id)) aliveOrder.push(id);
    }
    for (const s of ranked) {
      const id = String(s.uid);
      if (!aliveOrder.includes(id)) aliveOrder.push(id);
    }
    boardOrder = aliveOrder;
    const targetAt = new Map(ranked.map((s, i) => [String(s.uid), i]));
    let switching = 0;
    const now = performance.now();
    for (const li of byId.values()) {
      if (li.dataset.switching !== "1") continue;
      const since = Number(li.dataset.switchAt || 0);
      if (!since || now - since > 1400) {
        delete li.dataset.switching;
        delete li.dataset.switchAt;
        continue;
      }
      switching++;
    }
    const misplaced = [];
    for (let i = 0; i < boardOrder.length; i++) {
      if (targetAt.get(boardOrder[i]) !== i) misplaced.push(boardOrder[i]);
    }
    if (misplaced.length > 0 && misplaced.length < 4) {
      boardOrder = ranked.map((s) => String(s.uid)).filter((id) => boardOrder.includes(id));
      for (const id of boardOrder) boardWait.delete(id);
      for (const li of byId.values()) {
        delete li.dataset.switching;
        delete li.dataset.switchAt;
      }
    } else {
      for (let i = 0; i < boardOrder.length; i++) {
        const id = boardOrder[i];
        if (targetAt.get(id) === i) boardWait.delete(id);
        else if (!boardWait.has(id)) boardWait.set(id, now);
      }
      let budget = 4 - switching;
      const used = new Set();
      while (budget >= 2) {
        const options = [];
        for (let i = 0; i < boardOrder.length - 1; i++) {
          if (used.has(i) || used.has(i + 1)) continue;
          const a = boardOrder[i];
          const b = boardOrder[i + 1];
          const ia = targetAt.get(a);
          const ib = targetAt.get(b);
          if (ia == null || ib == null || ia < ib) continue;
          const la = byId.get(a);
          const lb = byId.get(b);
          if ((la && la.dataset.switching === "1") || (lb && lb.dataset.switching === "1")) continue;
          const w = 1 + (now - (boardWait.get(a) || now)) + (now - (boardWait.get(b) || now));
          options.push({ i: i, w: w });
        }
        if (!options.length) break;
        let total = 0;
        for (let k = 0; k < options.length; k++) total += options[k].w;
        let roll = Math.random() * total;
        let pick = options[0];
        for (let k = 0; k < options.length; k++) {
          roll -= options[k].w;
          if (roll <= 0) {
            pick = options[k];
            break;
          }
        }
        const i = pick.i;
        const tmp = boardOrder[i];
        boardOrder[i] = boardOrder[i + 1];
        boardOrder[i + 1] = tmp;
        used.add(i);
        used.add(i + 1);
        budget -= 2;
      }
    }
    const shown = new Map(boardOrder.map((id, i) => [id, i]));
    let cursor = boardEl.firstChild;
    for (let i = 0; i < boardOrder.length; i++) {
      const id = boardOrder[i];
      const s = snakes.find((sn) => String(sn.uid) === id);
      let li = byId.get(id);
      const fresh = !li;
      if (!s) continue;
      if (!li) {
        li = document.createElement("li");
        li.dataset.id = id;
        li.innerHTML = "<span></span><span></span>";
        li.addEventListener(
          "animationend",
          () => li.classList.remove("entering"),
          { once: true }
        );
        byId.set(id, li);
      }
      syncBoardRow(li, s, shown.get(id));
      if (li !== cursor) boardEl.insertBefore(li, cursor);
      else cursor = cursor.nextSibling;
      if (fresh) li.classList.add("entering");
    }
    for (const li of [...boardEl.children]) {
      if (!li.classList.contains("leaving")) continue;
      let sib = li.nextSibling;
      let blocked = false;
      while (sib) {
        if (!sib.classList.contains("leaving")) blocked = true;
        sib = sib.nextSibling;
      }
      if (blocked) boardEl.appendChild(li);
    }
    for (const li of boardEl.children) {
      if (li.classList.contains("leaving") || li.classList.contains("entering")) continue;
      if (li.dataset.switching === "1") continue;
      const dy = before.get(li.dataset.id) - li.offsetTop;
      if (!Number.isFinite(dy) || Math.abs(dy) < 1) continue;
      li.dataset.switching = "1";
      li.dataset.switchAt = String(performance.now());
      li.addEventListener(
        "transitionend",
        (e) => {
          if (e.propertyName !== "transform") return;
          delete li.dataset.switching;
          delete li.dataset.switchAt;
        },
        { once: true }
      );
      li.style.transition = "none";
      li.style.transform = "translateY(" + dy + "px)";
      requestAnimationFrame(() => {
        li.style.transition = "";
        li.style.transform = "";
      });
    }
  }

  function drawHud(dt) {
    if (state === "attract" || state === "dead") return;
    const view = state === "play" ? player : spectate;
    if (!view) return;
    hudAcc += dt;
    if (hudAcc > 0.1) {
      hudAcc = 0;
      const sc = Math.round(state === "play" ? shownScore : scoreOf(view));
      scorelineEl.textContent = commas(sc);
      if (replay) {
        ranklineEl.textContent = replay.label || (replay.death ? "Kill cam" : "Kill cam · " + view.name);
      } else if (state === "tv") {
        ranklineEl.textContent =
          view.name +
          (view.alive ? "" : "  ·  wrecked") +
          "  ·  #" +
          commas(rankOf(view)) +
          " of " +
          commas(liveCount) +
          "  ·  " +
          commas(view.killed || 0) +
          " out";
      } else {
        ranklineEl.textContent =
          "#" + commas(playerRank) + " of " + commas(liveCount) + "  ·  " + commas(player ? player.killed : 0) + " out";
      }
      renderBoard();
    }
    drawMinimap();
  }

  function frame(t) {
    const dt = Math.min(0.033, (t - lastT) / 1000 || 0.016);
    lastT = t;
    if (replay) stepReplay(dt);
    else if (!paused) update(dt);
    drawArena();
    if (state !== "dead") drawNames();
    if (state !== "attract") {
      drawCursor();
      drawHud(dt);
    }
    requestAnimationFrame(frame);
  }

  function setPaused(on) {
    paused = !!on && (state === "play" || state === "tv") && !replay;
    pauseBtn.textContent = paused ? "Resume" : "Pause";
    pausedEl.classList.toggle("hidden", !paused);
    document.body.classList.toggle("paused", paused);
    if (paused) {
      setBoostHum(false);
      mouse.down = false;
    }
  }

  function togglePause() {
    if (state !== "play" && state !== "tv") return;
    if (replay) return;
    setPaused(!paused);
  }

  function setHudMode(mode) {
    const tv = mode === "tv";
    hintEl.classList.toggle("hidden", tv);
    tvHintEl.classList.toggle("hidden", !tv);
    tvLiveEl.classList.toggle("hidden", !tv);
    tvBackBtn.classList.toggle("hidden", !tv);
    tvChannelBtn.classList.toggle("hidden", !tv);
    pauseBtn.classList.toggle("hidden", mode !== "play" && mode !== "tv");
    document.body.classList.toggle("playing", mode === "play");
    document.body.classList.toggle("watching", tv);
    canvas.style.cursor = "default";
    if (mode !== "play" && mode !== "tv") setPaused(false);
  }

  function watch(s, lock) {
    if (!s || !s.alive) return;
    if (replay) {
      if (replay.death) return;
      endKillcam();
    }
    if (lock) tvAuto = false;
    if (spectate && spectate.uid === s.uid) {
      shownScore = scoreOf(s);
      return;
    }
    if (dist2(cam.x, cam.y, s.x, s.y) > 920 * 920) tvSnap = true;
    spectate = s;
    shownScore = scoreOf(s);
    tape.length = 0;
    pendingKillcam = false;
    pendingKillcamLabel = "";
    tvHold = 0;
    if (state === "attract") renderLiveMenu();
  }

  function peek(s) {
    if (!s || !s.alive) return;
    watch(s, true);
    cam.x = s.x;
    cam.y = s.y;
  }

  function snakeAtPointer() {
    const w = worldFromScreen(mouse.x, mouse.y);
    let best = null;
    let bestD = 1e9;
    for (let i = 0; i < snakes.length; i++) {
      const s = snakes[i];
      if (!s.alive) continue;
      const rad = snakeRadius(s) + 22;
      const hit = rad * rad;
      const dHead = dist2(w.x, w.y, s.x, s.y);
      if (dHead < hit && dHead < bestD) {
        best = s;
        bestD = dHead;
      }
      const pts = s.points;
      const step = Math.max(1, (pts.length / 18) | 0);
      for (let j = 0; j < pts.length; j += step) {
        const d = dist2(w.x, w.y, pts[j].x, pts[j].y);
        if (d < hit && d < bestD) {
          best = s;
          bestD = d;
        }
      }
    }
    return best;
  }

  function enterRound() {
    if (!snakes.some((s) => s.alive && !s.player)) resetWorld(true);
    for (let i = snakes.length - 1; i >= 0; i--) {
      if (snakes[i].player) snakes.splice(i, 1);
    }
    if (replay) {
      replay = null;
      killcamEl.classList.add("hidden");
      document.body.classList.remove("killcam");
    }
    tape.length = 0;
    pendingKillcam = false;
    pendingKillcamLabel = "";
    shake = 0;
    flash = 0;
    eatChain = 0;
    clearLengths();
    player = makeSnake({
      pos: clearPos(1600, 70),
      mass: 12.5,
      dots: 9,
      name: (nameInput.value.trim() || "You").slice(0, 16),
      player: true,
      skin: SKINS[skinIndex],
    });
    snakes.push(player);
    cam.x = player.x;
    cam.y = player.y;
    cam.z = 1.08;
    cam.tz = 1.08;
    shownScore = scoreOf(player);
    menuIds = "";
  }

  function play() {
    ensureAudio();
    const name = nameInput.value.trim() || "You";
    localStorage.setItem("sd-name", name);
    menuKillEl.textContent = "";
    menuKillEl.classList.add("hidden");
    startEl.classList.add("hidden");
    deadEl.classList.add("hidden");
    hudEl.classList.remove("hidden");
    setHudMode("play");
    state = "play";
    setPaused(false);
    enterRound();
  }

  function openTv(target) {
    ensureAudio();
    startEl.classList.add("hidden");
    deadEl.classList.add("hidden");
    hudEl.classList.remove("hidden");
    setHudMode("tv");
    state = "tv";
    setPaused(false);
    if (!snakes.some((s) => s.alive)) resetWorld(true);
    watch(target && target.alive ? target : pickTvShot() || leader || snakes.find((s) => s.alive), true);
    if (spectate) {
      cam.x = spectate.x;
      cam.y = spectate.y;
      cam.z = 1;
      cam.tz = 1;
      tvSnap = false;
    }
    tvHighlightT = 0;
    tvHighlightIn = nextHighlightWait();
  }

  function toMenu(focusSnake) {
    clearReplay();
    state = "attract";
    tape.length = 0;
    pendingKillcam = false;
    pendingKillcamLabel = "";
    hudEl.classList.add("hidden");
    deadEl.classList.add("hidden");
    startEl.classList.remove("hidden");
    setHudMode("menu");
    document.body.classList.remove("playing", "watching", "killcam");
    tvAuto = true;
    tvHold = 0;
    if (focusSnake && focusSnake.alive) peek(focusSnake);
    else spectate = null;
    renderLiveMenu();
  }

  startForm.addEventListener("submit", (e) => {
    e.preventDefault();
    play();
  });

  tvBackBtn.addEventListener("click", toMenu);
  tvChannelBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    changeChannel();
  });
  tvOpenBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openTv();
  });
  pauseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePause();
  });

  function pickFromBoard(el, e) {
    const row = e.target.closest("li[data-id]");
    if (!row || !el.contains(row)) return null;
    const id = Number(row.getAttribute("data-id"));
    return snakes.find((sn) => sn.alive && sn.uid === id) || null;
  }

  highscoresEl.addEventListener("pointerdown", (e) => {
    if (state !== "attract") return;
    const s = pickFromBoard(highscoresEl, e);
    if (s) openTv(s);
  });

  boardEl.addEventListener("pointerdown", (e) => {
    if (state !== "tv") return;
    const s = pickFromBoard(boardEl, e);
    if (!s) return;
    e.stopPropagation();
    watch(s, true);
  });

  function saveBoardBox() {
    localStorage.setItem(
      "sd-board",
      JSON.stringify({
        hidden: boardWrap.classList.contains("is-hidden"),
        w: boardWrap.style.width || "",
        h: boardWrap.style.height || "",
      })
    );
  }

  try {
    const box = JSON.parse(localStorage.getItem("sd-board") || "{}");
    if (box.w) boardWrap.style.width = box.w;
    if (box.h) boardWrap.style.height = box.h;
    boardWrap.classList.toggle("is-hidden", !!box.hidden);
  } catch (e) {}

  boardHideBtn.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    boardWrap.classList.add("is-hidden");
    saveBoardBox();
  });
  boardShowBtn.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    boardWrap.classList.remove("is-hidden");
    saveBoardBox();
  });

  let boardDrag = null;
  boardResizeEl.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = boardWrap.getBoundingClientRect();
    boardDrag = { x: e.clientX, y: e.clientY, w: rect.width, h: rect.height };
    boardResizeEl.setPointerCapture(e.pointerId);
  });
  boardResizeEl.addEventListener("pointermove", (e) => {
    if (!boardDrag) return;
    const w = Math.max(140, boardDrag.w + (boardDrag.x - e.clientX));
    const h = Math.max(120, boardDrag.h + (e.clientY - boardDrag.y));
    boardWrap.style.width = w + "px";
    boardWrap.style.height = h + "px";
  });
  boardResizeEl.addEventListener("pointerup", () => {
    if (!boardDrag) return;
    boardDrag = null;
    saveBoardBox();
  });

  feedEl.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
  });
  feedEl.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li || !feedEl.contains(li) || !li.clip) return;
    playNewsClip(li.clip, li.textContent);
  });

  againBtn.addEventListener("click", play);

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (state === "play" && !paused && !replay && (e.buttons & 1)) mouse.down = true;
    if (state === "attract" || state === "tv") {
      const onMap = state === "tv" && inMinimap(mouse.x, mouse.y);
      const hit = onMap ? snakeAtMinimap(mouse.x, mouse.y) : snakeAtPointer();
      canvas.style.cursor = hit ? "pointer" : "default";
    }
  });
  window.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button, input, #board, #highscores, #feed, #tv-live, #board-resize")) return;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    ensureAudio();
    if (state === "attract") {
      const s = snakeAtPointer();
      if (s) peek(s);
      return;
    }
    if (state === "tv") {
      if (inMinimap(mouse.x, mouse.y)) {
        const picked = snakeAtMinimap(mouse.x, mouse.y);
        if (picked) watch(picked, true);
        return;
      }
      const s = snakeAtPointer();
      if (s) watch(s, true);
      return;
    }
    if (state !== "play") return;
    if (paused || replay) return;
    mouse.down = true;
  });
  window.addEventListener("pointerup", (e) => {
    if (e.buttons & 1) return;
    mouse.down = false;
  });
  window.addEventListener("pointercancel", () => {
    mouse.down = false;
  });
  window.addEventListener("blur", () => {
    keys.clear();
    mouse.down = false;
    if (player) player.boosting = false;
    setBoostHum(false);
  });
  window.addEventListener("keydown", (e) => {
    keys.add(e.key.toLowerCase());
    if (e.code) keys.add(e.code.toLowerCase());
    if (e.code === "Space") e.preventDefault();
    if (e.code === "Space") ensureAudio();
    if (state === "tv" && e.code === "Space") {
      changeChannel();
      return;
    }
    if (state === "tv" && !replay && (e.key === "ArrowLeft" || e.key === "[")) {
      e.preventDefault();
      cycleWatch(-1);
      return;
    }
    if (state === "tv" && !replay && (e.key === "ArrowRight" || e.key === "]")) {
      e.preventDefault();
      cycleWatch(1);
      return;
    }
    if (e.key === "p" || e.key === "P") {
      e.preventDefault();
      togglePause();
      return;
    }
    if (e.key === "Escape" && replay) {
      endKillcam();
      return;
    }
    if (e.key === "Escape" && state === "play") {
      togglePause();
      return;
    }
    if (e.key === "Escape" && state === "tv") toMenu();
  });
  window.addEventListener("keyup", (e) => {
    keys.delete(e.key.toLowerCase());
    if (e.code) keys.delete(e.code.toLowerCase());
  });

  resize();
  resetWorld(true);
  mouse.x = cssW * 0.7;
  mouse.y = cssH * 0.4;
  requestAnimationFrame(frame);
})();
