"use client"
import {Grid2} from "@mui/material";
import * as React from "react";
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