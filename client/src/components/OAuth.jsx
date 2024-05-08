import React from 'react'
import { Button } from '@mui/material'
import { AiFillGoogleCircle } from "react-icons/ai";
import '../App.css'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const OAuth = ({ setAuthenticated }) => {
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            if (user) {
                await sendTokenToDatabase(user);
                setAuthenticated(true)
                navigate('/');
            } else {
                console.error('User data not received');
            }
        } catch (error) {
                console.error('Error signing in with Google:', error);
        }
    };

    const sendTokenToDatabase = async (user) => {
        try {
            
            await axios.post('http://localhost:3000/api/auth/google', { user });
            console.log('Token sent to the database successfully');
        } catch (error) {
            
            console.error('Error sending token to the database:', error);
        }
    };

  return (
    <Button onClick={handleGoogleClick} type='button' 
    className='google' color='secondary' 
    size='small' 
    variant='outlined'><AiFillGoogleCircle className='google-icon'/> Continue with Google</Button>
  )
}

export default OAuth