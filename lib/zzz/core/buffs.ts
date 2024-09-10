export type Buff =
  "anomalyProficiency" |
  "anomalyBuildupRate" |

// Anomaly damage % actual formula:
//=1+(0.4+Min(0.6,<final AP>*0.16%))*0.5
  "anomalyDamageMultiplier" |

  "basicAtkPercent" |
  "basicAtkFlat" |
  "finalAtkPercent" |
  "finalAtkFlat" |
  "critRate" |
  "critDmg" |

  "attributeDamagePercent" |
  "basicDamagePercent" |
  "dashDamagePercent" |
  "skillDamagePercent" |
  "assistDamagePercent" |
  "ultimateDamagePercent" |

  "penPercent" |
  "penFlat" |
  "resShred" |
  "defShred" |
  "dmgTaken" |
  "stunBonus" |

  "basicHpPercent" |
  "finalHpPercent" |
  "basicHp" |
  "finalHp" |

  "basicDefPercent" |
  "finalDefPercent" |
  "basicDef" |
  "finalDef";

export type BuffValues = Record<Buff, number>

export const DefaultBuffValues: BuffValues = {
  anomalyProficiency: 0,
  anomalyBuildupRate: 0,
  anomalyDamageMultiplier: 0,
  assistDamagePercent: 0,
  attributeDamagePercent: 0,
  basicAtkFlat: 0,
  basicAtkPercent: 0,
  basicDamagePercent: 0,
  basicDef: 0,
  basicDefPercent: 0,
  basicHp: 0,
  basicHpPercent: 0,
  critDmg: 0,
  critRate: 0,
  dashDamagePercent: 0,
  defShred: 0,
  dmgTaken: 0,
  finalAtkFlat: 0,
  finalAtkPercent: 0,
  finalDef: 0,
  finalDefPercent: 0,
  finalHp: 0,
  finalHpPercent: 0,
  penFlat: 0,
  penPercent: 0,
  resShred: 0,
  skillDamagePercent: 0,
  stunBonus: 0,
  ultimateDamagePercent: 0
}

export const mergeBuffs = (buffs1: BuffValues, buffs2: BuffValues): BuffValues => {
  const mergedBuffs: BuffValues = { ...buffs1 };

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
