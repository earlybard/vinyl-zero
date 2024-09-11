"use client";
import * as React from 'react';
import {Divider, Grid2, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useAppSelector} from "@/lib/store/util/hooks";
import {MainstatMultipliers, SubstatMultipliers} from "@/lib/zzz/constants/statMultipliers";
import {AnomalyMultipliers, AnomalyType} from "@/lib/zzz/constants/anomaly";
import {DefaultAgentDriveMainstatCount, DefaultAgentDriveSubstatCount} from "@/lib/zzz/stats/discStats";
import {damageCalc} from "@/lib/zzz/damage/damage";

export default function DamagePage() {

  const agent = useAppSelector(s => s.agent.agents[s.agent.i])

  const damage = damageCalc(agent)

  return (
    <>
      <Divider sx={{ pt: 2 }}/>
      <Grid2 container spacing={2} sx={{ pt: 2 }}>
        <TextField disabled label="Base Attack" value={Math.round(damage.baseAttack)}/>
        <TextField disabled label="Basic Attack" value={Math.round(damage.basicAttack)}/>
        <TextField disabled label="Final Attack" value={Math.round(damage.finalAttack)}/>
        <TextField disabled label="Flat Pen" value={Math.round(damage.penFlat)}/>
        <TextField disabled label="Pen Ratio" value={(damage.penRatio)}/>
        <TextField disabled label="Def Multiplier" value={(damage.defMultiplier.toFixed(2))}/>
        <TextField disabled label="Attribute Damage %" value={(damage.attributeDamagePercent)}/>
        <TextField disabled label="Crit Rate" value={(damage.critRate.toFixed(2))}/>
        <TextField disabled label="Crit Dmg" value={(damage.critDmg.toFixed(2))}/>
        <TextField disabled label="Crit Multiplier" value={(damage.critMultiplier.toFixed(2))}/>
        <TextField disabled label="Res Multiplier" value={(damage.resMultiplier)}/>
        <TextField disabled label="Anomaly" value={Math.round(damage.anomaly)}/>
        <TextField disabled label="AP Bonus" value={Math.round(damage.apBonus)}/>
      </Grid2>
      <Divider sx={{ pt: 2 }}/>
      <Grid2 container spacing={2} sx={{ pt: 2 }}>
        <TextField disabled label="Assault Damage" value={Math.round(damage.anomalyDamage.assault)}/>
        <TextField disabled label="Shatter Damage" value={Math.round(damage.anomalyDamage.shatter)}/>
        <TextField disabled label="Burn Damage" value={Math.round(damage.anomalyDamage.burn)}/>
        <TextField disabled label="Corruption Damage" value={Math.round(damage.anomalyDamage.corruption)}/>
        <TextField disabled label="Shock Damage" value={Math.round(damage.anomalyDamage.shock)}/>
      </Grid2>
      <Divider sx={{ pt: 2 }}/>
      <Typography sx={{ p: 2 }}>Attack Scale is multiplied by skill values for the final damage per hit</Typography>
      <TextField disabled label="Attack Scale" value={Math.round(damage.attackScale)}/>
    </>
  );
}
