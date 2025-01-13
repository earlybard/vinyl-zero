import {Agent} from "@/lib/zzz/core/Agent";
import {buff} from "@/lib/zzz/buffs/buffs";
import {AgentDiscDrives, DefaultDiscs} from "@/lib/zzz/disc-drives/discDrive";
import {FusionCompiler} from "@/lib/zzz/wengine/wengines";

export const Yanagi: Agent = {
  label: "Yanagi",

  // TODO imagery/branding/colour per agent
  // TODO atk vs. anomaly vs. support etc

  baseStats: {
    hp: 7789,
    atk: 873,
    def: 613,
    impact: 86,
    critRate: 0.05,
    critDmg: 0.5,
    anomalyMastery: 148,
    anomalyProficiency: 114,
    penRatio: 0,
    energyRegen: 0.012
  },

  // inherent buffs - non editable
  agentBuffs: [
    buff("attributeDamagePercent", 0.1, "Jougen Stance"),
    buff("penPercent", 0.1, "Kagen Stance"),
    buff("attributeDamagePercent", 0.2, "Core Passive: 15s after Ex")
  ],

  customBuffs: [
    // Chaos Jazz
    buff("anomalyProficiency", 30, "Chaos Jazz 2pc"),
    buff("attributeDamagePercent", 0.15, "Chaos Jazz 4pc"),

    // TM
    buff("attributeDamagePercent", 0.1, "Thunder Metal 2pc"),

    // Lucy
    buff("finalAtkFlat", 600, "Lucy Cheer On"),
    buff("critDmg", 0.1, "Lucy Cheer On"),
  ],

  discDrives: DefaultDiscs.slice() as AgentDiscDrives,

  wengine: FusionCompiler
}
