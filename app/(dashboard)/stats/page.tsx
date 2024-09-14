"use client"
import {useAppSelector} from "@/lib/store/util/hooks";
import {damageCalc, DamageCalcs} from "@/lib/zzz/damage/damage";
import {Divider, Grid2, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Agent} from "@/lib/zzz/core/Agent";
import {
  DriveMainstatKey,
  DriveSubstatOption,
  ODriveMainstat,
  ODriveSubstat,
  SubstatOptions
} from "@/lib/zzz/stats/discStats";
import {SubstatMultipliers} from "@/lib/zzz/constants/statMultipliers";

export default function StatsPage() {
  const agent = useAppSelector(s => s.agent.agents[s.agent.i])
  const enemy = useAppSelector(s => s.enemy)
  const damage = damageCalc(agent, enemy)

  const substatWeights: Record<DriveSubstatOption, DamageCalcs> = {}

  // Compute stat weights by creating a copied agent with one additional substat of each type, and calculate its damage.
  for (let [k, v] of Object.entries(ODriveSubstat)) {
    let drivesCopy = structuredClone(agent.discDrives)
    drivesCopy[0].subStats.push({key: k, label: v, level: 1})
    let agentCopy = JSON.parse(JSON.stringify(agent))
    agentCopy.discDrives = drivesCopy
    substatWeights[v] = damageCalc(agentCopy, enemy)
  }

  const mainstatWeights: Record<DriveSubstatOption, DamageCalcs> = {}

  for (let [k, v] of Object.entries(ODriveMainstat)) {
    let drivesCopy = structuredClone(agent.discDrives)
    drivesCopy[0].mainStat = {key: k as DriveMainstatKey, label: v}
    let agentCopy = JSON.parse(JSON.stringify(agent))
    agentCopy.discDrives = drivesCopy
    mainstatWeights[v] = damageCalc(agentCopy, enemy)
  }

  return (
    <>
      <Grid2 container>
        <Grid2 size={3}><Typography variant="h6">Substat Weights</Typography></Grid2>
        <Grid2 size={9}><Typography>% Increase from a single extra substat of type:</Typography></Grid2>
      </Grid2>
      <Grid2 container spacing={2} sx={{ pt: 2 }}>
        {
          Object.entries(substatWeights).map(([k, v]) =>
            <StatWeights key={k} damage={damage} k={k} newDamage={v}/>
          )
        }
        </Grid2>
        <Divider sx={{my: 2}}/>
        <Grid2 container>
          <Grid2 size={3}><Typography variant="h6">Mainstat Weights</Typography></Grid2>
          <Grid2 size={9}><Typography>% Increase from a single extra mainstat of type:</Typography></Grid2>
        </Grid2>
        <Grid2 container spacing={2} sx={{ pt: 2 }}>
        {
          Object.entries(mainstatWeights).map(([k, v]) =>
            <StatWeights key={k} damage={damage} k={k} newDamage={v}/>
          )
        }
      </Grid2>
    </>
  )
}

function StatWeights(props: {
  damage: DamageCalcs,
  k: string,
  newDamage: DamageCalcs
}) {

  if ([ODriveMainstat.hpFlat, ODriveMainstat.hpPercent, ODriveMainstat.defFlat, ODriveMainstat.defPercent].includes(props.k)) {
    return (<></>)
  }

  let assaultGain = (props.newDamage.anomalyDamage.assault / props.damage.anomalyDamage.assault) - 1
  let atkGain = (props.newDamage.attackScale / props.damage.attackScale) - 1

  assaultGain = Math.round(assaultGain * 10000) / 100
  atkGain = Math.round(atkGain * 10000) / 100

  return (<>
    <Grid2 container size={12}>
      <Grid2 size={3}>
        <Typography>{props.k}</Typography>
      </Grid2>
      <TextField size="small" disabled label="ATK Scale Gain" value={atkGain + "%"}/>
      <TextField size="small" disabled label="Assault Gain" value={assaultGain + "%"}/>
    </Grid2>
  </>)
}