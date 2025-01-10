import {Mainstats, substat} from "@/lib/zzz/stats/discStats";
import {Agent} from "@/lib/zzz/core/Agent";
import {buff} from "@/lib/zzz/buffs/buffs";
import {HailstormShrine} from "@/lib/zzz/wengine/wengines";

export const HoshimiMiyabi: Agent = {
  label: "Hoshimi Miyabi",

  // TODO imagery/branding/colour per agent
  // TODO atk vs. anomaly vs. support etc

  baseStats: {
    hp: 7673,
    atk: 880,
    def: 606,
    impact: 86,
    critRate: 0.05,
    critDmg: 0.5,
    anomalyMastery: 116,
    anomalyProficiency: 238,
    penRatio: 0,
    energyRegen: 0.012
  },

  // inherent buffs - non editable
  agentBuffs: [
    buff("resShred", 0.3, "EBA3"),
    buff("attributeDamagePercent", 0.6, "EBA3"),
    buff("critDmg", 0.1, "Frostbite")
  ],

  customBuffs: [
    // buff("critRate", 0.08, "Woodpecker 2pc"),
    buff("basicAtkPercent", 0.10, "Hormone 2pc"),
    buff("critDmg", 0.16, "Branch 2pc"),
    buff("critDmg", 0.3, "Branch 4pc"),
    buff("critRate", 0.12, "Branch 4pc"),

    buff("finalAtkFlat", 600, "Lucy Cheer On"),
    buff("critDmg", 0.1, "Lucy Cheer On"),
  ],

  discDrives: [
    {mainStat: Mainstats.hpFlat, subStats: [
        substat("atkPercent", 1),
        substat("anomalyProficiency"),
        substat("critRate", 1),
        substat("critDmg", 2)
    ]},
    {mainStat: Mainstats.atkFlat, subStats: [
        substat("critDmg", 1),
        substat("critRate", 1),
        substat("atkPercent", 2),
        substat("defPercent"),
    ]},
    {mainStat: Mainstats.defFlat, subStats: [
        substat("critRate", 2),
        substat("anomalyProficiency", 2),
        substat("atkPercent"),
        substat("penFlat", 1),
    ]},
    {mainStat: Mainstats.critRate, subStats: [
        substat("critDmg", 2),
        substat("atkPercent", 1),
        substat("defPercent", 1),
        substat("penFlat"),
    ]},
    {mainStat: Mainstats.penRatio, subStats: [
        substat("hpFlat"),
        substat("atkPercent", 3),
        substat("critRate", 1),
        substat("critDmg"),
      ]},
    {mainStat: Mainstats.atkPercent, subStats: [
        substat("defFlat", 1),
        substat("critDmg"),
        substat("critRate", 3),
        substat("penFlat"),
    ]},
],

  wengine: HailstormShrine
}
