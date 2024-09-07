import {Autocomplete, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@/lib/store/util/hooks";
import {useState} from "react";
import * as React from "react";
import {agentActions} from "@/lib/store/agentStore";
import {DriveMainstatLabel} from "@/lib/zzz/stats/discStats";
import {DriveMainstat} from "@/lib/zzz/disc-drives/discDrive";

export function DiscMainstatSelector(props: {disc: number, options: DriveMainstat[]}) {

  const agent = useAppSelector(s => s.agent.agents[s.agent.i])
  const disc = agent.discDrives[props.disc]
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  return (
    <Autocomplete
      renderInput={(params) => <TextField {...params} label={"Mainstat"} />}
      options={props.options}
      onChange={(e, v) => dispatch(agentActions.setDiscMainstat({disc: props.disc, mainstat: v}))}
      value={disc.mainStat}
      renderOption={(a, b, c) => <li {...a} key={b.key}>{b.label}</li>}
      sx={{marginBottom: 2}}
      isOptionEqualToValue={(a, b) => a.label === b.label}
      inputValue={inputValue}
      onInputChange={(e, v) => {
        setInputValue(v);
      }}
    />
  )
}