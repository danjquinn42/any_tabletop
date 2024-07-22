import icon_mountain_range from "../assets/icon_mountain_range.svg";
import icon_mountain from "../assets/icon_mountain.svg";
import icon_farm from "../assets/icon_farm.svg";
import icon_forest from "../assets/icon_forest_1.svg";
import icon_trees from "../assets/icon_trees_1.svg";
import icon_walled_town from "../assets/icon_town_1.svg";
import icon_castle from "../assets/icon_castle_1.svg";
import icon_hills from "../assets/icon_hills.svg";
import icon_star from "../assets/icon_star.svg";
import icon_huts from "../assets/icon_huts.svg";
import icon_small_town from "../assets/icon_houses.svg";
import icon_medium_town from "../assets/icon_medium_town.svg";
import icon_big_tree from "../assets/icon_big_tree.svg";

export const iconMap = {
  icon_mountain_range,
  icon_mountain,
  icon_farm,
  icon_forest,
  icon_trees,
  icon_walled_town,
  icon_castle,
  icon_hills,
  icon_star,
  icon_huts,
  icon_small_town,
  icon_medium_town,
  icon_big_tree,
};

const TerrainType = {
  BEACH: "BEACH",
  BLIGHT: "BLIGHT",
  DESERT: "DESERT",
  FARM: "FARM",
  FOREST: "FOREST",
  HILLS: "HILLS",
  MARSH: "MARSH",
  MEADOW: "MEADOW",
  MOUNTAIN: "MOUNTAIN",
  SETTLEMENT: "SETTLEMENT",
  SPECIAL: "SPECIAL",
  SWAMP: "SWAMP",
  WATER: "WATER",
  WOOD: "WOOD",
};

const colorPallet = {
  gold: "#b69321",
  sand: "#b29655",
  dirt: "#946f50",
  clay: "#967f64",
  stone: "#807b7b",
  lightStone: "#9f8e8e",
  deepGreen: "#025e1e",
  mediumGreen: "#067a19",
  grassyGreen: "#448a48",
  algeaGreen: "#6ba92f",
  sicklyGreen: "#719319",
  azure: "#236fbb",
};
export const DEFAULT_STYLES = {
  [TerrainType.BEACH]: {
    icon: null,
    color: colorPallet.sand,
  },
  [TerrainType.BLIGHT]: {
    icon: null,
    color: colorPallet.clay,
  },
  [TerrainType.DESERT]: {
    icon: null,
    color: colorPallet.sand,
  },
  [TerrainType.FARM]: {
    icon: "icon_farm",
    color: colorPallet.dirt,
  },
  [TerrainType.FOREST]: {
    icon: "icon_forest",
    color: colorPallet.deepGreen,
  },
  [TerrainType.HILLS]: {
    icon: "icon_hills",
    color: colorPallet.grassyGreen,
  },
  [TerrainType.MARSH]: {
    icon: null,
    color: colorPallet.algeaGreen,
  },
  [TerrainType.MEADOW]: {
    icon: null,
    color: colorPallet.grassyGreen,
  },
  [TerrainType.MOUNTAIN]: {
    icon: "icon_mountain_range",
    color: colorPallet.stone,
  },
  [TerrainType.SETTLEMENT]: {
    icon: "icon_small_town",
    color: colorPallet.lightStone,
  },
  [TerrainType.SPECIAL]: {
    icon: "icon_star",
    color: colorPallet.gold,
  },
  [TerrainType.SWAMP]: {
    icon: null,
    color: colorPallet.sicklyGreen,
  },
  [TerrainType.WATER]: {
    icon: null,
    color: colorPallet.azure,
  },
  [TerrainType.WOOD]: {
    icon: "icon_trees",
    color: colorPallet.mediumGreen,
  },
};
