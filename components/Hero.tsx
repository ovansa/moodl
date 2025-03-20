import Button from './Button';
import Calendar from './Calendar';
import CallToAction from './CallToAction';
import { Fugaz_One } from 'next/font/google';
import Link from 'next/link';
import React from 'react';

const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export default function Hero() {
  return (
    <div className='py-4 md:py-10 flex flex-col gap-5 sm:gap-8'>
      <h1
        className={
          'text-5xl sm:text-6xl md:text-7xl text-center ' + fugaz.className
        }
      >
        <span className='textGradient'>Moodl </span>helps you track your{' '}
        <span className='textGradient'>daily</span> mood.
      </h1>
      <p className='text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[600px]'>
        Create your mood record and see how you feel{' '}
        <span className='font-semibold'>each day of the year.</span>
      </p>
      <CallToAction />
      <Calendar demo />
    </div>
  );
}
