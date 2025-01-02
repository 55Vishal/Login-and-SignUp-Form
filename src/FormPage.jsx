import React, { useState } from 'react'

function FormPage() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <div className='container'>
            <div className="form-container">
                <div className="form-toggle">
                    <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
                    <button className={!isLogin? 'active' : '' } onClick={() => setIsLogin(false)}>SignUp</button>
                </div>
                {
                    isLogin ? <>
                    <div className='form'>
                    <h2>Login form</h2>
                    <input type="email" placeholder='Enter Email ' />
                    <input type="password" placeholder='Enter Password' />
                    <a href="#">Forgot password?</a>
                    <button>Login</button>
                    <p>Not a Member <a href='#' onClick={() => setIsLogin(false)}>SignUp Now</a></p>
                    </div>
                    </>
               :<>

               <div className='form'>
                    <h2>SignUp form</h2>
                    <input type="email" placeholder='Enter Email ' />
                    <input type="password" placeholder='Enter Password' />
                    <input type="password" placeholder='Confirm Password' />
                    <button>SignUp</button>
                    </div>
               </> }
            </div>
        </div>
    )
}

export default FormPage