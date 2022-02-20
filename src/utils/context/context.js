<<<<<<< HEAD
import { createContext, useState, useMemo, useEffect } from 'react';
=======
import { createContext, useState, useMemo,useEffect} from 'react';
>>>>>>> 476d557142ba4cdc68d1f2452ca1814a62d2419e
import axios from "axios"

export const UserContext = createContext({});

const UserContextProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState(true);
    const [userEmail, setUserEmail] = useState();
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
<<<<<<< HEAD

    const getLoginInfo = () => {
        axios.get('http://localhost:3001/auth', { withCredentials: true }).then(response => {
            setIsLogin(response.data != '');

            if (response.data == '') {
                return;
            }

            console.log(response)
            setUserNick(response.data.name);
            setUserFirstName(response.data.firstName);
            setUserLastName(response.data.lastName);
            setUserEmail(response.data.email);
            setUserAvatar(response.data.avatar);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getLoginInfo() 
        console.log("rendering");
    }, [])

    useEffect(() => {
        console.log("isLogin")
        console.log(isLogin);
    }, [isLogin])

    return(
=======
    const getLoginInfo=()=>{
        axios.get('http://localhost:3001/auth',{withCredentials:true}).then(response=>{
            console.log(isLogin);
            if(response.data===false){
                setIsLogin(false);
            }
            else{
                setIsLogin(response.data);
                console.log(response)
                setUserNick(response.data.name);
                setUserFirstName(response.data.firstName);
                setUserLastName(response.data.lastName);
                setUserEmail(response.data.email);
                setUserAvatar(response.data.avatar);
            }
        }).catch(err=>{
            console.log(err);
        });
    }
    useEffect(()=>{
        getLoginInfo() 
    },[])
    return (
>>>>>>> 476d557142ba4cdc68d1f2452ca1814a62d2419e
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;