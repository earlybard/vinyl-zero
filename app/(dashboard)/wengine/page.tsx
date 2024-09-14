"use client"
import {Grid2, TextField} from "@mui/material";
import * as React from "react";
import {DiscSubstatSelector} from "@/app/components/DiscSelector";
import AgentSelector from "@/app/components/AgentSelector";
import {WengineSelector} from "@/app/components/WengineSelector";
import {damageCalc} from "@/lib/zzz/damage/damage";
import {useAppSelector} from "@/lib/store/util/hooks";

export default function WenginePage() {

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <WengineSelector/>
      </Grid2>
    </Grid2>
  )
}