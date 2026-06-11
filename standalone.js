const plantLibrary = [
  { id: "tomato", name: "Tomato", short: "Tom", color: "#8d4737", sun: "full", spacing: 2.2, start: -42, transplant: 8, harvest: 74, water: "steady", companions: ["basil", "marigold"] },
  { id: "basil", name: "Basil", short: "Bas", color: "#6d7e43", sun: "full", spacing: 1.2, start: -28, transplant: 14, harvest: 52, water: "steady", companions: ["tomato", "pepper"] },
  { id: "pepper", name: "Pepper", short: "Pep", color: "#5a4435", sun: "full", spacing: 1.8, start: -56, transplant: 12, harvest: 82, water: "steady", companions: ["basil", "marigold"] },
  { id: "lettuce", name: "Lettuce", short: "Let", color: "#8dbbd0", sun: "part", spacing: 1.0, start: -21, transplant: -7, harvest: 37, water: "even", companions: ["carrot", "radish"] },
  { id: "carrot", name: "Carrot", short: "Car", color: "#8d4737", sun: "full", spacing: 0.6, start: -14, transplant: 0, harvest: 70, water: "light", companions: ["lettuce", "radish"] },
  { id: "cucumber", name: "Cucumber", short: "Cuc", color: "#6d7e43", sun: "full", spacing: 2.5, start: -21, transplant: 14, harvest: 62, water: "deep", companions: ["radish", "marigold"] },
  { id: "zucchini", name: "Zucchini", short: "Zuc", color: "#36411b", sun: "full", spacing: 3.0, start: -14, transplant: 14, harvest: 58, water: "deep", companions: ["marigold"] },
  { id: "marigold", name: "Marigold", short: "Mar", color: "#8d4737", sun: "full", spacing: 1.0, start: -35, transplant: 14, harvest: 54, water: "light", companions: ["tomato", "pepper", "cucumber"] },
  { id: "spinach", name: "Spinach", short: "Spi", color: "#6d7e43", sun: "part", spacing: 0.8, start: -28, transplant: -14, harvest: 40, water: "even", companions: ["lettuce", "carrot"] },
  { id: "parsley", name: "Parsley", short: "Par", color: "#36411b", sun: "part", spacing: 1.0, start: -42, transplant: 7, harvest: 70, water: "steady", companions: ["tomato", "pepper"] },
  { id: "radish", name: "Radish", short: "Rad", color: "#8d4737", sun: "full", spacing: 0.5, start: -21, transplant: -7, harvest: 25, water: "even", companions: ["lettuce", "carrot", "cucumber"] },
  { id: "bean", name: "Bush Bean", short: "Bean", color: "#6d7e43", sun: "full", spacing: 0.8, start: 7, transplant: 14, harvest: 56, water: "even", companions: ["carrot", "cucumber", "marigold"] }
];

const STORAGE_KEY = "cultivaite-garden-plan-v1";
const LEGACY_STORAGE_KEY = "sol-garden-plan-v1";
const USDA_ZONE_BY_ZIP = {
  "50161": { zone: "5b", frost: "2026-05-02", heat: "upper Midwest season", source: "USDA ZIP lookup" },
  "60614": { zone: "6a", frost: "2026-04-24", heat: "shorter spring", source: "USDA ZIP lookup" },
  "90210": { zone: "10b", frost: "2026-01-20", heat: "long warm season", source: "USDA ZIP lookup" },
  "73301": { zone: "9a", frost: "2026-02-20", heat: "hot long season", source: "USDA ZIP lookup" }
};

const EXTENSION_GUIDANCE = [
  { test: (zip) => /^50|^51|^52/.test(zip), source: "Iowa State University Extension", region: "Iowa", coolStart: -28, warmDelay: 10, note: "Use cool-season crops early, wait for warm soil before tomatoes, peppers, cucumbers, and squash." },
  { test: (zip) => /^60|^61|^62/.test(zip), source: "University of Illinois Extension", region: "Illinois", coolStart: -24, warmDelay: 8, note: "Group crops by water needs and keep rows reachable from both sides where possible." },
  { test: (zip) => /^55|^56/.test(zip), source: "University of Minnesota Extension", region: "Minnesota", coolStart: -21, warmDelay: 14, note: "Prioritize short-season varieties and protect tender crops from late spring cold snaps." },
  { test: (zip) => /^90|^91|^92|^93|^94|^95|^96/.test(zip), source: "California Extension-style regional guidance", region: "California", coolStart: -42, warmDelay: 0, note: "Use the long season, but group crops by irrigation need and give warm-season plants airflow." },
  { test: (zip) => /^73|^74|^75|^76|^77|^78|^79/.test(zip), source: "Southern Plains extension-style guidance", region: "Southern Plains", coolStart: -42, warmDelay: 0, note: "Plant cool-season crops early and protect soil moisture during hot stretches." },
  { test: () => true, source: "USDA and regional extension guidance", region: "Regional", coolStart: -21, warmDelay: 10, note: "Use your frost date, plant spacing, crop family, and water needs to place plants." }
];

const PLANT_STRATEGY = {
  tomato: { family: "nightshade", height: "tall", feed: "heavy", cropType: "fruit", pest: "Add basil or marigold nearby to support pest management." },
  pepper: { family: "nightshade", height: "medium", feed: "heavy", cropType: "fruit", pest: "Pair with basil or marigold and keep leaves off wet soil." },
  basil: { family: "herb", height: "low", feed: "light", pest: "Place near tomatoes and peppers for easy harvest and companion value." },
  lettuce: { family: "leaf", height: "low", feed: "medium", cropType: "leaf", pest: "Use part-sun edges so leaves stay tender longer." },
  carrot: { family: "root", height: "low", feed: "light", cropType: "root", pest: "Keep soil loose and avoid crowding roots." },
  cucumber: { family: "cucurbit", height: "tall", feed: "heavy", cropType: "fruit", pest: "Give airflow and place near pollinator support plants." },
  zucchini: { family: "cucurbit", height: "wide", feed: "heavy", cropType: "fruit", pest: "Put on an outside edge so large leaves do not block access." },
  marigold: { family: "flower", height: "low", feed: "light", pest: "Use as border plants near nightshades and cucurbits." },
  spinach: { family: "leaf", height: "low", feed: "medium", cropType: "leaf", pest: "Use cooler part-sun space and steady moisture." },
  parsley: { family: "herb", height: "low", feed: "light", pest: "Keep near frequently harvested crops for easy access." },
  radish: { family: "root", height: "low", feed: "light", cropType: "root", pest: "Tuck radishes near cucumbers, lettuce, and carrots as quick harvest markers." },
  bean: { family: "legume", height: "medium", feed: "soil-builder", cropType: "fruit", pest: "Use beans as a soil-supporting rotation crop near roots and cucurbits." }
};

const COMPANION_WARNINGS = [
  { plants: ["tomato", "pepper"], note: "Tomatoes and peppers share a crop family, so rotate this bed next season to reduce disease pressure." },
  { plants: ["cucumber", "zucchini"], note: "Cucumbers and zucchini are both cucurbits; keep airflow strong and scout for mildew or beetle pressure." },
  { plants: ["lettuce", "spinach"], note: "Leafy greens can share a cooler, steady-moisture area and benefit from afternoon shade." },
  { plants: ["carrot", "radish"], note: "Radishes mature quickly and can mark carrot rows while roots develop." }
];

const state = {
  activePlotId: "plot-1",
  activePageId: "homePage",
  selectedPlantUid: "",
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
  plantEditor: document.querySelector("#plantEditor"),
  selectedPlantText: document.querySelector("#selectedPlantText"),
  centerPlant: document.querySelector("#centerPlantBtn"),
  removePlant: document.querySelector("#removePlantBtn"),
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
    selectedPlantUid: state.selectedPlantUid,
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
    console.warn("CultivAIte could not save this plan", error);
  }
}

function loadSavedPlan() {
  const saved = window.localStorage.getItem(STORAGE_KEY) || window.localStorage.getItem(LEGACY_STORAGE_KEY);
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
    if (plan.selectedPlantUid) state.selectedPlantUid = plan.selectedPlantUid;
    if (Array.isArray(plan.completedTasks)) state.completedTasks = plan.completedTasks;
  } catch (error) {
    if (els.saveStatus) els.saveStatus.textContent = "Saved plan could not load";
    console.warn("CultivAIte could not load the saved plan", error);
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

function zipFromQuestion(question) {
  const match = String(question || "").match(/\b\d{5}\b/);
  return match ? match[0] : "";
}

function zipForQuestion(question) {
  return zipFromQuestion(question) || els.zip.value;
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
    cropType: plant.sun === "part" ? "leaf" : "mixed",
    pest: "Keep spacing open for airflow and easy inspection."
  };
}

function extensionForZip(zip) {
  const digits = String(zip).replace(/\D/g, "");
  return EXTENSION_GUIDANCE.find((item) => item.test(digits)) || EXTENSION_GUIDANCE[EXTENSION_GUIDANCE.length - 1];
}

function assessGarden(plot, climate = climateForZip(els.zip.value), extension = extensionForZip(els.zip.value)) {
  const plants = selectedPlantObjects(plot);
  const area = plot.width * plot.length;
  const usedArea = plants.reduce((sum, plant) => sum + plant.qty * plant.spacing * plant.spacing, 0);
  const density = usedArea / Math.max(area, 1);
  const families = countBy(plants, "family");
  const waterGroups = countBy(plants, "water");
  const heavyFeeders = plants.filter((plant) => plant.feed === "heavy");
  const soilBuilders = plants.filter((plant) => plant.feed === "soil-builder");
  const selectedIds = new Set(plants.map((plant) => plant.id));
  const warnings = [];
  const wins = [];

  if (density > 1.05) warnings.push("This bed is crowded. Reduce plants or use the compact goal so airflow and harvest access do not suffer.");
  else if (density > 0.78) wins.push("This is a productive density, but keep pruning and airflow on your weekly task list.");
  else wins.push("Spacing is comfortable enough for watering, pruning, and weeding.");

  if (plot.width > 4 && plot.width < 7) warnings.push("Beds wider than 4 ft are hard to reach across. CultivAIte is keeping a center access path visible.");
  if (plot.width >= 7) wins.push("A center path is reserved so both sides of the bed stay reachable.");

  Object.entries(families).forEach(([family, count]) => {
    if (count >= 2 && ["nightshade", "cucurbit", "leaf"].includes(family)) {
      warnings.push(`${titleCase(family)} crops are clustered here. Rotate this family away from this plot next season.`);
    }
  });

  COMPANION_WARNINGS.forEach((rule) => {
    if (rule.plants.every((id) => selectedIds.has(id))) wins.push(rule.note);
  });

  if (heavyFeeders.length && !soilBuilders.length) {
    warnings.push(`Heavy feeders like ${heavyFeeders.slice(0, 3).map((plant) => plant.name).join(", ")} need compost and rotation support.`);
  }
  if (soilBuilders.length) wins.push("Beans are included as a soil-supporting crop for rotation balance.");
  if (!selectedIds.has("marigold") && [...selectedIds].some((id) => ["tomato", "pepper", "cucumber", "zucchini"].includes(id))) {
    warnings.push("Add marigold or another flower border to support beneficial insects and pest scouting.");
  }
  if (waterGroups.deep && waterGroups.light) warnings.push("Deep-water crops and light-water crops are mixed. Keep them in separate bands when possible.");

  return { area, usedArea, density, families, waterGroups, heavyFeeders, soilBuilders, warnings, wins, extension, climate };
}

function countBy(items, key) {
  return items.reduce((counts, item) => {
    const value = item[key] || "mixed";
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

function titleCase(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function taskTimingForPlant(plant, extension) {
  const isCoolSeason = ["leaf", "root"].includes(plant.cropType);
  const isWarmSeason = ["nightshade", "cucurbit"].includes(plant.family);
  return {
    start: isCoolSeason ? Math.min(plant.start, extension.coolStart) : plant.start,
    transplant: isWarmSeason ? plant.transplant + extension.warmDelay : plant.transplant,
    harvest: plant.harvest
  };
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

function selectedPlacedPlant() {
  return activePlot().placedPlants.find((plant) => plant.uid === state.selectedPlantUid);
}

function selectPlacedPlant(uid) {
  const plot = activePlot();
  state.selectedPlantUid = plot.placedPlants.some((plant) => plant.uid === uid) ? uid : "";
  renderPlot();
  renderPlantEditor();
  queueAutoSave();
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
  const assessment = assessGarden(plot);
  const items = selectedPlantObjects(plot).sort((a, b) => {
    const heightRank = { tall: 0, wide: 1, medium: 2, low: 3 };
    const feedRank = { heavy: 0, "soil-builder": 1, medium: 2, light: 3 };
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
      const lane = strategicLane(plant, plantIndex, assessment) + companionOffset;
      const wave = Math.sin((index + plantIndex) * 1.7) * 0.035;
      const rawX = (col + 0.55) / columns;
      const sideOffset = layoutSideOffset(plant, plantIndex);
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

function strategicLane(plant, plantIndex, assessment) {
  if (plant.id === "marigold") return plantIndex % 2 ? 0.18 : 0.86;
  if (plant.feed === "soil-builder") return 0.5;
  if (plant.height === "tall") return 0.2;
  if (plant.height === "wide") return 0.82;
  if (plant.water === "deep") return 0.76;
  if (assessment.waterGroups.deep && plant.water === "light") return 0.34;
  if (plant.sun === "part") return 0.64;
  return 0.44;
}

function layoutSideOffset(plant, plantIndex) {
  if (plant.height === "wide") return plantIndex % 2 === 0 ? -0.18 : 0.18;
  if (plant.feed === "heavy") return plantIndex % 2 === 0 ? -0.12 : 0.12;
  if (plant.feed === "soil-builder") return plantIndex % 2 === 0 ? 0.18 : -0.18;
  return plantIndex % 2 === 0 ? -0.08 : 0.08;
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
  const assessment = assessGarden(plot, climate, extension);
  const density = assessment.density;

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
  renderPlantEditor();
  renderInsights(plot, assessment);
  renderSchedule(plot, climate);
  renderPages();
  savePlan();
}

function renderPlot() {
  const plot = activePlot();
  els.plot.innerHTML = "";
  if (!plot.placedPlants.length) {
    state.selectedPlantUid = "";
    els.plot.innerHTML = `<div class="empty-state">Choose plants for this plot</div>`;
    return;
  }
  if (!plot.placedPlants.some((plant) => plant.uid === state.selectedPlantUid)) {
    state.selectedPlantUid = "";
  }

  plot.placedPlants.forEach((plant) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `plant-chip${plant.uid === state.selectedPlantUid ? " selected" : ""}`;
    chip.dataset.uid = plant.uid;
    chip.style.left = `${plant.x * 100}%`;
    chip.style.top = `${plant.y * 100}%`;
    chip.style.background = plant.color;
    chip.style.setProperty("--size", `${clamp((plant.sizeFt / plot.width) * els.plot.clientWidth, 34, 78)}px`);
    chip.title = `${plant.name}: drag to move`;
    chip.innerHTML = `<small>${plant.short}</small>`;
    chip.addEventListener("pointerdown", startDrag);
    chip.addEventListener("mousedown", startMouseDrag);
    chip.addEventListener("click", () => selectPlacedPlant(plant.uid));
    els.plot.append(chip);
  });
}

function renderPlantEditor() {
  const plant = selectedPlacedPlant();
  const disabled = !plant;
  if (els.selectedPlantText) {
    els.selectedPlantText.textContent = plant
      ? `${plant.name} · ${(plant.x * activePlot().width).toFixed(1)} ft across, ${(plant.y * activePlot().length).toFixed(1)} ft down`
      : "Tap a plant to edit it";
  }
  if (els.plantEditor) {
    els.plantEditor.classList.toggle("active", Boolean(plant));
    els.plantEditor.querySelectorAll("button").forEach((button) => {
      button.disabled = disabled;
    });
  }
}

function nudgeSelectedPlant(direction) {
  const plant = selectedPlacedPlant();
  if (!plant) return;
  const plot = activePlot();
  const stepX = clamp(1 / Math.max(plot.width, 1), 0.025, 0.08);
  const stepY = clamp(1 / Math.max(plot.length, 1), 0.025, 0.08);
  if (direction === "left") plant.x = clamp(plant.x - stepX, 0.04, 0.96);
  if (direction === "right") plant.x = clamp(plant.x + stepX, 0.04, 0.96);
  if (direction === "up") plant.y = clamp(plant.y - stepY, 0.04, 0.96);
  if (direction === "down") plant.y = clamp(plant.y + stepY, 0.04, 0.96);
  updateSelectedPlantDisplay();
}

function centerSelectedPlant() {
  const plant = selectedPlacedPlant();
  if (!plant) return;
  plant.x = 0.5;
  plant.y = 0.5;
  updateSelectedPlantDisplay();
}

function removeSelectedPlant() {
  const plant = selectedPlacedPlant();
  if (!plant) return;
  const plot = activePlot();
  const current = plot.selected.get(plant.id) || 0;
  if (current > 1) plot.selected.set(plant.id, current - 1);
  else plot.selected.delete(plant.id);
  state.selectedPlantUid = "";
  generateLayout();
}

function updateSelectedPlantDisplay() {
  const plant = selectedPlacedPlant();
  if (!plant) return;
  const chip = els.plot.querySelector(`[data-uid="${plant.uid}"]`);
  if (chip) {
    chip.style.left = `${plant.x * 100}%`;
    chip.style.top = `${plant.y * 100}%`;
  }
  renderPlantEditor();
  renderInsights(activePlot(), assessGarden(activePlot(), climateForZip(els.zip.value), extensionForZip(els.zip.value)));
  queueAutoSave();
}

function renderInsights(plot, assessment = assessGarden(plot)) {
  const groups = selectedPlantObjects(plot);
  const companionCount = groups.filter((plant) => plant.companions.some((id) => plot.selected.has(id))).length;
  const water = groups.some((plant) => plant.water === "deep") ? "Deep watering zone on the sunny edge" : "Even watering across shallow rows";
  const heavyFeeders = groups.filter((plant) => plant.feed === "heavy").map((plant) => plant.name);
  const strongestWarning = assessment.warnings[0];
  const strongestWin = assessment.wins[0] || assessment.extension.note;
  const notes = [
    ["Layout logic", `${companionCount} companion pairings, ${assessment.density > 1 ? "compressed" : "clear"} spacing, center access path, ${assessment.climate.heat}.`, "good"],
    ["Garden check", strongestWarning || strongestWin, strongestWarning ? "warning" : "good"],
    ["Care pattern", `${water}. ${heavyFeeders.length ? `Feed compost near ${heavyFeeders.slice(0, 2).join(" and ")}.` : strongestWin}`, "good"]
  ];
  els.insight.innerHTML = notes.map(([title, copy, tone]) => `<div class="insight ${tone}"><strong>${title}</strong><span>${copy}</span></div>`).join("");
}

function scheduleTasks(plot, climate) {
  const tasks = [];
  const extension = extensionForZip(els.zip.value);
  const assessment = assessGarden(plot, climate, extension);
  if (selectedPlantObjects(plot).length) {
    tasks.push({
      date: addDays(climate.frost, -45),
      title: "Prepare soil",
      copy: `Add compost and review soil needs before planting. ${assessment.heavyFeeders.length ? "This plot includes heavy feeders." : "This plot has moderate soil demand."}`,
      key: `${plot.id}-soil-prep`
    });
  }
  selectedPlantObjects(plot).forEach((plant) => {
    const timing = taskTimingForPlant(plant, extension);
    tasks.push({
      date: addDays(climate.frost, timing.start),
      title: `Start ${plant.name}`,
      copy: plant.start < -1 ? `Sow indoors or under cover using ${extension.region} season timing.` : "Direct sow once soil can be worked.",
      key: `${plot.id}-${plant.id}-start`
    });
    tasks.push({
      date: addDays(climate.frost, timing.transplant),
      title: `Plant ${plant.name}`,
      copy: `${plant.sun === "full" ? "Use the brightest band" : "Use a cooler part-sun band"} with ${plant.spacing} ft spacing. ${plant.family === "nightshade" || plant.family === "cucurbit" ? "Wait for warm soil." : ""}`,
      key: `${plot.id}-${plant.id}-plant`
    });
    if (["nightshade", "cucurbit"].includes(plant.family)) {
      tasks.push({
        date: addDays(climate.frost, timing.transplant + 21),
        title: `Scout ${plant.name}`,
        copy: `Check leaves, stems, and soil surface for early pest or disease pressure.`,
        key: `${plot.id}-${plant.id}-scout`
      });
    }
    tasks.push({
      date: addDays(climate.frost, timing.harvest),
      title: `Harvest ${plant.name}`,
      copy: `Check every few days and keep watering ${plant.water}.`,
      key: `${plot.id}-${plant.id}-harvest`
    });
  });
  if (assessment.warnings.some((warning) => warning.toLowerCase().includes("rotate"))) {
    tasks.push({
      date: addDays(climate.frost, 130),
      title: "Plan crop rotation",
      copy: "Move repeated crop families to a different plot next season to protect soil health.",
      key: `${plot.id}-rotation-plan`
    });
  }

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
      <strong>CultivAIte</strong>
      <span>I can answer using this garden plan, USDA zone ${climate.zone}, and ${extension.source} style guidance. If the AI backend is connected, I will use it automatically.</span>
    </div>
  `;
}

function startDrag(event) {
  event.preventDefault();
  const uid = event.currentTarget.dataset.uid;
  state.selectedPlantUid = uid;
  renderPlantEditor();
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
  state.selectedPlantUid = uid;
  renderPlantEditor();
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
  renderInsights(plot, assessGarden(plot, climateForZip(els.zip.value), extensionForZip(els.zip.value)));
  renderPlantEditor();
  savePlan();
}

function calculateDensity(plot) {
  const area = plot.width * plot.length;
  const used = selectedPlantObjects(plot).reduce((sum, plant) => sum + plant.qty * plant.spacing * plant.spacing, 0);
  return used / Math.max(area, 1);
}

function exportPlan() {
  const climate = climateForZip(els.zip.value);
  const assessment = assessGarden(activePlot(), climate, extensionForZip(els.zip.value));
  const lines = [
    "CultivAIte plan",
    `ZIP: ${els.zip.value}`,
    `Zone: ${climate.zone}`,
    `Guidance: ${assessment.extension.source}`,
    "",
    "Recommendations:",
    ...assessment.warnings.map((warning) => `- ${warning}`),
    ...assessment.wins.slice(0, 3).map((win) => `- ${win}`),
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
  link.download = "cultivaite-plan.txt";
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
  const questionZip = zipForQuestion(question);
  const plot = activePlot();
  const climate = climateForZip(questionZip);
  const extension = extensionForZip(questionZip);
  const assessment = assessGarden(plot, climate, extension);
  const plants = selectedPlantObjects(plot);
  const plantNames = plants.map((plant) => plant.name).join(", ") || "your selected plants";
  const heavy = plants.filter((plant) => plant.feed === "heavy").map((plant) => plant.name);
  const companions = plants.filter((plant) => plant.companions.some((id) => plot.selected.has(id))).map((plant) => plant.name);
  const zipNote = questionZip !== els.zip.value ? `I used ZIP ${questionZip} from your question instead of the planner field, which is currently ${els.zip.value}. ` : "";

  if (lower.includes("layout") || lower.includes("where") || lower.includes("place")) {
    return `I would keep the center path open, put tall crops toward the back, push wide crops like zucchini to outer edges, group deep-water crops together, and keep quick harvest crops near the front. Current check: ${assessment.warnings[0] || assessment.wins[0]}`;
  }
  if (lower.includes("spacing") || lower.includes("crowd") || lower.includes("too many")) {
    return assessment.density > 1.05
      ? `This plan is crowded. I would remove a few plants or choose compact spacing. The biggest risk is reduced airflow, harder weeding, and more pest pressure.`
      : `Your spacing looks workable. CultivAIte estimates this bed as ${assessment.density > 0.78 ? "productive but a little tight" : "comfortable"} for the selected plants.`;
  }
  if (lower.includes("companion") || lower.includes("together")) {
    return companions.length
      ? `Good companion groupings already exist around ${companions.slice(0, 5).join(", ")}. ${assessment.warnings.find((warning) => warning.includes("Add marigold")) || "Keep herbs and flowers near fruiting crops for beneficial insect support."}`
      : "Add herbs, flowers, or quick root crops around fruiting plants. Marigold, basil, radish, and beans are useful starter choices depending on the crop.";
  }
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
      ? `Add compost before planting and feed the heavier crops first: ${heavy.slice(0, 4).join(", ")}. ${assessment.soilBuilders.length ? "Beans help the rotation balance." : "Consider adding beans or rotating this family next season."}`
      : "Use compost before planting, mulch after seedlings are established, and rotate crop families next season.";
  }
  if (lower.includes("rotate") || lower.includes("rotation")) {
    const families = Object.keys(assessment.families).map(titleCase).join(", ");
    return `This plot currently includes these crop families: ${families || "none yet"}. Next season, move nightshades and cucurbits to a different plot when possible, and follow heavy feeders with lighter crops or soil-building legumes.`;
  }
  if (lower.includes("plant next") || lower.includes("what should i plant") || lower.includes("what to plant")) {
    const coolSeason = climate.zone.startsWith("4") || climate.zone.startsWith("5") || climate.zone.startsWith("6");
    const suggestion = coolSeason
      ? "For that season profile, good starter choices are lettuce, spinach, radish, carrot, parsley, bush beans after frost, and warm-season crops like tomato or pepper only after the soil warms."
      : "For that warmer season profile, focus on herbs, beans, peppers, tomatoes, cucumbers, and heat-tolerant greens while managing water carefully.";
    return `${zipNote}For ZIP ${questionZip}, CultivAIte is using USDA zone ${climate.zone}. ${suggestion} Based on your current plot, keep heavy feeders composted and leave the center access path open.`;
  }
  if (lower.includes("zone") || lower.includes("zip")) {
    return `${zipNote}For ZIP ${questionZip || "your area"}, CultivAIte is using USDA zone ${climate.zone} and a last-frost estimate of ${formatDate(new Date(`${climate.frost}T12:00:00`))}. ${extension.source} guidance says: ${extension.note}`;
  }
  return `${zipNote}Based on this ${plot.width} x ${plot.length} ft plot, USDA zone ${climate.zone}, and ${extension.source} guidance, I would keep the access path clear, place tall crops toward the back, group similar water needs, use companion flowers or herbs near fruiting crops, and watch this first: ${assessment.warnings[0] || assessment.wins[0]}`;
}

function gardenAiContext(question = "") {
  const questionZip = zipForQuestion(question);
  const plot = activePlot();
  const climate = climateForZip(questionZip);
  const extension = extensionForZip(questionZip);
  const assessment = assessGarden(plot, climate, extension);
  return {
    zip: questionZip,
    plannerZip: els.zip.value,
    zipSource: zipFromQuestion(question) ? "question" : "planner field",
    climate,
    extension,
    activePlot: {
      name: plot.name,
      width: plot.width,
      length: plot.length,
      goal: plot.goal,
      plants: selectedPlantObjects(plot).map((plant) => ({
        name: plant.name,
        quantity: plant.qty,
        spacingFeet: plant.spacing,
        sun: plant.sun,
        water: plant.water,
        family: plant.family,
        feed: plant.feed,
        companions: plant.companions
      }))
    },
    assessment: {
      density: Number(assessment.density.toFixed(2)),
      warnings: assessment.warnings,
      wins: assessment.wins
    }
  };
}

async function askSol(event) {
  event.preventDefault();
  const question = els.askInput.value.trim();
  if (!question) return;

  els.chatWindow.insertAdjacentHTML("beforeend", `
    <div class="chat-message user-message"><strong>You</strong><span>${escapeHtml(question)}</span></div>
    <div class="chat-message sol-message thinking-message" id="thinkingMessage"><strong>CultivAIte</strong><span>Thinking through your garden plan...</span></div>
  `);
  els.askInput.value = "";
  els.chatWindow.scrollTop = els.chatWindow.scrollHeight;

  let answer = "";
  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, context: gardenAiContext(question) })
    });
    const data = await response.json();
    if (!response.ok || !data.answer) throw new Error(data.error || "AI answer unavailable");
    answer = data.answer;
  } catch (error) {
    const reason = error.message ? ` Reason: ${error.message}` : "";
    answer = `${answerGardenQuestion(question)}\n\nAI backend note: I used CultivAIte's built-in garden logic because the live AI connection is not available yet.${reason}`;
    console.warn("CultivAIte AI fallback used", error);
  }

  const thinking = document.querySelector("#thinkingMessage");
  if (thinking) {
    thinking.classList.remove("thinking-message");
    thinking.removeAttribute("id");
    thinking.querySelector("span").textContent = answer;
  }
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
    color: "#8dbbd0",
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
  state.selectedPlantUid = "";
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
els.plantEditor.addEventListener("click", (event) => {
  const nudgeButton = event.target.closest("[data-nudge]");
  if (nudgeButton) nudgeSelectedPlant(nudgeButton.dataset.nudge);
});
els.centerPlant.addEventListener("click", centerSelectedPlant);
els.removePlant.addEventListener("click", removeSelectedPlant);
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
      console.warn("CultivAIte service worker registration failed", error);
    });
  });
}
