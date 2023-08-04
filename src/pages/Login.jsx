import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await logIn(email, password)
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  };

  return (
    <>
      <div className='w-full h-screen'>
        <img
          className='hidden sm:block absolute w-full h-full object-cover'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
          alt='/'
        />
        <div className='fixed bg-black/60 top-0 left-0 w-full h-screen'></div>
        <div className='fixed w-full px-4 py-[200px] z-50'>
          <div className='max-w-[450px] h-[500px] mx-auto bg-black/75 text-white'>
            <div className='max-w-[320px] mx-auto py-16'>
              <h1 className='text-3xl font-bold'>Sign In</h1>
              {error ? <p className='mt-3 p-1 bg-red-800'>{error}</p> : null}
              <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                <input 
                  onChange={(e) => setEmail(e.target.value)}
                  className='p-3 my-1 bg-gray-900 rounded' 
                  type='email' 
                  placeholder='Email' 
                  autoComplete='email' 
                />
                <input 
                  onChange={(e) => setPassword(e.target.value)}
                  className='p-3 my-2 bg-gray-900 rounded' 
                  type='password' 
                  placeholder='Password' 
                  autoComplete='current-passwoord' 
                />
                <button className='bg-red-600 py-3 my-6 rounded'>Sign In</button>
                <div className='flex justify-between items-center text-sm text-gray-500'>
                  <p><input className='mr-2' type="checkbox" />Remember me</p>
                  <p>Need Help?</p>
                </div>
                <p className='py-6'>
                  <span className='text-gray-500'>
                    Don't have account to Netflix?
                  </span>{' '}
                  <Link to='/signup'>Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
