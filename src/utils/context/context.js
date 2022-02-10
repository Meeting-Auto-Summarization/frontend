import { createContext, useState, useMemo } from 'react';

export const UserContext = createContext({});

const UserContextProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const [userNick, setUserNick] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [isMeeting, setIsMeeting] = useState(false);
    const [meetingID, setMeetingID] = useState('');

    const value = useMemo(() => ({
        isLogin, setIsLogin,
        userEmail, setUserEmail,
        userNick, setUserNick,
        userFirstName, setUserFirstName,
        userLastName, setUserLastName,
        userAvatar, setUserAvatar,
        isMeeting, setIsMeeting,
        meetingID, setMeetingID
    }),
    [
        isLogin, setIsLogin,
        userEmail, setUserEmail,
        userNick, setUserNick,
        userFirstName, setUserFirstName,
        userLastName, setUserLastName,
        isMeeting, setIsMeeting,
        userAvatar, setUserAvatar,
        meetingID, setMeetingID
    ]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;