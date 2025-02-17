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
            navigate('/');  // Redirect to login page after successful signup
        } catch (err) {
            setError('Error signing up. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <Card title={<span style={{ color: 'white' }}>Sign Up</span>} style={styles.card}>
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
                        label={<span style={{ color: 'white' }}>User No</span>}
                        name="userNo"
                        rules={[{ required: true, message: 'Please input your User No!' }]}
                    >
                        <Input 
                            value={userNo}
                            onChange={(e) => setUserNo(e.target.value)}
                            style={styles.input}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ color: 'white' }}>Name</span>}
                        name="name"
                        rules={[{ required: true, message: 'Please input your Name!' }]}
                    >
                        <Input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={styles.input}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ color: 'white' }}>Password</span>}
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ color: 'white' }}>Confirm Password</span>}
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Please confirm your Password!' }]}
                    >
                        <Input.Password
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={styles.input}
                        />
                    </Form.Item>

                    {error && <Alert message={error} type="error" />}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block style={styles.button}>
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
        backgroundColor: '#004f9a',
        color: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
    },
    input: {
        color: 'black',
        backgroundColor: 'white',
        borderColor: 'white'
    },
    button: {
        backgroundColor: '#ffc221',
        color: 'black',
    }
};

export default SignUp;
