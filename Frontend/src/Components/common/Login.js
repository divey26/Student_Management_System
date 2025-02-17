import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Form, Alert, Card } from 'antd';  // Import Ant Design components
import { Link } from 'react-router-dom'; // Import Link component for navigation

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
                navigate('/sts');  // Redirect to student dashboard
            } else if (userNo.startsWith('TR')) {
                navigate('/students');  // Redirect to teacher dashboard
            } else if (userNo.startsWith('AD')) {
                navigate('/dash');
            }
        } catch (error) {
            console.error('Error logging in:', error); // Debugging line
            setError('Error logging in');  // Set error message
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>
            <Card title={<span style={{ color: 'white' }}>Login</span>} style={{ width: 350, padding: '20px', backgroundColor: "#004f9a", color: 'white' }}>
                <Form onSubmitCapture={handleLogin} layout="vertical">
                    {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '15px' }} />}
                    <Form.Item label={<span style={{ color: 'white' }}>User No</span>} name="userNo" required>
                        <Input
                            type="text"
                            placeholder="Enter your User No"
                            value={userNo}
                            onChange={(e) => setUserNo(e.target.value)}
                            style={{ color: 'white', backgroundColor: '#003366', borderColor: 'white' }}
                        />
                    </Form.Item>
                    <Form.Item label={<span style={{ color: 'white' }}>Password</span>} name="password" required>
                        <Input.Password
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ borderColor: 'white' }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block style={{ backgroundColor: "#ffc221", color: 'black' }}>
                            Login
                        </Button>
                    </Form.Item>
                    {/* Add Sign Up link */}
                    <Form.Item>
                         <Link to="/signup" style={{ color: '#ffc221', textAlign: 'center', display: 'block' }}>
                                 Don't have an account? <span style={{ color: 'white' }}>Sign Up</span>
                         </Link>
                </Form.Item>

                </Form>
            </Card>
        </div>
    );
};

export default Login;
