"use client";
import * as React from 'react';
import {useState} from "react";
import {Divider, Grid2, TextField} from "@mui/material";
import {JaneDoe} from "@/app/zzz/agents/janeDoe";
import Typography from "@mui/material/Typography";
import {MainstatMultipliers, SubstatMultipliers} from "@/app/zzz/constants/statMultipliers";
import AgentSelector from "@/app/components/AgentSelector";
import {useAppSelector} from "@/lib/store/hooks";
import {AnomalyMultipliers, AnomalyType} from "@/app/zzz/constants/anomaly";

export default function DamagePage() {

  const agent = useAppSelector(s => s.agent.selectedAgent)

  const baseStats = agent.baseStats
  const mainstatCount = agent.mainstatCount
  const substatCount = agent.substatCount
  const buffs = agent.buffs

  // 714 is wengine attack. TODO this needs to be its own object
  const baseAttack = baseStats.atk + 714;

  // TODO make mainstat and substat
  const basicAttack =
    baseAttack +
    (mainstatCount.atkFlat * MainstatMultipliers.atkFlat) +
    (mainstatCount.atkPercent * MainstatMultipliers.atkPercent * baseAttack) +
    (substatCount.atkPercent * SubstatMultipliers.atkPercent * baseAttack) +
    (substatCount.atkFlat * SubstatMultipliers.atkFlat) +
    buffs.basicAtkFlat +
    (buffs.basicAtkPercent * baseAttack);

  const finalAttack =
    basicAttack +
    (buffs.finalAtkPercent * basicAttack) +
    buffs.finalAtkFlat;

  const attributeDamagePercent =
    buffs.attributeDamagePercent +
    (mainstatCount.attributeDamagePercent * MainstatMultipliers.attributeDamagePercent)

  const penFlat = (substatCount.penFlat * SubstatMultipliers.penFlat) + buffs.penFlat
  const penRatio = (mainstatCount.penRatio * MainstatMultipliers.penRatio) + buffs.penPercent

  const TARGET_BASE_DEF = 921
  const targetDef = TARGET_BASE_DEF - (TARGET_BASE_DEF * buffs.defShred)
  const effectiveDef = targetDef * (1 - penRatio) - penFlat
  const DEF_LEVEL_COEFFICIENT = 794
  const defMultiplier = DEF_LEVEL_COEFFICIENT / (DEF_LEVEL_COEFFICIENT + effectiveDef)

  const innateResPercent = 0
  const allTypeResPercent = 0
  const resMultiplier = 1 - innateResPercent - allTypeResPercent + buffs.resShred

  let critRate =
    (mainstatCount.critRate * MainstatMultipliers.critRate) +
    (substatCount.critRate * SubstatMultipliers.critRate) +
    baseStats.critRate +
    buffs.critRate

  const critDmg =
    (mainstatCount.critDmg * MainstatMultipliers.critDmg) +
    (substatCount.critDmg * SubstatMultipliers.critDmg) +
    baseStats.critDmg +
    buffs.critDmg

  const critMultiplier = 1 + (critRate * critDmg)

  const dmgTaken = 1 + buffs.dmgTaken

  const attackScale =
    (1 + attributeDamagePercent) *
    dmgTaken *
    defMultiplier *
    resMultiplier *
    critMultiplier *
    finalAttack

  // TODO Why?????
  // This is from jstern "Damage Formula" I28
  const ANOMALY_BUFF_LEVEL = 2;

  const wengineAnomaly = 0
  // Not sure if this is a buff?
  const anomalyProficiency = wengineAnomaly + 100

  const apBonus = (
    (mainstatCount.anomalyProficiency * MainstatMultipliers.anomalyProficiency) +
    (substatCount.anomalyProficiency * SubstatMultipliers.anomalyProficiency) +
    anomalyProficiency +
    baseStats.anomalyProficiency
  ) / 100

  // TODO values are very slightly different from the spreadsheet.
  // Might just be some rounding in Google sheets that I'm not doing.

  // Will need to compare to in-game to make sure I get this right.
  const anomaly =
    (1 + attributeDamagePercent) *
    defMultiplier *
    resMultiplier *
    dmgTaken *
    apBonus *
    ANOMALY_BUFF_LEVEL *
    finalAttack

  // TODO JD does anomaly crits. This needs to be incorporated in buffs.
  const anomalyDamage: Record<AnomalyType, number> = {
    shatter: anomaly * AnomalyMultipliers.shatter,
    assault: anomaly * AnomalyMultipliers.assault,
    burn: anomaly * AnomalyMultipliers.burn,
    corruption: anomaly * AnomalyMultipliers.corruption,
    shock: anomaly * AnomalyMultipliers.shock
  }

  // Final anomaly damage:
  // Fill in how many procs of each anomaly will happen.
  // Calculate damage for each.
  // Fill in a rough "rotation" with a couple of anomaly procs.

  return (
    <>
      <Divider sx={{ pt: 2 }}/>
      <Grid2 container spacing={2} sx={{ pt: 2 }}>
        <TextField disabled label="Base Attack" value={Math.round(baseAttack)}/>
        <TextField disabled label="Basic Attack" value={Math.round(basicAttack)}/>
        <TextField disabled label="Final Attack" value={Math.round(finalAttack)}/>
        <TextField disabled label="Flat Pen" value={Math.round(penFlat)}/>
        <TextField disabled label="Pen Ratio" value={(penRatio)}/>
        <TextField disabled label="Def Multiplier" value={(defMultiplier.toFixed(2))}/>
        <TextField disabled label="Attribute Damage %" value={(attributeDamagePercent)}/>
        <TextField disabled label="Crit Rate" value={(critRate.toFixed(2))}/>
        <TextField disabled label="Crit Dmg" value={(critDmg.toFixed(2))}/>
        <TextField disabled label="Crit Multiplier" value={(critMultiplier.toFixed(2))}/>
        <TextField disabled label="Res Multiplier" value={(resMultiplier)}/>
        <TextField disabled label="Anomaly" value={Math.round(anomaly)}/>
        <TextField disabled label="AP Bonus" value={Math.round(apBonus)}/>
      </Grid2>
      <Divider sx={{ pt: 2 }}/>
      <Grid2 container spacing={2} sx={{ pt: 2 }}>
        <TextField disabled label="Assault Damage" value={Math.round(anomalyDamage.assault)}/>
        <TextField disabled label="Shatter Damage" value={Math.round(anomalyDamage.shatter)}/>
        <TextField disabled label="Burn Damage" value={Math.round(anomalyDamage.burn)}/>
        <TextField disabled label="Corruption Damage" value={Math.round(anomalyDamage.corruption)}/>
        <TextField disabled label="Shock Damage" value={Math.round(anomalyDamage.shock)}/>
      </Grid2>
      <Divider sx={{ pt: 2 }}/>
      <Typography sx={{ p: 2 }}>Attack Scale is multiplied by skill values for the final damage per hit</Typography>
      <TextField disabled label="Attack Scale" value={Math.round(attackScale)}/>
    </>
  );
}
