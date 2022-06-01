import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Typography, Grid, Slider,
    FormControl,
    InputLabel,
    Select,
    MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import { ReportTitleList } from './report-title-list';

export const ReportRange = ({ script, deleted, report, setReport, meeting, member, setMember }) => {
    const [selectedTitle, setSelectedTitle] = useState([0, 0]);
    const [selected, setSelected] = useState([]);
    const [startIndex, setStartIndex] = useState(-1);
    const [selectedTimeRange, setSelectedTimeRange] = useState([0, 0]);

    useEffect(() => {
        if (report.length !== 0) {
            if (report[0].length === 1) {
                setSelectedTitle([0, 0]);
            } else {
                setSelectedTitle([0 ,1]);
            }
        }
    }, [report]);

    useEffect(() => {
        if (report.length === 0) {
            return;
        }

        setSelected(report[selectedTitle[0]][selectedTitle[1]].selected);
    }, [selectedTitle]);

    useEffect(() => {
        console.log(selected)
        let tempReport = report;
        tempReport[selectedTitle[0]][selectedTitle[1]].selected = selected;
        setReport(tempReport);

        const first_index = script.indexOf(script.find(line => line._id === selected[0]));
        const last_index = script.indexOf(script.find(line => line._id === selected[selected.length - 1]));

        setSelectedTimeRange([first_index, last_index]);
    }, [selected]);

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
        
        deleted.forEach(del => {
            const delIndex = newSelected.indexOf(del);

            if (delIndex > -1) {
                newSelected.splice(delIndex, 1);
            }
        });

        setSelected(newSelected);
        setStartIndex(-1);
    };

    const handleChangeMember = (e) => {
        setMember(e.target.value);
    };

    const handleTimeRange = (event, value, activeThumb) => {
        if (value[0] === selectedTimeRange[0] && value[1] === selectedTimeRange[1]) {
            return;
        }

        setSelectedTimeRange(value);

        const newSelected = []
        for (var i = value[0]; i <= value[1]; i++) {
            newSelected.push(script[i]._id);
        }
        setSelected(newSelected);
    };

    const timeValueText = (value) => {
        const time = script[value].time;
        
        const seconds = parseInt(time % 60);
        const minutes = parseInt((time / 60) % 60);
        const hours = parseInt(time / 3600);

        if (hours !== 0) {
            return `${`${hours}`}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
        } else {
            return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
        }
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
                <Box
                    fullWidth
                    px={2}
                    pb={3}
                >
                    <Typography
                        color="dimgrey"
                        variant="h4"
                        align='right'
                    >
                        시간 선택
                    </Typography>
                    <Slider
                        value={selectedTimeRange}
                        onChange={handleTimeRange}
                        getAriaValueText={timeValueText}
                        valueLabelFormat={timeValueText}
                        valueLabelDisplay="on"
                        step={1}
                        min={0}
                        max={script.length - 1}
                        marks
                        disableSwap
                    />
                </Box>
                <Card>
                    <FormControl fullWidth>
                        <InputLabel>Members</InputLabel>
                        <Select
                            value={member}
                            onChange={handleChangeMember}
                        >
                            <MenuItem value={0}>All Members</MenuItem>
                            {meeting && meeting.members.map((member, index) => {
                                return (
                                    <MenuItem key={index} value={index + 1}>{member}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <Box
                        sx={{
                            height: "50vh",
                            overflow: 'auto'
                        }}
                    >
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
                                {script && script.map((line) => {
                                    if ((member !== 0 && line.nick !== meeting.members[member - 1]) || deleted.indexOf(line._id) !== -1) {
                                        return;
                                    }

                                    const isItemSelected = isSelected(line._id);
                                    const time = line.time;
                                    const seconds = parseInt(time % 60);
                                    const minutes = parseInt((time / 60) % 60);
                                    const hours = parseInt(time / 3600);

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
                                                {hours !== 0 && `${hours}:`}
                                                {minutes < 10 ? `0${minutes}` : minutes}
                                                :
                                                {seconds < 10 ? `0${seconds}` : seconds}
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
                    </Box>
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
