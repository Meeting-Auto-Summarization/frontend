import { Box, Typography, FormControl, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export const ReportTitleList = ({ report, selectedTitle, setSelectedTitle }) => {
    const [titleList, setTitleList] = useState([[]]);

    useEffect(() => {
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
    }, [report]);

    const HeadTitleComp = ({ index, content, disabled }) => {
        return (
            <FormControlLabel
                control={<Radio disabled={disabled}/>}
                value={`${index}.0`}
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

    const SubTitleComp = ({ headindex, subindex, content }) => {
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

    const handleChange = (e) => {
        const index = e.target.value.split('.');
        setSelectedTitle([parseInt(index[0]), parseInt(index[1])]);
    };

    return(
        <FormControl sx={{ width: '100%' }}>
            <RadioGroup
                name="range-seeting-radio-group"
                value={`${selectedTitle[0]}.${selectedTitle[1]}`||''}
                onChange={handleChange}
            >
                {titleList.map((onedim, index) => {
                    return(                                
                        <Box key={uuid()} sx={{width: '100%'}}>
                            {onedim.map((content, subIndex) => {
                                return(
                                    <Box key={uuid()}>
                                        {subIndex === 0
                                            ? <HeadTitleComp index={index} content={content} disabled={onedim.length > 1} />
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