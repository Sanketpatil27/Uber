import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'


function UserProtectWrapper({ children }) {
    const { user, setUser } = useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if(!token) {
            navigate('/login');
        }
   
        // check if its valid token for user
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if(res.status === 200) {
                setUser(res.user);
                setIsLoading(false);
            }
        }).catch(err => {
            localStorage.removeItem('token');
            navigate('/login');
        })

    }, [token])


    return (
        <>
            { children }
        </>
    )

}

export default UserProtectWrapper