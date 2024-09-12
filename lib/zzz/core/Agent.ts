import {BuffCounts, BuffValue} from "@/lib/zzz/buffs/buffs";
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
  buffs: BuffCounts
  buffs2: BuffValue[]
  discDrives: AgentDiscDrives
  wengine: Wengine | null
}
