"use client";
import {Autocomplete, TextField} from "@mui/material";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/store/util/hooks";
import {agentActions} from "@/lib/store/agentStore";

/**
 * Drop-down list to select an Agent
 */
export default function AgentSelector() {

  const agent = useAppSelector((state) => state.agent)
  const dispatch = useAppDispatch()

  const [inputValue, setInputValue] = useState('');

  return (
    <Autocomplete
      renderInput={(params) => <TextField {...params} label="Agent" />}

      isOptionEqualToValue={(o, v) => o.label === v.label}
      options={agent.agents}

      value={agent.agents[agent.i]}
      onChange={(e, v) => {
        dispatch(agentActions.selectAgent(v))
      }}
      inputValue={inputValue}
      onInputChange={(e, v) => {
        setInputValue(v);
      }}

      autoHighlight
    />
  )
}