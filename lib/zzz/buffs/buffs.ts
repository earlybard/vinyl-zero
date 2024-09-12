export type Buff =
  "anomalyProficiency" |
  "anomalyBuildupRate" |

// Anomaly damage % actual formula for Jane:
//=1+(0.4+Min(0.6,<final AP>*0.16%))*0.5
  "anomalyDamageMultiplier" |

  "basicAtkPercent" |
  "basicAtkFlat" |
  "finalAtkPercent" |
  "finalAtkFlat" |
  "critRate" |
  "critDmg" |

  "attributeDamagePercent" |

  "penPercent" |
  "penFlat" |
  "resShred" |
  "defShred" |
  "dmgTaken" |
  "stunBonus";

  // "basicHpPercent" |
  // "finalHpPercent" |
  // "basicHp" |
  // "finalHp" |
  //
  // "basicDefPercent" |
  // "finalDefPercent" |
  // "basicDef" |
  // "finalDef";

export type BuffCounts = Record<Buff, number>

export const BuffLabels: Record<Buff, string> = {
  anomalyBuildupRate: "Anomaly Buildup Rate",
  anomalyDamageMultiplier: "Anomaly Damage %",
  anomalyProficiency: "Anomaly Proficiency",
  attributeDamagePercent: "Attribute Damage %",
  basicAtkFlat: "Basic ATK Flat",
  basicAtkPercent: "Basic ATK %",
  critDmg: "Crit DMG %",
  critRate: "Crit Rate",
  defShred: "Def Shred",
  dmgTaken: "Enemy DMG Taken",
  finalAtkFlat: "Final ATK Flat",
  finalAtkPercent: "Final ATK %",
  penFlat: "Pen Flat",
  penPercent: "Pen %",
  resShred: "Res Shred",
  stunBonus: "Stun Bonus"
}

export interface BuffValue {
  id: number,
  key: Buff
  label: string,
  value: number,
  description: string
}

export const BuffOptions: BuffValue[] = Object.entries(BuffLabels).map(([k, v], i) => {
  return {
    id: i,
    key: k as Buff,
    label: v,
    description: "",
    value: 0
  }
})

export const DefaultBuffCounts: BuffCounts = {
  anomalyProficiency: 0,
  anomalyBuildupRate: 0,
  anomalyDamageMultiplier: 0,
  attributeDamagePercent: 0,
  basicAtkFlat: 0,
  basicAtkPercent: 0,
  critDmg: 0,
  critRate: 0,
  defShred: 0,
  dmgTaken: 0,
  finalAtkFlat: 0,
  finalAtkPercent: 0,
  penFlat: 0,
  penPercent: 0,
  resShred: 0,
  stunBonus: 0,
}

export const mergeBuffs = (buffs1: BuffCounts, buffs2: BuffCounts): BuffCounts => {
  const mergedBuffs: BuffCounts = { ...buffs1 };

  for (const key in buffs2) {
    const buff = key as Buff

    if (key in mergedBuffs) {
      mergedBuffs[buff] += buffs2[buff];
    } else {
      mergedBuffs[buff] = buffs1[buff];
    }
  }

  return mergedBuffs;
};
