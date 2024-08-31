"use client";
import * as React from 'react';
import {useState} from "react";
import {TextField} from "@mui/material";
import {JaneBuffs, JaneDoe, JaneDriveMainstats, JaneDriveSubstats} from "@/app/zzz/characters/janeDoe";
import {MainstatMultipliers, SubstatMultipliers} from "@/app/zzz/stats/stats";
import {Main} from "next/document";
import {main} from "@popperjs/core";

export default function OrdersPage() {

  const [damagePercent, setDamagePercent] = useState(0);

  const mainstatCount = JaneDriveMainstats
  const substatCount = JaneDriveSubstats
  const buffs = JaneBuffs
  const agent = JaneDoe

  // 714 is wengine attack. TODO this needs to be its own object
  const baseAttack = agent.atk + 714;

  const basicAttack =
    baseAttack +
    (mainstatCount.atkFlat * MainstatMultipliers.atkFlat) +
    (mainstatCount.atkPercent * MainstatMultipliers.atkPercent * baseAttack) +
    (substatCount.atkPercent * SubstatMultipliers.atkPercent * baseAttack) +
    (substatCount.atkFlat * SubstatMultipliers.atkFlat) +
    buffs.basicAtkFlat +
    buffs.basicAtkPercent * baseAttack;

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
    agent.critRate +
    buffs.critRate

  const critDmg =
    (mainstatCount.critDmg * MainstatMultipliers.critDmg) +
    (substatCount.critDmg * SubstatMultipliers.critDmg) +
    agent.critDmg +
    buffs.critDmg

  const critMultiplier = 1 + (critRate * critDmg)

  const attackScale =
    (1 + attributeDamagePercent) *
    (1 + buffs.dmgTaken) *
    defMultiplier *
    resMultiplier *
    critMultiplier *
    finalAttack

  return (
    <>
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
