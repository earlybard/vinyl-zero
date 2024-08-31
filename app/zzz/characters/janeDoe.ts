import {Agent, AgentDriveMainstatCount, AgentDriveSubstatCount, AgentStat} from "@/app/zzz/stats/stats";
import {BuffValues} from "@/app/zzz/stats/buffs";

export const JaneDoe: Agent = {
  def: 607, hp: 7789,
  name: "Jane Doe",
  atk: 881,
  critRate: 0.05,
  critDmg: 0.5,
  penRatio: 0,
  impact: 86,
  anomalyMastery: 150,
  anomalyProficiency: 112,
  energyRegen: 0.012
};

export const JaneDriveSubstats: AgentDriveSubstatCount = {
  critDmg: 4,
  critRate: 4,
  anomalyProficiency: 4,
  atkFlat: 4,
  atkPercent: 4,
  defFlat: 4,
  defPercent: 4,
  hpFlat: 4,
  hpPercent: 4,
  penFlat: 4
}

export const JaneDriveMainstats: AgentDriveMainstatCount = {
  critRate: 0,
  critDmg: 0,
  anomalyMastery: 1,
  anomalyProficiency: 1,
  atkFlat: 1,
  atkPercent: 0,
  attributeDamagePercent: 0,
  defFlat: 1,
  defPercent: 0,
  energyRegen: 0,
  hpFlat: 1,
  hpPercent: 0,
  impact: 0,
  penRatio: 1
}

export const JaneBuffs: BuffValues = {
  assistDamagePercent: 0,
  basicDamagePercent: 0,
  basicDef: 0,
  basicDefPercent: 0,
  basicHp: 0,
  basicHpPercent: 0,
  critDmg: 0,
  critRate: 0,
  dashDamagePercent: 0,
  finalDef: 0,
  finalDefPercent: 0,
  finalHp: 0,
  finalHpPercent: 0,
  penFlat: 0,
  penPercent: 0.32,
  resShred: 0,
  skillDamagePercent: 0,
  stunBonus: 0,
  ultimateDamagePercent: 0,
  basicAtkPercent: 0,
  basicAtkFlat: 0,

  // TODO this is variable based on her passives. That needs to be possible with how I define characters.
  finalAtkFlat: 440,
  finalAtkPercent: 0,

  // TODO this is also variable based on passives. It also needs to take from wengine.
  attributeDamagePercent: 0.55,

  dmgTaken: 0,
  defShred: 0
}