"use client"
import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import AgentSelector from "@/app/components/AgentSelector";
import {Box, Divider, Grid2, TextField} from "@mui/material";
import {useAppSelector} from "@/lib/store/util/hooks";
import {damageCalc} from "@/lib/zzz/damage/damage";
import {WengineSelector} from "@/app/components/WengineSelector";

export default function Layout(props: { children: React.ReactNode }) {

  const agent = useAppSelector(s => s.agent.agents[s.agent.i])
  const enemy = useAppSelector(s => s.enemy)

  const damage = damageCalc(agent, enemy)

  return (
    <DashboardLayout>
      <PageContainer>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <AgentSelector/>
          </Grid2>
          <Grid2 size={6}>
            <WengineSelector/>
          </Grid2>
        </Grid2>
        <Divider sx={{ pt: 2 }}/>
        <Grid2 container spacing={2} sx={{ pt: 2 }}>
          <TextField size="small" disabled label="Attack Scale" value={Math.round(damage.attackScale)}/>
          <TextField size="small" disabled label="Anomaly Scale" value={Math.round(damage.anomaly)}/>
        </Grid2>
        <Divider sx={{ my: 2 }}/>
        {props.children}
      </PageContainer>
    </DashboardLayout>
  );
}  
