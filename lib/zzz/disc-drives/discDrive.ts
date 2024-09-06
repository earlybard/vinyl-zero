import {AgentBaseStat} from "@/lib/zzz/stats/baseStats";
import {DriveMainstat, DriveSubstat, ODriveSubstat} from "@/lib/zzz/stats/discStats";

export interface DiscDrive {
  mainStat: DriveMainstat | null
  subStats: DriveSubstat[]
}

export const DefaultDiscValues: DiscDrive = {
  mainStat: null,
  subStats: []
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