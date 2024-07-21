'use client'

import { Fragment, useMemo, useState } from 'react';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, CircularProgress } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useFetch from '@/hooks/useFetch';
import Pagination from '../Pagination/Pagination';

function Row(props: { row: any }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon sx={{ color: 'white' }} /> : <KeyboardArrowDownIcon sx={{ color: 'white' }} />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>{row['beer_name']}</TableCell>
        <TableCell align='right'>{row['beer_alcohol']}</TableCell>
        <TableCell align='right'>{row['beer_style']}</TableCell>
        <TableCell align='right'>{row['brewery']}</TableCell>
        <TableCell align='right'>{row['beer_ibu']}</TableCell>
        <TableCell align='right'>{row['price_ml']}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1, overflowX: 'auto' }}>
              <Typography variant='h6' gutterBottom component='div'>
                Descrição
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableBody>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      {row['beer_description'] || 'Sem descrição disponível'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function CollapsibleTable() {

  const [currentPage, setCurrentPage] = useState(1);

  const memoizedData = useMemo(() => ({
    page: currentPage,
  }), [currentPage]);

  const { pulledData, loading } = useFetch({ method: 'POST', pathname: '/beerInfo', data: memoizedData });

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
                {pulledData?.message.data?.map((row: any) => (
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
