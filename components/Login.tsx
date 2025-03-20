'use client';

import React, { useState } from 'react';

import Button from './Button';
import { Fugaz_One } from 'next/font/google';
import { useAuth } from '@/context/AuthContext';

const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const { signup, login } = useAuth();

  async function handleSubmit() {
    try {
      if (!email || !password || !password) {
        return;
      }

      setAuthenticating(true);

      if (isRegister) {
        console.log('Registering...');
        await signup(email, password);
      } else {
        console.log('Logging in...');
        await login(email, password);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + fugaz.className}>
        {isRegister ? 'Register' : 'Login'}
      </h3>
      <p>You&#39;re one step away!</p>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none'
        type='text'
        placeholder='Email'
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none'
        type='text'
        placeholder='Password'
      />
      <div className='max-w-[400px] w-full mx-auto'>
        <Button
          clickHandler={handleSubmit}
          text={authenticating ? 'Submitting...' : 'Submit'}
          full
        />
      </div>
      <p className='text-center'>
        {isRegister
          ? 'Already have an account? '
          : 'Don&#39;t have an account? '}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className='text-indigo-600'
        >
          {isRegister ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
}
