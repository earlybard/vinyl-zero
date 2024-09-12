"use client"
import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import AgentSelector from "@/app/components/AgentSelector";
import {Divider, Grid2, TextField} from "@mui/material";
import {useAppSelector} from "@/lib/store/util/hooks";
import {damageCalc} from "@/lib/zzz/damage/damage";

export default function Layout(props: { children: React.ReactNode }) {

  const agent = useAppSelector(s => s.agent.agents[s.agent.i])
  const enemy = useAppSelector(s => s.enemy)

  const damage = damageCalc(agent, enemy)

  return (
    <DashboardLayout>
      <PageContainer>
        <AgentSelector/>
        <Divider sx={{ pt: 2 }}/>
        <Grid2 container spacing={2} sx={{ py: 2 }}>
          <TextField disabled label="Attack Scale" value={Math.round(damage.attackScale)}/>
          <TextField disabled label="Assault Damage" value={Math.round(damage.anomalyDamage.assault)}/>
        </Grid2>
        <Divider sx={{ pt: 2 }}/>
        {props.children}
      </PageContainer>
    </DashboardLayout>
  );
}  
