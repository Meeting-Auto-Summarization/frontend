import { Box, Typography, FormControl, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

export const ReportTitleList = () => {
    const [titleList, setTitleList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/db/currentMeetingReport`, { withCredentials: true }).then(res => {
            const report = res.data;
            const tempTitleList = new Array(report.length);

            for (var i = 0; i < report.length; i++) {
                tempTitleList[i] = new Array(report[i].length);
            }

            for (var i = 0; i < tempTitleList.length; i++) {
                for (var j = 0; j < tempTitleList[i].length; j++) {
                    tempTitleList[i][j] = report[i][j].title;
                }
            }

            setTitleList(tempTitleList);
            console.log(tempTitleList);
        });
    }, []);

    const HeadTitleComp = ({index, content}) => {
        return (
            <FormControlLabel
                control={<Radio />}
                value={index}
                label={
                    <Typography
                        variant="h6"
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        {`${parseInt(index) + 1}. ${content}`}
                    </Typography>
                }
                sx={{
                    width: '100%'
                }}
            />
        );
    };

    const SubTitleComp = ({headindex, subindex, content}) => {
        const alp = String.fromCharCode(subindex + 96);

        return (
            <FormControlLabel
                control={<Radio />}
                value={`${headindex}.${subindex}`}
                label={
                    <Typography
                        variant="subtitle1"
                        sx={{
                            paddingRight: "40px",
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                            {`${alp}. ${content}`}
                    </Typography>
                }
                sx={{
                    width: "100%",
                    marginLeft: "40px"
                }}
            />
        );
    };

    return(
        <FormControl sx={{ width: '100%' }}>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                defaultValue={1}
                // onChange={handleChange}
            >
                {titleList.map((onedim, index) => {
                    return(                                
                        <Box key={uuid()} sx={{width: '100%'}}>
                            {onedim.map((content, subIndex) => {
                                return(
                                    <Box key={uuid()}>
                                        {subIndex === 0
                                            ? <HeadTitleComp index={index} content={content} />
                                            : <SubTitleComp headindex={index} subindex={subIndex} content={content} />
                                        }
                                    </Box>
                                )
                            })}
                        </Box>
                    )
                })}
            </RadioGroup>
        </FormControl>
    );
};