"use client"
import {useAppSelector} from "@/lib/store/util/hooks";
import {damageCalc, DamageCalcs} from "@/lib/zzz/damage/damage";
import {Divider, Grid2, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Agent} from "@/lib/zzz/core/Agent";
import {DriveSubstatOption, ODriveSubstat, SubstatOptions} from "@/lib/zzz/stats/discStats";
import {SubstatMultipliers} from "@/lib/zzz/constants/statMultipliers";

export default function StatsPage() {
  const agent = useAppSelector(s => s.agent.agents[s.agent.i])
  const enemy = useAppSelector(s => s.enemy)
  const damage = damageCalc(agent, enemy)

  const results: Record<DriveSubstatOption, DamageCalcs> = {}

  for (let [k, v] of Object.entries(ODriveSubstat)) {
    let drivesCopy = structuredClone(agent.discDrives)
    drivesCopy[0].subStats.push({key: k, label: v, level: 1})
    let agentCopy = JSON.parse(JSON.stringify(agent))
    agentCopy.discDrives = drivesCopy
    results[v] = damageCalc(agentCopy, enemy)
  }

  return (
    <>
      <Typography variant="h6">Substat Weights</Typography>
      <Typography>% Increase from a single extra substat of type:</Typography>
      <Grid2 container spacing={2} sx={{ pt: 2 }}>
        {
          Object.entries(results).map(([k, v]) => {

            if ([ODriveSubstat.hpFlat, ODriveSubstat.hpPercent, ODriveSubstat.defFlat, ODriveSubstat.defPercent].includes(k)) {
              return (<></>)
            }

            let assaultGain = (v.anomalyDamage.assault / damage.anomalyDamage.assault) - 1
            let atkGain = (v.attackScale / damage.attackScale) - 1

            assaultGain = Math.round(assaultGain * 10000) / 100
            atkGain = Math.round(atkGain * 10000) / 100

            return (<>
              <Grid2 container size={12}>
                <Grid2 size={3}>
                  <Typography>{k}</Typography>
                </Grid2>
                <TextField size="small" disabled label="ATK Scale Gain" value={atkGain + "%"}/>
                <TextField size="small" disabled label="Assault Gain" value={assaultGain + "%"}/>
              </Grid2>
            </>)
          })
        }
      </Grid2>
    </>
  )
}