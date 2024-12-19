import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function CaptainLogout() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if(res.status === 200) {
                localStorage.removeItem('token');
                navigate('/captain-login');
            }
        })
        
    }, [token])

    return (
        <div>CaptainLogout</div>
    )
}

export default CaptainLogout