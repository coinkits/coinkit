'use client';
import * as React from 'react';
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import * as ethers from 'ethers';
import copy from 'copy-to-clipboard';

interface Wallet {
  address: string;
  privateKey: string;
  mnemonic?: string;
}
export default function Page(): React.JSX.Element {
  const [wallet, setWallet] = React.useState<Wallet[]>([]);
  const createWallet = () => {
    const { address, privateKey, mnemonic } = ethers.Wallet.createRandom();
    setWallet([])
    // setWallet([{ address, privateKey, mnemonic: mnemonic?.phrase }, ...wallet]);
    copy(JSON.stringify({ address, privateKey, mnemonic: mnemonic?.phrase }));
  };
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Create Wallet</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <Button variant="contained" onClick={createWallet}>
            创建钱包
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='left'>address</TableCell>
              <TableCell align='left'>privateKey</TableCell>
              <TableCell align='left'>mnemonic</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wallet.map((row) => (
              <TableRow key={row.address} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.address}
                </TableCell>
                <TableCell align="right">{row.privateKey}</TableCell>
                <TableCell align="right">{row.mnemonic}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
