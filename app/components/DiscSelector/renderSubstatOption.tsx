import * as React from "react";
import {AutocompleteOwnerState, AutocompleteRenderOptionState} from "@mui/material/Autocomplete/Autocomplete";
import {Grid2, Rating} from "@mui/material";
import {DriveSubstatOption} from "@/lib/zzz/stats/discStats";
import {SubstatLevel} from "@/lib/zzz/disc-drives/discDrive";

export const renderSubstatOption = (
  props: React.HTMLAttributes<HTMLLIElement> & { key: any },
  option: string
  // state: AutocompleteRenderOptionState,
  // ownerState: AutocompleteOwnerState<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>,
) => {

  const {onClick, ...outerProps} = props
  // return <li {...props}>{option}</li>
  const {className, ...innerProps} = props

  const index = stats.indexOf(option)
  const disabled = index === -1

  return (
    // <li {...props}>
    <li {...outerProps}>
      <Grid2 container width="100%">
        <Grid2 size="grow" onClick={onClick} {...innerProps}>
          {option}
        </Grid2>
        <Grid2 size="auto">
          <Rating onChange={} value={statLevels[index]} disabled={disabled}/>
        </Grid2>
      </Grid2>
    </li>
  )
};