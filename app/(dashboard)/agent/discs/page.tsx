"use client"
import {Divider, Grid2, TextField} from "@mui/material";
import * as React from "react";
import {DiscSubstatSelector} from "@/app/components/DiscSelector";
import {DiscMainstatSelector} from "@/app/components/DiscMainstatSelector";
import Typography from "@mui/material/Typography";
import {DriveMainstat} from "@/lib/zzz/disc-drives/discDrive";
import {Mainstats} from "@/lib/zzz/stats/discStats";


export default function DiscsPage() {

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Disc index={0} options={[Mainstats.hpFlat]}/>
        <Disc index={1} options={[Mainstats.atkFlat]}/>
        <Disc index={2} options={[Mainstats.defFlat]}/>
        <Disc index={3} options={[Mainstats.atkPercent, Mainstats.hpPercent, Mainstats.defPercent, Mainstats.critRate, Mainstats.critDmg, Mainstats.anomalyProficiency]}/>
        <Disc index={4} options={[Mainstats.atkPercent, Mainstats.hpPercent, Mainstats.defPercent, Mainstats.penRatio, Mainstats.attributeDamagePercent]}/>
        <Disc index={5} options={[Mainstats.atkPercent, Mainstats.hpPercent, Mainstats.defPercent, Mainstats.anomalyMastery, Mainstats.impact, Mainstats.energyRegen]}/>
      </Grid2>
    </Grid2>
  )
}

function Disc(props: {index: number, options: DriveMainstat[]}) {
  return (
    <>
      <Typography variant="h5" sx={{marginBottom: 2}}>
        Disc {props.index + 1}
      </Typography>
      <Grid2 container>
        <Grid2 size={3}>
          <DiscMainstatSelector disc={props.index} options={props.options}/>
        </Grid2>
        <Grid2 size={9}>
          <DiscSubstatSelector disc={props.index}/>
        </Grid2>
      </Grid2>
    </>
  )
}