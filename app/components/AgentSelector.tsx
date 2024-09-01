import {Autocomplete, TextField} from "@mui/material";
import {AGENTS} from "@/app/zzz/agents";

export default function AgentSelector() {
  return (
    <Autocomplete
      renderInput={(params) => <TextField {...params} label="Agent" />}
      options={AGENTS}
      value={AGENTS[0]}
    />
  )
}