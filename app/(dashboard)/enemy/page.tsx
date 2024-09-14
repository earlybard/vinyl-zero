"use client"
import {Grid2, TextField} from "@mui/material";
import * as React from "react";
import {DiscSubstatSelector} from "@/app/components/DiscSelector";
import AgentSelector from "@/app/components/AgentSelector";
import {WengineSelector} from "@/app/components/WengineSelector";
import {damageCalc} from "@/lib/zzz/damage/damage";
import {useAppDispatch, useAppSelector} from "@/lib/store/util/hooks";
import {enemyActions} from "@/lib/store/enemyStore";

export default function EnemyPage() {

  const def = useAppSelector(s => s.enemy.def)
  const dispatch = useAppDispatch()

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <TextField label="Enemy DEF" type="number" value={def} onChange={e => dispatch(enemyActions.setDef(e.target.value))}/>
      </Grid2>
    </Grid2>
  )
}