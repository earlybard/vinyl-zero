import {useAppDispatch, useAppSelector} from "@/lib/store/util/hooks";
import * as React from "react";
import {useEffect, useState} from "react";
import {Autocomplete, Chip, ClickAwayListener, Grid2, Rating, TextField} from "@mui/material";
import {SubstatOptions} from "@/lib/zzz/stats/discStats";
import {agentActions} from "@/lib/store/agentStore";
import {DiscDrive, SubstatLevel} from "@/lib/zzz/disc-drives/discDrive";

export function DiscSubstatSelector(props: {disc: number}) {

  const agent = useAppSelector(s => s.agent.agents[s.agent.i])
  const stats = agent.discDrives[props.disc].subStats
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Autocomplete
        // Controlled open/close so that only clickaway closes.
        open={open}
        onOpen={() => setOpen(true)}
        onClose={(e, r) => {
          if (r === "selectOption" || r === "removeOption") {
            e.stopPropagation()
          }
        }}
        renderInput={(params) => <TextField {...params} label={`Substats`} />}
        renderOption={(attrs, option) =>
        {
          let {key, ...outerProps} = attrs

          const substat = stats.findIndex(s => s.label === option.label)
          const disabled = substat === -1

          return (
            // TODO SX
            <li
              {...outerProps}
              key={key}
              style={{paddingTop: 0, paddingBottom: 0}}
            >
            <Grid2 container width="100%" sx={{paddingTop: 1, paddingBottom: 1}}>
              <Grid2 size="grow" container>
                <div>
                  {option && option.label}
                </div>
              </Grid2>
              <Grid2
                size="auto"
                container
                // If the row is active, don't deselect if the click happens inside the Rating section.
                onClick={(e) => {if (!disabled) e.stopPropagation()}}>
                <Rating
                    max={4}
                    onChange={(e, v) => {
                      dispatch(agentActions.setDiscSubstatLevel({
                        disc: props.disc,
                        substat: substat,
                        level: v as SubstatLevel | null
                      }))
                    }}
                    value={stats[substat] ? stats[substat].level : 0}
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
        renderTags={(it, ) =>
          it.map((x, index) => <Chip {...({index})} key={x.label} label={x.label}/>
        )
        }
        multiple
        isOptionEqualToValue={(a, b) => a.label === b.label}
        getOptionDisabled={(option) => {
          if (stats.map(s => s.label).includes(option.label)) {
            return false
          }
          return stats.length >= 4
        }}

        onChange={(e, v) => {
          dispatch(agentActions.setDiscSubstats({disc: props.disc, substats: v}))
        }}
        
        inputValue={inputValue}
        onInputChange={(e, v) => setInputValue(v)}
        autoHighlight
      />
    </ClickAwayListener>
  )
}