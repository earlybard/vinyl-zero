import {BuffCounts, BuffValue} from "@/lib/zzz/buffs/buffs";

export interface Wengine {
  label: string,
  baseAttack: number,
  buffs: BuffCounts
  buffs2: BuffValue[]
}
