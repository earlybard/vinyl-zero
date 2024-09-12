"use client"
import {Autocomplete, Grid2, TextField} from "@mui/material";
import * as React from "react";
import {BuffLabels, BuffOptions, BuffValue, DefaultBuffCounts} from "@/lib/zzz/buffs/buffs";
import {DataGrid, GridCellModes, GridCellModesModel, GridCellParams, GridColDef} from "@mui/x-data-grid";
import {useAppDispatch, useAppSelector} from "@/lib/store/util/hooks";
import {agentActions} from "@/lib/store/agentStore";

export default function BuffsPage() {

  const buffs = useAppSelector(s => s.agent.agents[s.agent.i].buffs2)
  const dispatch = useAppDispatch()

  // TODO strongly type?
  const columns: GridColDef[] = [
    {
      field: 'key',
      headerName: 'Buff',
      width: 200,
      editable: true, // Make this column editable
      type: "singleSelect",
      valueOptions: Object.entries(BuffLabels).map(([k, v]) => {
        return {
          value: k,
          label: v
        }
      })
    },
    {
      field: 'description',
      headerName: 'Description',
      type: "string",
      width: 400,
    },
    {
      field: 'value',
      headerName: 'Value',
      type: "number",
      width: 100,
      editable: true, // Make this column editable
    }
  ];

  // Handle cell edit commit
  // const handleCellEditCommit = (params) => {
  //   const { id, field, value } = params;
  //   // Dispatch an action to update the corresponding row in Redux
  //   dispatch(updateRow({ id, field, value }));
  // };


  // Single click editing.
  // All taken from https://mui.com/x/react-data-grid/recipes-editing/#single-click-editing
  const [cellModesModel, setCellModesModel] = React.useState<GridCellModesModel>({});

  const handleCellClick = React.useCallback(
    (params: GridCellParams, event: React.MouseEvent) => {
      if (!params.isEditable) {
        return;
      }

      // Ignore portal
      if (
        (event.target as any).nodeType === 1 &&
        !event.currentTarget.contains(event.target as Element)
      ) {
        return;
      }

      setCellModesModel((prevModel) => {
        return {
          // Revert the mode of the other cells from other rows
          ...Object.keys(prevModel).reduce(
            (acc, id) => ({
              ...acc,
              [id]: Object.keys(prevModel[id]).reduce(
                (acc2, field) => ({
                  ...acc2,
                  [field]: { mode: GridCellModes.View },
                }),
                {},
              ),
            }),
            {},
          ),
          [params.id]: {
            // Revert the mode of other cells in the same row
            ...Object.keys(prevModel[params.id] || {}).reduce(
              (acc, field) => ({ ...acc, [field]: { mode: GridCellModes.View } }),
              {},
            ),
            [params.field]: { mode: GridCellModes.Edit },
          },
        };
      });
    },
    [],
  );

  const handleCellModesModelChange = React.useCallback(
    (newModel: GridCellModesModel) => {
      setCellModesModel(newModel);
    },
    [],
  );


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
              return buff
            }}
            cellModesModel={cellModesModel}
            onCellModesModelChange={handleCellModesModelChange}
            onCellClick={handleCellClick}
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

