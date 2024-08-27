import { Fragment, useState } from 'react';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { BeerInfo } from '@/types';

export default function Row({ row }: { row: BeerInfo }) {
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