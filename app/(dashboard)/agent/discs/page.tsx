"use client"
import {Divider, Grid2} from "@mui/material";
import * as React from "react";
import {DiscSubstatSelector} from "@/app/components/DiscSelector";
import {DiscMainstatSelector} from "@/app/components/DiscMainstatSelector";
import Typography from "@mui/material/Typography";
import {DriveMainstat} from "@/lib/zzz/stats/discStats";

function Disc(props: {index: number, options: DriveMainstat[]}) {
  return (
    <>
      <Typography variant="h5" sx={{marginY: 2}}>
        Disc {props.index + 1}
      </Typography>
      <DiscMainstatSelector disc={props.index} options={props.options}/>
      <DiscSubstatSelector disc={props.index}/>
      <Divider sx={{paddingTop: 1, paddingBottom: 1}}/>
    </>
)
}

export default function DiscsPage() {

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Disc index={0} options={["HP"]}/>
        <Disc index={1} options={["ATK"]}/>
        <DiscSubstatSelector disc={2}/>
        <DiscSubstatSelector disc={3}/>
        <DiscSubstatSelector disc={4}/>
        <DiscSubstatSelector disc={5}/>
      </Grid2>
    </Grid2>
  )
}