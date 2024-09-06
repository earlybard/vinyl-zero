import {useAppDispatch, useAppSelector} from "@/lib/store/util/hooks";
import {useState} from "react";
import {Autocomplete, TextField} from "@mui/material";
import {ODriveSubstat} from "@/lib/zzz/stats/discStats";
import {agentActions} from "@/lib/store/agentStore";
import {DiscDrive} from "@/lib/zzz/disc-drives/discDrive";

export function DiscSubstatSelector(props: {disc: number, stat: keyof DiscDrive}) {

  const agent = useAppSelector(s => s.agent.selectedAgent)
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  return (
    <Autocomplete
      renderInput={(params) => <TextField {...params} />}

      options={Object.values(ODriveSubstat)}
      value={agent.discDrives[props.disc][props.stat]}

      onChange={(e, v) => {
        const drive = {...agent.discDrives[props.disc]}
        drive[props.stat] = v
        dispatch(agentActions.updateDisc({i: 0, drive}))
      }}

      inputValue={inputValue}
      onInputChange={(e, v) => setInputValue(v)}
      autoHighlight
    />
  )
}