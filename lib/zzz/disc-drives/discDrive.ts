import {
  DriveMainstatKey,
  DriveMainstatLabel,
  DriveSubstatOption, Mainstats,
} from "@/lib/zzz/stats/discStats";

export type SubstatLevel = 0 | 1 | 2 | 3 | 4

export interface DriveSubstat {
  label: DriveSubstatOption
  level: SubstatLevel
  key: string
}

export interface DriveMainstat {
  label: DriveMainstatLabel
  key: DriveMainstatKey
}

export interface DiscDrive {
  mainStat: DriveMainstat | null
  subStats: DriveSubstat[]
}

export const DefaultDiscValues: DiscDrive = {
  mainStat: null,
  subStats: [],
}

export type AgentDiscDrives = [
  DiscDrive,
  DiscDrive,
  DiscDrive,
  DiscDrive,
  DiscDrive,
  DiscDrive
]

export const DefaultDiscs: AgentDiscDrives = [
  {mainStat: Mainstats.hpFlat, subStats: []},
  {mainStat: Mainstats.atkFlat, subStats: []},
  {mainStat: Mainstats.defFlat, subStats: []},
  {mainStat: Mainstats.atkPercent, subStats: []},
  {mainStat: Mainstats.atkPercent, subStats: []},
  {mainStat: Mainstats.atkPercent, subStats: []},
]