import {AgentBaseStat} from "@/lib/zzz/stats/baseStats";
import {DriveMainstat, DriveSubstat} from "@/lib/zzz/stats/discStats";

export interface DiscDrive {
  mainStat: DriveMainstat | null
  subStat1: DriveSubstat | null
  subStat2: DriveSubstat | null
  subStat3: DriveSubstat | null
  subStat4: DriveSubstat | null
}

export const DefaultDiscValues: DiscDrive = {
  mainStat: null,
  subStat1: null,
  subStat2: null,
  subStat3: null,
  subStat4: null
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