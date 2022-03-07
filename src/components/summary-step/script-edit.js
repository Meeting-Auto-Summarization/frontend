import PerfectScrollbar from 'react-perfect-scrollbar';
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
import RotateRightIcon from '@mui/icons-material/RotateRight';

export const ScriptEdit = ({ script, selected, deleted, setScript, setSelected, setDeleted }) => {
    const handleSelectAll = (event) => {
        let newSelectedCustomerIds;
    
        if (event.target.checked) {
            newSelectedCustomerIds = script.map(line => line._id);
        } else {
          newSelectedCustomerIds = [];
        }
    
        setSelected(newSelectedCustomerIds);
    };

    const handleSelect = (isItemDeleted, id) => {
        if (isItemDeleted) {
            return;
        }

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

    const handleDelete = (id) => {
        const deletedIndex = deleted.indexOf(id);
        let newDeleted = [];

        if (deletedIndex === -1) {
            newDeleted = newDeleted.concat(deleted, id);
        } else if (deletedIndex === 0) {
            newDeleted = newDeleted.concat(deleted.slice(1));
        } else if (deletedIndex === deleted.length - 1) {
            newDeleted = newDeleted.concat(deleted.slice(0, -1));
        } else if (deletedIndex > 0) {
            newDeleted = newDeleted.concat(
                deleted.slice(0, deletedIndex),
                deleted.slice(deletedIndex + 1),
            );
        }

        setDeleted(newDeleted);
    };

    const handleChangeContent = (e, idx) => {
        let temp = script;
        temp[idx].content = e.target.value;
        setScript(temp);
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;
    const isDeleted = (id) => deleted.indexOf(id) !== -1;

    return (
        <>
            <Card sx={{ mb: 8 }}>
                <PerfectScrollbar>
                    <Box sx={{ minWidth: 1050 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selected.length === script.length}
                                            color="primary"
                                            onChange={handleSelectAll}
                                            indeterminate={
                                                selected.length > 0
                                                && selected.length < script.length
                                            }
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
                                {script.map((line, idx) => {
                                    const time = line.time;
                                    const seconds = parseInt(time % 60);
                                    const minutes = parseInt((time / 60) % 60);
                                    const hours = parseInt(time / 3600);
                                    const isItemSelected = isSelected(line._id);
                                    const isItemDeleted = isDeleted(line._id);

                                    return(
                                        <TableRow
                                            hover={!isItemDeleted}
                                            key={line._id}
                                            sx={{
                                                paddingY: '8px',
                                                ...(isItemDeleted && {
                                                    backgroundColor: "#999999"
                                                })
                                            }}
                                        >
                                            <TableCell padding="checkbox" onClick={() => handleSelect(isItemDeleted, line._id)}>
                                                <Checkbox
                                                    id={line._id}
                                                    // defaultChecked={line.isChecked}
                                                    checked={isItemSelected}
                                                    disabled={isItemDeleted}
                                                    value={line._id||""}
                                                />
                                            </TableCell>
                                            <TableCell onClick={() => handleSelect(isItemDeleted, line._id)}>
                                                <Typography color="textPrimary" variant="h6">
                                                    {line.nick}
                                                </Typography>
                                            </TableCell>
                                            <TableCell onClick={() => handleSelect(isItemDeleted, line._id)}>
                                                <Typography color="textPrimary" variant="body1">
                                                    {hours !== 0 && `${hours}:`}
                                                    {minutes < 10 ? `0${minutes}` : minutes}
                                                    :
                                                    {seconds < 10 ? `0${seconds}` : seconds}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ paddingX: 0 }}>
                                                <TextField
                                                    fullWidth
                                                    id={`field_${line._id}`}
                                                    label="edit content"
                                                    defaultValue={line.content}
                                                    disabled={isItemDeleted}
                                                    onChange={(e) => {handleChangeContent(e, idx)}}
                                                    variant="filled" />
                                            </TableCell>
                                            <TableCell padding="checkbox" align="center">
                                                <IconButton
                                                    aria-label="delete"
                                                    size="large"
                                                    onClick={() => handleDelete(line._id)}
                                                >
                                                    {isItemDeleted 
                                                        ? <RotateRightIcon />
                                                        : <DeleteIcon />
                                                    }
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
            {/* <Box
                sx={{
                    width: '100%',
                    height: 100,
                    background: 'white',
                    position: 'fixed',
                    left: 0,
                    bottom: 0,
                    zIndex: 1000,
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'center',
                    boxShadow: '0px -5px 3px 3px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Link
                    href={{
                        pathname: `/report-form-setting`, // 라우팅 id
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ marginRight: 2 }}
                        onClick={handleSubmitScript}
                    >
                        Next Step
                    </Button>
                </Link>
            </Box> */}
        </>
    );
};
