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

  // 714 is wengine attack. TODO this needs to be its own object
  const baseAttack = JaneDoe.atk + 714;

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

  const attackScale =
    (1 + attributeDamagePercent) +
    (1 + buffs.dmgTaken) +
    1
    // Up to DEF multiplier which needs to be worked out.x`

  return (
    <>
    <TextField label="Base Attack" value={baseAttack}/>
    <TextField label="Basic Attack" value={basicAttack}/>
    <TextField label="Final Attack" value={finalAttack}/>
    <TextField label="Attribute Damage %" value={attributeDamagePercent}/>


    {/*<TextField*/}
    {/*  label="Damage %"*/}
    {/*  value={damagePercent}*/}
    {/*  type={"number"}*/}
    {/*  onChange={e => setDamagePercent(parseFloat(e.target.value))}*/}
    {/*/>*/}
    </>
  );
}
