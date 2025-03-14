import * as React from 'react';
import Typography from '@mui/material/Typography';
import { auth } from '../../auth';

export default async function HomePage() {
  const session = await auth();

  return (
    <Typography>
      Welcome to ZZZ Calculator v1
    </Typography>
  );
}
