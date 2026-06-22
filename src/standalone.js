const plantLibrary = [
  { id: "tomato", name: "Tomato", short: "Tom", color: "#a7653b", sun: "full", spacing: 2.2, start: -42, transplant: 8, harvest: 74, water: "steady", companions: ["basil", "marigold"] },
  { id: "cherry-tomato", name: "Cherry Tomato", short: "ChT", color: "#a7653b", sun: "full", spacing: 2.0, start: -42, transplant: 8, harvest: 65, water: "steady", companions: ["basil", "marigold", "parsley"] },
  { id: "basil", name: "Basil", short: "Bas", color: "#53633f", sun: "full", spacing: 1.2, start: -28, transplant: 14, harvest: 52, water: "steady", companions: ["tomato", "pepper"] },
  { id: "pepper", name: "Pepper", short: "Pep", color: "#3a3028", sun: "full", spacing: 1.8, start: -56, transplant: 12, harvest: 82, water: "steady", companions: ["basil", "marigold"] },
  { id: "eggplant", name: "Eggplant", short: "Egg", color: "#3a3028", sun: "full", spacing: 2.0, start: -56, transplant: 14, harvest: 80, water: "steady", companions: ["basil", "marigold"] },
  { id: "lettuce", name: "Lettuce", short: "Let", color: "#87916f", sun: "part", spacing: 1.0, start: -21, transplant: -7, harvest: 37, water: "even", companions: ["carrot", "radish"] },
  { id: "kale", name: "Kale", short: "Kal", color: "#53633f", sun: "part", spacing: 1.5, start: -35, transplant: -7, harvest: 55, water: "even", companions: ["onion", "marigold"] },
  { id: "swiss-chard", name: "Swiss Chard", short: "Cha", color: "#87916f", sun: "part", spacing: 1.2, start: -28, transplant: 0, harvest: 55, water: "even", companions: ["bean", "radish"] },
  { id: "arugula", name: "Arugula", short: "Aru", color: "#87916f", sun: "part", spacing: 0.6, start: -21, transplant: -7, harvest: 30, water: "even", companions: ["carrot", "radish"] },
  { id: "carrot", name: "Carrot", short: "Car", color: "#e79729", sun: "full", spacing: 0.6, start: -14, transplant: 0, harvest: 70, water: "light", companions: ["lettuce", "radish"] },
  { id: "beet", name: "Beet", short: "Bee", color: "#a7653b", sun: "full", spacing: 0.6, start: -21, transplant: -7, harvest: 55, water: "even", companions: ["lettuce", "onion"] },
  { id: "onion", name: "Onion", short: "Oni", color: "#e79729", sun: "full", spacing: 0.5, start: -56, transplant: -7, harvest: 95, water: "light", companions: ["carrot", "beet", "kale"] },
  { id: "garlic", name: "Garlic", short: "Gar", color: "#3a3028", sun: "full", spacing: 0.5, start: -180, transplant: -165, harvest: 110, water: "light", companions: ["tomato", "carrot"] },
  { id: "cucumber", name: "Cucumber", short: "Cuc", color: "#53633f", sun: "full", spacing: 2.5, start: -21, transplant: 14, harvest: 62, water: "deep", companions: ["radish", "marigold"] },
  { id: "zucchini", name: "Zucchini", short: "Zuc", color: "#3a3028", sun: "full", spacing: 3.0, start: -14, transplant: 14, harvest: 58, water: "deep", companions: ["marigold"] },
  { id: "summer-squash", name: "Summer Squash", short: "Squ", color: "#e79729", sun: "full", spacing: 3.0, start: -14, transplant: 14, harvest: 55, water: "deep", companions: ["marigold", "nasturtium"] },
  { id: "pumpkin", name: "Pumpkin", short: "Pum", color: "#e79729", sun: "full", spacing: 4.0, start: -21, transplant: 14, harvest: 95, water: "deep", companions: ["marigold", "nasturtium"] },
  { id: "marigold", name: "Marigold", short: "Mar", color: "#e79729", sun: "full", spacing: 1.0, start: -35, transplant: 14, harvest: 54, water: "light", companions: ["tomato", "pepper", "cucumber"] },
  { id: "nasturtium", name: "Nasturtium", short: "Nas", color: "#a7653b", sun: "full", spacing: 1.0, start: -21, transplant: 7, harvest: 50, water: "light", companions: ["cucumber", "zucchini", "pumpkin"] },
  { id: "calendula", name: "Calendula", short: "Cal", color: "#e79729", sun: "full", spacing: 1.0, start: -35, transplant: 7, harvest: 50, water: "light", companions: ["lettuce", "kale", "tomato"] },
  { id: "spinach", name: "Spinach", short: "Spi", color: "#53633f", sun: "part", spacing: 0.8, start: -28, transplant: -14, harvest: 40, water: "even", companions: ["lettuce", "carrot"] },
  { id: "parsley", name: "Parsley", short: "Par", color: "#87916f", sun: "part", spacing: 1.0, start: -42, transplant: 7, harvest: 70, water: "steady", companions: ["tomato", "pepper"] },
  { id: "cilantro", name: "Cilantro", short: "Cil", color: "#87916f", sun: "part", spacing: 0.8, start: -21, transplant: -7, harvest: 35, water: "even", companions: ["lettuce", "spinach"] },
  { id: "dill", name: "Dill", short: "Dil", color: "#53633f", sun: "full", spacing: 1.0, start: -14, transplant: 0, harvest: 45, water: "even", companions: ["cucumber", "lettuce"] },
  { id: "radish", name: "Radish", short: "Rad", color: "#a7653b", sun: "full", spacing: 0.5, start: -21, transplant: -7, harvest: 25, water: "even", companions: ["lettuce", "carrot", "cucumber"] },
  { id: "bean", name: "Bush Bean", short: "Bean", color: "#53633f", sun: "full", spacing: 0.8, start: 7, transplant: 14, harvest: 56, water: "even", companions: ["carrot", "cucumber", "marigold"] },
  { id: "pea", name: "Pea", short: "Pea", color: "#53633f", sun: "full", spacing: 0.6, start: -35, transplant: -14, harvest: 58, water: "even", companions: ["carrot", "radish", "lettuce"] },
  { id: "broccoli", name: "Broccoli", short: "Bro", color: "#53633f", sun: "full", spacing: 1.5, start: -56, transplant: -14, harvest: 70, water: "even", companions: ["onion", "calendula"] },
  { id: "cabbage", name: "Cabbage", short: "Cab", color: "#87916f", sun: "full", spacing: 1.6, start: -56, transplant: -14, harvest: 78, water: "even", companions: ["onion", "dill"] }
];

const STORAGE_KEY = "cultivaite-garden-plan-v1";
const STORAGE_INDEX_KEY = "cultivaite-garden-index-v1";
const ACTIVE_GARDEN_KEY = "cultivaite-active-garden-v1";
const LEGACY_STORAGE_KEY = "sol-garden-plan-v1";
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyB4lRcXrCNUHzcJeyciR-HyxiFMtYFdyEQ",
  authDomain: "cultivaite-7c0b7.firebaseapp.com",
  projectId: "cultivaite-7c0b7",
  storageBucket: "cultivaite-7c0b7.firebasestorage.app",
  messagingSenderId: "250545680674",
  appId: "1:250545680674:web:4c29ee3c794acf8c70357b",
  measurementId: "G-WLWCZYVC96"
};

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
  "cherry-tomato": { family: "nightshade", height: "tall", feed: "heavy", cropType: "fruit", pest: "Trellis on the north edge and pair with basil or flowers for easier harvest and pest checks." },
  pepper: { family: "nightshade", height: "medium", feed: "heavy", cropType: "fruit", pest: "Pair with basil or marigold and keep leaves off wet soil." },
  eggplant: { family: "nightshade", height: "medium", feed: "heavy", cropType: "fruit", pest: "Keep warm, composted, and visible for flea beetle scouting." },
  basil: { family: "herb", height: "low", feed: "light", pest: "Place near tomatoes and peppers for easy harvest and companion value." },
  lettuce: { family: "leaf", height: "low", feed: "medium", cropType: "leaf", pest: "Use part-sun edges so leaves stay tender longer." },
  kale: { family: "brassica", height: "medium", feed: "medium", cropType: "leaf", pest: "Keep accessible for cabbage worm scouting and leaf harvest." },
  "swiss-chard": { family: "leaf", height: "medium", feed: "medium", cropType: "leaf", pest: "Use steady moisture and leave room for repeated outer-leaf harvest." },
  arugula: { family: "leaf", height: "low", feed: "light", cropType: "leaf", pest: "Use quick succession rows near the front edge." },
  carrot: { family: "root", height: "low", feed: "light", cropType: "root", pest: "Keep soil loose and avoid crowding roots." },
  beet: { family: "root", height: "low", feed: "medium", cropType: "root", pest: "Thin seedlings early and keep roots in loose soil." },
  onion: { family: "allium", height: "low", feed: "light", cropType: "root", pest: "Use as a tidy border around roots, greens, and brassicas." },
  garlic: { family: "allium", height: "low", feed: "light", cropType: "root", pest: "Use as an edge crop and keep harvest timing separate from spring plantings." },
  cucumber: { family: "cucurbit", height: "tall", feed: "heavy", cropType: "fruit", pest: "Give airflow and place near pollinator support plants." },
  zucchini: { family: "cucurbit", height: "wide", feed: "heavy", cropType: "fruit", pest: "Put on an outside edge so large leaves do not block access." },
  "summer-squash": { family: "cucurbit", height: "wide", feed: "heavy", cropType: "fruit", pest: "Give an outside corner and scout leaf undersides for squash pests." },
  pumpkin: { family: "cucurbit", height: "wide", feed: "heavy", cropType: "fruit", pest: "Place on the outer edge so vines can run away from paths." },
  marigold: { family: "flower", height: "low", feed: "light", pest: "Use as border plants near nightshades and cucurbits." },
  nasturtium: { family: "flower", height: "low", feed: "light", pest: "Use as a living edge near cucurbits and pollinator zones." },
  calendula: { family: "flower", height: "low", feed: "light", pest: "Use along bed edges to invite beneficial insects and brighten harvesting paths." },
  spinach: { family: "leaf", height: "low", feed: "medium", cropType: "leaf", pest: "Use cooler part-sun space and steady moisture." },
  parsley: { family: "herb", height: "low", feed: "light", pest: "Keep near frequently harvested crops for easy access." },
  cilantro: { family: "herb", height: "low", feed: "light", cropType: "leaf", pest: "Use a cooler band and succession sow before summer heat." },
  dill: { family: "herb", height: "medium", feed: "light", pest: "Place near cucumbers but away from cramped edges so it can flower." },
  radish: { family: "root", height: "low", feed: "light", cropType: "root", pest: "Tuck radishes near cucumbers, lettuce, and carrots as quick harvest markers." },
  bean: { family: "legume", height: "medium", feed: "soil-builder", cropType: "fruit", pest: "Use beans as a soil-supporting rotation crop near roots and cucurbits." },
  pea: { family: "legume", height: "tall", feed: "soil-builder", cropType: "fruit", pest: "Use a trellis on the cool-season edge and keep picking regularly." },
  broccoli: { family: "brassica", height: "medium", feed: "heavy", cropType: "leaf", pest: "Keep accessible for cabbage worm scouting and compost before planting." },
  cabbage: { family: "brassica", height: "medium", feed: "heavy", cropType: "leaf", pest: "Give airflow and keep it easy to inspect for caterpillars." }
};

const PLANTING_GUIDANCE = {
  tomato: { depth: "6-8 in deep", waterBand: "steady" },
  "cherry-tomato": { depth: "6-8 in deep", waterBand: "steady" },
  basil: { depth: "1/4 in seed", waterBand: "steady" },
  pepper: { depth: "same depth as pot", waterBand: "steady" },
  eggplant: { depth: "same depth as pot", waterBand: "steady" },
  lettuce: { depth: "1/8 in seed", waterBand: "even" },
  kale: { depth: "1/4 in seed", waterBand: "even" },
  "swiss-chard": { depth: "1/2 in seed", waterBand: "even" },
  arugula: { depth: "1/4 in seed", waterBand: "even" },
  carrot: { depth: "1/4 in seed", waterBand: "light" },
  beet: { depth: "1/2 in seed", waterBand: "even" },
  onion: { depth: "1/2 in seed or 1 in sets", waterBand: "light" },
  garlic: { depth: "2 in deep", waterBand: "light" },
  cucumber: { depth: "1 in seed", waterBand: "deep" },
  zucchini: { depth: "1 in seed", waterBand: "deep" },
  "summer-squash": { depth: "1 in seed", waterBand: "deep" },
  pumpkin: { depth: "1 in seed", waterBand: "deep" },
  marigold: { depth: "1/4 in seed", waterBand: "light" },
  nasturtium: { depth: "1/2 in seed", waterBand: "light" },
  calendula: { depth: "1/4 in seed", waterBand: "light" },
  spinach: { depth: "1/2 in seed", waterBand: "even" },
  parsley: { depth: "1/4 in seed", waterBand: "steady" },
  cilantro: { depth: "1/4 in seed", waterBand: "even" },
  dill: { depth: "1/4 in seed", waterBand: "even" },
  radish: { depth: "1/2 in seed", waterBand: "even" },
  bean: { depth: "1 in seed", waterBand: "even" },
  pea: { depth: "1 in seed", waterBand: "even" },
  broccoli: { depth: "same depth as pot", waterBand: "even" },
  cabbage: { depth: "same depth as pot", waterBand: "even" }
};

const COMPANION_WARNINGS = [
  { plants: ["tomato", "pepper"], note: "Tomatoes and peppers share a crop family, so rotate this bed next season to reduce disease pressure." },
  { plants: ["tomato", "basil"], note: "Tomatoes and basil are paired, so CultivAIte keeps basil close enough for companion value and harvesting." },
  { plants: ["pepper", "basil"], note: "Peppers and basil are paired for a compact warm-season harvest zone." },
  { plants: ["cucumber", "dill"], note: "Cucumber and dill create a useful pollinator and harvest pairing when airflow stays open." },
  { plants: ["cucumber", "zucchini"], note: "Cucumbers and zucchini are both cucurbits; keep airflow strong and scout for mildew or beetle pressure." },
  { plants: ["lettuce", "spinach"], note: "Leafy greens can share a cooler, steady-moisture area and benefit from afternoon shade." },
  { plants: ["carrot", "radish"], note: "Radishes mature quickly and can mark carrot rows while roots develop." },
  { plants: ["carrot", "onion"], note: "Carrots and onions fit well in tidy low rows that are easy to weed." },
  { plants: ["kale", "calendula"], note: "Kale and calendula keep pest scouting and beneficial insect support close together." },
  { plants: ["bean", "carrot"], note: "Beans add rotation balance near roots without taking over the whole bed." }
];

const state = {
  activeGardenId: "garden-main",
  gardens: [{ id: "garden-main", name: "2026 vegetable garden" }],
  activePlotId: "plot-1",
  activePageId: "homePage",
  selectedPlantUid: "",
  completedTasks: [],
  onboardingComplete: false,
  calendarMonth: new Date().getMonth(),
  calendarYear: new Date().getFullYear(),
  plots: [
    {
      id: "plot-1",
      name: "Main bed",
      width: 12,
      length: 18,
      goal: "balanced",
      sunExposure: "full",
      sunDirection: "south",
      soilProfile: "balanced",
      selected: new Map([
        ["tomato", 4],
        ["basil", 3],
        ["lettuce", 8],
        ["carrot", 12],
        ["marigold", 4]
      ]),
      plantedDates: {},
      placedPlants: []
    }
  ]
};

let activeDrag = null;
let saveTimer = null;
let cloudTimer = null;
let packetScanData = null;
const cloudState = {
  ready: false,
  loading: false,
  app: null,
  auth: null,
  db: null,
  user: null,
  authApi: null,
  dbApi: null
};

const els = {
  zip: document.querySelector("#zipInput"),
  plannerForm: document.querySelector("#plannerForm"),
  width: document.querySelector("#widthInput"),
  length: document.querySelector("#lengthInput"),
  goal: document.querySelector("#goalInput"),
  sunExposure: document.querySelector("#sunExposureInput"),
  sunDirection: document.querySelector("#sunDirectionInput"),
  soilProfile: document.querySelector("#soilProfileInput"),
  gardenSelect: document.querySelector("#gardenSelect"),
  newGarden: document.querySelector("#newGardenBtn"),
  renameGarden: document.querySelector("#renameGardenBtn"),
  deleteGarden: document.querySelector("#deleteGardenBtn"),
  plotTabs: document.querySelector("#plotTabs"),
  addPlot: document.querySelector("#addPlotBtn"),
  plantSearch: document.querySelector("#plantSearchInput"),
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
  plantedDate: document.querySelector("#plantedDateInput"),
  centerPlant: document.querySelector("#centerPlantBtn"),
  removePlant: document.querySelector("#removePlantBtn"),
  schedule: document.querySelector("#scheduleList"),
  insight: document.querySelector("#insightStrip"),
  shuffle: document.querySelector("#shuffleBtn"),
  resetLayout: document.querySelector("#resetLayoutBtn"),
  export: document.querySelector("#exportBtn"),
  customForm: document.querySelector("#customPlantForm"),
  customName: document.querySelector("#customPlantName"),
  customSun: document.querySelector("#customPlantSun"),
  customSpacing: document.querySelector("#customPlantSpacing"),
  packetImage: document.querySelector("#packetImageInput"),
  packetImageStatus: document.querySelector("#packetImageStatus"),
  scanPacket: document.querySelector("#scanPacketBtn"),
  packetSun: document.querySelector("#packetSunInput"),
  packetSpacing: document.querySelector("#packetSpacingInput"),
  packetGerm: document.querySelector("#packetGermInput"),
  packetMaturity: document.querySelector("#packetMaturityInput"),
  packetDepth: document.querySelector("#packetDepthInput"),
  packetMethod: document.querySelector("#packetMethodInput"),
  packetNotes: document.querySelector("#packetNotesInput"),
  navButtons: document.querySelectorAll(".nav-btn"),
  pages: document.querySelectorAll(".page"),
  homePlotText: document.querySelector("#homePlotText"),
  homeZoneText: document.querySelector("#homeZoneText"),
  homeSaveText: document.querySelector("#homeSaveText"),
  headerSaveStatus: document.querySelector("#headerSaveStatus"),
  widthLabel: document.querySelector("#widthLabel"),
  lengthLabel: document.querySelector("#lengthLabel"),
  taskPageList: document.querySelector("#taskPageList"),
  markTasks: document.querySelector("#markTasksBtn"),
  calendarGrid: document.querySelector("#calendarGrid"),
  calendarTitle: document.querySelector("#calendarTitle"),
  calendarPrev: document.querySelector("#calendarPrevBtn"),
  calendarToday: document.querySelector("#calendarTodayBtn"),
  calendarNext: document.querySelector("#calendarNextBtn"),
  askForm: document.querySelector("#askForm"),
  askInput: document.querySelector("#askInput"),
  chatWindow: document.querySelector("#chatWindow"),
  pageJumps: document.querySelectorAll("[data-page-jump]"),
  cloudCard: document.querySelector(".cloud-card"),
  cloudAccountBadge: document.querySelector("#cloudAccountBadge"),
  cloudStatus: document.querySelector("#cloudStatus"),
  cloudEmail: document.querySelector("#cloudEmail"),
  cloudPassword: document.querySelector("#cloudPassword"),
  createAccount: document.querySelector("#createAccountBtn"),
  signIn: document.querySelector("#signInBtn"),
  resetPassword: document.querySelector("#resetPasswordBtn"),
  syncCloud: document.querySelector("#syncCloudBtn"),
  signOut: document.querySelector("#signOutBtn"),
  onboardingPanel: document.querySelector("#onboardingPanel"),
  onboardingForm: document.querySelector("#onboardingForm"),
  onboardZip: document.querySelector("#onboardZip"),
  onboardWidth: document.querySelector("#onboardWidth"),
  onboardLength: document.querySelector("#onboardLength"),
  onboardAlreadyPlanted: document.querySelector("#onboardAlreadyPlanted"),
  onboardDatePanel: document.querySelector("#onboardDatePanel"),
  onboardPlantedDate: document.querySelector("#onboardPlantedDate"),
  skipOnboarding: document.querySelector("#skipOnboardingBtn"),
  onboardingBack: document.querySelector("#onboardingBackBtn"),
  onboardingNext: document.querySelector("#onboardingNextBtn"),
  onboardingSubmit: document.querySelector("#onboardingSubmitBtn"),
  onboardingSteps: [...document.querySelectorAll("[data-onboarding-step]")],
  onboardingProgress: [...document.querySelectorAll("[data-onboarding-progress]")]
};

let onboardingStep = 1;

function activePlot() {
  return state.plots.find((plot) => plot.id === state.activePlotId);
}

function getPlanSnapshot() {
  syncPlotFromControls();
  return {
    activeGardenId: state.activeGardenId,
    gardens: state.gardens,
    zip: els.zip.value,
    activePlotId: state.activePlotId,
    activePageId: state.activePageId,
    selectedPlantUid: state.selectedPlantUid,
    completedTasks: state.completedTasks,
    onboardingComplete: state.onboardingComplete,
    calendarMonth: state.calendarMonth,
    calendarYear: state.calendarYear,
    plantLibrary,
    plots: state.plots.map((plot) => ({
      ...plot,
      selected: [...plot.selected.entries()]
    }))
  };
}

function cleanForCloudSave(value) {
  return JSON.parse(JSON.stringify(value));
}

function planToCloudText() {
  return JSON.stringify(cleanForCloudSave(getPlanSnapshot()));
}

function gardenPlanKey(gardenId = state.activeGardenId) {
  return `${STORAGE_KEY}:${gardenId}`;
}

function saveGardenIndex() {
  window.localStorage.setItem(STORAGE_INDEX_KEY, JSON.stringify(state.gardens));
  window.localStorage.setItem(ACTIVE_GARDEN_KEY, state.activeGardenId);
}

function applyPlanSnapshot(plan) {
  if (!plan) return;
  if (Array.isArray(plan.gardens) && plan.gardens.length) {
    state.gardens = plan.gardens;
  }
  if (plan.activeGardenId) state.activeGardenId = plan.activeGardenId;
  if (plan.zip) els.zip.value = plan.zip;
  if (Array.isArray(plan.plantLibrary)) {
    plan.plantLibrary
      .filter((plant) => plant?.id?.startsWith("custom-"))
      .forEach((plant) => {
        if (!plantLibrary.some((item) => item.id === plant.id)) plantLibrary.push(plant);
      });
  }
  if (Array.isArray(plan.plots) && plan.plots.length) {
    state.plots.splice(
      0,
      state.plots.length,
      ...plan.plots.map((plot) => ({
        ...plot,
        selected: new Map(plot.selected || []),
        plantedDates: plot.plantedDates || {},
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
  state.onboardingComplete = typeof plan.onboardingComplete === "boolean" ? plan.onboardingComplete : true;
  if (Number.isInteger(plan.calendarMonth)) state.calendarMonth = plan.calendarMonth;
  if (Number.isInteger(plan.calendarYear)) state.calendarYear = plan.calendarYear;
}

function savePlan() {
  const plan = getPlanSnapshot();
  try {
    saveGardenIndex();
    window.localStorage.setItem(gardenPlanKey(), JSON.stringify(plan));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    setSaveStatus(`Autosaved ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`);
    queueCloudSave();
  } catch (error) {
    setSaveStatus("Not saved on this device");
    console.warn("CultivAIte could not save this plan", error);
  }
}

function loadSavedPlan() {
  const savedGardens = window.localStorage.getItem(STORAGE_INDEX_KEY);
  const savedActiveGarden = window.localStorage.getItem(ACTIVE_GARDEN_KEY);
  if (savedGardens) {
    try {
      const gardens = JSON.parse(savedGardens);
      if (Array.isArray(gardens) && gardens.length) state.gardens = gardens;
    } catch (error) {
      console.warn("CultivAIte could not load the garden list", error);
    }
  }
  if (savedActiveGarden && state.gardens.some((garden) => garden.id === savedActiveGarden)) {
    state.activeGardenId = savedActiveGarden;
  }
  const saved = window.localStorage.getItem(gardenPlanKey()) || window.localStorage.getItem(STORAGE_KEY) || window.localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!saved) return;

  try {
    const plan = JSON.parse(saved);
    applyPlanSnapshot(plan);
  } catch (error) {
    if (els.saveStatus) els.saveStatus.textContent = "Saved plan could not load";
    console.warn("CultivAIte could not load the saved plan", error);
  }
}

function saveCurrentPlan() {
  savePlan();
  render();
}

function showOnboardingIfNeeded() {
  if (!els.onboardingPanel) return;
  if (state.onboardingComplete) {
    els.onboardingPanel.classList.remove("active");
    return;
  }
  if (els.onboardZip) els.onboardZip.value = els.zip.value || "60614";
  if (els.onboardWidth) els.onboardWidth.value = activePlot().width || 12;
  if (els.onboardLength) els.onboardLength.value = activePlot().length || 18;
  setOnboardingStep(1);
  els.onboardingPanel.classList.add("active");
}

function setOnboardingStep(nextStep) {
  onboardingStep = clamp(Number(nextStep) || 1, 1, 3);
  els.onboardingSteps.forEach((step) => {
    const isActive = Number(step.dataset.onboardingStep) === onboardingStep;
    step.classList.toggle("active", isActive);
    step.setAttribute("aria-hidden", String(!isActive));
  });
  els.onboardingProgress.forEach((item) => {
    const stepNumber = Number(item.dataset.onboardingProgress);
    item.classList.toggle("active", stepNumber === onboardingStep);
    item.classList.toggle("complete", stepNumber < onboardingStep);
    if (stepNumber === onboardingStep) item.setAttribute("aria-current", "step");
    else item.removeAttribute("aria-current");
  });
  if (els.onboardingBack) els.onboardingBack.hidden = onboardingStep === 1;
  if (els.onboardingNext) els.onboardingNext.hidden = onboardingStep === 3;
  if (els.onboardingSubmit) els.onboardingSubmit.hidden = onboardingStep !== 3;
}

function nextOnboardingStep() {
  if (onboardingStep === 1 && !els.onboardingForm?.reportValidity()) return;
  setOnboardingStep(onboardingStep + 1);
}

function closeOnboarding() {
  state.onboardingComplete = true;
  if (els.onboardingPanel) els.onboardingPanel.classList.remove("active");
  saveCurrentPlan();
}

function selectedOnboardingPlants() {
  if (!els.onboardingForm) return ["tomato", "basil", "lettuce", "carrot", "marigold"];
  return [...els.onboardingForm.querySelectorAll(".starter-plants input:checked")].map((input) => input.value);
}

function applyOnboarding(event) {
  event.preventDefault();
  const plot = activePlot();
  const selectedIds = selectedOnboardingPlants();
  const plantedDate = els.onboardAlreadyPlanted?.checked ? els.onboardPlantedDate?.value : "";
  els.zip.value = (els.onboardZip.value || "60614").trim();
  plot.width = clamp(Number(els.onboardWidth.value) || 12, 2, 60);
  plot.length = clamp(Number(els.onboardLength.value) || 18, 2, 80);
  plot.goal = "balanced";
  plot.selected = new Map(selectedIds.map((id) => [id, defaultStarterQty(id)]));
  plot.plantedDates = {};
  if (plantedDate) selectedIds.forEach((id) => {
    plot.plantedDates[id] = plantedDate;
  });
  state.onboardingComplete = true;
  state.activePageId = "layoutPage";
  state.selectedPlantUid = "";
  if (els.onboardingPanel) els.onboardingPanel.classList.remove("active");
  syncControlsFromPlot();
  generateLayout();
}

function defaultStarterQty(id) {
  if (["carrot", "radish", "onion", "garlic", "arugula"].includes(id)) return 12;
  if (["lettuce", "spinach", "kale"].includes(id)) return 6;
  if (["basil", "parsley", "cilantro", "dill"].includes(id)) return 3;
  if (["marigold", "calendula", "nasturtium"].includes(id)) return 4;
  if (["cucumber", "zucchini", "summer-squash", "pumpkin"].includes(id)) return 2;
  return 4;
}

function toggleOnboardingDatePanel() {
  if (!els.onboardDatePanel || !els.onboardAlreadyPlanted) return;
  els.onboardDatePanel.classList.toggle("active", els.onboardAlreadyPlanted.checked);
}

function setSaveStatus(message) {
  if (els.saveStatus) els.saveStatus.textContent = message;
  if (els.homeSaveText) els.homeSaveText.textContent = message;
  if (els.headerSaveStatus) els.headerSaveStatus.textContent = message;
}

function queueAutoSave() {
  window.clearTimeout(saveTimer);
  setSaveStatus("Saving...");
  saveTimer = window.setTimeout(savePlan, 180);
}

function firebaseConfigured() {
  return Boolean(FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.authDomain && FIREBASE_CONFIG.projectId && FIREBASE_CONFIG.appId);
}

function setCloudStatus(message) {
  if (els.cloudStatus) els.cloudStatus.textContent = message;
}

async function initCloudSave() {
  if (!els.cloudStatus) return false;
  if (!firebaseConfigured()) {
    setCloudStatus("Local device save is active. Add Firebase keys to turn on account saving.");
    return false;
  }
  if (cloudState.ready) return true;
  if (cloudState.loading) return false;

  cloudState.loading = true;
  setCloudStatus("Connecting cloud save...");
  try {
    const [appApi, authApi, dbApi] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js")
    ]);
    cloudState.app = appApi.initializeApp(FIREBASE_CONFIG);
    cloudState.auth = authApi.getAuth(cloudState.app);
    cloudState.db = dbApi.getFirestore(cloudState.app);
    cloudState.authApi = authApi;
    cloudState.dbApi = dbApi;
    authApi.onAuthStateChanged(cloudState.auth, async (user) => {
      cloudState.user = user;
      if (user) {
        if (els.cloudPassword) els.cloudPassword.value = "";
        setCloudStatus(`Signed in as ${user.email || "garden account"}. Cloud save is active.`);
        await loadCloudPlan();
      } else {
        setCloudStatus("Cloud save is ready. Sign in to sync this garden across devices.");
      }
      updateCloudButtons();
    });
    cloudState.ready = true;
    return true;
  } catch (error) {
    setCloudStatus("Cloud save could not connect. Local saving is still active.");
    console.warn("CultivAIte cloud save could not connect", error);
    return false;
  } finally {
    cloudState.loading = false;
    updateCloudButtons();
  }
}

function updateCloudButtons() {
  const configured = firebaseConfigured();
  const signedIn = Boolean(cloudState.user);
  if (els.cloudCard) els.cloudCard.classList.toggle("is-signed-in", signedIn);
  if (els.cloudAccountBadge) {
    els.cloudAccountBadge.textContent = signedIn ? "Signed in" : configured ? "Ready" : "Local only";
    els.cloudAccountBadge.classList.toggle("is-signed-in", signedIn);
  }
  [els.cloudEmail, els.cloudPassword, els.createAccount, els.signIn, els.resetPassword, els.syncCloud, els.signOut].forEach((item) => {
    if (item) item.disabled = !configured || cloudState.loading;
  });
  if (els.syncCloud) els.syncCloud.disabled = !configured || cloudState.loading || !signedIn;
  if (els.signOut) els.signOut.disabled = !configured || cloudState.loading || !signedIn;
}

function cloudDocRef(gardenId = state.activeGardenId) {
  if (!cloudState.user || !cloudState.dbApi) return null;
  return cloudState.dbApi.doc(cloudState.db, "users", cloudState.user.uid, "gardens", gardenId);
}

function cloudIndexRef() {
  if (!cloudState.user || !cloudState.dbApi) return null;
  return cloudState.dbApi.doc(cloudState.db, "users", cloudState.user.uid, "gardens", "index");
}

async function saveCloudIndex() {
  const ref = cloudIndexRef();
  if (!ref) return;
  await cloudState.dbApi.setDoc(ref, {
    gardens: cleanForCloudSave(state.gardens),
    activeGardenId: state.activeGardenId,
    updatedAt: cloudState.dbApi.serverTimestamp()
  });
}

async function saveCloudPlan() {
  if (!cloudState.ready || !cloudState.user) return;
  const ref = cloudDocRef();
  if (!ref) return;
  try {
    await saveCloudIndex();
    await cloudState.dbApi.setDoc(ref, {
      planJson: planToCloudText(),
      updatedAt: cloudState.dbApi.serverTimestamp()
    });
    setCloudStatus(`Cloud saved ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`);
  } catch (error) {
    setCloudStatus(`Cloud save failed: ${error.code || error.message || "Unknown Firebase error"}. Local saving is still active.`);
    console.warn("CultivAIte cloud save failed", error);
  }
}

function queueCloudSave() {
  if (!cloudState.ready || !cloudState.user) return;
  window.clearTimeout(cloudTimer);
  cloudTimer = window.setTimeout(saveCloudPlan, 900);
}

async function loadCloudPlan() {
  if (!cloudState.ready || !cloudState.user) return;
  const indexRef = cloudIndexRef();
  try {
    const indexSnapshot = indexRef ? await cloudState.dbApi.getDoc(indexRef) : null;
    if (indexSnapshot?.exists()) {
      const indexData = indexSnapshot.data();
      if (Array.isArray(indexData.gardens) && indexData.gardens.length) {
        state.gardens = indexData.gardens;
      }
      if (indexData.activeGardenId && state.gardens.some((garden) => garden.id === indexData.activeGardenId)) {
        state.activeGardenId = indexData.activeGardenId;
      }
    }
    let ref = cloudDocRef();
    if (!ref) return;
    const saved = await cloudState.dbApi.getDoc(ref);
    if (!saved.exists()) {
      const legacyRef = cloudDocRef("current");
      const legacySaved = await cloudState.dbApi.getDoc(legacyRef);
      if (!legacySaved.exists()) {
        await saveCloudPlan();
        return;
      }
      const legacyData = legacySaved.data();
      const legacyPlan = legacyData?.planJson ? JSON.parse(legacyData.planJson) : legacyData?.plan;
      if (legacyPlan) {
        applyPlanSnapshot({ ...legacyPlan, activeGardenId: state.activeGardenId, gardens: state.gardens });
      }
    } else {
      const data = saved.data();
      const cloudPlan = data?.planJson ? JSON.parse(data.planJson) : data?.plan;
      if (cloudPlan) {
        applyPlanSnapshot({ ...cloudPlan, activeGardenId: state.activeGardenId, gardens: state.gardens });
      }
    }
    saveGardenIndex();
    syncControlsFromPlot();
    render();
    setCloudStatus(`Cloud gardens loaded for ${cloudState.user.email || "your account"}.`);
  } catch (error) {
    setCloudStatus(`Cloud plan could not load: ${error.code || error.message || "Unknown Firebase error"}. Local saving is still active.`);
    console.warn("CultivAIte cloud plan could not load", error);
  }
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

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function dateFromIso(dateText) {
  return dateText ? new Date(`${dateText}T12:00:00`) : null;
}

function plantedDateForPlant(plot, plant) {
  return dateFromIso(plot.plantedDates?.[plant.id]);
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
  const strategy = PLANT_STRATEGY[plant.id] || {
    family: "mixed",
    height: plant.spacing >= 2.5 ? "wide" : plant.spacing >= 1.8 ? "medium" : "low",
    feed: plant.spacing >= 2 ? "heavy" : "medium",
    cropType: plant.sun === "part" ? "leaf" : "mixed",
    pest: "Keep spacing open for airflow and easy inspection."
  };
  const guide = PLANTING_GUIDANCE[plant.id] || {
    depth: "follow the seed packet",
    waterBand: plant.water || "even"
  };
  return {
    ...strategy,
    ...guide,
    depth: plant.packet?.depth || guide.depth
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
  const sunExposure = plot.sunExposure || "full";
  const soilProfile = plot.soilProfile || "balanced";
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

  if (sunExposure === "shade" && plants.some((plant) => plant.sun === "full")) {
    warnings.push("This plot is mostly shaded, but it includes full-sun crops. Consider a sunnier plot or choose more shade-tolerant plants.");
  } else if (sunExposure === "part" && plants.some((plant) => plant.sun === "full")) {
    warnings.push("This is a part-sun plot. CultivAIte is reserving the brightest edge for full-sun crops, but fruiting crops may need a sunnier location for best production.");
  } else if (sunExposure === "full") {
    wins.push("Sun placement is using the full-sun profile, with cooler crops placed near taller plants where possible.");
  }

  if (soilProfile === "lowFertility" && heavyFeeders.length) {
    warnings.push(`Low-fertility soil needs compost before planting ${heavyFeeders.slice(0, 3).map((plant) => plant.name).join(", ")}.`);
  }
  if (soilProfile === "sandy" && waterGroups.deep) {
    warnings.push("Sandy soil dries quickly. Deep-water crops need mulch and more frequent moisture checks.");
  }
  if (soilProfile === "clay" && plants.some((plant) => plant.family === "root")) {
    warnings.push("Root crops in clay soil need loosened, amended soil so roots can size up evenly.");
  }
  if (soilProfile === "rich" && heavyFeeders.length) {
    wins.push("Compost-rich soil supports the selected heavy feeders; avoid over-fertilizing leafy growth.");
  }

  return { area, usedArea, density, families, waterGroups, heavyFeeders, soilBuilders, sunExposure, soilProfile, warnings, wins, extension, climate };
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
    harvest: plant.packet?.daysToMaturity || plant.harvest
  };
}

function syncControlsFromPlot() {
  const plot = activePlot();
  els.width.value = plot.width;
  els.length.value = plot.length;
  els.goal.value = plot.goal;
  if (els.sunExposure) els.sunExposure.value = plot.sunExposure || "full";
  if (els.sunDirection) els.sunDirection.value = plot.sunDirection || "south";
  if (els.soilProfile) els.soilProfile.value = plot.soilProfile || "balanced";
}

function syncPlotFromControls() {
  const plot = activePlot();
  plot.width = clamp(Number(els.width.value) || 12, 2, 60);
  plot.length = clamp(Number(els.length.value) || 18, 2, 80);
  plot.goal = els.goal.value;
  plot.sunExposure = els.sunExposure?.value || "full";
  plot.sunDirection = els.sunDirection?.value || "south";
  plot.soilProfile = els.soilProfile?.value || "balanced";
}

function addPlot() {
  const nextNumber = state.plots.length + 1;
  const plot = {
    id: `plot-${Date.now()}`,
    name: `Plot ${nextNumber}`,
    width: 8,
    length: 12,
    goal: "balanced",
    sunExposure: "full",
    sunDirection: "south",
    soilProfile: "balanced",
    selected: new Map([["lettuce", 4], ["spinach", 4], ["parsley", 2]]),
    plantedDates: {},
    placedPlants: []
  };
  state.plots.push(plot);
  state.activePlotId = plot.id;
  syncControlsFromPlot();
  generateLayout();
}

function activeGarden() {
  return state.gardens.find((garden) => garden.id === state.activeGardenId) || state.gardens[0];
}

function renderGardenManager() {
  if (!els.gardenSelect) return;
  els.gardenSelect.innerHTML = state.gardens
    .map((garden) => `<option value="${garden.id}"${garden.id === state.activeGardenId ? " selected" : ""}>${escapeHtml(garden.name)}</option>`)
    .join("");
  if (els.deleteGarden) els.deleteGarden.disabled = state.gardens.length < 2;
}

function loadGardenPlan(gardenId) {
  const saved = window.localStorage.getItem(gardenPlanKey(gardenId));
  if (!saved) return false;
  try {
    const plan = JSON.parse(saved);
    applyPlanSnapshot({ ...plan, activeGardenId: gardenId, gardens: state.gardens });
    return true;
  } catch (error) {
    setSaveStatus("Saved garden could not load");
    console.warn("CultivAIte could not load this garden", error);
    return false;
  }
}

function switchGarden(gardenId) {
  if (!gardenId || gardenId === state.activeGardenId) return;
  savePlan();
  state.activeGardenId = gardenId;
  if (!loadGardenPlan(gardenId)) resetPlanForGarden(gardenId);
  state.selectedPlantUid = "";
  syncControlsFromPlot();
  render();
}

function resetPlanForGarden(gardenId) {
  state.activeGardenId = gardenId;
  state.activePlotId = `plot-${Date.now()}`;
  state.activePageId = "layoutPage";
  state.selectedPlantUid = "";
  state.completedTasks = [];
  state.onboardingComplete = true;
  state.plots.splice(0, state.plots.length, {
    id: state.activePlotId,
    name: "Main bed",
    width: 8,
    length: 12,
    goal: "balanced",
    sunExposure: "full",
    sunDirection: "south",
    soilProfile: "balanced",
    selected: new Map([["lettuce", 6], ["carrot", 12], ["marigold", 4]]),
    plantedDates: {},
    placedPlants: []
  });
  syncControlsFromPlot();
  generateLayout();
}

function createGarden() {
  const name = window.prompt("Name this garden", `Garden ${state.gardens.length + 1}`);
  if (!name) return;
  savePlan();
  const id = `garden-${Date.now()}`;
  state.gardens.push({ id, name: name.trim() || `Garden ${state.gardens.length + 1}` });
  resetPlanForGarden(id);
}

function renameGarden() {
  const garden = activeGarden();
  if (!garden) return;
  const name = window.prompt("Rename this garden", garden.name);
  if (!name) return;
  garden.name = name.trim() || garden.name;
  renderGardenManager();
  savePlan();
}

function deleteGarden() {
  const garden = activeGarden();
  if (!garden || state.gardens.length < 2) return;
  if (!window.confirm(`Delete "${garden.name}"? This removes it from this device and your next cloud sync.`)) return;
  if (cloudState.ready && cloudState.user && cloudState.dbApi) {
    const ref = cloudDocRef(garden.id);
    if (ref) cloudState.dbApi.deleteDoc(ref).catch((error) => console.warn("CultivAIte could not delete the cloud garden", error));
  }
  window.localStorage.removeItem(gardenPlanKey(garden.id));
  state.gardens = state.gardens.filter((item) => item.id !== garden.id);
  state.activeGardenId = state.gardens[0].id;
  if (!loadGardenPlan(state.activeGardenId)) resetPlanForGarden(state.activeGardenId);
  syncControlsFromPlot();
  render();
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
  const query = (els.plantSearch?.value || "").trim().toLowerCase();
  const visiblePlants = plantLibrary.filter((plant) => {
    const qty = plot.selected.get(plant.id) || 0;
    if (!query) return qty > 0;
    const strategy = strategyForPlant(plant);
    return [plant.name, plant.id, plant.sun, strategy.family, strategy.cropType]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query));
  });

  if (!visiblePlants.length) {
    els.plantList.innerHTML = query
      ? `<div class="empty-state compact">No plant match yet. Use “Add a plant” and CultivAIte will estimate its needs.</div>`
      : `<div class="empty-state compact">Search the plant library or add a plant to begin.</div>`;
  }

  visiblePlants.forEach((plant) => {
    const qty = plot.selected.get(plant.id) || 0;
    const row = document.createElement("div");
    row.className = `plant-option${qty ? " active" : ""}`;
    const strategy = strategyForPlant(plant);
    row.innerHTML = `
      <span class="plant-badge" style="background:${plant.color}">${plant.short.slice(0, 1)}</span>
      <span class="plant-meta">
        <strong>${plant.name}</strong>
        <span>${plant.spacing} ft spacing · ${plant.sun === "full" ? "full sun" : "part sun"} · ${titleCase(strategy.family)}${plant.packet ? " · seed packet" : ""}</span>
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
    return layoutPriority(a) - layoutPriority(b);
  });

  plot.placedPlants = [];
  items.forEach((plant, plantIndex) => {
    for (let i = 0; i < plant.qty; i += 1) {
      const placement = choosePlantPlacement(plant, plot, assessment, plantIndex, i);
      plot.placedPlants.push({
        ...plant,
        uid: `${plot.id}-${plant.id}-${i}`,
        x: placement.x,
        y: placement.y,
        sizeFt: Math.max(1, plant.spacing * (plot.goal === "compact" ? 0.84 : 1)),
        zone: careZoneForPlant(plant),
        crowded: placement.crowded,
        placementReasons: placement.reasons
      });
    }
  });

  render();
}

function resetRecommendedLayout() {
  state.selectedPlantUid = "";
  generateLayout();
  setSaveStatus("Recommended layout restored");
}

function choosePlantPlacement(plant, plot, assessment, plantIndex, plantNumber) {
  const targetLane = strategicLane(plant, plantIndex, assessment, plot);
  const candidates = placementCandidates(plant, plot, targetLane, plantIndex, plantNumber);
  const scored = candidates.map((candidate) => ({
    ...candidate,
    score: placementScore(candidate, plant, plot, targetLane)
  })).sort((first, second) => first.score - second.score);
  const chosen = scored[0] || { x: 0.15, y: targetLane, score: 0 };
  const nearest = nearestPlacedPlant(chosen, plant, plot);
  const crowded = Boolean(nearest && nearest.distance < recommendedPlantGap(plant, nearest.plant));
  return {
    ...chosen,
    crowded,
    reasons: placementReasons(plant, plot, crowded)
  };
}

function placementCandidates(plant, plot, targetLane, plantIndex, plantNumber) {
  const candidates = [];
  const columns = Math.max(7, Math.min(18, Math.round(plot.width * 1.35)));
  const rows = Math.max(8, Math.min(24, Math.round(plot.length * 1.1)));
  const offset = ((plantIndex + plantNumber * 3) % 7) / 100;

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const rawX = (column + 0.5) / columns;
      const rawY = (row + 0.5) / rows;
      const x = keepOutOfPath(clamp(rawX + (column % 2 ? offset : -offset), 0.06, 0.94), plant);
      candidates.push({ x, y: rawY, laneDistance: Math.abs(rawY - targetLane) });
    }
  }

  return candidates;
}

function placementScore(candidate, plant, plot, targetLane) {
  let score = candidate.laneDistance * 24;
  const placed = plot.placedPlants || [];
  const soilProfile = plot.soilProfile || "balanced";
  const sunExposure = plot.sunExposure || "full";

  if (plant.height === "tall") score += tallCropEdgeDistance(candidate, plot) * 32;
  if (sunExposure === "part" && plant.sun === "full") score += brightestEdgeDistance(candidate, plot) * 18;
  if (sunExposure === "shade" && plant.sun === "full") score += 28;

  placed.forEach((existing) => {
    const distance = placedPlantDistance(candidate, existing, plot);
    const requiredGap = recommendedPlantGap(plant, existing);
    const companions = areCompanions(plant, existing);
    const bothHeavy = plant.feed === "heavy" && existing.feed === "heavy";
    const sameWater = plant.water === existing.water;

    if (distance < requiredGap) score += 20000 + (requiredGap - distance) * 2000;
    else if (companions) score += Math.abs(distance - Math.max(plant.spacing, existing.spacing) * 1.35) * 5;
    else if (sameWater && distance < Math.max(plant.spacing, existing.spacing) * 2.8) score -= 4;
    else if (!sameWater && distance < Math.max(plant.spacing, existing.spacing) * 1.4) score += 16;

    if (bothHeavy && distance < Math.max(plant.spacing, existing.spacing) * 2.5) {
      score += soilProfile === "lowFertility" ? 46 : 24;
    }
    if (plant.feed === "soil-builder" && existing.feed === "heavy" && distance < Math.max(plant.spacing, existing.spacing) * 3) score -= 8;
    if (plant.sun === "part" && existing.height === "tall" && distance > 1 && distance < 3.5) score -= sunExposure === "full" ? 9 : 5;
    if (plant.sun === "full" && existing.height === "tall" && distance < Math.max(plant.spacing, existing.spacing) * 1.5) score += 12;
  });

  if (soilProfile === "sandy" && plant.water === "deep") score += candidate.laneDistance * 4;
  if (soilProfile === "clay" && plant.family === "root") score += 4;
  if (plot.goal === "pollinator" && plant.family === "flower") score -= 8;
  if (plot.goal === "lowWater" && plant.water === "deep") score += 18;
  if (plot.goal === "compact") score -= 2;
  return score;
}

function tallCropEdgeDistance(candidate, plot) {
  switch (plot.sunDirection || "south") {
    case "north": return 1 - candidate.y;
    case "east": return candidate.x;
    case "west": return 1 - candidate.x;
    case "south": return candidate.y;
    default: return candidate.y;
  }
}

function brightestEdgeDistance(candidate, plot) {
  switch (plot.sunDirection || "south") {
    case "north": return candidate.y;
    case "east": return 1 - candidate.x;
    case "west": return candidate.x;
    case "south": return 1 - candidate.y;
    default: return Math.abs(candidate.y - 0.5);
  }
}

function areCompanions(first, second) {
  return (first.companions || []).includes(second.id) || (second.companions || []).includes(first.id);
}

function recommendedPlantGap(first, second) {
  const base = (first.spacing + second.spacing) / 2;
  if (areCompanions(first, second)) return base * 0.7;
  if (first.feed === "heavy" && second.feed === "heavy") return base * 0.95;
  return base * 0.8;
}

function nearestPlacedPlant(candidate, plant, plot) {
  let nearest = null;
  (plot.placedPlants || []).forEach((existing) => {
    const distance = placedPlantDistance(candidate, existing, plot);
    if (!nearest || distance < nearest.distance) nearest = { plant: existing, distance };
  });
  return nearest;
}

function placementReasons(plant, plot, crowded) {
  const reasons = [
    plant.sun === "part" ? "part-sun band" : "full-sun exposure",
    `${plant.spacing} ft spacing`,
    `${plant.depth || "seed-packet"} planting depth`,
    `${plant.water} water band`
  ];
  if (plant.feed === "heavy") reasons.push("separated from other heavy feeders");
  if (plant.feed === "soil-builder") reasons.push("soil-supporting rotation crop");
  if ((plant.companions || []).some((id) => plot.selected.has(id))) reasons.push("compatible crop nearby");
  if (crowded) reasons.push("needs more room in this plot");
  return reasons;
}

function layoutPriority(plant) {
  const heightRank = { tall: 0, wide: 1, medium: 2, low: 3 };
  const feedRank = { heavy: 0, "soil-builder": 1, medium: 2, light: 3 };
  const familyRank = { flower: 4, allium: 5, root: 6 };
  return (heightRank[plant.height] ?? 3) * 10 + (feedRank[plant.feed] ?? 2) + (familyRank[plant.family] || 0);
}

function careZoneForPlant(plant) {
  if (plant.height === "tall") return "trellis edge";
  if (plant.height === "wide") return "sprawl edge";
  if (plant.family === "flower") return "beneficial border";
  if (plant.family === "root" || plant.family === "allium") return "low row";
  if (plant.water === "deep") return "deep watering band";
  if (plant.sun === "part") return "cool-season band";
  return "main crop band";
}

function strategicLane(plant, plantIndex, assessment, plot) {
  const sunExposure = plot?.sunExposure || "full";
  if (plant.family === "flower") return plantIndex % 2 ? 0.16 : 0.88;
  if (plant.family === "allium") return 0.4;
  if (plant.feed === "soil-builder") return 0.5;
  if (plant.height === "tall") return tallCropLane(plot);
  if (plant.height === "wide") return 0.82;
  if (plant.water === "deep") return 0.76;
  if (assessment.waterGroups.deep && plant.water === "light") return 0.34;
  if (plant.sun === "part") return sunExposure === "full" ? 0.3 : 0.64;
  return 0.44;
}

function tallCropLane(plot) {
  switch (plot?.sunDirection || "south") {
    case "north": return 0.82;
    case "south": return 0.18;
    default: return 0.2;
  }
}

function layoutSideOffset(plant, plantIndex) {
  if (plant.family === "flower") return plantIndex % 2 === 0 ? -0.28 : 0.28;
  if (plant.family === "allium") return plantIndex % 2 === 0 ? -0.22 : 0.22;
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

  renderGardenManager();
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
      ? `${plant.name} · ${plant.zone || careZoneForPlant(plant)} · ${plant.sun === "full" ? "full sun" : "part sun"} · ${plant.spacing} ft spacing · ${plant.depth || "follow seed packet"} deep · ${plant.water} water`
      : "Tap a plant to edit it";
  }
  if (els.plantedDate) {
    els.plantedDate.disabled = disabled;
    els.plantedDate.value = plant ? activePlot().plantedDates?.[plant.id] || "" : "";
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

function updateSelectedPlantDate() {
  const plant = selectedPlacedPlant();
  if (!plant || !els.plantedDate) return;
  const plot = activePlot();
  if (!plot.plantedDates) plot.plantedDates = {};
  if (els.plantedDate.value) plot.plantedDates[plant.id] = els.plantedDate.value;
  else delete plot.plantedDates[plant.id];
  renderSchedule(plot, climateForZip(els.zip.value));
  renderTaskPage();
  renderCalendarPage();
  queueAutoSave();
}

function placedPlantDistance(first, second, plot) {
  return Math.hypot((first.x - second.x) * plot.width, (first.y - second.y) * plot.length);
}

function layoutReview(plot) {
  const placed = plot.placedPlants || [];
  const closePairs = [];
  const companionPairs = [];
  const companionPairKeys = new Set();
  const crowdedPlants = placed.filter((plant) => plant.crowded);
  const centerLanePlants = plot.width >= 7
    ? placed.filter((plant) => Math.abs(plant.x - 0.5) < 0.095)
    : [];

  for (let firstIndex = 0; firstIndex < placed.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < placed.length; secondIndex += 1) {
      const first = placed[firstIndex];
      const second = placed[secondIndex];
      const distance = placedPlantDistance(first, second, plot);
      const recommendedGap = Math.max(first.spacing, second.spacing) * 0.55;

      if (distance < recommendedGap) closePairs.push({ first, second });
      const companionKey = [first.id, second.id].sort().join(":");
      if (areCompanions(first, second) && !companionPairKeys.has(companionKey)) {
        companionPairs.push({ first, second, distance });
        companionPairKeys.add(companionKey);
      }
    }
  }

  return { closePairs, companionPairs, centerLanePlants, crowdedPlants };
}

function placementSummary(plot) {
  const placed = plot.placedPlants || [];
  const zones = new Set(placed.map((plant) => plant.zone || careZoneForPlant(plant)));
  const heavyCount = placed.filter((plant) => plant.feed === "heavy").length;
  const soilBuilders = placed.filter((plant) => plant.feed === "soil-builder").length;
  const notes = [];
  if (zones.has("trellis edge")) notes.push("tall crops are kept on the trellis edge");
  if (zones.has("sprawl edge")) notes.push("wide crops have an outside edge to spread");
  if (zones.has("beneficial border")) notes.push("flowers sit on the border for pollinator access");
  if (zones.has("deep watering band")) notes.push("deep-water crops share a watering band");
  if (zones.has("cool-season band")) notes.push("cool-season greens are grouped together");
  if (heavyCount > 1) notes.push("heavy feeders are spaced apart to reduce root competition");
  if (soilBuilders) notes.push("legumes provide soil-supporting rotation value");
  return notes.length ? `${titleCase(notes[0])}${notes.length > 1 ? `; ${notes[1]}` : ""}.` : "Plants are grouped by mature size, water needs, and harvest access.";
}

function renderInsights(plot, assessment = assessGarden(plot)) {
  const review = layoutReview(plot);
  const water = selectedPlantObjects(plot).some((plant) => plant.water === "deep")
    ? "Deep-water crops are grouped for more efficient watering."
    : "Water needs are simple enough for one steady routine.";
  const heavyFeeders = selectedPlantObjects(plot).filter((plant) => plant.feed === "heavy").map((plant) => plant.name);

  const spaceNote = review.crowdedPlants.length
    ? `${review.crowdedPlants.length} plant${review.crowdedPlants.length === 1 ? " needs" : "s need"} more room for the requested spacing. Reduce quantities, add a plot, or choose the compact goal.`
    : review.closePairs.length
    ? `${review.closePairs.length} close placement${review.closePairs.length === 1 ? "" : "s"} detected. Move ${review.closePairs[0].first.name} and ${review.closePairs[0].second.name} farther apart for airflow and easier harvests.`
    : review.centerLanePlants.length
      ? `${review.centerLanePlants.length} plant${review.centerLanePlants.length === 1 ? " is" : "s are"} in the center access lane. Move ${review.centerLanePlants[0].name} to either side to keep the bed reachable.`
      : assessment.density > 1.05
        ? "The overall plan is tight. Keep pruning, watering, and disease checks on a regular schedule."
        : "No close placements detected. Space and access look workable for watering, pruning, and weeding.";

  const companionNote = review.companionPairs.length
    ? `${review.companionPairs.length} companion connection${review.companionPairs.length === 1 ? "" : "s"} in this layout. ${review.companionPairs[0].first.name} and ${review.companionPairs[0].second.name} are a compatible pairing.`
    : "No companion links are selected yet. Add flowers, herbs, or a compatible crop when it supports your goal.";

  const careNote = `${placementSummary(plot)} ${heavyFeeders.length ? `Compost near ${heavyFeeders.slice(0, 2).join(" and ")}.` : water}`;
  const notes = [
    ["Space review", spaceNote, review.crowdedPlants.length || review.closePairs.length || review.centerLanePlants.length || assessment.density > 1.05 ? "warning" : "good"],
    ["Companion planting", companionNote, review.companionPairs.length ? "good" : "warning"],
    ["Why this layout", careNote, "good"]
  ];
  els.insight.innerHTML = notes.map(([title, copy, tone]) => `<div class="insight ${tone}"><strong>${title}</strong><span>${copy}</span></div>`).join("");
}

function scheduleTasks(plot, climate) {
  const tasks = [];
  const extension = extensionForZip(els.zip.value);
  const assessment = assessGarden(plot, climate, extension);
  const plants = selectedPlantObjects(plot);
  if (selectedPlantObjects(plot).length) {
    tasks.push({
      date: addDays(climate.frost, -45),
      title: "Prepare soil",
      copy: `Add compost and review soil needs before planting. ${assessment.heavyFeeders.length ? "This plot includes heavy feeders." : "This plot has moderate soil demand."}`,
      key: `${plot.id}-soil-prep`,
      type: "soil"
    });
  }
  plants.forEach((plant) => {
    const timing = taskTimingForPlant(plant, extension);
    const plantedDate = plantedDateForPlant(plot, plant);
    const plantDate = plantedDate || addDays(climate.frost, timing.transplant);
    if (plantedDate) {
      tasks.push({
        date: plantedDate,
        title: `${plant.name} planted`,
        copy: `Logged as already planted. CultivAIte will schedule care from this date.`,
        key: `${plot.id}-${plant.id}-logged-${isoDate(plantedDate)}`,
        type: "planted"
      });
    } else {
      tasks.push({
        date: addDays(climate.frost, timing.start),
        title: `Start ${plant.name}`,
      copy: plant.start < -1 ? `Sow indoors or under cover using ${extension.region} season timing.` : "Direct sow once soil can be worked.",
        key: `${plot.id}-${plant.id}-start`,
        type: "planting"
      });
      tasks.push({
        date: plantDate,
        title: `Plant ${plant.name}`,
      copy: `${plant.sun === "full" ? "Use the brightest band" : "Use a cooler part-sun band"} with ${plant.spacing} ft spacing. Plant ${plant.depth || "according to the seed packet"} deep. ${plant.family === "nightshade" || plant.family === "cucurbit" ? "Wait for warm soil." : ""}`,
        key: `${plot.id}-${plant.id}-plant`,
        type: "planting"
      });
    }
    tasks.push({
      date: addDays(isoDate(plantDate), 3),
      title: `Water check: ${plant.name}`,
      copy: `Check soil moisture near ${plant.name}. ${plant.water === "deep" ? "Water slowly and deeply." : plant.water === "light" ? "Avoid overwatering." : "Keep moisture steady."}`,
      key: `${plot.id}-${plant.id}-water-3`,
      type: "water"
    });
    if (["root", "leaf", "brassica"].includes(plant.family) || ["leaf", "root"].includes(plant.cropType)) {
      tasks.push({
        date: addDays(isoDate(plantDate), 14),
        title: `Thin and weed ${plant.name}`,
        copy: `Thin crowded seedlings and weed while roots are small so the row stays easy to maintain.`,
        key: `${plot.id}-${plant.id}-thin`,
        type: "maintenance"
      });
    }
    if (plant.feed === "heavy") {
      tasks.push({
        date: addDays(isoDate(plantDate), 21),
        title: `Feed ${plant.name}`,
        copy: `Add compost or balanced organic fertilizer around heavy feeders without burying stems.`,
        key: `${plot.id}-${plant.id}-feed`,
        type: "soil"
      });
    }
    if (["nightshade", "cucurbit"].includes(plant.family)) {
      tasks.push({
        date: addDays(isoDate(plantDate), 21),
        title: `Scout ${plant.name}`,
        copy: `Check leaves, stems, and soil surface for early pest or disease pressure. Keep airflow open.`,
        key: `${plot.id}-${plant.id}-scout`,
        type: "pest"
      });
      tasks.push({
        date: addDays(isoDate(plantDate), 35),
        title: `Prune and support ${plant.name}`,
        copy: plant.height === "wide" ? "Guide leaves away from access paths and prune only damaged leaves." : "Tie stems, prune crowded growth, and keep lower leaves off wet soil.",
        key: `${plot.id}-${plant.id}-prune`,
        type: "maintenance"
      });
    }
    tasks.push({
      date: plantedDate ? addDays(isoDate(plantDate), Math.max(21, plant.harvest - Math.max(timing.transplant, 0))) : addDays(climate.frost, timing.harvest),
      title: `Harvest ${plant.name}`,
      copy: `${plant.packet?.notes || `Check every few days and keep watering ${plant.water}.`}`,
      key: `${plot.id}-${plant.id}-harvest`,
      type: "harvest"
    });
  });
  if (plants.length) {
    [7, 28, 56, 84].forEach((days) => {
      tasks.push({
        date: addDays(climate.frost, days),
        title: "Weekly garden walk",
        copy: "Check watering, weeds, leaf damage, and whether paths are still easy to reach.",
        key: `${plot.id}-weekly-walk-${days}`,
        type: "maintenance"
      });
    });
  }
  if (assessment.warnings.some((warning) => warning.toLowerCase().includes("rotate"))) {
    tasks.push({
      date: addDays(climate.frost, 130),
      title: "Plan crop rotation",
      copy: "Move repeated crop families to a different plot next season to protect soil health.",
      key: `${plot.id}-rotation-plan`,
      type: "soil"
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
  const tasks = scheduleTasks(plot, climateForZip(els.zip.value));
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12);
  const weekEnd = new Date(todayStart);
  weekEnd.setDate(todayStart.getDate() + 7);
  const groups = [
    ["Earlier this season", tasks.filter((task) => task.date < todayStart)],
    ["Today", tasks.filter((task) => isoDate(task.date) === isoDate(todayStart))],
    ["This week", tasks.filter((task) => task.date > todayStart && task.date <= weekEnd)],
    ["Later", tasks.filter((task) => task.date > weekEnd).slice(0, 18)]
  ];
  els.taskPageList.innerHTML = tasks.length
    ? groups.map(([label, groupTasks]) => `
      <li class="task-group-label">${label}</li>
      ${groupTasks.length ? groupTasks.map((task) => {
      const complete = state.completedTasks.includes(task.key);
      return `
        <li class="schedule-item task-item${complete ? " complete" : ""}">
          <time class="schedule-date">${formatDate(task.date)}</time>
          <span class="schedule-copy"><strong>${task.title}</strong><span>${task.copy}</span></span>
          <button class="task-toggle" type="button" data-task-key="${task.key}" aria-pressed="${complete}" aria-label="Mark ${task.title} ${complete ? "not done" : "done"}">${complete ? "Done" : "Mark done"}</button>
        </li>
      `;
      }).join("") : `<li class="schedule-item quiet"><time class="schedule-date">Clear</time><span class="schedule-copy"><strong>No tasks</strong><span>Nothing scheduled for this window.</span></span></li>`}
    `).join("")
    : `<li class="schedule-item"><time class="schedule-date">Ready</time><span class="schedule-copy"><strong>No tasks yet</strong><span>Add plants on the Layout page to build your task list.</span></span></li>`;
}

function renderCalendarPage() {
  const tasks = scheduleTasks(activePlot(), climateForZip(els.zip.value));
  const monthStart = new Date(state.calendarYear, state.calendarMonth, 1, 12);
  const monthEnd = new Date(state.calendarYear, state.calendarMonth + 1, 0, 12);
  const firstCell = new Date(monthStart);
  firstCell.setDate(monthStart.getDate() - monthStart.getDay());
  const todayKey = isoDate(new Date());
  const monthLabel = monthStart.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  if (els.calendarTitle) els.calendarTitle.textContent = monthLabel;

  const days = [];
  for (let index = 0; index < 42; index += 1) {
    const date = new Date(firstCell);
    date.setDate(firstCell.getDate() + index);
    days.push(date);
  }

  const weekdayHeader = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    .map((day) => `<div class="calendar-weekday">${day}</div>`)
    .join("");
  const dayCells = days.map((date) => {
    const dateKey = isoDate(date);
    const dayTasks = tasks.filter((task) => isoDate(task.date) === dateKey);
    const outside = date < monthStart || date > monthEnd;
    return `
      <section class="calendar-day${outside ? " outside" : ""}${dateKey === todayKey ? " today" : ""}">
        <div class="calendar-day-number">${date.getDate()}</div>
        <div class="calendar-events">
          ${dayTasks.slice(0, 3).map((task) => `
            <article class="calendar-event ${task.type || "task"}">
              <strong>${task.title}</strong>
              <span>${task.copy}</span>
            </article>
          `).join("")}
          ${dayTasks.length > 3 ? `<p class="calendar-more">+${dayTasks.length - 3} more</p>` : ""}
        </div>
      </section>
    `;
  }).join("");

  els.calendarGrid.innerHTML = tasks.length
    ? `${weekdayHeader}${dayCells}`
    : `<section class="month-card"><h3>No dates yet</h3><p>Add plants to create a calendar.</p></section>`;
}

function moveCalendarMonth(offset) {
  const next = new Date(state.calendarYear, state.calendarMonth + offset, 1, 12);
  state.calendarMonth = next.getMonth();
  state.calendarYear = next.getFullYear();
  renderCalendarPage();
  queueAutoSave();
}

function jumpCalendarToToday() {
  const today = new Date();
  state.calendarMonth = today.getMonth();
  state.calendarYear = today.getFullYear();
  renderCalendarPage();
  queueAutoSave();
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
    "Guidance note:",
    "CultivAIte provides planning and education guidance. Conditions vary by location, weather, soil, pests, and plant variety. Confirm important planting, pest, or safety decisions with local extension resources when needed.",
    "",
    ...state.plots.flatMap((plot) => [
      `${plot.name}: ${plot.width} x ${plot.length} ft`,
      `Sun: ${plot.sunExposure || "full"} · strongest sun from ${plot.sunDirection || "south"}`,
      `Soil: ${plot.soilProfile || "balanced"}`,
      "Plants:",
      ...selectedPlantObjects(plot).map((plant) => `- ${plant.qty} ${plant.name}: ${plant.spacing} ft spacing · ${plant.depth || "follow seed packet"} deep · ${plant.water} water`),
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

function toggleTaskComplete(taskKey) {
  if (!taskKey) return;
  const currentIndex = state.completedTasks.indexOf(taskKey);
  if (currentIndex === -1) state.completedTasks.push(taskKey);
  else state.completedTasks.splice(currentIndex, 1);
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
      ? `Your best pest-management helpers are the companion groupings around ${companions.slice(0, 4).join(", ")}. Keep airflow open and check leaf undersides when you water. If you use any pesticide or treatment, follow the product label and verify local guidance first.`
      : "Add flowers or herbs near fruiting crops, keep plants spaced for airflow, and inspect leaves when you water. If you use any pesticide or treatment, follow the product label and verify local guidance first.";
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
      sunExposure: plot.sunExposure || "full",
      sunDirection: plot.sunDirection || "south",
      soilProfile: plot.soilProfile || "balanced",
      plants: selectedPlantObjects(plot).map((plant) => ({
        name: plant.name,
        quantity: plant.qty,
        spacingFeet: plant.spacing,
        plantingDepth: plant.depth,
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

  if (!/product label|extension|verify locally|local guidance/i.test(answer)) {
    answer += "\n\nGuidance note: Conditions vary by location, weather, soil, pests, and plant variety. Verify important planting, pest, or safety decisions with local extension resources when needed.";
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

function findLibraryPlantByName(name) {
  const normalized = name.toLowerCase().trim();
  return plantLibrary.find((plant) => plant.name.toLowerCase() === normalized || plant.id.toLowerCase() === normalized);
}

function inferPlantProfile(name) {
  const lower = name.toLowerCase();
  if (/(tomato|pepper|eggplant)/.test(lower)) {
    return { sun: "full", spacing: 2, start: -42, transplant: 14, harvest: 75, water: "steady", color: "#a7653b" };
  }
  if (/(squash|pumpkin|melon|cucumber)/.test(lower)) {
    return { sun: "full", spacing: 3, start: -21, transplant: 14, harvest: 70, water: "deep", color: "#53633f" };
  }
  if (/(lettuce|spinach|kale|chard|arugula|greens)/.test(lower)) {
    return { sun: "part", spacing: 1, start: -28, transplant: -7, harvest: 45, water: "even", color: "#87916f" };
  }
  if (/(carrot|radish|beet|turnip|onion|garlic)/.test(lower)) {
    return { sun: "full", spacing: 0.6, start: -21, transplant: -7, harvest: 60, water: "light", color: "#e79729" };
  }
  if (/(basil|parsley|cilantro|dill|thyme|oregano|sage|mint|herb)/.test(lower)) {
    return { sun: "part", spacing: 1, start: -28, transplant: 7, harvest: 55, water: "steady", color: "#53633f" };
  }
  if (/(marigold|calendula|nasturtium|flower|zinnia|cosmos)/.test(lower)) {
    return { sun: "full", spacing: 1, start: -28, transplant: 7, harvest: 55, water: "light", color: "#e79729" };
  }
  return { sun: "full", spacing: 1.5, start: -21, transplant: 7, harvest: 60, water: "steady", color: "#87916f" };
}

function packetDetailsFromForm() {
  const daysToMaturity = Number(els.packetMaturity?.value) || 0;
  const daysToGerminate = Number(els.packetGerm?.value) || 0;
  const spacing = Number(els.packetSpacing?.value) || 0;
  const sun = els.packetSun?.value || "";
  const method = els.packetMethod?.value || "";
  const depth = els.packetDepth?.value?.trim() || "";
  const notes = els.packetNotes?.value?.trim() || "";
  const imageName = els.packetImage?.files?.[0]?.name || "";
  const hasDetails = Boolean(daysToMaturity || daysToGerminate || spacing || sun || method || depth || notes || imageName);
  if (!hasDetails) return null;
  return { daysToMaturity, daysToGerminate, spacing, sun, method, depth, notes, imageName };
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("CultivAIte could not read that photo."));
    reader.readAsDataURL(file);
  });
}

async function preparePacketImage(file) {
  if (!file?.type?.startsWith("image/")) throw new Error("Choose an image of the back of a seed packet.");
  if (file.size > 10 * 1024 * 1024) throw new Error("Choose a photo smaller than 10 MB.");
  const original = await fileToDataUrl(file);
  const image = new Image();
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = () => reject(new Error("CultivAIte could not open that photo."));
    image.src = original;
  });
  const longestSide = Math.max(image.naturalWidth, image.naturalHeight);
  const scale = Math.min(1, 1200 / longestSide);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.8);
}

function applyPacketScan(details) {
  const sun = ["full", "part"].includes(details.sun) ? details.sun : "";
  const method = ["direct", "indoor", "transplant"].includes(details.plantingMethod) ? details.plantingMethod : "";
  const spacing = Number(details.spacingFeet);
  const germination = Number(details.daysToGerminate);
  const maturity = Number(details.daysToMaturity);
  if (!els.customName.value.trim() && details.plantName) els.customName.value = details.plantName;
  if (sun) els.packetSun.value = sun;
  if (Number.isFinite(spacing) && spacing > 0) els.packetSpacing.value = spacing;
  if (Number.isFinite(germination) && germination > 0) els.packetGerm.value = Math.round(germination);
  if (Number.isFinite(maturity) && maturity > 0) els.packetMaturity.value = Math.round(maturity);
  if (details.plantingDepth) els.packetDepth.value = details.plantingDepth;
  if (method) els.packetMethod.value = method;
  if (details.notes) els.packetNotes.value = details.notes;
}

async function scanSeedPacket() {
  const file = els.packetImage?.files?.[0];
  if (!file) {
    if (els.packetImageStatus) els.packetImageStatus.textContent = "Choose a seed-packet photo first.";
    return;
  }
  try {
    if (els.scanPacket) {
      els.scanPacket.disabled = true;
      els.scanPacket.textContent = "Reading photo...";
    }
    if (els.packetImageStatus) els.packetImageStatus.textContent = "Reading the packet and filling in the editable details...";
    const imageDataUrl = await preparePacketImage(file);
    const response = await fetch("/api/seed-packet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageDataUrl, filename: file.name })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.details) throw new Error(data.error || "CultivAIte could not read that packet.");
    packetScanData = data.details;
    applyPacketScan(packetScanData);
    if (els.packetImageStatus) {
      const confidence = packetScanData.confidence ? ` ${packetScanData.confidence} confidence.` : "";
      els.packetImageStatus.textContent = `Packet details filled in. Review them before adding to the plot.${confidence}`;
    }
    queueAutoSave();
  } catch (error) {
    if (els.packetImageStatus) els.packetImageStatus.textContent = `${error.message || "CultivAIte could not read that packet."} You can enter the details manually.`;
  } finally {
    if (els.scanPacket) {
      els.scanPacket.disabled = false;
      els.scanPacket.textContent = "Read packet photo";
    }
  }
}

function applyPacketDetails(profile, packet) {
  if (!packet) return profile;
  return {
    ...profile,
    sun: packet.sun || profile.sun,
    spacing: packet.spacing || profile.spacing,
    harvest: packet.daysToMaturity || profile.harvest,
    start: packet.method === "indoor" ? -42 : packet.method === "direct" ? -7 : profile.start,
    transplant: packet.method === "direct" ? 0 : packet.method === "indoor" ? 14 : profile.transplant,
    packet
  };
}

function resetPacketForm() {
  packetScanData = null;
  [els.packetSun, els.packetMethod].forEach((field) => {
    if (field) field.value = "";
  });
  [els.packetSpacing, els.packetGerm, els.packetMaturity, els.packetDepth, els.packetNotes].forEach((field) => {
    if (field) field.value = "";
  });
  if (els.packetImage) els.packetImage.value = "";
  if (els.packetImageStatus) els.packetImageStatus.textContent = "No packet photo attached";
}

function addCustomPlant(event) {
  event.preventDefault();
  const name = els.customName.value.trim();
  if (!name) return;
  const existing = findLibraryPlantByName(name);
  const packet = packetDetailsFromForm();
  if (existing && !packet) {
    activePlot().selected.set(existing.id, (activePlot().selected.get(existing.id) || 0) + 1);
    els.customName.value = "";
    if (els.plantSearch) els.plantSearch.value = existing.name;
    generateLayout();
    return;
  }
  const baseProfile = existing ? { ...existing } : inferPlantProfile(name);
  const profile = applyPacketDetails(baseProfile, packet);
  const id = `custom-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
  plantLibrary.push({
    id,
    name,
    short: existing?.short || name.slice(0, 3),
    color: profile.color,
    sun: profile.sun,
    spacing: profile.spacing,
    start: profile.start,
    transplant: profile.transplant,
    harvest: profile.harvest,
    water: profile.water,
    companions: []
  });
  activePlot().selected.set(id, 1);
  els.customName.value = "";
  if (els.plantSearch) els.plantSearch.value = name;
  resetPacketForm();
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

[els.width, els.length, els.goal, els.sunExposure, els.sunDirection, els.soilProfile].filter(Boolean).forEach((input) => {
  input.addEventListener("input", generateLayout);
  input.addEventListener("change", generateLayout);
});

els.zip.addEventListener("input", render);
els.zip.addEventListener("change", render);
els.addPlot.addEventListener("click", addPlot);
els.shuffle.addEventListener("click", generateLayout);
if (els.resetLayout) els.resetLayout.addEventListener("click", resetRecommendedLayout);
els.export.addEventListener("click", exportPlan);
els.customForm.addEventListener("submit", addCustomPlant);
els.navButtons.forEach((button) => {
  button.addEventListener("click", () => switchPage(button.dataset.page));
});
els.pageJumps.forEach((button) => {
  button.addEventListener("click", () => switchPage(button.dataset.pageJump));
});
if (els.gardenSelect) els.gardenSelect.addEventListener("change", () => switchGarden(els.gardenSelect.value));
if (els.newGarden) els.newGarden.addEventListener("click", createGarden);
if (els.renameGarden) els.renameGarden.addEventListener("click", renameGarden);
if (els.deleteGarden) els.deleteGarden.addEventListener("click", deleteGarden);
if (els.createAccount) {
  els.createAccount.addEventListener("click", async () => {
    if (!(await initCloudSave())) return;
    const email = els.cloudEmail.value.trim();
    const password = els.cloudPassword.value;
    if (!email || password.length < 6) {
      setCloudStatus("Enter an email and a password with at least 6 characters.");
      return;
    }
    try {
      setCloudStatus("Creating your garden account...");
      await cloudState.authApi.createUserWithEmailAndPassword(cloudState.auth, email, password);
      await saveCloudPlan();
    } catch (error) {
      setCloudStatus(error.message || "Account could not be created.");
    }
  });
}
if (els.signIn) {
  els.signIn.addEventListener("click", async () => {
    if (!(await initCloudSave())) return;
    const email = els.cloudEmail.value.trim();
    const password = els.cloudPassword.value;
    if (!email || !password) {
      setCloudStatus("Enter your email and password to sign in.");
      return;
    }
    try {
      setCloudStatus("Signing in...");
      await cloudState.authApi.signInWithEmailAndPassword(cloudState.auth, email, password);
    } catch (error) {
      setCloudStatus(error.message || "Sign in failed.");
    }
  });
}
if (els.resetPassword) {
  els.resetPassword.addEventListener("click", async () => {
    if (!(await initCloudSave())) return;
    const email = els.cloudEmail.value.trim();
    if (!email) {
      setCloudStatus("Enter your email first, then tap reset password.");
      return;
    }
    try {
      await cloudState.authApi.sendPasswordResetEmail(cloudState.auth, email);
      setCloudStatus(`Password reset sent to ${email}.`);
    } catch (error) {
      setCloudStatus(error.message || "Password reset could not be sent.");
    }
  });
}
if (els.syncCloud) {
  els.syncCloud.addEventListener("click", async () => {
    if (!(await initCloudSave())) return;
    await saveCloudPlan();
  });
}
if (els.signOut) {
  els.signOut.addEventListener("click", async () => {
    if (!(await initCloudSave())) return;
    await cloudState.authApi.signOut(cloudState.auth);
    setCloudStatus("Signed out. Local device save is still active.");
  });
}
if (els.calendarPrev) els.calendarPrev.addEventListener("click", () => moveCalendarMonth(-1));
if (els.calendarNext) els.calendarNext.addEventListener("click", () => moveCalendarMonth(1));
if (els.calendarToday) els.calendarToday.addEventListener("click", jumpCalendarToToday);
if (els.onboardingForm) els.onboardingForm.addEventListener("submit", applyOnboarding);
if (els.skipOnboarding) els.skipOnboarding.addEventListener("click", closeOnboarding);
if (els.onboardingBack) els.onboardingBack.addEventListener("click", () => setOnboardingStep(onboardingStep - 1));
if (els.onboardingNext) els.onboardingNext.addEventListener("click", nextOnboardingStep);
if (els.onboardAlreadyPlanted) els.onboardAlreadyPlanted.addEventListener("change", toggleOnboardingDatePanel);
if (els.plantSearch) els.plantSearch.addEventListener("input", renderPlantPicker);
if (els.packetImage) {
  els.packetImage.addEventListener("change", () => {
    packetScanData = null;
    const file = els.packetImage.files?.[0];
    if (els.packetImageStatus) {
      els.packetImageStatus.textContent = file ? `Attached: ${file.name}` : "No packet photo attached";
    }
    queueAutoSave();
  });
}
if (els.scanPacket) els.scanPacket.addEventListener("click", scanSeedPacket);
els.plannerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveCurrentPlan();
});
els.saveNow.addEventListener("click", saveCurrentPlan);
els.markTasks.addEventListener("click", markNextTaskDone);
if (els.taskPageList) {
  els.taskPageList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-task-key]");
    if (button) toggleTaskComplete(button.dataset.taskKey);
  });
}
els.askForm.addEventListener("submit", askSol);
if (els.plantedDate) els.plantedDate.addEventListener("change", updateSelectedPlantDate);
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
document.addEventListener("input", (event) => {
  const field = event.target.closest("input, select, textarea");
  if (!field || field.type === "password" || field.id === "plantSearchInput") return;
  queueAutoSave();
});
document.addEventListener("change", (event) => {
  const field = event.target.closest("input, select, textarea");
  if (!field || field.type === "password") return;
  savePlan();
});

loadSavedPlan();
syncControlsFromPlot();
if (activePlot().placedPlants.length) render();
else generateLayout();
updateCloudButtons();
initCloudSave();
showOnboardingIfNeeded();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.warn("CultivAIte service worker registration failed", error);
    });
  });
}
