import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Card,
    Button,
    TextField,
    Typography
} from '@mui/material';
import { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

export const ReportFormSetting = () => {
    const [inputList, setInputList] = useState([['']]);
    const [_, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const handleAddHead = () => {
        setInputList(prev => (
            prev.concat([['']])
        ));
    };

    const handleAddSub = (headNum) => {
        const newarr = inputList;
        newarr[headNum].push('');
        setInputList(newarr);
        forceUpdate();
    };

    const HeadInputComp = ({index, content}) => {
        return (
            <Box
                margin={2}
                sx={{
                    display: "flex",
                    alignItems: "flex-end"
                }}
            >
                <Typography variant="h5" marginRight={2}>{parseInt(index) + 1}.</Typography>
                <TextField
                    fullWidth
                    variant="standard"
                    defaultValue={content}
                    onChange={(e) => {
                        const newarr = inputList;
                        newarr[index][0] = e.target.value;
                        setInputList(newarr);
                    }}
                />
                <Button onClick={() => handleAddHead()}>Add Headline</Button>
                <Button onClick={() => handleAddSub(index)}>Add Subheading</Button>
            </Box>
        );
    };

    const SubInputComp = ({headindex, subindex, content}) => {
        const alp = String.fromCharCode(subindex + 96);

        return (
            <Box
                margin={2}
                sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginLeft: "100px"
                }}
            >
                <Typography variant="h5" marginRight={2}>{alp}.</Typography>
                <TextField
                    fullWidth
                    variant="standard"
                    defaultValue={content}
                    onChange={(e) => {
                        const newarr = inputList;
                        newarr[headindex][subindex] = e.target.value;
                        setInputList(newarr);
                    }}
                />
                <Button onClick={(e) => handleAddSub(headindex)}>Add Line</Button>
            </Box>
        );
    };

    return(
        <Card>
            <PerfectScrollbar>
                {inputList.map((onedim, index) => {
                    return(
                        <Box key={uuid()}>
                            {onedim.map((content, subIndex) => {
                                return(
                                    <Box key={uuid()}>
                                        {subIndex === 0
                                            ? <HeadInputComp index={index} content={content} />
                                            : <SubInputComp headindex={index} subindex={subIndex} content={content} />
                                        }
                                    </Box>
                                )
                            })}
                        </Box>
                    )
                })}
            </PerfectScrollbar>
        </Card>
    );
};
