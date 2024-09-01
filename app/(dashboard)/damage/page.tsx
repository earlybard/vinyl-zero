"use client";
import * as React from 'react';
import {useState} from "react";
import {Divider, Grid2, TextField} from "@mui/material";
import {JaneDoe} from "@/app/zzz/agents/janeDoe";
import Typography from "@mui/material/Typography";
import {MainstatMultipliers, SubstatMultipliers} from "@/app/zzz/constants/statMultipliers";
import AgentSelector from "@/app/components/AgentSelector";

export default function OrdersPage() {

  const [damagePercent, setDamagePercent] = useState(0);

  const agent = JaneDoe
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

  // Final anomaly damage:
  // Fill in how many procs of each anomaly will happen.
  // Calculate damage for each.
  // Fill in a rough "rotation" with a couple of anomaly procs.

  return (
    <>
      <AgentSelector/>
      <Divider sx={{ pt: 2 }}/>
      <Grid2 container spacing={2} sx={{ pt: 2 }}>
        <TextField label="Base Attack" value={baseAttack}/>
        <TextField label="Basic Attack" value={basicAttack}/>
        <TextField label="Final Attack" value={finalAttack}/>
        <TextField label="Flat Pen" value={penFlat}/>
        <TextField label="Pen Ratio" value={penRatio}/>
        <TextField label="Def Multiplier" value={defMultiplier}/>
        <TextField label="Attribute Damage %" value={attributeDamagePercent}/>
        <TextField label="Crit Rate" value={critRate}/>
        <TextField label="Crit Dmg" value={critDmg}/>
        <TextField label="Crit Multiplier" value={critMultiplier}/>
        <TextField label="Res Multiplier" value={resMultiplier}/>
        <TextField label="Anomaly" value={anomaly}/>
        <TextField label="AP Bonus" value={apBonus}/>
      </Grid2>
      <Typography sx={{ p: 2 }}>Attack Scale is multiplied by skill values for the final damage per hit</Typography>
      <TextField label="Attack Scale" value={attackScale}/>
    {/*<TextField*/}
    {/*  label="Damage %"*/}
    {/*  value={damagePercent}*/}
    {/*  type={"number"}*/}
    {/*  onChange={e => setDamagePercent(parseFloat(e.target.value))}*/}
    {/*/>*/}
    </>
  );
}
