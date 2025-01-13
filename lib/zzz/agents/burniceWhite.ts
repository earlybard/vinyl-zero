import {
  DefaultAgentDriveMainstatCount, Mainstats, substat
} from "@/lib/zzz/stats/discStats";
import {Agent} from "@/lib/zzz/core/Agent";
import {buff, BuffLabels, DefaultBuffCounts} from "@/lib/zzz/buffs/buffs";
import {AgentDiscDrives, DefaultDiscs, DefaultDiscValues} from "@/lib/zzz/disc-drives/discDrive";
import {FusionCompiler, SharpenedStinger, WeepingGemini} from "@/lib/zzz/wengine/wengines";

export const BurniceWhite: Agent = {
  label: "Burnice",

  // TODO imagery/branding/colour per agent
  // TODO atk vs. anomaly vs. support etc

  baseStats: {
    hp: 7368,
    atk: 863,
    def: 601,
    impact: 83,
    critRate: 0.05,
    critDmg: 0.5,
    anomalyMastery: 118,
    anomalyProficiency: 120,
    penRatio: 0,
    energyRegen: 0.0156
  },

  // inherent buffs - non editable
  agentBuffs: [

  ],

  customBuffs: [
    buff("anomalyProficiency", 30, "Chaos Jazz 2pc"),
    buff("attributeDamagePercent", 0.15, "Chaos Jazz 4pc"),
    buff("anomalyProficiency", 30, "Freedom Blues 2pc"),

    // Caesar
    buff("finalAtkFlat", 1000, "Caesar Core"),
    buff("dmgTaken", 0.25, "Caesar Additional")
  ],

  discDrives: [
    {mainStat: Mainstats.hpFlat, subStats: [
        substat("atkPercent", 3),
        substat("anomalyProficiency", 1),
        substat("penFlat", 0),
        substat("critDmg", 0)
      ]},
    {mainStat: Mainstats.atkFlat, subStats: [
        substat("penFlat", 0),
        substat("atkPercent", 2),
        substat("anomalyProficiency", 2),
        substat("defPercent"),
      ]},
    {mainStat: Mainstats.defFlat, subStats: [
        substat("atkPercent", 1),
        substat("anomalyProficiency", 2),
        substat("atkFlat"),
        substat("hpFlat", 1),
      ]},
    {mainStat: Mainstats.anomalyProficiency, subStats: [
        substat("atkPercent", 1),
        substat("atkFlat", 2),
        substat("critDmg"),
      ]},
    {mainStat: Mainstats.attributeDamagePercent, subStats: [
        substat("anomalyProficiency", 2),
        substat("critRate", 1),
        substat("critDmg"),
      ]},
    {mainStat: Mainstats.anomalyMastery, subStats: [
        substat("atkPercent", 1),
        substat("atkFlat", 1),
        substat("critDmg", 0),
        substat("penFlat", 2),
      ]},
  ],

  wengine: WeepingGemini
}
