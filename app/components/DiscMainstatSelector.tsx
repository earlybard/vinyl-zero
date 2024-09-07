import {Autocomplete, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@/lib/store/util/hooks";
import {useState} from "react";
import * as React from "react";
import {DriveMainstat} from "@/lib/zzz/stats/discStats";

export function DiscMainstatSelector(props: {disc: number, options: DriveMainstat[]}) {

  const agent = useAppSelector(s => s.agent.agents[s.agent.i])
  const disc = agent.discDrives[props.disc]
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  return (
    <Autocomplete
      renderInput={(params) => <TextField {...params} label={"Mainstat"} />}
      options={props.options}
      defaultValue={props.options[0]}
      sx={{marginBottom: 2}}
    />
  )
}