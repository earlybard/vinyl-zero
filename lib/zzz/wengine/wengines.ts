import {AgentWengine} from "@/lib/zzz/core/Wengine";
import {DefaultBuffValues} from "@/lib/zzz/core/buffs";

export const SharpenedStinger: AgentWengine = {
  baseAttack: 714,
  buffs: {
    ...DefaultBuffValues,
    anomalyProficiency: 90,
    attributeDamagePercent: 0.36,
    anomalyBuildupRate: 0.4
  }
}