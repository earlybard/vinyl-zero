"use client"
import {Divider, Grid2} from "@mui/material";
import * as React from "react";
import {DiscSubstatSelector} from "@/app/components/DiscSelector";
import {DiscMainstatSelector} from "@/app/components/DiscMainstatSelector";
import Typography from "@mui/material/Typography";
import {DriveMainstat, ODriveMainstat, ODriveSubstat} from "@/lib/zzz/stats/discStats";


export default function DiscsPage() {

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Disc index={0} options={[ODriveMainstat.hpFlat]}/>
        <Disc index={1} options={[ODriveMainstat.atkFlat]}/>
        <Disc index={2} options={[ODriveMainstat.defFlat]}/>
        <Disc index={3} options={[ODriveMainstat.atkPercent, ODriveMainstat.hpPercent, ODriveMainstat.defPercent, ODriveMainstat.critRate, ODriveMainstat.critDmg, ODriveMainstat.anomalyProficiency]}/>
        <Disc index={4} options={[ODriveMainstat.atkPercent, ODriveMainstat.hpPercent, ODriveMainstat.defPercent, ODriveMainstat.penRatio, ODriveMainstat.attributeDamagePercent]}/>
        <Disc index={5} options={[ODriveMainstat.atkPercent, ODriveMainstat.hpPercent, ODriveMainstat.defPercent, ODriveMainstat.anomalyMastery, ODriveMainstat.impact, ODriveMainstat.energyRegen]}/>
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