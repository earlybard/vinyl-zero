import {BuffValues} from "@/lib/zzz/core/buffs";
import {AgentBaseStats} from "@/lib/zzz/stats/baseStats";
import {AgentDiscDrives} from "@/lib/zzz/disc-drives/discDrive";
import {Wengine} from "@/lib/zzz/core/Wengine";

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
  wengine: Wengine | null
}
