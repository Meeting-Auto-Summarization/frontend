import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Card,
    Button,
    TextField,
    Typography
} from '@mui/material';
import { useState } from 'react';

export const ReportFormSetting = () => {
    const [headList, setHeadList] = useState([0]);
    const [subList, setSubList] = useState([[]]);

    const handleAddHead = () => {
        const newHeadList = headList.concat(headList.length)
        setHeadList(newHeadList);

        let newSubList = subList;
        newSubList[headList.length] = new Array();
        setSubList(newSubList);
    };

    const handleAddSub = (headNum) => {
        const subListItem = subList[headNum];
        
        if (subListItem.length === 0) {
            subListItem.push('a');
        } else {
            const newIndex = String.fromCharCode(subListItem[subListItem.length - 1].charCodeAt() + 1)
            subListItem.push(newIndex);
        }

        let newSubList = subList;
        newSubList[headNum] = subListItem;
        setSubList(newSubList);
    };

    const HeadInputComp = ({index}) => {
        return (
            <Box
                margin={2}
                sx={{
                    display: "flex",
                    alignItems: "flex-end"
                }}
            >
                <Typography variant="h5" marginRight={2}>{index + 1}.</Typography>
                <TextField fullWidth variant="standard"></TextField>
                <Button onClick={() => handleAddHead()}>Add Headline</Button>
                <Button onClick={(e) => handleAddSub(index)}>Add Subheading</Button>
            </Box>
        );
    };

    const SubInputComp = ({headindex, subindex}) => {
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginLeft: "100px"
                }}
            >
                <Typography variant="h5" marginRight={2}>{subindex}.</Typography>
                <TextField fullWidth variant="standard"></TextField>
                <Button onClick={(e) => handleAddSub(headindex)}>Add Line</Button>
            </Box>
        );
    };

    return (
        <Card>
            <PerfectScrollbar>
                {headList.map((num) => {
                    return(
                        <Box key={num}>
                            <HeadInputComp index={num} />
                            {subList[num].map((subNum) => {
                                return(
                                    <SubInputComp
                                        key={subNum}
                                        headindex={num}
                                        subindex={subNum} />
                                )
                            })}
                        </Box>
                    );
                })}
            </PerfectScrollbar>
        </Card>
    );
};
