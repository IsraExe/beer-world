'use client'

import { useMemo, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import useFetch from '@/hooks/useFetch';
import Pagination from './Pagination/Pagination';
import { BeerInfo } from '@/types';

import Row from './Row/Row';

type PulledData = {
  message: {
    data: BeerInfo[];
    total_pages: number;
    currentPage: number;
  };
}

export default function CollapsibleTable() {

  const [currentPage, setCurrentPage] = useState(1);

  const memoizedData = useMemo(() => ({
    page: currentPage,
  }), [currentPage]);

  const { pulledData, loading } = useFetch<PulledData>({ method: 'POST', pathname: '/beerInfo', data: memoizedData });

  const getSelectedPage = (data: number) => setCurrentPage(data);

  return (
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: '100vh', gap: 2, backgroundColor: '#0f0f0f' }}>
      {!loading &&
        <>
          <TableContainer component={Paper} sx={{ maxWidth: '60%', overflowX: 'auto' }}>
            <Table aria-label='collapsible table' sx={{ backgroundColor: '#0f0f0f', minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Nome</TableCell>
                  <TableCell align='right'> % Álcool</TableCell>
                  <TableCell align='right'>Tipo</TableCell>
                  <TableCell align='right'>Cervejaria</TableCell>
                  <TableCell align='right'>Ibu</TableCell>
                  <TableCell align='right'>Preço / ml</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pulledData?.message.data?.map((row: BeerInfo) => (
                  <Row key={row['tap_id']} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination totalPages={pulledData?.message.total_pages} getSelectedPage={getSelectedPage} currentPage={pulledData?.message.currentPage} />
        </>
      }

      {loading &&
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <CircularProgress size={100} />
        </div>
      }

    </Box>
  );
}
