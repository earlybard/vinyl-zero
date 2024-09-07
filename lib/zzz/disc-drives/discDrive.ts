import {AgentBaseStat} from "@/lib/zzz/stats/baseStats";
import {
  DriveMainstatOption,
  DriveSubstatOption, MainstatOptions,
  ODriveMainstat,
} from "@/lib/zzz/stats/discStats";

export type SubstatLevel = 0 | 1 | 2 | 3 | 4

export interface DriveSubstat {
  label: DriveSubstatOption
  level: SubstatLevel
  key: string
}

export interface DriveMainstat {
  label: DriveMainstatOption
  key: string
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
  {...DefaultDiscValues},
  {...DefaultDiscValues},
  {...DefaultDiscValues},
  {...DefaultDiscValues},
  {...DefaultDiscValues},
  {...DefaultDiscValues},
]