import { useState, useEffect, useRef } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery, Dialog, DialogContent, DialogActions, Slider, TextField } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { Logo } from './logo';
import { NavItem } from './nav-item';

const items = [
    {
		href: '/meeting-list',
		icon: (<FormatListBulletedIcon fontSize="small" />),
		title: 'Meeting List'
	},
    {
		href: '/meeting',
		icon: (<FormatListBulletedIcon fontSize="small" />),
		title: 'Meeting'
	},
	{
		href: '/account',
		icon: (<UserIcon fontSize="small" />),
		title: 'Account'
	},
	{
		href: '/settings',
		icon: (<CogIcon fontSize="small" />),
		title: 'Settings'
	},
	{
		href: '/',
		icon: (<LockIcon fontSize="small" />),
		title: 'Logout'
	},
	{
		href: '/register',
		icon: (<UserAddIcon fontSize="small" />),
		title: 'Register'
	},
	{
		href: '/404',
		icon: (<XCircleIcon fontSize="small" />),
		title: 'Error'
	}
];

const marks = [
	{ value: 2, label: '2명' },
	{ value: 4, label: '4명' },
	{ value: 6, label: '6명' },
	{ value: 8, label: '8명' },
	{ value: 10, label: '10명' },
];

const CreateMeetingDialog = (props) => {
    const { onClose, open } = props;
    const meetingNameRef = useRef('');
    const [limitNum, setLimitNum] = useState(4);

    const handleClose = () => {
        const meetingName = meetingNameRef.current.value;
        onClose(meetingName, limitNum);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <Box m={1}>
                    <Typography>회의 제목</Typography>
                    <TextField
                        label="회의 제목"
                        variant="outlined"
                        sx={{ mt: '10px' }} 
                        inputRef={meetingNameRef} />
                </Box>
                <Box m={1}>
                    <Typography>인원 제한</Typography>
                    <Slider
                        defaultValue={4}
                        valueLabelDisplay="auto"
                        min={2}
                        max={10} 
                        marks={marks}
                        sx={{ mt: '10px' }}
                        onChangeCommitted={(e, val) => setLimitNum(val)} />
                </Box>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} onChange>회의 생성</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

const JoinMeetingDialog = (props) => {
    const { onClose, open } = props;
    const meetingCodeRef = useRef('');

    const handleClose = () => {
        const meetingCode = meetingCodeRef.current.value;
        onClose(meetingCode);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <Box m={1}>
                    <Typography>회의 코드</Typography>
                    <TextField
                        label="회의 코드"
                        variant="outlined"
                        sx={{ mt: '10px' }} 
                        inputRef={meetingCodeRef} />
                </Box>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} onChange>회의 참여</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export const DashboardSidebar = (props) => {
	const { open, onClose } = props;
	const router = useRouter();
	const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
		defaultMatches: true,
		noSsr: false
	});
    const [isOpenCreatePopup, setIsOpenCreatePopup] = useState(false);
    const [isOpenJoinPopup, setIsOpenJoinPopup] = useState(false);

    const handleOpenCreatePopup = () => {
        setIsOpenCreatePopup(true);
    };

    const handleCloseCreatePopup = (value1, value2) => {
        setIsOpenCreatePopup(false);
        console.log(value1 + value2);
    };

    const handleOpenJoinPopup = () => {
        setIsOpenJoinPopup(true);
    };

    const handleCloseJoinPopup = (value) => {
        setIsOpenJoinPopup(false);
        console.log(value);
    };

  	useEffect(() => {
			if (!router.isReady) {
				return;
			}

			if (open) {
				onClose?.();
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[router.asPath]
  	);

	const content = (
		<>
			<Box
				sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%'
				}}
			>
				<div>
					<Box sx={{ p: 3 }}>
						<NextLink
						href="/"
						passHref
						>
						<a>
							<Logo
							sx={{
								height: 42,
								width: 42
							}}
							/>
						</a>
						</NextLink>
					</Box>
					<Box sx={{ px: 2 }}>
						<Box
						sx={{
							alignItems: 'center',
							backgroundColor: 'rgba(255, 255, 255, 0.04)',
							cursor: 'pointer',
							display: 'flex',
							justifyContent: 'space-between',
							px: 3,
							py: '11px',
							borderRadius: 1
						}}
						>
                            <Button variant="contained" onClick={handleOpenCreatePopup}>
                                회의 생성
                            </Button>
                            <Button variant="contained" onClick={handleOpenJoinPopup} >
                                회의 참여
                            </Button>
                            <CreateMeetingDialog
                                open={isOpenCreatePopup}
                                onClose={handleCloseCreatePopup}
                            />
                            <JoinMeetingDialog
                                open={isOpenJoinPopup}
                                onClose={handleCloseJoinPopup}
                            />
						</Box>
					</Box>
				</div>
				<Divider
				sx={{
					borderColor: '#2D3748',
					my: 3
				}}
				/>
				<Box sx={{ flexGrow: 1 }}>
				{items.map((item) => (
					<NavItem
					key={item.title}
					icon={item.icon}
					href={item.href}
					title={item.title}
					/>
				))}
				</Box>
			</Box>
		</>
	);

	if (lgUp) {
		return (
		<Drawer
			anchor="left"
			open
			PaperProps={{
			sx: {
				backgroundColor: 'neutral.900',
				color: '#FFFFFF',
				width: 280
			}
			}}
			variant="permanent"
		>
			{content}
		</Drawer>
		);
  	}

	return (
		<Drawer
			anchor="left"
			onClose={onClose}
			open={open}
			PaperProps={{
				sx: {
				backgroundColor: 'neutral.900',
				color: '#FFFFFF',
				width: 280
				}
			}}
			sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
			variant="temporary"
		>
		{content}
		</Drawer>
	);
};

DashboardSidebar.propTypes = {
  	onClose: PropTypes.func,
  	open: PropTypes.bool
};
