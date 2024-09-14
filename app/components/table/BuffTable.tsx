import {useAppDispatch, useAppSelector} from "@/lib/store/util/hooks";
import {DataGrid, GridActionsCellItem, GridColDef, GridToolbarContainer} from "@mui/x-data-grid";
import {BuffLabels, BuffValue} from "@/lib/zzz/buffs/buffs";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {agentActions} from "@/lib/store/agentStore";
import {Button, Grid2} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import Typography from "@mui/material/Typography";

export function BuffTable(props: {
  buffs: BuffValue[],
  type: string,
  editable: boolean
  onCreate: () => {},
  onDelete: (id: number) => {},
  onEdit: (buff: BuffValue) => {}
}) {

  // TODO strongly type?
  const columns: GridColDef[] = [
    {
      field: 'key',
      headerName: 'Buff',
      width: 200,
      editable: props.editable,
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
      editable: props.editable
    },
    {
      field: 'value',
      headerName: 'Value',
      type: "number",
      width: 100,
      editable: props.editable,
    }
  ]

  if (props.editable) {
    columns.push(
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({id}) => {

          return [
            <GridActionsCellItem
              key={1}
              icon={<DeleteIcon/>}
              label="Delete"
              onClick={() => props.onDelete(id as number)}
              color="inherit"
            />,
          ];
        }
      }
    )
  }

  return (
    <Grid2 container>
      <Grid2 container size={12} justifyContent="space-between" sx={{marginY: 1}}>
        <Typography sx={{paddingTop: 0.5}} variant="h6">
          {props.type} Buffs
        </Typography>
        {props.editable ?
          <Button color="primary" startIcon={<AddIcon />} onClick={props.onCreate}>
            Add {props.type} Buff
          </Button>
          : undefined
        }
      </Grid2>
      <Grid2 size={12}>
        <DataGrid
          rows={props.buffs}
          columns={columns}
          checkboxSelection={false}
          disableRowSelectionOnClick
          density="compact"
          processRowUpdate={(buff) => {
            props.onEdit(buff)
            return buff
          }}
          rowSelection={false}
          hideFooter
          editMode="row"
        />
      </Grid2>
    </Grid2>
  )

}