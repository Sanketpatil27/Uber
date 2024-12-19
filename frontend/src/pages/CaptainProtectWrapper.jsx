import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';


function CaptainProtectWrapper({ children }) {
    const token = localStorage.getItem('token');
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [ isLoading, setIsLoading ] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
        }

        // check if its valid token for captain
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 200) {
                setCaptain(res.data.captain);
                setIsLoading(false);
            }
        }).catch(err => {
            localStorage.removeItem('token');
            navigate('/captain-login');
        })

    }, [token])


    if (isLoading) {
        return (
            <div> Loading... </div>
        )
    }

    return (
        <>
            {children}
        </>

    )

}

export default CaptainProtectWrapper