import {AgentBaseStat} from "@/lib/zzz/stats/baseStats";
import {DriveMainstat, DriveSubstat, ODriveSubstat} from "@/lib/zzz/stats/discStats";

export type SubstatLevel = 0 | 1 | 2 | 3 | 4

export interface DiscDrive {
  mainStat: DriveMainstat | null
  subStats: DriveSubstat[]
  subStatLevels: SubstatLevel[]
}

export const DefaultDiscValues: DiscDrive = {
  mainStat: null,
  subStats: [],
  subStatLevels: []
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