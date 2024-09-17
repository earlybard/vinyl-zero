import {Wengine} from "@/lib/zzz/core/Wengine";
import {BuffLabels, buff} from "@/lib/zzz/buffs/buffs";

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

export const StarlightEngine: Wengine = {
  label: "Starlight Engine",
  baseAttack: 595,
  buffs2: [
    buff("basicAtkPercent", 0.24),
    buff("finalAtkPercent", 0.192)
  ]
}

export const wengines = [
  SharpenedStinger,
  FusionCompiler,
  RainforestGourmet,
  StarlightEngine
]
