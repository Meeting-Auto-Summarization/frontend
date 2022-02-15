import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Typography, TextField, Grid } from '@mui/material';
import { useState } from 'react';
import { scripts } from '../../__mocks__/scripts';
import { reports } from '../../__mocks__/reports';
import { ReportTitleList } from './report-title-list';

export const ReportRangeResult = ({ mid, ...rest }) => {
    const script = scripts.find(meeting => meeting.id === mid).script;
    const [selected, setSelected] = useState([]);
    const [startIndex, setStartIndex] = useState(-1);

    const handleSelectAll = (event) => {
        let newSelectedCustomerIds;
    
        if (event.target.checked) {
          newSelectedCustomerIds = script.map((script) => script.id);
        } else {
          newSelectedCustomerIds = [];
        }
    
        setSelected(newSelectedCustomerIds);
    };

    const handleSelectStart = (id) => {
        const emptyArray = [];
        setSelected(emptyArray);

        // script를 넘겨주는 방식이 아니라 해당 컴포에서 직접 불러오는 방식으로 수정할 것. mid만 넘기셈 페이지간에는
        const line = script.find(script => script.id === id);
        const selectedIndex = script.indexOf(line);
        setStartIndex(selectedIndex);

        const newSelected = [id];

        setSelected(newSelected);
    };

    const handleSelectEnd = (id) => {
        const line = script.find(script => script.id === id);
        const selectedIndex = script.indexOf(line);

        const newSelected = script.slice(startIndex, selectedIndex + 1).map(script => script.id);
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
                                {script.map((line) => {
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
                                                sx={{ width: "3%" }}
                                            >
                                                <Checkbox
                                                    id={line.id}
                                                    checked={selected.indexOf(line.id) !== -1}
                                                    onChange={
                                                        startIndex === -1
                                                        ? () => handleSelectStart(line.id)
                                                        : () => handleSelectEnd(line.id)
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell sx={{ width: "12%" }}>
                                                <Typography color="textPrimary" variant="h6">
                                                    {line.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ width: "12%" }}>
                                                <Typography color="textPrimary" variant="body1">
                                                    {line.time}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ width: "65%" }}>
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
                        titleList={reports.find(report => report.id === mid).title}
                    />
                </Card>
            </Grid>
        </Grid>
    );
};
