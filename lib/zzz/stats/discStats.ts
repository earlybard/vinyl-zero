import {DriveMainstat, DriveSubstat} from "@/lib/zzz/disc-drives/discDrive";

export const ODriveSubstat = {
  critDmg:  "Crit Damage",
  critRate:  "Crit Rate",
  atkFlat:  "Atk",
  atkPercent:  "Atk %",
  hpFlat:  "HP",
  hpPercent:  "HP %",
  defFlat:  "Def",
  defPercent:  "Def %",
  penFlat:  "Pen",
  anomalyProficiency:  "Anomaly Proficiency"
}

export const SubstatOptions: DriveSubstat[] = Object.entries(ODriveSubstat).map(([k, s]) =>
  {return {label: s, level: 0, key: k}}
)

export type DriveSubstatOption = typeof ODriveSubstat[keyof typeof ODriveSubstat];

export type AgentDriveSubstatCount = Record<DriveSubstatOption, number>

export const DefaultAgentDriveSubstatCount: AgentDriveSubstatCount = {
  critDmg: 0,
  critRate: 0,
  anomalyProficiency: 0,
  atkFlat: 0,
  atkPercent: 0,
  defFlat: 0,
  defPercent: 0,
  hpFlat: 0,
  hpPercent: 0,
  penFlat: 0
}

export const ODriveMainstat = {
  critDmg:  "Crit Damage",
  critRate:  "Crit Rate",
  atkFlat:  "Atk",
  atkPercent:  "Atk %",
  hpFlat:  "HP",
  hpPercent:  "HP %",
  defFlat:  "Def",
  defPercent:  "Def %",
  anomalyProficiency:  "Anomaly Proficiency",
  anomalyMastery:  "Anomaly Mastery",
  energyRegen:  "Energy Regen %",
  impact: "Impact %",
  attributeDamagePercent: "Attribute Damage %",
  penRatio:  "Pen Ratio",
}

export type DriveMainstatKey = keyof typeof ODriveMainstat
export type DriveMainstatLabel = typeof ODriveMainstat[DriveMainstatKey];

// @ts-ignore
export const Mainstats: Record<DriveMainstatKey, DriveMainstat> = {}
Object.entries(ODriveMainstat).map(([k, v]) => {
  Mainstats[k as DriveMainstatKey] = {label: v, key: k as DriveMainstatKey}
})

export type AgentDriveMainstatCount = Record<DriveMainstatLabel, number>

export const DefaultAgentDriveMainstatCount: AgentDriveMainstatCount = {
  anomalyMastery: 0,
  anomalyProficiency: 0,
  atkFlat: 0,
  atkPercent: 0,
  attributeDamagePercent: 0,
  critDmg: 0,
  critRate: 0,
  defFlat: 0,
  defPercent: 0,
  energyRegen: 0,
  hpFlat: 0,
  hpPercent: 0,
  impact: 0,
  penRatio: 0
}
