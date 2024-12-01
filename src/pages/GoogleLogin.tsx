import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleLogin: React.FC = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/user/google/login', {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                alert('Successfully logged in with Google!');
                navigate('/'); // Redirect to homepage
            } else {
                alert('Google Login Failed');
            }
        } catch (error) {
            console.error('Error during Google login:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="text-center">
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
};

export default GoogleLogin;
