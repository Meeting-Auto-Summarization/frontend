import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Typography, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { ReportTitleList } from './report-title-list';

export const ReportRange = ({ script, report, setReport }) => {
    const [selectedTitle, setSelectedTitle] = useState([0, 0]);
    const [selected, setSelected] = useState([]);
    const [startIndex, setStartIndex] = useState(-1);

    useEffect(() => {
        if (report.length === 0) {
            return;
        }

        setSelected(report[selectedTitle[0]][selectedTitle[1]].selected);
    }, [selectedTitle]);

    const handleSelectAll = (event) => {
        let newSelectedCustomerIds;
    
        if (event.target.checked) {
          newSelectedCustomerIds = script.map(line => line._id);
        } else {
          newSelectedCustomerIds = [script[0]._id];
        }
    
        setSelected(newSelectedCustomerIds);
    };

    const handleSelectStart = (id) => {
        const emptyArray = [];
        setSelected(emptyArray);

        const line = script.find(line => line._id === id);
        const selectedIndex = script.indexOf(line);
        setStartIndex(selectedIndex);

        const newSelected = [id];

        setSelected(newSelected);
    };

    const handleSelectEnd = (id) => {
        const line = script.find(line => line._id === id);
        const selectedIndex = script.indexOf(line);

        const newSelected = script.slice(startIndex, selectedIndex + 1).map(line => line._id);
        setSelected(newSelected);

        let tempReport = report;
        tempReport[selectedTitle[0]][selectedTitle[1]].selected = newSelected;
        setReport(tempReport);

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
                <Card>
                    <PerfectScrollbar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selected.length === script.length}
                                            color="primary"
                                            indeterminate={
                                                selected.length > 0
                                                && selected.length < script.length
                                            }
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
                                {script.map((line) => {
                                    const isItemSelected = isSelected(line._id);

                                    return(
                                        <TableRow
                                            hover
                                            key={line._id}
                                            sx={{ paddingY: '8px'}}
                                            onClick={
                                                startIndex === -1
                                                ? () => handleSelectStart(line._id)
                                                : () => handleSelectEnd(line._id)
                                            }
                                        >
                                            <TableCell
                                                padding="checkbox"
                                                width="3%"
                                            >
                                                <Checkbox
                                                    id={line._id}
                                                    checked={isItemSelected}
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
            <Grid item xs={4}>
                <Card sx={{ p: 3 }}>
                    <ReportTitleList report={report} selectedTitle={selectedTitle} setSelectedTitle={setSelectedTitle} />
                </Card>
            </Grid>
        </Grid>
    );
};
