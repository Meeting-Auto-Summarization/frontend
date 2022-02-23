import { createContext, useState, useMemo, useEffect } from 'react';
import axios from "axios"

export const UserContext = createContext({});

const UserContextProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState(true);
    const [userEmail, setUserEmail] = useState();
    const [userNick, setUserNick] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userAvatar, setUserAvatar] = useState('');

    const value = useMemo(() => ({
        isLogin, setIsLogin,
        userEmail, setUserEmail,
        userNick, setUserNick,
        userFirstName, setUserFirstName,
        userLastName, setUserLastName,
        userAvatar, setUserAvatar,
    }),
    [
        isLogin, setIsLogin,
        userEmail, setUserEmail,
        userNick, setUserNick,
        userFirstName, setUserFirstName,
        userLastName, setUserLastName,
        userAvatar, setUserAvatar,
    ]);

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
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;