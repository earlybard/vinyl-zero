import {Wengine} from "@/lib/zzz/core/Wengine";
import {DefaultBuffCounts} from "@/lib/zzz/buffs/buffs";

export const RainforestGourmet: Wengine = {
  label: "Rainforest Gourmet",
  baseAttack: 595,
  buffs: {
    ...DefaultBuffCounts,
    anomalyProficiency: 75,
    finalAtkPercent: 0.24
  },
}

export const SharpenedStinger: Wengine = {
  label: "Sharpened Stinger",
  baseAttack: 714,
  buffs: {
    ...DefaultBuffCounts,
    anomalyProficiency: 90,
    attributeDamagePercent: 0.36,
    anomalyBuildupRate: 0.24
  }
}

export const FusionCompiler: Wengine = {
  label: "Fusion Compiler",
  baseAttack: 684,
  buffs: {
    ...DefaultBuffCounts,
    penPercent: 0.24,
    basicAtkPercent: 0.12,
    anomalyProficiency: 50
  }
}

export const wengines = [
  SharpenedStinger,
  FusionCompiler,
  RainforestGourmet
]
