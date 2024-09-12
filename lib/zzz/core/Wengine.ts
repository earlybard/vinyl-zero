import {BuffCounts} from "@/lib/zzz/buffs/buffs";

export interface Wengine {
  label: string,
  baseAttack: number,
  buffs: BuffCounts
}
