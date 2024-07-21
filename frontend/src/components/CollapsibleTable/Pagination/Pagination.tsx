import { ChangeEvent, useState } from 'react';
import { Pagination as PaginationMui, Box } from '@mui/material';

type PaginationProps = {
  totalPages: number,
  currentPage: number,
  getSelectedPage: (data: number) => void,
}

const Pagination = ({ totalPages, currentPage, getSelectedPage }: PaginationProps) => {

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => getSelectedPage(page);

  return (
    <Box>
      <PaginationMui
        sx={{
          '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: '#afa40a',
            transition: 'background-color 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: '#ecdd0857',
            }
          },
        }}
        variant='outlined'
        shape='rounded'
        hidePrevButton
        hideNextButton
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default Pagination;
