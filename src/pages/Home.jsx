import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../util';
import {ToastContainer} from 'react-toastify';
const Home = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        if (!user) {
            navigate('/login');
            return;
        }
        setLoggedInUser(user);
    }, [navigate]);

    const handleLogout=(e)=>{
          localStorage.removeItem('token');
          localStorage.removeItem('loggedInUser');
          handleSuccess('User Loggedout');
          setTimeout(()=>{
              navigate('/login');
          },1000)

    }

    return (
        <div className="home-container">
            
                <h2>Welcome, {loggedInUser}!</h2>
                <button 
                      onClick={handleLogout}
                >
                    Logout
                </button>
     
           <ToastContainer/>

        </div>
    )
}

export default Home;