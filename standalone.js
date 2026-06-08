const plantLibrary = [
  { id: "tomato", name: "Tomato", short: "Tom", color: "#d55445", sun: "full", spacing: 2.2, start: -42, transplant: 8, harvest: 74, water: "steady", companions: ["basil", "marigold"] },
  { id: "basil", name: "Basil", short: "Bas", color: "#3f8d5a", sun: "full", spacing: 1.2, start: -28, transplant: 14, harvest: 52, water: "steady", companions: ["tomato", "pepper"] },
  { id: "pepper", name: "Pepper", short: "Pep", color: "#c34b3f", sun: "full", spacing: 1.8, start: -56, transplant: 12, harvest: 82, water: "steady", companions: ["basil", "marigold"] },
  { id: "lettuce", name: "Lettuce", short: "Let", color: "#75a857", sun: "part", spacing: 1.0, start: -21, transplant: -7, harvest: 37, water: "even", companions: ["carrot", "radish"] },
  { id: "carrot", name: "Carrot", short: "Car", color: "#df8e32", sun: "full", spacing: 0.6, start: -14, transplant: 0, harvest: 70, water: "light", companions: ["lettuce", "radish"] },
  { id: "cucumber", name: "Cucumber", short: "Cuc", color: "#4f9b55", sun: "full", spacing: 2.5, start: -21, transplant: 14, harvest: 62, water: "deep", companions: ["radish", "marigold"] },
  { id: "zucchini", name: "Zucchini", short: "Zuc", color: "#477b45", sun: "full", spacing: 3.0, start: -14, transplant: 14, harvest: 58, water: "deep", companions: ["marigold"] },
  { id: "marigold", name: "Marigold", short: "Mar", color: "#d8942f", sun: "full", spacing: 1.0, start: -35, transplant: 14, harvest: 54, water: "light", companions: ["tomato", "pepper", "cucumber"] },
  { id: "spinach", name: "Spinach", short: "Spi", color: "#32784f", sun: "part", spacing: 0.8, start: -28, transplant: -14, harvest: 40, water: "even", companions: ["lettuce", "carrot"] },
  { id: "parsley", name: "Parsley", short: "Par", color: "#4e8c68", sun: "part", spacing: 1.0, start: -42, transplant: 7, harvest: 70, water: "steady", companions: ["tomato", "pepper"] }
];

const STORAGE_KEY = "sol-garden-plan-v1";
const USDA_ZONE_BY_ZIP = {
  "50161": { zone: "5b", frost: "2026-05-02", heat: "upper Midwest season", source: "USDA ZIP lookup" },
  "60614": { zone: "6a", frost: "2026-04-24", heat: "shorter spring", source: "USDA ZIP lookup" },
  "90210": { zone: "10b", frost: "2026-01-20", heat: "long warm season", source: "USDA ZIP lookup" },
  "73301": { zone: "9a", frost: "2026-02-20", heat: "hot long season", source: "USDA ZIP lookup" }
};

const EXTENSION_GUIDANCE = [
  { test: (zip) => /^50|^51|^52/.test(zip), source: "Iowa State University Extension", note: "Use cool-season crops early, wait for warm soil before tomatoes, peppers, cucumbers, and squash." },
  { test: (zip) => /^60|^61|^62/.test(zip), source: "University of Illinois Extension", note: "Group crops by water needs and keep rows reachable from both sides where possible." },
  { test: (zip) => /^55|^56/.test(zip), source: "University of Minnesota Extension", note: "Prioritize short-season varieties and protect tender crops from late spring cold snaps." },
  { test: () => true, source: "USDA and regional extension guidance", note: "Use your frost date, plant spacing, crop family, and water needs to place plants." }
];

const PLANT_STRATEGY = {
  tomato: { family: "nightshade", height: "tall", feed: "heavy", pest: "Add basil or marigold nearby to support pest management." },
  pepper: { family: "nightshade", height: "medium", feed: "heavy", pest: "Pair with basil or marigold and keep leaves off wet soil." },
  basil: { family: "herb", height: "low", feed: "light", pest: "Place near tomatoes and peppers for easy harvest and companion value." },
  lettuce: { family: "leaf", height: "low", feed: "medium", pest: "Use part-sun edges so leaves stay tender longer." },
  carrot: { family: "root", height: "low", feed: "light", pest: "Keep soil loose and avoid crowding roots." },
  cucumber: { family: "cucurbit", height: "tall", feed: "heavy", pest: "Give airflow and place near pollinator support plants." },
  zucchini: { family: "cucurbit", height: "wide", feed: "heavy", pest: "Put on an outside edge so large leaves do not block access." },
  marigold: { family: "flower", height: "low", feed: "light", pest: "Use as border plants near nightshades and cucurbits." },
  spinach: { family: "leaf", height: "low", feed: "medium", pest: "Use cooler part-sun space and steady moisture." },
  parsley: { family: "herb", height: "low", feed: "light", pest: "Keep near frequently harvested crops for easy access." }
};

const state = {
  activePlotId: "plot-1",
  activePageId: "homePage",
  completedTasks: [],
  plots: [
    {
      id: "plot-1",
      name: "Main bed",
      width: 12,
      length: 18,
      goal: "balanced",
      selected: new Map([
        ["tomato", 4],
        ["basil", 3],
        ["lettuce", 8],
        ["carrot", 12],
        ["marigold", 4]
      ]),
      placedPlants: []
    }
  ]
};

let activeDrag = null;
let saveTimer = null;

const els = {
  zip: document.querySelector("#zipInput"),
  plannerForm: document.querySelector("#plannerForm"),
  width: document.querySelector("#widthInput"),
  length: document.querySelector("#lengthInput"),
  goal: document.querySelector("#goalInput"),
  plotTabs: document.querySelector("#plotTabs"),
  addPlot: document.querySelector("#addPlotBtn"),
  plantList: document.querySelector("#plantList"),
  plantCount: document.querySelector("#plantCount"),
  zoneText: document.querySelector("#zoneText"),
  densityText: document.querySelector("#densityText"),
  saveStatus: document.querySelector("#saveStatus"),
  saveNow: document.querySelector("#saveNowBtn"),
  plotTitle: document.querySelector("#plotTitle"),
  plot: document.querySelector("#plot"),
  schedule: document.querySelector("#scheduleList"),
  insight: document.querySelector("#insightStrip"),
  shuffle: document.querySelector("#shuffleBtn"),
  export: document.querySelector("#exportBtn"),
  customForm: document.querySelector("#customPlantForm"),
  customName: document.querySelector("#customPlantName"),
  customSun: document.querySelector("#customPlantSun"),
  customSpacing: document.querySelector("#customPlantSpacing"),
  navButtons: document.querySelectorAll(".nav-btn"),
  pages: document.querySelectorAll(".page"),
  homePlotText: document.querySelector("#homePlotText"),
  homeZoneText: document.querySelector("#homeZoneText"),
  homeSaveText: document.querySelector("#homeSaveText"),
  widthLabel: document.querySelector("#widthLabel"),
  lengthLabel: document.querySelector("#lengthLabel"),
  taskPageList: document.querySelector("#taskPageList"),
  markTasks: document.querySelector("#markTasksBtn"),
  calendarGrid: document.querySelector("#calendarGrid"),
  askForm: document.querySelector("#askForm"),
  askInput: document.querySelector("#askInput"),
  chatWindow: document.querySelector("#chatWindow"),
  pageJumps: document.querySelectorAll("[data-page-jump]")
};

function activePlot() {
  return state.plots.find((plot) => plot.id === state.activePlotId);
}

function savePlan() {
  syncPlotFromControls();
  const plan = {
    zip: els.zip.value,
    activePlotId: state.activePlotId,
    activePageId: state.activePageId,
    completedTasks: state.completedTasks,
    plantLibrary,
    plots: state.plots.map((plot) => ({
      ...plot,
      selected: [...plot.selected.entries()]
    }))
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    setSaveStatus(`Autosaved ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`);
  } catch (error) {
    setSaveStatus("Not saved on this device");
    console.warn("SOL could not save this plan", error);
  }
}

function loadSavedPlan() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const plan = JSON.parse(saved);
    if (plan.zip) els.zip.value = plan.zip;
    if (Array.isArray(plan.plantLibrary)) {
      plantLibrary.splice(0, plantLibrary.length, ...plan.plantLibrary);
    }
    if (Array.isArray(plan.plots) && plan.plots.length) {
      state.plots.splice(
        0,
        state.plots.length,
        ...plan.plots.map((plot) => ({
          ...plot,
          selected: new Map(plot.selected || []),
          placedPlants: Array.isArray(plot.placedPlants) ? plot.placedPlants : []
        }))
      );
    }
    if (plan.activePlotId && state.plots.some((plot) => plot.id === plan.activePlotId)) {
      state.activePlotId = plan.activePlotId;
    }
    if (plan.activePageId) state.activePageId = plan.activePageId;
    if (Array.isArray(plan.completedTasks)) state.completedTasks = plan.completedTasks;
  } catch (error) {
    if (els.saveStatus) els.saveStatus.textContent = "Saved plan could not load";
    console.warn("SOL could not load the saved plan", error);
  }
}

function saveCurrentPlan() {
  savePlan();
  render();
}

function setSaveStatus(message) {
  if (els.saveStatus) els.saveStatus.textContent = message;
  if (els.homeSaveText) els.homeSaveText.textContent = message;
}

function queueAutoSave() {
  window.clearTimeout(saveTimer);
  setSaveStatus("Saving...");
  saveTimer = window.setTimeout(savePlan, 180);
}

function climateForZip(zip) {
  const digits = String(zip).replace(/\D/g, "");
  if (USDA_ZONE_BY_ZIP[digits]) return USDA_ZONE_BY_ZIP[digits];

  const prefix = Number(digits.slice(0, 2)) || 60;
  const prefix3 = Number(digits.slice(0, 3)) || 600;

  if (prefix3 >= 500 && prefix3 <= 528) return { zone: "5b", frost: "2026-05-02", heat: "upper Midwest season", source: "regional estimate" };
  if (prefix3 >= 530 && prefix3 <= 549) return { zone: "5a", frost: "2026-05-08", heat: "cool upper Midwest season", source: "regional estimate" };
  if (prefix3 >= 550 && prefix3 <= 567) return { zone: "4b", frost: "2026-05-14", heat: "short northern season", source: "regional estimate" };
  if (prefix3 >= 570 && prefix3 <= 588) return { zone: "4b", frost: "2026-05-16", heat: "short prairie season", source: "regional estimate" };
  if (prefix3 >= 590 && prefix3 <= 599) return { zone: "5a", frost: "2026-05-10", heat: "mountain plains season", source: "regional estimate" };
  if (prefix <= 9) return { zone: "9b", frost: "2026-02-12", heat: "long warm season", source: "regional estimate" };
  if (prefix <= 19) return { zone: "7a", frost: "2026-04-08", heat: "humid summers", source: "regional estimate" };
  if (prefix <= 39) return { zone: "8a", frost: "2026-03-25", heat: "long humid season", source: "regional estimate" };
  if (prefix <= 49) return { zone: "6b", frost: "2026-04-18", heat: "warm midsummer", source: "regional estimate" };
  if (prefix <= 69) return { zone: "6a", frost: "2026-04-24", heat: "shorter spring", source: "regional estimate" };
  if (prefix <= 79) return { zone: "7b", frost: "2026-03-30", heat: "hot dry spells", source: "regional estimate" };
  if (prefix <= 89) return { zone: "5b", frost: "2026-05-06", heat: "cool nights", source: "regional estimate" };
  return { zone: "9a", frost: "2026-03-02", heat: "dry summer edges", source: "regional estimate" };
}

function addDays(dateText, days) {
  const date = new Date(`${dateText}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date;
}

function formatDate(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function selectedPlantObjects(plot = activePlot()) {
  return [...plot.selected.entries()]
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => {
      const plant = plantLibrary.find((item) => item.id === id);
      return plant ? { ...plant, ...strategyForPlant(plant), qty } : null;
    })
    .filter((plant) => plant.id);
}

function strategyForPlant(plant) {
  return PLANT_STRATEGY[plant.id] || {
    family: "mixed",
    height: plant.spacing >= 2.5 ? "wide" : plant.spacing >= 1.8 ? "medium" : "low",
    feed: plant.spacing >= 2 ? "heavy" : "medium",
    pest: "Keep spacing open for airflow and easy inspection."
  };
}

function extensionForZip(zip) {
  const digits = String(zip).replace(/\D/g, "");
  return EXTENSION_GUIDANCE.find((item) => item.test(digits)) || EXTENSION_GUIDANCE[EXTENSION_GUIDANCE.length - 1];
}

function syncControlsFromPlot() {
  const plot = activePlot();
  els.width.value = plot.width;
  els.length.value = plot.length;
  els.goal.value = plot.goal;
}

function syncPlotFromControls() {
  const plot = activePlot();
  plot.width = clamp(Number(els.width.value) || 12, 2, 60);
  plot.length = clamp(Number(els.length.value) || 18, 2, 80);
  plot.goal = els.goal.value;
}

function addPlot() {
  const nextNumber = state.plots.length + 1;
  const plot = {
    id: `plot-${Date.now()}`,
    name: `Plot ${nextNumber}`,
    width: 8,
    length: 12,
    goal: "balanced",
    selected: new Map([["lettuce", 4], ["spinach", 4], ["parsley", 2]]),
    placedPlants: []
  };
  state.plots.push(plot);
  state.activePlotId = plot.id;
  syncControlsFromPlot();
  generateLayout();
}

function renderPlotTabs() {
  els.plotTabs.innerHTML = "";
  state.plots.forEach((plot) => {
    const count = [...plot.selected.values()].reduce((sum, qty) => sum + qty, 0);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `plot-tab${plot.id === state.activePlotId ? " active" : ""}`;
    button.dataset.plotId = plot.id;
    button.innerHTML = `<span>${plot.name}</span><small>${plot.width} x ${plot.length} ft - ${count} plants</small>`;
    els.plotTabs.append(button);
  });
}

function renderPlantPicker() {
  const plot = activePlot();
  els.plantList.innerHTML = "";
  plantLibrary.forEach((plant) => {
    const qty = plot.selected.get(plant.id) || 0;
    const row = document.createElement("div");
    row.className = `plant-option${qty ? " active" : ""}`;
    row.innerHTML = `
      <span class="plant-badge" style="background:${plant.color}">${plant.short.slice(0, 1)}</span>
      <span class="plant-meta">
        <strong>${plant.name}</strong>
        <span>${plant.spacing} ft spacing · ${plant.sun === "full" ? "full sun" : "part sun"}</span>
      </span>
      <span class="stepper">
        <button type="button" aria-label="Remove ${plant.name}" data-action="minus" data-id="${plant.id}">-</button>
        <output>${qty}</output>
        <button type="button" aria-label="Add ${plant.name}" data-action="plus" data-id="${plant.id}">+</button>
      </span>
    `;
    els.plantList.append(row);
  });
  els.plantCount.textContent = `${[...plot.selected.values()].reduce((sum, qty) => sum + qty, 0)} selected`;
}

function generateLayout() {
  syncPlotFromControls();
  const plot = activePlot();
  const items = selectedPlantObjects(plot).sort((a, b) => {
    const heightRank = { tall: 0, wide: 1, medium: 2, low: 3 };
    const feedRank = { heavy: 0, medium: 1, light: 2 };
    return (heightRank[a.height] - heightRank[b.height]) || (feedRank[a.feed] - feedRank[b.feed]);
  });
  let index = 0;

  plot.placedPlants = [];
  items.forEach((plant, plantIndex) => {
    for (let i = 0; i < plant.qty; i += 1) {
      const companionOffset = plant.companions.some((id) => plot.selected.has(id)) ? -0.035 : 0.035;
      const compact = plot.goal === "compact" ? 0.86 : plot.goal === "pollinator" && plant.id === "marigold" ? 1.2 : 1;
      const clearPathWidth = plot.width >= 7 ? 2 : 1;
      const usableWidth = Math.max(2, plot.width - clearPathWidth);
      const columns = Math.max(2, Math.floor(usableWidth / Math.max(plant.spacing * compact, 0.7)));
      const row = Math.floor(i / columns);
      const col = i % columns;
      const lane = strategicLane(plant, plantIndex) + companionOffset;
      const wave = Math.sin((index + plantIndex) * 1.7) * 0.035;
      const rawX = (col + 0.55) / columns;
      const sideOffset = plantIndex % 2 === 0 ? -0.08 : 0.08;
      const x = keepOutOfPath(clamp(rawX + sideOffset + wave, 0.08, 0.92), plant);
      const yBase = (row + 0.8) / Math.max(2.2, Math.ceil(plant.qty / columns) + 1.4);
      const y = clamp(lane * 0.68 + yBase * 0.28, 0.1, 0.9);
      const sizeFt = Math.max(1, plant.spacing * (plot.goal === "compact" ? 0.84 : 1));
      plot.placedPlants.push({ ...plant, uid: `${plot.id}-${plant.id}-${i}`, x, y, sizeFt });
      index += 1;
    }
  });

  spreadOverlaps(plot);
  render();
}

function strategicLane(plant, plantIndex) {
  if (plant.id === "marigold") return plantIndex % 2 ? 0.18 : 0.86;
  if (plant.height === "tall") return 0.2;
  if (plant.height === "wide") return 0.82;
  if (plant.sun === "part") return 0.64;
  return 0.44;
}

function keepOutOfPath(x, plant) {
  const buffer = plant.spacing > 2.2 ? 0.16 : 0.1;
  if (x > 0.5 - buffer && x < 0.5 + buffer) {
    return x < 0.5 ? 0.5 - buffer : 0.5 + buffer;
  }
  return x;
}

function spreadOverlaps(plot) {
  for (let pass = 0; pass < 16; pass += 1) {
    for (let a = 0; a < plot.placedPlants.length; a += 1) {
      for (let b = a + 1; b < plot.placedPlants.length; b += 1) {
        const first = plot.placedPlants[a];
        const second = plot.placedPlants[b];
        const dxFt = (second.x - first.x) * plot.width;
        const dyFt = (second.y - first.y) * plot.length;
        const dist = Math.hypot(dxFt, dyFt) || 0.01;
        const minDist = (first.spacing + second.spacing) * 0.38;
        if (dist < minDist) {
          const push = ((minDist - dist) / minDist) * 0.012;
          const ux = dxFt / dist;
          const uy = dyFt / dist;
          first.x = clamp(first.x - ux * push, 0.06, 0.94);
          first.y = clamp(first.y - uy * push, 0.06, 0.94);
          second.x = clamp(second.x + ux * push, 0.06, 0.94);
          second.y = clamp(second.y + uy * push, 0.06, 0.94);
        }
      }
    }
  }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function render() {
  const plot = activePlot();
  const climate = climateForZip(els.zip.value);
  const extension = extensionForZip(els.zip.value);
  const area = plot.width * plot.length;
  const used = selectedPlantObjects(plot).reduce((sum, plant) => sum + plant.qty * plant.spacing * plant.spacing, 0);
  const density = used / Math.max(area, 1);

  els.plotTitle.textContent = `${plot.name}: ${plot.width} x ${plot.length} ft`;
  els.widthLabel.textContent = `${plot.width} ft wide`;
  els.lengthLabel.textContent = `${plot.length} ft long`;
  els.zoneText.textContent = `${climate.source === "USDA ZIP lookup" ? "USDA Zone" : "Est. Zone"} ${climate.zone} · Last frost ${formatDate(new Date(`${climate.frost}T12:00:00`))}`;
  els.densityText.textContent = density > 1.05 ? "Tight" : density > 0.72 ? "Productive" : "Comfortable";
  els.plot.style.aspectRatio = `${plot.width} / ${plot.length}`;
  els.plot.style.setProperty("--grid-x", `${100 / plot.width}%`);
  els.plot.style.setProperty("--grid-y", `${100 / plot.length}%`);
  if (els.homePlotText) els.homePlotText.textContent = `${plot.name}: ${plot.width} x ${plot.length} ft`;
  if (els.homeZoneText) els.homeZoneText.textContent = `${climate.zone} · ${extension.source}`;

  renderPlotTabs();
  renderPlantPicker();
  renderPlot();
  renderInsights(plot, density, climate, extension);
  renderSchedule(plot, climate);
  renderPages();
  savePlan();
}

function renderPlot() {
  const plot = activePlot();
  els.plot.innerHTML = "";
  if (!plot.placedPlants.length) {
    els.plot.innerHTML = `<div class="empty-state">Choose plants for this plot</div>`;
    return;
  }

  plot.placedPlants.forEach((plant) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "plant-chip";
    chip.dataset.uid = plant.uid;
    chip.style.left = `${plant.x * 100}%`;
    chip.style.top = `${plant.y * 100}%`;
    chip.style.background = plant.color;
    chip.style.setProperty("--size", `${clamp((plant.sizeFt / plot.width) * els.plot.clientWidth, 34, 78)}px`);
    chip.title = `${plant.name}: drag to move`;
    chip.innerHTML = `<small>${plant.short}</small>`;
    chip.addEventListener("pointerdown", startDrag);
    chip.addEventListener("mousedown", startMouseDrag);
    els.plot.append(chip);
  });
}

function renderInsights(plot, density, climate, extension = extensionForZip(els.zip.value)) {
  const groups = selectedPlantObjects(plot);
  const companionCount = groups.filter((plant) => plant.companions.some((id) => plot.selected.has(id))).length;
  const water = groups.some((plant) => plant.water === "deep") ? "Deep watering zone on the sunny edge" : "Even watering across shallow rows";
  const heavyFeeders = groups.filter((plant) => plant.feed === "heavy").map((plant) => plant.name);
  const pestNote = groups.find((plant) => plant.pest)?.pest || extension.note;
  const notes = [
    ["Layout logic", `${companionCount} companion pairings, ${density > 1 ? "compressed" : "clear"} spacing, center access path, ${climate.heat}.`],
    ["Plot scale", `Each grid square represents 1 sq ft inside a ${plot.width * plot.length} sq ft plot.`],
    ["Care pattern", `${water}. ${heavyFeeders.length ? `Feed compost near ${heavyFeeders.slice(0, 2).join(" and ")}.` : pestNote}`]
  ];
  els.insight.innerHTML = notes.map(([title, copy]) => `<div class="insight"><strong>${title}</strong><span>${copy}</span></div>`).join("");
}

function scheduleTasks(plot, climate) {
  const tasks = [];
  selectedPlantObjects(plot).forEach((plant) => {
    tasks.push({
      date: addDays(climate.frost, plant.start),
      title: `Start ${plant.name}`,
      copy: plant.start < -1 ? "Sow indoors or under cover based on frost timing." : "Direct sow once soil can be worked.",
      key: `${plot.id}-${plant.id}-start`
    });
    tasks.push({
      date: addDays(climate.frost, plant.transplant),
      title: `Plant ${plant.name}`,
      copy: `${plant.sun === "full" ? "Use the brightest band" : "Use a cooler part-sun band"} with ${plant.spacing} ft spacing.`,
      key: `${plot.id}-${plant.id}-plant`
    });
    tasks.push({
      date: addDays(climate.frost, plant.harvest),
      title: `Harvest ${plant.name}`,
      copy: `Check every few days and keep watering ${plant.water}.`,
      key: `${plot.id}-${plant.id}-harvest`
    });
  });

  tasks.sort((a, b) => a.date - b.date);
  return tasks;
}

function renderSchedule(plot, climate) {
  const tasks = scheduleTasks(plot, climate);
  els.schedule.innerHTML = tasks.length
    ? tasks.slice(0, 16).map((task) => `
      <li class="schedule-item">
        <time class="schedule-date">${formatDate(task.date)}</time>
        <span class="schedule-copy"><strong>${task.title}</strong><span>${task.copy}</span></span>
      </li>
    `).join("")
    : `<li class="schedule-item"><time class="schedule-date">Ready</time><span class="schedule-copy"><strong>No plants selected</strong><span>Add plants to create this plot's calendar.</span></span></li>`;
}

function renderPages() {
  els.pages.forEach((page) => page.classList.toggle("active", page.id === state.activePageId));
  els.navButtons.forEach((button) => button.classList.toggle("active", button.dataset.page === state.activePageId));
  renderTaskPage();
  renderCalendarPage();
  renderAskIntro();
}

function renderTaskPage() {
  const plot = activePlot();
  const tasks = scheduleTasks(plot, climateForZip(els.zip.value)).slice(0, 24);
  els.taskPageList.innerHTML = tasks.length
    ? tasks.map((task) => {
      const complete = state.completedTasks.includes(task.key);
      return `
        <li class="schedule-item${complete ? " complete" : ""}">
          <time class="schedule-date">${formatDate(task.date)}</time>
          <span class="schedule-copy"><strong>${task.title}</strong><span>${task.copy}</span></span>
        </li>
      `;
    }).join("")
    : `<li class="schedule-item"><time class="schedule-date">Ready</time><span class="schedule-copy"><strong>No tasks yet</strong><span>Add plants on the Layout page to build your task list.</span></span></li>`;
}

function renderCalendarPage() {
  const tasks = scheduleTasks(activePlot(), climateForZip(els.zip.value));
  const byMonth = tasks.reduce((months, task) => {
    const month = task.date.toLocaleDateString("en-US", { month: "long" });
    if (!months[month]) months[month] = [];
    months[month].push(task);
    return months;
  }, {});

  els.calendarGrid.innerHTML = Object.keys(byMonth).length
    ? Object.entries(byMonth).map(([month, monthTasks]) => `
      <section class="month-card">
        <h3>${month}</h3>
        ${monthTasks.slice(0, 6).map((task) => `<p><strong>${formatDate(task.date)}</strong> ${task.title}</p>`).join("")}
      </section>
    `).join("")
    : `<section class="month-card"><h3>No dates yet</h3><p>Add plants to create a calendar.</p></section>`;
}

function renderAskIntro() {
  if (els.chatWindow.children.length) return;
  const climate = climateForZip(els.zip.value);
  const extension = extensionForZip(els.zip.value);
  els.chatWindow.innerHTML = `
    <div class="chat-message sol-message">
      <strong>SOL</strong>
      <span>I can answer using this garden plan, USDA zone ${climate.zone}, and ${extension.source} style guidance.</span>
    </div>
  `;
}

function startDrag(event) {
  event.preventDefault();
  const uid = event.currentTarget.dataset.uid;
  activeDrag = { uid, el: event.currentTarget };
  activeDrag.el.classList.add("dragging");
  activeDrag.el.setPointerCapture(event.pointerId);
  activeDrag.el.addEventListener("pointermove", dragPlant);
  activeDrag.el.addEventListener("pointerup", stopDrag, { once: true });
}

function startMouseDrag(event) {
  if (activeDrag) return;
  event.preventDefault();
  const uid = event.currentTarget.dataset.uid;
  activeDrag = { uid, el: event.currentTarget };
  activeDrag.el.classList.add("dragging");
  document.addEventListener("mousemove", dragPlant);
  document.addEventListener("mouseup", stopMouseDrag, { once: true });
}

function dragPlant(event) {
  if (!activeDrag) return;
  const rect = els.plot.getBoundingClientRect();
  const plant = activePlot().placedPlants.find((item) => item.uid === activeDrag.uid);
  if (!plant) return;
  plant.x = clamp((event.clientX - rect.left) / rect.width, 0.04, 0.96);
  plant.y = clamp((event.clientY - rect.top) / rect.height, 0.04, 0.96);
  activeDrag.el.style.left = `${plant.x * 100}%`;
  activeDrag.el.style.top = `${plant.y * 100}%`;
}

function stopDrag(event) {
  activeDrag.el.releasePointerCapture(event.pointerId);
  activeDrag.el.removeEventListener("pointermove", dragPlant);
  finishDrag();
}

function stopMouseDrag() {
  document.removeEventListener("mousemove", dragPlant);
  finishDrag();
}

function finishDrag() {
  if (!activeDrag) return;
  activeDrag.el.classList.remove("dragging");
  activeDrag = null;
  const plot = activePlot();
  renderInsights(plot, calculateDensity(plot), climateForZip(els.zip.value));
  savePlan();
}

function calculateDensity(plot) {
  const area = plot.width * plot.length;
  const used = selectedPlantObjects(plot).reduce((sum, plant) => sum + plant.qty * plant.spacing * plant.spacing, 0);
  return used / Math.max(area, 1);
}

function exportPlan() {
  const climate = climateForZip(els.zip.value);
  const lines = [
    "SOL plan",
    `ZIP: ${els.zip.value}`,
    `Zone: ${climate.zone}`,
    "",
    ...state.plots.flatMap((plot) => [
      `${plot.name}: ${plot.width} x ${plot.length} ft`,
      "Plants:",
      ...selectedPlantObjects(plot).map((plant) => `- ${plant.qty} ${plant.name}`),
      "Layout:",
      ...plot.placedPlants.map((plant) => `- ${plant.name}: ${(plant.x * 100).toFixed(0)}% across, ${(plant.y * 100).toFixed(0)}% down`),
      ""
    ])
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "sol-plan.txt";
  link.click();
  URL.revokeObjectURL(link.href);
}

function switchPage(pageId) {
  if (!document.getElementById(pageId)) return;
  state.activePageId = pageId;
  renderPages();
  queueAutoSave();
}

function markNextTaskDone() {
  const task = scheduleTasks(activePlot(), climateForZip(els.zip.value)).find((item) => !state.completedTasks.includes(item.key));
  if (!task) return;
  state.completedTasks.push(task.key);
  renderTaskPage();
  queueAutoSave();
}

function answerGardenQuestion(question) {
  const lower = question.toLowerCase();
  const plot = activePlot();
  const climate = climateForZip(els.zip.value);
  const extension = extensionForZip(els.zip.value);
  const plants = selectedPlantObjects(plot);
  const plantNames = plants.map((plant) => plant.name).join(", ") || "your selected plants";
  const heavy = plants.filter((plant) => plant.feed === "heavy").map((plant) => plant.name);
  const companions = plants.filter((plant) => plant.companions.some((id) => plot.selected.has(id))).map((plant) => plant.name);

  if (lower.includes("water")) {
    return `For ${plantNames}, keep the center path clear and water at the base. Deep-water ${plants.filter((plant) => plant.water === "deep").map((plant) => plant.name).join(", ") || "larger fruiting plants"} more slowly, and keep leafy crops evenly moist.`;
  }
  if (lower.includes("pest") || lower.includes("bug")) {
    return companions.length
      ? `Your best pest-management helpers are the companion groupings around ${companions.slice(0, 4).join(", ")}. Keep airflow open and check leaf undersides when you water.`
      : "Add flowers or herbs near fruiting crops, keep plants spaced for airflow, and inspect leaves when you water.";
  }
  if (lower.includes("soil") || lower.includes("compost")) {
    return heavy.length
      ? `Add compost before planting and feed the heavier crops first: ${heavy.slice(0, 4).join(", ")}. Rotate those crop families next season so the same bed does not carry all the soil demand.`
      : "Use compost before planting, mulch after seedlings are established, and rotate crop families next season.";
  }
  if (lower.includes("zone") || lower.includes("zip")) {
    return `For ZIP ${els.zip.value || "your area"}, SOL is using USDA zone ${climate.zone} and a last-frost estimate of ${formatDate(new Date(`${climate.frost}T12:00:00`))}. ${extension.source} guidance says: ${extension.note}`;
  }
  return `Based on this ${plot.width} x ${plot.length} ft plot, USDA zone ${climate.zone}, and ${extension.source} guidance, I would keep the access path clear, place tall crops toward the back, group similar water needs, and use companion flowers or herbs near fruiting crops.`;
}

function askSol(event) {
  event.preventDefault();
  const question = els.askInput.value.trim();
  if (!question) return;
  const answer = answerGardenQuestion(question);
  els.chatWindow.insertAdjacentHTML("beforeend", `
    <div class="chat-message user-message"><strong>You</strong><span>${escapeHtml(question)}</span></div>
    <div class="chat-message sol-message"><strong>SOL</strong><span>${escapeHtml(answer)}</span></div>
  `);
  els.askInput.value = "";
  els.chatWindow.scrollTop = els.chatWindow.scrollHeight;
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function addCustomPlant(event) {
  event.preventDefault();
  const name = els.customName.value.trim();
  if (!name) return;
  const id = `custom-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
  plantLibrary.push({
    id,
    name,
    short: name.slice(0, 3),
    color: "#4c8fad",
    sun: els.customSun.value,
    spacing: Number(els.customSpacing.value) || 1.5,
    start: -21,
    transplant: 7,
    harvest: 60,
    water: "steady",
    companions: []
  });
  activePlot().selected.set(id, 1);
  els.customName.value = "";
  generateLayout();
}

els.plotTabs.addEventListener("click", (event) => {
  const button = event.target.closest(".plot-tab");
  if (!button) return;
  state.activePlotId = button.dataset.plotId;
  syncControlsFromPlot();
  render();
});

els.plantList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const plot = activePlot();
  const current = plot.selected.get(button.dataset.id) || 0;
  const next = button.dataset.action === "plus" ? current + 1 : Math.max(0, current - 1);
  if (next) plot.selected.set(button.dataset.id, next);
  else plot.selected.delete(button.dataset.id);
  generateLayout();
});

[els.width, els.length, els.goal].forEach((input) => {
  input.addEventListener("input", generateLayout);
  input.addEventListener("change", generateLayout);
});

els.zip.addEventListener("input", render);
els.zip.addEventListener("change", render);
els.addPlot.addEventListener("click", addPlot);
els.shuffle.addEventListener("click", generateLayout);
els.export.addEventListener("click", exportPlan);
els.customForm.addEventListener("submit", addCustomPlant);
els.navButtons.forEach((button) => {
  button.addEventListener("click", () => switchPage(button.dataset.page));
});
els.pageJumps.forEach((button) => {
  button.addEventListener("click", () => switchPage(button.dataset.pageJump));
});
els.plannerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveCurrentPlan();
});
els.saveNow.addEventListener("click", saveCurrentPlan);
els.markTasks.addEventListener("click", markNextTaskDone);
els.askForm.addEventListener("submit", askSol);
[els.zip, els.width, els.length, els.goal].forEach((input) => {
  input.addEventListener("blur", saveCurrentPlan);
  input.addEventListener("input", queueAutoSave);
  input.addEventListener("change", queueAutoSave);
});
window.addEventListener("resize", renderPlot);
window.addEventListener("beforeunload", savePlan);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") savePlan();
});

loadSavedPlan();
syncControlsFromPlot();
if (activePlot().placedPlants.length) render();
else generateLayout();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.warn("SOL service worker registration failed", error);
    });
  });
}
