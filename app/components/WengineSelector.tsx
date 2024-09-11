"use client";
import {Autocomplete, TextField} from "@mui/material";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/store/util/hooks";
import {agentActions} from "@/lib/store/agentStore";
import {wengines} from "@/lib/zzz/wengine/wengines";

/**
 * Drop-down list to select an Agent
 */
export function WengineSelector() {

  const agent = useAppSelector((state) => state.agent)
  const dispatch = useAppDispatch()

  const [inputValue, setInputValue] = useState('');

  return (
    <Autocomplete
      renderInput={(params) => <TextField {...params} label="W Engine" />}

      isOptionEqualToValue={(o, v) => o.label === v.label}
      options={wengines}

      value={agent.agents[agent.i].wengine}
      onChange={(e, v) => {
        dispatch(agentActions.setWengine({wengine: v}))
      }}
      inputValue={inputValue}
      onInputChange={(e, v) => {
        setInputValue(v);
      }}

      autoHighlight
    />
  )
}