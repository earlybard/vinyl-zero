import {Autocomplete, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@/lib/store/util/hooks";
import {useState} from "react";
import * as React from "react";
import {agentActions} from "@/lib/store/agentStore";
import {DriveMainstatOption} from "@/lib/zzz/stats/discStats";

export function DiscMainstatSelector(props: {disc: number, options: DriveMainstatOption[]}) {

  const agent = useAppSelector(s => s.agent.agents[s.agent.i])
  const disc = agent.discDrives[props.disc]
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  console.log(disc.mainStat)

  return (
    <Autocomplete
      renderInput={(params) => <TextField {...params} label={"Mainstat"} />}
      options={props.options}
      onChange={(e, v) => dispatch(agentActions.setDiscMainstat({disc: props.disc, mainstat: v}))}
      value={disc.mainStat?.label}
      sx={{marginBottom: 2}}
      inputValue={inputValue}
      onInputChange={(e, v) => {
        setInputValue(v);
      }}
    />
  )
}