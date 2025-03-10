import {MainstatMultipliers, SubstatMultipliers} from "@/lib/zzz/constants/statMultipliers";
import {AnomalyMultipliers, AnomalyType} from "@/lib/zzz/constants/anomaly";
import {
  DefaultAgentDriveMainstatCount, DefaultAgentDriveSubstatCount
} from "@/lib/zzz/stats/discStats";
import {Agent} from "@/lib/zzz/core/Agent";
import {BuffCounts, DefaultBuffCounts, mergeBuffs} from "@/lib/zzz/buffs/buffs";
import {Wengine} from "@/lib/zzz/core/Wengine";
import {EnemyState} from "@/lib/store/enemyStore";

export interface DamageCalcs {
  baseAttack: number
  basicAttack: number
  finalAttack: number
  penFlat: number
  penRatio: number
  defMultiplier: number
  attributeDamagePercent: number
  basicCritRate: number
  finalCritRate: number
  basicCritDmg: number
  finalCritDmg: number
  critMultiplier: number
  resMultiplier: number
  anomaly: number
  anomalyProficiency: number
  apBonus: number
  attackScale: number
  anomalyDamage: Record<AnomalyType, number>
}

export function damageCalc(agent: Agent, enemy: EnemyState): DamageCalcs {

  const baseStats = agent.baseStats

  const mainstatCount = {...DefaultAgentDriveMainstatCount}
  const substatCount = {...DefaultAgentDriveSubstatCount}

  // TODO i hate this. the design for how we store substats and their key etc has to change.
  for (let discDrive of agent.discDrives) {
    if (discDrive.mainStat) {
      mainstatCount[discDrive.mainStat.key] += 1
    }

    for (let substat of discDrive.subStats) {
      substatCount[substat.key] += 1
      if (substat.level) {
        substatCount[substat.key] += substat.level
      }
    }
  }

  const wengine: Wengine = agent.wengine ?? {
    baseAttack: 0,
    buffs2: [],
    label: "Empty"
  }

  const buffs: BuffCounts = {...DefaultBuffCounts}

  for (let buff of agent.agentBuffs) {
    buffs[buff.key] += buff.value
  }
  for (let buff of agent.customBuffs) {
    buffs[buff.key] += buff.value
  }
  for (let buff of wengine.buffs2) {
    buffs[buff.key] += buff.value
  }

  const baseAttack = baseStats.atk + wengine.baseAttack;

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

  const TARGET_BASE_DEF = enemy.def
  const targetDef = TARGET_BASE_DEF - (TARGET_BASE_DEF * buffs.defShred)
  const effectiveDef = targetDef * (1 - penRatio) - penFlat
  const DEF_LEVEL_COEFFICIENT = 794
  const defMultiplier = DEF_LEVEL_COEFFICIENT / (DEF_LEVEL_COEFFICIENT + effectiveDef)

  const innateResPercent = 0
  const allTypeResPercent = 0
  const resMultiplier = 1 - innateResPercent - allTypeResPercent + buffs.resShred

  let basicCritRate =
    (mainstatCount.critRate * MainstatMultipliers.critRate) +
    (substatCount.critRate * SubstatMultipliers.critRate) +
    baseStats.critRate

  let finalCritRate = Math.min(1, basicCritRate + buffs.critRate)

  let basicCritDmg =
    (mainstatCount.critDmg * MainstatMultipliers.critDmg) +
    (substatCount.critDmg * SubstatMultipliers.critDmg) +
    baseStats.critDmg

  const finalCritDmg = basicCritDmg + buffs.critDmg

  const critMultiplier = 1 + (finalCritRate * finalCritDmg)

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
  // TODO set all my stats and see if it lines up?
  const ANOMALY_BUFF_LEVEL = 2;

  const anomalyProficiency =
    (mainstatCount.anomalyProficiency * MainstatMultipliers.anomalyProficiency) +
    (substatCount.anomalyProficiency * SubstatMultipliers.anomalyProficiency) +
    buffs.anomalyProficiency +
    baseStats.anomalyProficiency

  const apBonus = anomalyProficiency / 100

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
    finalAttack *
    (1 + buffs.anomalyDamageMultiplier)

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
    basicCritRate,
    finalCritRate,
    basicCritDmg,
    finalCritDmg,
    critMultiplier,
    resMultiplier,
    anomaly,
    anomalyProficiency,
    apBonus,
    attackScale,
    anomalyDamage
  }
}