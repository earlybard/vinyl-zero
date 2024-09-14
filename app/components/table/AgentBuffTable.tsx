import {useAppDispatch, useAppSelector} from "@/lib/store/util/hooks";
import {BuffTable} from "@/app/components/table/BuffTable";
import {agentActions} from "@/lib/store/agentStore";
import Typography from "@mui/material/Typography";
import * as React from "react";

export function AgentBuffTable() {
  const agentBuffs = useAppSelector(s => s.agent.agents[s.agent.i].agentBuffs)
  const customBuffs = useAppSelector(s => s.agent.agents[s.agent.i].customBuffs)
  const wengineBuffs = useAppSelector(s => s.agent.agents[s.agent.i].wengine?.buffs2)
  const dispatch = useAppDispatch()

  return (
    <>
      <BuffTable
        buffs={agentBuffs}
        type="Agent"
        editable={true}
        onEdit={(buff) => dispatch(agentActions.updateAgentBuff(buff))}
        onDelete={(id) => dispatch(agentActions.deleteAgentBuff(id))}
        onCreate={() => dispatch(agentActions.createAgentBuff())}
      />
      <BuffTable
        buffs={customBuffs}
        type="Custom"
        editable={true}
        onEdit={(buff) => dispatch(agentActions.updateCustomBuff(buff))}
        onDelete={(id) => dispatch(agentActions.deleteCustomBuff(id))}
        onCreate={() => dispatch(agentActions.createCustomBuff())}
      />
      {wengineBuffs ?
        <>
          <BuffTable
            buffs={wengineBuffs}
            type="W-Engine"
            editable={true}
            onEdit={(buff) => dispatch(agentActions.updateWengineBuff(buff))}
            onDelete={(id) => dispatch(agentActions.deleteWengineBuff(id))}
            onCreate={() => dispatch(agentActions.createWengineBuff())}
          />
        </>
        : undefined
      }
    </>
  )
}