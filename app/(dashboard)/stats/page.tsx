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
  const enemy = useAppSelector(s => s.enemy)

  const damage = damageCalc(agent, enemy)

  return (
    <>
      <Grid2 container spacing={2}>
        <TextField size="small" disabled label="Base AP" value={agent.baseStats.anomalyProficiency}/>
      </Grid2>
      <Divider sx={{ pt: 2 }}/>
      <Grid2 container spacing={2} sx={{ pt: 2 }}>
        <TextField size="small" disabled label="Base Attack" value={Math.round(damage.baseAttack)}/>
        <TextField size="small" disabled label="Basic Attack" value={Math.round(damage.basicAttack)}/>
        <TextField size="small" disabled label="Final Attack" value={Math.round(damage.finalAttack)}/>
      </Grid2>
      <Divider sx={{ pt: 2 }}/>
      <Grid2 container spacing={2} sx={{ pt: 2 }}>
        <TextField size="small" disabled label="Flat Pen" value={Math.round(damage.penFlat)}/>
        <TextField size="small" disabled label="Pen Ratio" value={(damage.penRatio)}/>
        <TextField size="small" disabled label="Def Multiplier" value={(damage.defMultiplier.toFixed(2))}/>
        <TextField size="small" disabled label="Attribute Damage %" value={(damage.attributeDamagePercent)}/>
      </Grid2>
      <Divider sx={{ pt: 2 }}/>
      <Grid2 container spacing={2} sx={{ pt: 2 }}>
        <TextField size="small" disabled label="Basic Crit Rate" value={(damage.basicCritRate.toFixed(2))}/>
        <TextField size="small" disabled label="Final Crit Rate" value={(damage.finalCritRate.toFixed(2))}/>
        <TextField size="small" disabled label="Basic Crit Dmg" value={(damage.basicCritDmg.toFixed(2))}/>
        <TextField size="small" disabled label="Final Crit Dmg" value={(damage.finalCritDmg.toFixed(2))}/>
        <TextField size="small" disabled label="Crit Multiplier" value={(damage.critMultiplier.toFixed(2))}/>
      </Grid2>
      <Divider sx={{ pt: 2 }}/>
      <Grid2 container spacing={2} sx={{ pt: 2 }}>
        <TextField size="small" disabled label="Res Multiplier" value={(damage.resMultiplier)}/>
        <TextField size="small" disabled label="Anomaly" value={Math.round(damage.anomaly)}/>
        <TextField size="small" disabled label="Anomaly Proficiency" value={Math.round(damage.anomalyProficiency)}/>
      </Grid2>
      <Divider sx={{ pt: 2 }}/>
      <Grid2 container spacing={2} sx={{ pt: 2 }}>
        <TextField size="small" disabled label="Assault Damage" value={Math.round(damage.anomalyDamage.assault)}/>
        <TextField size="small" disabled label="Shatter Damage" value={Math.round(damage.anomalyDamage.shatter)}/>
        <TextField size="small" disabled label="Burn Damage" value={Math.round(damage.anomalyDamage.burn)}/>
        <TextField size="small" disabled label="Corruption Damage" value={Math.round(damage.anomalyDamage.corruption)}/>
        <TextField size="small" disabled label="Shock Damage" value={Math.round(damage.anomalyDamage.shock)}/>
      </Grid2>
      <Divider sx={{ pt: 2 }}/>
      <Typography sx={{ p: 2 }}>Attack Scale is multiplied by skill values for the final damage per hit</Typography>
      <TextField size="small" disabled label="Attack Scale" value={Math.round(damage.attackScale)}/>
    </>
  );
}
