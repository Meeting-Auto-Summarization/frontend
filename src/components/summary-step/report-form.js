import { useState, useCallback } from 'react';
import { Box, Button, Card, TextField, Typography, styled, Alert, Collapse } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { v4 as uuid } from 'uuid';

const Light = styled(Box)(({ theme }) => ({
    position: 'absolute',
    right: 0,
    bottom: 'calc(50% - 11px)',
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    boxShadow: 'inset 3.5px 3.5px rgba(0, 0, 0, .3)'
}));

export const ReportForm = ({ script, report, setReport }) => {
    const [_, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState([]);

    const handleAddHead = () => {
        const newarr = report.concat([[ { title: '', summary: '', selected: [script[0]._id] } ]]);;
        setReport(newarr);
    };

    const handleAddSub = (headNum) => {
        const newarr = report;
        newarr[headNum].push({ title: '', summary: '', selected: [script[0]._id] });
        setReport(newarr);
        forceUpdate();
    };

    const handleDeleteHead = (index) => {
        const newarr = report;
        newarr.splice(index, 1);
        setReport(newarr);
    };

    const handleDeleteSub = (headindex, subindex) => {
        const newarr = report;
        newarr[headindex].splice(subindex, 1);
        setReport(newarr);
        forceUpdate();
    };

    const HeadInputComp = ({ index, content, head }) => {
        return (
            <Box
                m={2}
                pr={2}
                sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    position: 'relative'
                }}
            >
                <Typography variant="h5" marginRight={2}>{parseInt(index) + 1}.</Typography>
                <TextField
                    fullWidth
                    variant="standard"
                    defaultValue={content.title}
                    onChange={(e) => {
                        const newarr = report;
                        newarr[index][0].title = e.target.value;
                        setReport(newarr);
                    }}
                />
                <Button onClick={handleAddHead} size="small">Add Headline</Button>
                <Button onClick={() => handleAddSub(index)} size="small">
                    Add Subheading
                </Button>
                <Button
                    onClick={() => {
                        setDeleteIndex([index]);

                        let flag = false;

                        for (let i = 0; i < head.length; i++) {
                            if (head[i].summary !== '') {
                                flag = true;
                            }
                        }

                        {flag
                            ? setDeleteOpen(true)
                            : handleDeleteHead(index)
                        }
                    }}
                    color="error"
                    size="small"
                >
                    Delete Headline
                </Button>
                <Light
                    sx={{
                        backgroundColor:
                            content.summary !== ''
                                ? 'lightGreen'
                                : 'gray'
                    }}
                />
            </Box>
        );
    };

    const SubInputComp = ({ headindex, subindex, content }) => {
        const alp = String.fromCharCode(subindex + 96);

        return (
            <Box
                m={2}
                pr={2}
                ml={14}
                sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    position: 'relative'
                }}
            >
                <Typography variant="h5" marginRight={2}>{alp}.</Typography>
                <TextField
                    fullWidth
                    variant="standard"
                    defaultValue={content.title}
                    onChange={(e) => {
                        const newarr = report;
                        newarr[headindex][subindex].title = e.target.value;
                        setReport(newarr);
                    }}
                />
                <Button size="small" onClick={(e) => handleAddSub(headindex)}>Add Line</Button>
                <Button
                    onClick={() => {
                        setDeleteIndex([headindex, subindex]);
                        {content.summary === ''
                            ? handleDeleteSub(headindex, subindex)
                            : setDeleteOpen(true)
                        }
                    }}
                    color="error"
                    size="small"
                >
                    Delete Subheading
                </Button>
                <Light
                    sx={{
                        backgroundColor:
                            content.summary !== ''
                                ? 'lightGreen'
                                : 'gray'
                    }}
                />
            </Box>
        );
    };

    return (
        <Card sx={{ position: 'relative' }}>
            <PerfectScrollbar>
                {report.length === 0 &&
                    <Button
                        onClick={handleAddHead}
                        fullWidth
                        sx={{
                            height: 100,
                            fontSize: 21
                        }}
                    >
                        Add Line
                    </Button>
                }
                {report.map((head, index) => {
                    return(
                        <Box key={uuid()}>
                            {head.map((tail, subIndex) => {
                                return(
                                    <Box key={uuid()}>
                                        {subIndex === 0
                                            ? <HeadInputComp index={index} content={tail} head={head} />
                                            : <SubInputComp headindex={index} subindex={subIndex} content={tail} />
                                        }
                                    </Box>
                                )
                            })}
                        </Box>
                    )
                })}
                <Collapse
                    in={deleteOpen}
                    sx={{
                        position: 'fixed',
                        bottom: 100,
                        left: {
                            xs: 10,
                            lg: 295
                        },
                        right: 15
                    }}
                >
                    <Alert
                        severity="error"
                        action={
                            <Box>
                                <Button
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setDeleteOpen(false);
                                        {deleteIndex.length === 1
                                            ? handleDeleteHead(deleteIndex[0])
                                            : handleDeleteSub(deleteIndex[0], deleteIndex[1])
                                        }
                                    }}
                                >
                                    네
                                </Button>
                                <Button color="inherit" size="small" onClick={() => setDeleteOpen(false)}>
                                    아니오
                                </Button>
                            </Box>
                        }
                    >
                        요약 내용이 존재하는 제목입니다. 계속 삭제하시겠습니까?
                    </Alert>
                </Collapse>
            </PerfectScrollbar>
        </Card>
    );
};
