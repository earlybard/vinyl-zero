import {Wengine} from "@/lib/zzz/core/Wengine";
import {BuffLabels} from "@/lib/zzz/buffs/buffs";

export const RainforestGourmet: Wengine = {
  label: "Rainforest Gourmet",
  baseAttack: 595,
  buffs2: [
    {
      id: 0,
      key: "anomalyProficiency",
      label: BuffLabels.anomalyProficiency,
      value: 75,
      description: ""
    },
    {
      id: 1,
      key: "finalAtkPercent",
      label: BuffLabels.finalAtkPercent,
      value: 0.24,
      description: ""
    },
  ]
}

export const SharpenedStinger: Wengine = {
  label: "Sharpened Stinger",
  baseAttack: 714,
  buffs2: [
    {
      id: 0,
      key: "anomalyProficiency",
      label: BuffLabels.anomalyProficiency,
      value: 90,
      description: ""
    },
    {
      id: 1,
      key: "attributeDamagePercent",
      label: BuffLabels.attributeDamagePercent,
      value: 0.36,
      description: ""
    },
    {
      id: 2,
      key: "anomalyBuildupRate",
      label: BuffLabels.anomalyBuildupRate,
      value: 0.24,
      description: ""
    },
  ]
}

export const FusionCompiler: Wengine = {
  label: "Fusion Compiler",
  baseAttack: 684,
  buffs2: [
    {
      id: 0,
      key: "penPercent",
      label: BuffLabels.penPercent,
      value: 0.24,
      description: ""
    },
    {
      id: 1,
      key: "basicAtkPercent",
      label: BuffLabels.basicAtkPercent,
      value: 0.12,
      description: ""
    },
    {
      id: 2,
      key: "anomalyProficiency",
      label: BuffLabels.anomalyProficiency,
      value: 50,
      description: ""
    },
  ]
}

export const wengines = [
  SharpenedStinger,
  FusionCompiler,
  RainforestGourmet
]
