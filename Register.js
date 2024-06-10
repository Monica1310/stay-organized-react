import { useState } from 'react';
import './NewUser.css';

function Register() {
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const validateForm = () => {
        const usernamePattern = /^[a-zA-Z0-9]+$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=]).{8,}$/;

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return false;
        }

        if (userName.length < 6 || !usernamePattern.test(userName)) {
            setMessage('Username must be at least 6 characters long and contain only letters and numbers.');
            return false;
        }

        if (!passwordPattern.test(password)) {
            setMessage('Password must be at least 8 characters long and contain at least one letter, one number, one capital letter, and one special character.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const newUser = {
            name: fullName,
            username: userName,
            password: password,
        };
        console.log(newUser);
        try {
            const response = await fetch('http://localhost:8083/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                setMessage('User registered successfully.');
                setFullName('');
                setUserName('');
                setPassword('');
                setConfirmPassword('');
            } else {
                setMessage('Error registering user.');
            }
        } catch (error) {
            setMessage('Error registering user.');
        }
    };

    return (
        <>
            <div className="container">
                <h1 className="text-center my-4">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group text-left">
                        <label htmlFor="fullname">Full Name* :</label>
                        <input
                            type="text"
                            id="FullName"
                            className="form-control"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="UserName">User Name* :</label>
                        <input
                            type="text"
                            id="UserName"
                            className="form-control"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                        <ul>
                            <li>Your password must be 6 characters long.</li>
                            <li>Your Username must have both letters and numbers.</li>
                            <li>Username should not have any special characters.</li>
                        </ul>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="password">Password* :</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <ul>
                            <li>Your password must be at least 8 characters long.</li>
                            <li>Your Password must contain at least one of the below following lists</li>
                            <ol>
                                <li>Letters (a-z)</li>
                                <li>Numbers (0-9)</li>
                                <li>Capital Letters (A-Z)</li>
                                <li>Special Characters (!@#$%^&*()_+=)</li>
                            </ol>
                        </ul>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="ConfirmPassword">Confirm Password* :</label>
                        <input
                            type="password"
                            id="ConfirmPassword"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" id="userForm">Register</button>
                </form>
                <div id="message" className="text-center my-4">
                    {message}
                </div>
            </div>
        </>
    );
}

export default Register;
