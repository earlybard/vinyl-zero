import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import AgentSelector from "@/app/components/AgentSelector";
import {Divider} from "@mui/material";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      <PageContainer>
        <AgentSelector/>
        <Divider sx={{ pt: 2 }}/>
        {props.children}
      </PageContainer>
    </DashboardLayout>
  );
}  
