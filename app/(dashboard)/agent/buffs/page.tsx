"use client"
import {Autocomplete, Grid2, TextField} from "@mui/material";
import * as React from "react";
import {DefaultBuffValues} from "@/lib/zzz/buffs/buffs";
import {DataGrid} from "@mui/x-data-grid";
import {useAppDispatch, useAppSelector} from "@/lib/store/util/hooks";
import {agentActions} from "@/lib/store/agentStore";

export default function BuffsPage() {

  const buffs = useAppSelector(s => s.agent.agents[s.agent.i].buffs2)
  const dispatch = useAppDispatch()

  const columns = [
    {
      field: 'label',
      headerName: 'Buff',
      width: 150,
      editable: true, // Make this column editable
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 150,
      editable: true, // Make this column editable
    }
  ];

  // Handle cell edit commit
  // const handleCellEditCommit = (params) => {
  //   const { id, field, value } = params;
  //   // Dispatch an action to update the corresponding row in Redux
  //   dispatch(updateRow({ id, field, value }));
  // };

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
          <DataGrid
            rows={buffs}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            processRowUpdate={(buff) => {
              dispatch(agentActions.updateBuff(buff))
              console.log(buffs)
              return buff
            }}
          />
      {/*<Autocomplete*/}
      {/*  renderInput={params => <TextField {...params} label="Add Buff" />}*/}
      {/*  options={Object.keys(DefaultBuffValues)}*/}
      {/*  onChange={(e, v, r, d) => {*/}

      {/*  }}*/}
      {/*/>*/}
      </Grid2>
    </Grid2>
  )
}

