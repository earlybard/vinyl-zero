import {useAppDispatch, useAppSelector} from "@/lib/store/util/hooks";
import {useState} from "react";
import {Autocomplete, Box, Button, Chip, Grid2, Input, TextField} from "@mui/material";
import {ODriveSubstat} from "@/lib/zzz/stats/discStats";
import {agentActions} from "@/lib/store/agentStore";
import {DiscDrive} from "@/lib/zzz/disc-drives/discDrive";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

export function DiscSubstatSelector(props: {disc: number}) {

  const agent = useAppSelector(s => s.agent.selectedAgent)
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  return (
    <Autocomplete
      renderInput={(params) => <TextField {...params} label={`Disc ${props.disc}`} />}

      renderOption={(option, x, y) => {
        // TODO add in +1/-1 here. Store that with the option as an object?
        return (
          <li {...option}>
            <Grid2 container>
              {x}
            </Grid2>
          </li>
        )
      }}
      options={Object.values(ODriveSubstat)}
      value={agent.discDrives[props.disc].subStats}
      multiple
      disableCloseOnSelect
      getOptionDisabled={(option) => {

        const stats = agent.discDrives[props.disc].subStats

        if (stats.includes(option)) {
          return false
        }
        return stats.length >= 4
      }}

      onChange={(e, v) => {
        const drive = {...agent.discDrives[props.disc]}
        drive.subStats = v
        dispatch(agentActions.updateDisc({i: 0, drive}))
      }}

      inputValue={inputValue}
      onInputChange={(e, v) => setInputValue(v)}
      autoHighlight
    />
  )
}