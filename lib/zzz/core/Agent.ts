import {BuffValues} from "@/lib/zzz/stats/buffs";
import {AgentBaseStats} from "@/lib/zzz/stats/baseStats";
import {AgentDiscDrives} from "@/lib/zzz/disc-drives/discDrive";

export type AgentName =
  "Jane Doe" |
  "Zhu Yuan"

interface Attacks {

}

export interface Agent {
  label: AgentName
  baseStats: AgentBaseStats
  buffs: BuffValues
  discDrives: AgentDiscDrives
}
