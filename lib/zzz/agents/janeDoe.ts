import {
  DefaultAgentDriveMainstatCount, Mainstats, substat
} from "@/lib/zzz/stats/discStats";
import {Agent} from "@/lib/zzz/core/Agent";
import {buff, BuffLabels, DefaultBuffCounts} from "@/lib/zzz/buffs/buffs";
import {AgentDiscDrives, DefaultDiscs, DefaultDiscValues} from "@/lib/zzz/disc-drives/discDrive";
import {SharpenedStinger} from "@/lib/zzz/wengine/wengines";

export const JaneDoe: Agent = {
  label: "Jane Doe",

  // TODO imagery/branding/colour per agent
  // TODO atk vs. anomaly vs. support etc

  baseStats: {
    hp: 7789,
    atk: 881,
    def: 607,
    impact: 86,
    critRate: 0.05,
    critDmg: 0.5,
    anomalyMastery: 148,
    anomalyProficiency: 114, // 114 + 100 + 90 +
    penRatio: 0,
    energyRegen: 0.012
  },

  // inherent buffs - non editable
  agentBuffs: [
    buff("anomalyDamageMultiplier", 0.5, "Assault Crit for +50% DMG"),
    buff("anomalyBuildupRate", 0.35, "Core Passive"),
    buff("finalAtkFlat", 440, "Core Passive")
  ],

  customBuffs: [
    buff("basicAtkPercent", 0.10, "Hormone 2pc"),
    buff("attributeDamagePercent", 0.1, "Fanged Metal 2pc"),
    buff("dmgTaken", 0.35, "Fanged Metal 4pc"),

    // Caesar
    buff("finalAtkFlat", 1000, "Caesar Core"),
    buff("dmgTaken", 0.25, "Caesar Additional"),
  ],

  discDrives: [
    {mainStat: Mainstats.hpFlat, subStats: [
        substat("anomalyProficiency", 0),
        substat("atkPercent", 1),
        substat("penFlat", 0),
        substat("atkFlat", 3)
      ]},
    {mainStat: Mainstats.atkFlat, subStats: [
        substat("hpFlat", 0),
        substat("critDmg", 1),
        substat("anomalyProficiency", 0),
        substat("atkPercent", 2),
      ]},
    {mainStat: Mainstats.defFlat, subStats: [
        substat("atkPercent", 0),
        substat("hpFlat", 1),
        substat("critRate", 0),
        substat("anomalyProficiency", 3),
      ]},
    {mainStat: Mainstats.anomalyProficiency, subStats: [
        substat("atkPercent", 1),
        substat("atkFlat", 2),
        substat("defPercent", 1),
        substat("hpFlat", 2),
      ]},
    {mainStat: Mainstats.attributeDamagePercent, subStats: [
        substat("atkPercent", 1),
        substat("penFlat", 1),
        substat("defFlat", 1),
        substat("anomalyProficiency", 2),
      ]},
    {mainStat: Mainstats.anomalyMastery, subStats: [
        substat("critDmg", 2),
        substat("atkFlat", 0),
        substat("atkPercent", 0),
        substat("anomalyProficiency", 2),
      ]},
  ],

  wengine: SharpenedStinger
}
