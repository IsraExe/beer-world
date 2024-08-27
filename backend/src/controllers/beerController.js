import pagination from '../helpers/pagination.js';

const list = async (req, res) => {

    const { page, pageSize } = req.body;

    const response = await fetch('https://app2.mytapp.com.br/api/app/getTaps?e_id=456', { method: 'GET' });
    const message = await response.json();
    const records = message.info.data;

    const pageApplied = page || 1; 
    const pageSizeApplied = pageSize || 5;

    const paginatedData = pagination(records, pageApplied, pageSizeApplied);

    const allDataSize = records?.length;

    const data = {
        total_pages: Math.ceil(allDataSize / pageSizeApplied),
        currentPage: pageApplied,
        data: paginatedData
    };

    return res.status(200).json({ message: data });
};

export { list };