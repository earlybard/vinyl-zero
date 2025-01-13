import {useAppDispatch, useAppSelector} from "@/lib/store/util/hooks";
import * as React from "react";
import {useState} from "react";
import {Autocomplete, Chip, ClickAwayListener, Grid2, Rating, TextField} from "@mui/material";
import {SubstatOptions} from "@/lib/zzz/stats/discStats";
import {agentActions} from "@/lib/store/agentStore";
import {SubstatLevel} from "@/lib/zzz/disc-drives/discDrive";

export function DiscSubstatSelector(props: {disc: number}) {

  const agent = useAppSelector(s => s.agent.agents[s.agent.i])
  const stats = agent.discDrives[props.disc].subStats
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleKeyDown = (e: any) => {
    if (open) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) => Math.min(prev + 1, SubstatOptions.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        if (highlightedIndex >= 0) {
          const option = SubstatOptions[highlightedIndex];
          const substatIndex = stats.findIndex(s => s.label === option.label);
          if (substatIndex !== -1) {
            const currentLevel = stats[substatIndex]?.level || 0;
            if (e.key === 'ArrowRight' && currentLevel < 4) {
              dispatch(agentActions.setDiscSubstatLevel({
                disc: props.disc,
                substat: substatIndex,
                level: currentLevel + 1
              }));
            } else if (e.key === 'ArrowLeft' && currentLevel > 0) {
              dispatch(agentActions.setDiscSubstatLevel({
                disc: props.disc,
                substat: substatIndex,
                level: currentLevel - 1
              }));
            }
          }
        }
      } else if (e.key === 'Tab') {
        e.preventDefault(); // Prevent default tab behavior
        setOpen(false); // Close the autocomplete
      }
    }
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

          const substatIndex = stats.findIndex(s => s.label === option.label)
          const disabled = substatIndex === -1

          let label = option.label

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
                    {label}
                  </div>
                </Grid2>
                <Grid2
                  size="auto"
                  container
                  // If the row is active, don't deselect if the click happens inside the Rating section.
                  onClick={(e) => {
                    if (!disabled) {
                      const currentLevel = stats[substatIndex]?.level || 0;
                      const newLevel = currentLevel < 4 ? currentLevel + 1 : 0; // Toggle between 0 and 4
                      dispatch(agentActions.setDiscSubstatLevel({
                        disc: props.disc,
                        substat: substatIndex,
                        level: newLevel
                      }));
                    }
                    e.stopPropagation();
                  }}
                >
                  <Rating
                    max={4}
                    value={stats[substatIndex] ? stats[substatIndex].level : 0}
                    disabled={disabled}
                    onChange={(e, v) => {
                      dispatch(agentActions.setDiscSubstatLevel({
                        disc: props.disc,
                        substat: substatIndex,
                        level: v as SubstatLevel | null
                      }));
                    }}
                    onClick={(e) => {
                      if (!disabled) {
                        e.stopPropagation(); // Prevent click event from bubbling up
                      }
                    }}
                  />
                </Grid2>
              </Grid2>
            </li>)
        }}
        options={SubstatOptions}
        value={
          agent.discDrives[props.disc].subStats
        }
        renderTags={(it, p) =>
          it.map((x, index) => {
            let label = x.label
            if (x.level > 0) {
              label += ` +${x.level}`
            }
            return <Chip {...p({index})} key={x.label} label={label}/>
          }
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
        onKeyDown={handleKeyDown}
        onHighlightChange={(event, option) => {
          const index = SubstatOptions.findIndex(o => o.label === option?.label);
          setHighlightedIndex(index);
        }}
      />
    </ClickAwayListener>
  )
}