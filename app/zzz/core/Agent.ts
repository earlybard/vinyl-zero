import {AgentDriveMainstatCount, AgentDriveSubstatCount, DriveMainstat} from "@/app/zzz/stats/discStats";
import {BuffValues} from "@/app/zzz/stats/buffs";
import {AgentBaseStats} from "@/app/zzz/stats/baseStats";

export type AgentName =
  "Jane Doe" |
  "Zhu Yuan"

export interface Agent {
  label: AgentName
  baseStats: AgentBaseStats
  // TODO store mainstats with their multipliers rather than storing counts here
  mainstatCount: AgentDriveMainstatCount
  substatCount: AgentDriveSubstatCount
  buffs: BuffValues
}
