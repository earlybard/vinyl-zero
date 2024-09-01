import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import AgentSelector from "@/app/components/AgentSelector";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      <PageContainer>
        <AgentSelector/>
        {props.children}
      </PageContainer>
    </DashboardLayout>
  );
}  
