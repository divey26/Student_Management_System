import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Form, Alert } from 'antd';  // Import Ant Design components

const Login = () => {
    const [userNo, setUserNo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Attempting login with:', { userNo, password }); // Debugging line

        try {
            const { data } = await axios.post('http://localhost:5000/api/login', { userNo, password });
            console.log('Login successful:', data); // Debugging line

            localStorage.setItem('token', data.token);
            localStorage.setItem('userNo', userNo);  // Save userNo to determine user type

            if (userNo.startsWith('S')) {
                navigate('/');  // Redirect to student dashboard
            } else if (userNo.startsWith('TR')) {
                navigate('/st');  // Redirect to teacher dashboard
            }
        } catch (error) {
            console.error('Error logging in:', error); // Debugging line
            setError('Error logging in');  // Set error message
        }
    };

    return (
        <div style={{ width: '300px', margin: '0 auto', padding: '20px' }}>
            <Form onSubmitCapture={handleLogin} layout="vertical">
                {error && <Alert message={error} type="error" showIcon />}
                <Form.Item label="User No" name="userNo" required>
                    <Input
                        type="text"
                        placeholder="Enter your User No"
                        value={userNo}
                        onChange={(e) => setUserNo(e.target.value)}
                    />
                </Form.Item>
                <Form.Item label="Password" name="password" required>
                    <Input.Password
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
