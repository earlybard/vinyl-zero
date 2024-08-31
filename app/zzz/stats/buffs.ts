export type DamageBuffs =
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

export type BuffValues = Record<DamageBuffs, number>