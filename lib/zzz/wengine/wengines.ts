import {Wengine} from "@/lib/zzz/core/Wengine";
import {BuffLabels, buff} from "@/lib/zzz/buffs/buffs";

export const WeepingGemini: Wengine = {
  label: "Weeping Gemini",
  baseAttack: 595,
  buffs2: [
    buff("basicAtkPercent", 0.25),
    buff("anomalyProficiency", 144, "3 Stacks")
  ]
}

export const RainforestGourmet: Wengine = {
  label: "Rainforest Gourmet",
  baseAttack: 595,
  buffs2: [
    buff("anomalyProficiency", 75),
    buff("finalAtkPercent", 0.24)
  ]
}

export const SharpenedStinger: Wengine = {
  label: "Sharpened Stinger",
  baseAttack: 714,
  buffs2: [
    buff("anomalyProficiency", 90),
    buff("attributeDamagePercent", 0.36),
    buff("anomalyBuildupRate", 0.24)
  ]
}

export const FusionCompiler: Wengine = {
  label: "Fusion Compiler",
  baseAttack: 684,
  buffs2: [
    buff("penPercent", 0.24),
    buff("basicAtkPercent", 0.12),
    buff("anomalyProficiency", 50)
  ]
}

export const HailstormShrine: Wengine = {
  label: "Hailstorm Shrine",
  baseAttack: 743,
  buffs2: [
    buff("critRate", 0.24),
    buff("critDmg", 0.5),
    buff("attributeDamagePercent", 0.4)
  ]
}

export const StarlightEngine: Wengine = {
  label: "Starlight Engine",
  baseAttack: 595,
  buffs2: [
    buff("basicAtkPercent", 0.24),
    buff("finalAtkPercent", 0.192)
  ]
}

export const MarcatoDesire: Wengine = {
  label: "Marcato Desire",
  baseAttack: 594,
  buffs2: [
    buff("critRate", 0.2),
    buff("finalAtkPercent", 0.192)
  ]
}


export const wengines = [
  SharpenedStinger,
  FusionCompiler,
  RainforestGourmet,
  WeepingGemini,
  HailstormShrine,
  StarlightEngine,
  MarcatoDesire,
]
