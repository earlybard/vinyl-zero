import {useAppDispatch, useAppSelector} from "@/lib/store/util/hooks";
import {useState} from "react";
import {Autocomplete, Box, Button, Chip, Grid2, Input, Rating, TextField} from "@mui/material";
import {ODriveSubstat} from "@/lib/zzz/stats/discStats";
import {agentActions} from "@/lib/store/agentStore";
import {DiscDrive, SubstatLevel} from "@/lib/zzz/disc-drives/discDrive";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {renderSubstatOption} from "@/app/components/DiscSelector/renderSubstatOption";
import * as React from "react";

export function DiscSubstatSelector(props: {disc: number}) {

  const agent = useAppSelector(s => s.agent.selectedAgent)
  const stats = agent.discDrives[props.disc].subStats
  const subStatLevels = agent.discDrives[props.disc].subStatLevels
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  return (
    <Autocomplete
      renderInput={(params) => <TextField {...params} label={`Disc ${props.disc}`} />}

      renderOption={(attrs, option) =>
      {
        let {key, onClick, ...outerProps} = attrs
        let {key2, className, ...innerProps} = attrs

        const index = stats.indexOf(option)
        const disabled = index === -1

        return (
            // <li {...props}>
            <li {...outerProps} key={key}>
          <Grid2 container width="100%">
            <Grid2 size="grow" onClick={onClick} {...innerProps}>
              {option}
            </Grid2>
            <Grid2 size="auto">
              <Rating
                  max={4}
                  onChange={(e, v) => {
                    const x = v as SubstatLevel ?? undefined
                    const drive = {...agent.discDrives[props.disc]}
                    const levels = drive.subStatLevels.slice()
                    levels[index] = x
                    drive.subStatLevels = levels
                    dispatch(agentActions.updateDisc({i: 0, drive}))
                  }}
                  value={subStatLevels[index]}
                  disabled={disabled}
              />
            </Grid2>
          </Grid2>
        </li>)
      }
      }
      open
      options={Object.values(ODriveSubstat)}
      value={
        agent.discDrives[props.disc].subStats.map(ss => {
          let result = ss
          let substatLevel = subStatLevels[stats.indexOf(ss)]
          if (substatLevel && substatLevel > 0) {
            result += ` +${substatLevel}`
          }
          return result
        })
      }
      multiple
      disableCloseOnSelect
      getOptionDisabled={(option) => {

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