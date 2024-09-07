import {useAppDispatch, useAppSelector} from "@/lib/store/util/hooks";
import * as React from "react";
import {useState} from "react";
import {Autocomplete, Chip, Grid2, Rating, TextField} from "@mui/material";
import {SubstatOptions} from "@/lib/zzz/stats/discStats";
import {agentActions} from "@/lib/store/agentStore";
import {DiscDrive, SubstatLevel} from "@/lib/zzz/disc-drives/discDrive";

export function DiscSubstatSelector(props: {disc: number}) {

  const agent = useAppSelector(s => s.agent.selectedAgent)
  const stats = agent.discDrives[props.disc].subStats
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  return (
    <Autocomplete
      renderInput={(params) => <TextField {...params} label={`Disc ${props.disc}`} />}
      open
      renderOption={(attrs, option) =>
      {
        let {key, onClick, ...outerProps} = attrs
        let {className, ...innerProps} = attrs

        delete attrs.onClick
        delete attrs.key

        const index = stats.findIndex(s => s.label === option.label)
        const disabled = index === -1

        return (
          // TODO SX
          <li
            onClick={onClick}
          //   onClick={disabled ? onClick : (e) => {
          //   console.log(e.target.tagName)
          //   if (e.target.tagName === "LABEL") {
          //     // e.stopPropagation()
          //     // e.nativeEvent.stopPropagation()
          //     // e.nativeEvent.stopImmediatePropagation()
          //     onClick(e)
          //   } else {
          //     onClick(e)
          //   }
          // }}
              {...outerProps}
              key={key}
              style={{paddingTop: 0, paddingBottom: 0}}
          >
          <Grid2 container width="100%" sx={{paddingTop: 1, paddingBottom: 1}}>
            <Grid2 size="grow" container {...innerProps} key={key}>
              <div>
                {option && option.label}
              </div>
            </Grid2>
            <Grid2 size="auto" container onClick={(e) => {e.stopPropagation()}}>
              <Rating
                  max={4}
                  // onMouseDown={(event) => {
                  //   event.preventDefault();
                  //   event.stopPropagation();
                  //   console.log('mousedown')
                  // }}
                  // onClick={(event) => {
                  //   console.log(event)
                  // //   // console.log(event.target)
                  // //   // event.preventDefault();
                  // //   // event.stopPropagation();
                  // //   // event.nativeEvent.stopPropagation()
                  // //   // event.nativeEvent.stopImmediatePropagation()
                  // }}
                  // onClick={(e) => e.stopPropagation()}
                  // onMouseDown={(e) => e.stopPropagation()}
                  onChange={(e, v) => {

                    console.log("change")
                    const drive = agent.discDrives[props.disc]
                    const level = v === null ? 0 : v as SubstatLevel

                    const newSubstats = drive.subStats.slice()
                    newSubstats[index] = {label: newSubstats[index].label, level}

                    const newDrive: DiscDrive = {
                      ...drive,
                      subStats: newSubstats
                    }

                    dispatch(agentActions.updateDisc({i: 0, drive: newDrive}))
                  }}
                  value={stats[index] ? stats[index].level : 0}
                  disabled={disabled}
              />
            </Grid2>
          </Grid2>
        </li>)
      }}
      // open
      options={SubstatOptions}
      value={
        agent.discDrives[props.disc].subStats
      }
      renderTags={(value, innerProps) => {
        return value.map((x, index) => {

          return (
            <Chip
              {...innerProps({index})}
              key={x.label}
              label={x.label}
            />
          )
        })
      }}
      multiple
      disableCloseOnSelect
      isOptionEqualToValue={(a, b) => a.label === b.label}
      getOptionDisabled={(option) => {

        if (stats.map(s => s.label).includes(option.label)) {
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