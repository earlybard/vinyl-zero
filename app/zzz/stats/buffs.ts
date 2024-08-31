export type DamageBuffs =
  "basicAtkPercent" |
  "basicAtkFlat" |
  "finalAtkPercent" |
  "finalAtkFlat" |
  "attributeDamagePercent" |
  "dmgTaken"

export type BuffValues = Record<DamageBuffs, number>