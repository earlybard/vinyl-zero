import {BuffCounts, BuffValue} from "@/lib/zzz/buffs/buffs";
import {AgentBaseStats} from "@/lib/zzz/stats/baseStats";
import {AgentDiscDrives} from "@/lib/zzz/disc-drives/discDrive";
import {Wengine} from "@/lib/zzz/core/Wengine";

export type AgentName =
  "Jane Doe" |
  "Zhu Yuan" |
  "Burnice White"

interface Attacks {

}

export interface Agent {
  label: AgentName
  baseStats: AgentBaseStats
  agentBuffs: BuffValue[]
  customBuffs: BuffValue[]
  discDrives: AgentDiscDrives
  wengine: Wengine | null
}
