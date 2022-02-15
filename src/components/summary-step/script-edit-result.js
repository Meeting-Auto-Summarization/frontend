import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { scripts } from '../../__mocks__/scripts';

export const ScriptEditResult = ({ mid, ...rest }) => {
    const script = scripts.find(meeting => meeting.id === mid).script;
    const [selected, setSelected] = useState([]);

    const handleClick = (event, id) => {
        console.log(selected)
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    return (
        <Card {...rest} sx={{ mb: 8 }}>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
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
                                        // onChange={handleSelectAll}
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
                                <TableCell>
                                    Delete
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {script.map((line) => {
                                const isItemSelected = isSelected(line.id);

                                return(
                                    <TableRow
                                        hover
                                        key={line.id}
                                        sx={{ paddingY: '8px' }}
                                        // selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                                    >
                                        <TableCell padding="checkbox" onClick={(event) => handleClick(event, line.id)}>
                                            <Checkbox
                                                id={line.id}
                                                checked={isItemSelected}
                                                // onChange={(event) => handleSelectOne(event, customer.id)}
                                                // value="true"
                                            />
                                        </TableCell>
                                        <TableCell  onClick={(event) => handleClick(event, line.id)}>
                                            <Typography color="textPrimary" variant="h6">
                                                {line.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell onClick={(event) => handleClick(event, line.id)}>
                                            <Typography color="textPrimary" variant="body1">
                                                {line.time}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ paddingX: 0 }}>
                                            <TextField
                                                fullWidth
                                                id="filled-basic"
                                                label="edit content"
                                                defaultValue={line.content}
                                                variant="filled" />
                                        </TableCell>
                                        <TableCell padding="checkbox" align="center">
                                            <IconButton aria-label="delete" size="large">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
        </Card>
    );
};

ScriptEditResult.propTypes = {
  scripts: PropTypes.array.isRequired
};
