import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Typography, Grid } from '@mui/material';
import { useState } from 'react';
import { meetings } from '../../__mocks__/meetings';
import { ReportTitleList } from './report-title-list';

export const ReportRangeResult = ({ mid, ...rest }) => {
    const meeting = meetings.find(m => m.id === mid); 
    const scripts = meeting.scripts;
    const reports = meeting.reports;
    
    const [selected, setSelected] = useState([]);
    const [startIndex, setStartIndex] = useState(-1);

    const handleSelectAll = (event) => {
        let newSelectedCustomerIds;
    
        if (event.target.checked) {
          newSelectedCustomerIds = scripts.map(line => line.id);
        } else {
          newSelectedCustomerIds = [];
        }
    
        setSelected(newSelectedCustomerIds);
    };

    const handleSelectStart = (id) => {
        const emptyArray = [];
        setSelected(emptyArray);

        const line = scripts.find(line => line.id === id);
        const selectedIndex = scripts.indexOf(line);
        setStartIndex(selectedIndex);

        const newSelected = [id];

        setSelected(newSelected);
    };

    const handleSelectEnd = (id) => {
        const line = scripts.find(line => line.id === id);
        const selectedIndex = scripts.indexOf(line);

        const newSelected = scripts.slice(startIndex, selectedIndex + 1).map(line => line.id);
        setSelected(newSelected);
        setStartIndex(-1);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    return (
        <Grid
            container
            spacing={3}
            mb={8}
        >
            <Grid
                item
                xs={8}
            >
                <Card {...rest}>
                    <PerfectScrollbar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            // checked={selectedCustomerIds.length === customers.length}
                                            color="primary"
                                            // indeterminate={
                                            //     selectedCustomerIds.length > 0
                                            //     && selectedCustomerIds.length < customers.length
                                            // }
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Name
                                    </TableCell>
                                    <TableCell>
                                        Time
                                    </TableCell>
                                    <TableCell>
                                        Content
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {scripts.map((line) => {
                                    return(
                                        <TableRow
                                            hover
                                            key={line.id}
                                            sx={{ paddingY: '8px'}}
                                            onClick={
                                                startIndex === -1
                                                ? () => handleSelectStart(line.id)
                                                : () => handleSelectEnd(line.id)
                                            }
                                            // selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                                        >
                                            <TableCell
                                                padding="checkbox"
                                                width="3%"
                                            >
                                                <Checkbox
                                                    id={line.id}
                                                    checked={selected.indexOf(line.id) !== -1}
                                                />
                                            </TableCell>
                                            <TableCell width="12%">
                                                <Typography color="textPrimary" variant="h6">
                                                    {line.nick}
                                                </Typography>
                                            </TableCell>
                                            <TableCell width="12%">
                                                <Typography color="textPrimary" variant="body1">
                                                    {line.time}
                                                </Typography>
                                            </TableCell>
                                            <TableCell width="65%">
                                                <Typography color="textPrimary" variant="body1">
                                                    {line.content}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </PerfectScrollbar>
                </Card>
            </Grid>
            <Grid
                item
                xs={4}
            >
                <Card
                    sx={{
                        p: 3,
                    }}
                >    
                    <ReportTitleList
                        titleList={reports.title}
                    />
                </Card>
            </Grid>
        </Grid>
    );
};
