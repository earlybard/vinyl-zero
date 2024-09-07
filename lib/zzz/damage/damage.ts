import {MainstatMultipliers, SubstatMultipliers} from "@/lib/zzz/constants/statMultipliers";
import {AnomalyMultipliers, AnomalyType} from "@/lib/zzz/constants/anomaly";
import {AgentDriveMainstatCount, AgentDriveSubstatCount} from "@/lib/zzz/stats/discStats";
import {Agent} from "@/lib/zzz/core/Agent";

export function damageCalc(
  agent: Agent,
  substatCount: AgentDriveSubstatCount,
  mainstatCount: AgentDriveMainstatCount) {

  const baseStats = agent.baseStats
  const buffs = agent.buffs

  // 714 is wengine attack. TODO this needs to be its own object
  const baseAttack = baseStats.atk + 714;

  // TODO make mainstat and substat
  const basicAttack =
    baseAttack +
    (mainstatCount.atkFlat * MainstatMultipliers.atkFlat) +
    (mainstatCount.atkPercent * MainstatMultipliers.atkPercent * baseAttack) +
    (substatCount.atkPercent * SubstatMultipliers.atkPercent * baseAttack) +
    (substatCount.atkFlat * SubstatMultipliers.atkFlat) +
    buffs.basicAtkFlat +
    (buffs.basicAtkPercent * baseAttack);

  const finalAttack =
    basicAttack +
    (buffs.finalAtkPercent * basicAttack) +
    buffs.finalAtkFlat;

  const attributeDamagePercent =
    buffs.attributeDamagePercent +
    (mainstatCount.attributeDamagePercent * MainstatMultipliers.attributeDamagePercent)

  const penFlat = (substatCount.penFlat * SubstatMultipliers.penFlat) + buffs.penFlat
  const penRatio = (mainstatCount.penRatio * MainstatMultipliers.penRatio) + buffs.penPercent

  const TARGET_BASE_DEF = 921
  const targetDef = TARGET_BASE_DEF - (TARGET_BASE_DEF * buffs.defShred)
  const effectiveDef = targetDef * (1 - penRatio) - penFlat
  const DEF_LEVEL_COEFFICIENT = 794
  const defMultiplier = DEF_LEVEL_COEFFICIENT / (DEF_LEVEL_COEFFICIENT + effectiveDef)

  const innateResPercent = 0
  const allTypeResPercent = 0
  const resMultiplier = 1 - innateResPercent - allTypeResPercent + buffs.resShred

  let critRate =
    (mainstatCount.critRate * MainstatMultipliers.critRate) +
    (substatCount.critRate * SubstatMultipliers.critRate) +
    baseStats.critRate +
    buffs.critRate

  const critDmg =
    (mainstatCount.critDmg * MainstatMultipliers.critDmg) +
    (substatCount.critDmg * SubstatMultipliers.critDmg) +
    baseStats.critDmg +
    buffs.critDmg

  const critMultiplier = 1 + (critRate * critDmg)

  const dmgTaken = 1 + buffs.dmgTaken

  const attackScale =
    (1 + attributeDamagePercent) *
    dmgTaken *
    defMultiplier *
    resMultiplier *
    critMultiplier *
    finalAttack

  // TODO Why?????
  // This is from jstern "Damage Formula" I28
  const ANOMALY_BUFF_LEVEL = 2;

  const wengineAnomaly = 0
  // Not sure if this is a buff?
  const anomalyProficiency = wengineAnomaly + 100

  const apBonus = (
    (mainstatCount.anomalyProficiency * MainstatMultipliers.anomalyProficiency) +
    (substatCount.anomalyProficiency * SubstatMultipliers.anomalyProficiency) +
    anomalyProficiency +
    baseStats.anomalyProficiency
  ) / 100

  // TODO values are very slightly different from the spreadsheet.
  // Might just be some rounding in Google sheets that I'm not doing.

  // Will need to compare to in-game to make sure I get this right.
  const anomaly =
    (1 + attributeDamagePercent) *
    defMultiplier *
    resMultiplier *
    dmgTaken *
    apBonus *
    ANOMALY_BUFF_LEVEL *
    finalAttack

  // TODO JD does anomaly crits. This needs to be incorporated in buffs.
  const anomalyDamage: Record<AnomalyType, number> = {
    shatter: anomaly * AnomalyMultipliers.shatter,
    assault: anomaly * AnomalyMultipliers.assault,
    burn: anomaly * AnomalyMultipliers.burn,
    corruption: anomaly * AnomalyMultipliers.corruption,
    shock: anomaly * AnomalyMultipliers.shock
  }

  return {
    baseAttack,
    basicAttack,
    finalAttack,
    penFlat,
    penRatio,
    defMultiplier,
    attributeDamagePercent,
    critRate,
    critDmg,
    critMultiplier,
    resMultiplier,
    anomaly,
    apBonus,
    attackScale,
    anomalyDamage
  }
}