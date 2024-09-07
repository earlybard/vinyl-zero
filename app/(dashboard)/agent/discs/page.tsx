"use client"
import {useAppDispatch, useAppSelector} from "@/lib/store/util/hooks";
import {Autocomplete, Grid2, TextField} from "@mui/material";
import {agentActions} from "@/lib/store/agentStore";
import {ODriveMainstat, ODriveSubstat} from "@/lib/zzz/stats/discStats";
import {useState} from "react";
import {DiscSubstatSelector} from "@/app/components/DiscSelector";

export default function DiscsPage() {

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <DiscSubstatSelector disc={0}/>
      </Grid2>
    </Grid2>
  )
}