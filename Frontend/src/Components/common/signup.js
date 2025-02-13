import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [userNo, setUserNo] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error

        // Basic form validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // Sending sign-up request to the backend
            const response = await axios.post('http://localhost:5000/api/signup', {
                userNo,
                name,
                password
            });
            console.log('Sign up successful:', response.data);
            navigate('/login');  // Redirect to login page after successful signup
        } catch (err) {
            setError('Error signing up. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div>
                    <label htmlFor="userNo">User No</label>
                    <input 
                        type="text" 
                        id="userNo" 
                        value={userNo} 
                        onChange={(e) => setUserNo(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>

                {error && <div className="error">{error}</div>}

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
