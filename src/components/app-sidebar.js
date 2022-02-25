import { useState, useEffect, useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Grid, Typography, useMediaQuery } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { UserContext } from '../utils/context/context';
import { MeetingAccess } from './app-sidebar/meeting-access';
import { CreateMeetingDialog } from './app-sidebar/create-meeting-dialog';
import { MeetingCodeDialog } from './app-sidebar/meeting-code-dialog';
import { JoinMeetingDialog } from './app-sidebar/join-meeting-dialog';
import { OngoingDialog } from './app-sidebar/ongoing-dialog';
import axios from "axios";

const items = [
    {
		href: '/meeting-list',
		icon: (<FormatListBulletedIcon fontSize="small" />),
		title: 'Meeting List'
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
		href: 'http://localhost:3001/auth/logout',
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

export const AppSidebar = (props) => {
	const { open, onClose } = props;
	const router = useRouter();
	const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
		defaultMatches: true,
		noSsr: false
	});
	
    const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
    const [isOpenCodeDialog, setIsOpenCodeDialog] = useState(false);
    const [isOpenJoinDialog, setIsOpenJoinDialog] = useState(false);
	const [isOpenOngoingDialog, setIsOpenOngoingDialog] = useState(false);

	const [meetingCode, setMeetingCode] = useState('');
	const [isMeeting, setIsMeeting] = useState(false);
	const { userNick } = useContext(UserContext);

	const handleSubmitCreateDialog = (title, limitNum) => {
		const code = Math.random().toString(36).substr(2,6);
		setMeetingCode(code);
		console.log(code);
		
		axios.post('http://localhost:3001/db/createMeeting', {
			title: title,
			members: [userNick],
			hostId: userNick,
			code: code,
			capacity: limitNum,
		}, { withCredentials: true }).then(res => {
			// 회의 생성완료후 할 작업 

		});

		setIsOpenCodeDialog(true);
    };

	const handleSubmitJoinDialog = (code) => {
		axios.get(`http://localhost:3001/db/joinMeeting/${code}`, { withCredentials: true }).then(res => {
        	if (res.data) {
				window.open('/meeting-progress');
			} else {
				alert('존재하지 않는 코드입니다.')
			}
      	});
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

	useEffect(() => {
		axios.get(`http://localhost:3001/db/isMeeting`, { withCredentials: true }).then(res => {
			console.log(res.data);
			setIsMeeting(res.data);
		});
	});

	if (typeof window !== "undefined") {
		window.goSummaryStep = function goSummaryStep() {
			router.push({ path: '/script-edit', replace: true });
		};
	}

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
							<Grid
								container
								spacing={1}
							>
								<Grid
									item
									xs={12}
									sm={12}
									md={6}
								>
									<Button
									 	variant="contained"
										onClick={ !isMeeting
											? () => setIsOpenCreateDialog(true)
											: () => setIsOpenOngoingDialog(true)
										}
										fullWidth
									>
										<Typography fontSize="100%" sx={{ fontWeight: 'bold' }}>회의 생성</Typography>
									</Button>
								</Grid>
								<Grid
									item
									xs={12}
									sm={12}
									md={6}
								>
									<Button
										variant="contained"
										onClick={ !isMeeting
											? () => setIsOpenJoinDialog(true)
											: () => setIsOpenOngoingDialog(true)
										}
										fullWidth
									>
										<Typography fontSize="100%" sx={{ fontWeight: 'bold'}}>회의 참여</Typography>
									</Button>
								</Grid>
							</Grid>
                            <CreateMeetingDialog
                                open={isOpenCreateDialog}
                                onClose={ () => setIsOpenCreateDialog(false) }
								onSubmit={handleSubmitCreateDialog}
                            />
                            <MeetingCodeDialog
                                open={isOpenCodeDialog}
								code={meetingCode}
                                onClose={ () => setIsOpenCodeDialog(false) }
                            />
							<JoinMeetingDialog
								open={isOpenJoinDialog}
								onClose={ () => setIsOpenJoinDialog(false) }
								onSubmit={handleSubmitJoinDialog}
							/>
							<OngoingDialog
								open={isOpenOngoingDialog}
								onClose={ () => setIsOpenOngoingDialog(false) }
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
				<Divider sx={{ borderColor: '#2D3748' }} />
				{ isMeeting &&
					<MeetingAccess
						callback={() => {
							window.open('/meeting-progress');
						}}
					/>
				}
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

AppSidebar.propTypes = {
  	onClose: PropTypes.func,
  	open: PropTypes.bool
};
