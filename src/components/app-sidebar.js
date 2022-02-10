import { useState, useEffect, useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
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
import { JoinMeetingDialog } from './app-sidebar/join-meeting-dialog';
import { OngoingDialog } from './app-sidebar/ongoing-dialog';
import { v4 as uuid } from 'uuid';
import { meetings } from '../__mocks__/meetings';

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

export const AppSidebar = (props) => {
	const { open, onClose } = props;
	const router = useRouter();
	const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
		defaultMatches: true,
		noSsr: false
	});
    const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
    const [isOpenJoinDialog, setIsOpenJoinDialog] = useState(false);
	const [isOpenOngoingDialog, setIsOpenOngoingDialog] = useState(false);
	const { userNick, isMeeting, setIsMeeting, setMeetingID } = useContext(UserContext);

    const handleOpenCreateDialog = () => {
        setIsOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
		setIsOpenCreateDialog(false);
    };

	const handleSubmitCreateDialog = (meetingName, limitNum) => {
		// const mid = uuid();
		const mid = '고건준';

		let now = new Date();
		const date = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDay()}`;

		meetings.push({
			id: mid,
			meetingName: meetingName,
			members: [userNick],
			date: date,
			time: '00:00',
		})

		setMeetingID(mid);
		setIsMeeting(true);
    };

    const handleOpenJoinDialog = () => {
        setIsOpenJoinDialog(true);
    };
	
    const handleCloseJoinDialog = (value) => {
        setIsOpenJoinDialog(false);
    };

	const handleSubmitJoinDialog = (value) => {
		console.log(value);
	};

	const handleOpenOngoingDialog = () => {
        setIsOpenOngoingDialog(true);
    };

    const handleCloseOngoingDialog = () => {
        setIsOpenOngoingDialog(false);
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
                            <Button variant="contained" onClick={ !isMeeting ? handleOpenCreateDialog : handleOpenOngoingDialog } sx={{ mr: 1 }}>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '0.8vw'}}>회의 생성</Typography>
                            </Button>
                            <Button variant="contained" onClick={ !isMeeting ? handleOpenJoinDialog : handleOpenOngoingDialog }>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '0.8vw'}}>회의 생성</Typography>
                            </Button>
                            <CreateMeetingDialog
                                open={isOpenCreateDialog}
                                onClose={handleCloseCreateDialog}
								onSubmit={handleSubmitCreateDialog}
                            />
							<JoinMeetingDialog
								open={isOpenJoinDialog}
								onClose={handleCloseJoinDialog}
								onSubmit={handleSubmitJoinDialog}
							/>
							<OngoingDialog
								open={isOpenOngoingDialog}
								onClose={handleCloseOngoingDialog}
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
				{ isMeeting && <MeetingAccess /> }
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
