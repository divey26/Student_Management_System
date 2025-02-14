import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert, Card } from 'antd';

const SignUp = () => {
    const [userNo, setUserNo] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (values) => {
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
        <div style={styles.container}>
            <Card style={styles.card}>
                <h2>Sign Up</h2>
                <Form
                    onFinish={handleSignUp}
                    layout="vertical"
                    initialValues={{
                        userNo: '',
                        name: '',
                        password: '',
                        confirmPassword: ''
                    }}
                >
                    <Form.Item
                        label="User No"
                        name="userNo"
                        rules={[{ required: true, message: 'Please input your User No!' }]}
                    >
                        <Input 
                            value={userNo}
                            onChange={(e) => setUserNo(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your Name!' }]}
                    >
                        <Input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Please confirm your Password!' }]}
                    >
                        <Input.Password
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Item>

                    {error && <Alert message={error} type="error" />}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5'
    },
    card: {
        width: '400px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
    }
};

export default SignUp;
