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

export const ScriptEditResult = ({ scripts, ...rest }) => {
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
        <Card {...rest}>
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
                            {scripts.script.map((script) => {
                                const isItemSelected = isSelected(script.id);

                                return(
                                    <TableRow
                                        hover
                                        key={script.id}
                                        // selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                                    >
                                        <TableCell padding="checkbox" onClick={(event) => handleClick(event, script.id)}>
                                            <Checkbox
                                                id={script.id}
                                                checked={isItemSelected}
                                                // onChange={(event) => handleSelectOne(event, customer.id)}
                                                // value="true"
                                            />
                                        </TableCell>
                                        <TableCell sx={{paddingY: '8px'}} onClick={(event) => handleClick(event, script.id)}>
                                            <Typography color="textPrimary" variant="h6">
                                                {script.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{paddingY: '8px'}} onClick={(event) => handleClick(event, script.id)}>
                                            <Typography color="textPrimary" variant="body1">
                                                {script.time}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{paddingX: 0, paddingY: '8px'}}>
                                            <TextField
                                                fullWidth
                                                id="filled-basic"
                                                label="edit content"
                                                defaultValue={script.content}
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
                    <Box sx={{ height: '80px' }}></Box>
                </Box>
            </PerfectScrollbar>
        </Card>
    );
};

ScriptEditResult.propTypes = {
  scripts: PropTypes.array.isRequired
};
