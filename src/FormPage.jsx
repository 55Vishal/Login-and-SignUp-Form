import React, { useState, useEffect } from 'react'

function FormPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        validateForm();
    }, [email, password, confirmPassword]);

    const validateForm = () => {
        let errors = {};

        // Email validation
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Invalid email format';
        }

        // Password validation
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        // Confirm password validation (for signup only)
        if (!isLogin && password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (isLogin) {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser && storedUser.email === email && storedUser.password === password) {
                    alert('Successful Logged in');
                    document.body.innerHTML = ''; // Show blank page
                } else {
                    alert('Invalid email or password');
                }
            } else {
                localStorage.setItem('user', JSON.stringify({ email, password }));
                alert('SignUp Successful!');
                setIsLogin(true);
            }
        }
    };

    return (
        <div className='container'>
            <div className="form-container">
                <div className="form-toggle">
                    <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
                    <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>SignUp</button>
                </div>
                {
                    isLogin ? (
                        <form className='form' onSubmit={handleSubmit}>
                            <h2>Login form</h2>
                            <input 
                                type="email" 
                                placeholder='Enter Email ' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <p className='error'>{errors.email}</p>}
                            <input 
                                type="password" 
                                placeholder='Enter Password' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <p className='error'>{errors.password}</p>}
                            <a href="#">Forgot password?</a>
                            <button type="submit">Login</button>
                            <p>Not a Member <a href='#' onClick={() => setIsLogin(false)}>SignUp Now</a></p>
                        </form>
                    ) : (
                        <form className='form' onSubmit={handleSubmit}>
                            <h2>SignUp form</h2>
                            <input 
                                type="email" 
                                placeholder='Enter Email ' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <p className='error'>{errors.email}</p>}
                            <input 
                                type="password" 
                                placeholder='Enter Password' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <p className='error'>{errors.password}</p>}
                            <input 
                                type="password" 
                                placeholder='Confirm Password' 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
                            <button type="submit">SignUp</button>
                        </form>
                    )
                }
            </div>
        </div>
    )
}

export default FormPage;
