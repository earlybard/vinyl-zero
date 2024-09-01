"use client";
import {Autocomplete, TextField} from "@mui/material";
import {agentActions} from "@/lib/store/slices/agentSlice";
import {useAppDispatch, useAppSelector} from "@/lib/store/hooks";
import {useState} from "react";

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

      options={agent.agents}

      value={agent.selectedAgent}
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