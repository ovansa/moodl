'use client';

import React, { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';

import Calendar from './Calendar';
import { Fugaz_One } from 'next/font/google';
import Loading from './Loading';
import Login from './Login';
import { db } from '@/firebase';
import { useAuth } from '@/context/AuthContext';

const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export default function Dashboard() {
  const { currentUser, userDataObject, setUserDataObject, loading } = useAuth();
  const [data, setData] = useState({});

  // function countValues() {
  //   let total_number_of_days = 0;
  //   let sum_moods = 0;
  //   for (const year in data) {
  //     for (const month in data[year]) {
  //       for (const day in data[year][month]) {
  //         const days_mood = data[year][month][day];
  //         total_number_of_days++;
  //         sum_moods += days_mood;
  //       }
  //     }
  //   }
  //   return {
  //     num_days: total_number_of_days,
  //     average_mood: sum_moods / total_number_of_days,
  //   };
  // }

  async function handleSetMood(mood: string) {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      const newData = { ...userDataObject };
      if (!newData?.[year]) {
        newData[year] = {};
      }

      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }

      newData[year][month][day] = mood;

      setData(newData);
      setUserDataObject(newData);

      const docRef = doc(db, 'users', currentUser!.uid);
      await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (error) {
      console.log(
        'Error setting mood:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  const statuses: { [key: string]: string | number } = {
    num_days: 15,
    time_remaining: '13:12:23',
    date: new Date().toLocaleDateString(),
  };

  const moods: {
    [key in 'happy' | 'sad' | 'angry' | 'anxious' | 'neutral']: string;
  } = {
    happy: '😂',
    sad: '😔',
    angry: '😡',
    anxious: '😰',
    neutral: '😐',
  };

  useEffect(() => {
    if (!currentUser || !userDataObject) {
      return;
    }
    setData(userDataObject);
  }, [currentUser, userDataObject]);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className='flex flex-col flex-1 gap-8 sm:gap-10 md:gap-16'>
      <div className='grid grid-cols-1 sm:grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4'>
        {Object.keys(statuses).map((status, index) => {
          return (
            <div key={index} className='flex flex-col gap-1 sm:gap-2'>
              <p className='font-medium uppercase text-xs sm:text-sm'>
                {status.replaceAll('_', ' ')}
              </p>
              <p className={'text-base sm:text-lg ' + fugaz.className}>
                {statuses[status as keyof typeof statuses]}
              </p>
            </div>
          );
        })}
      </div>
      <h4
        className={
          'text-3xl sm:text-4xl md:text-5xl text-center ' + fugaz.className
        }
      >
        How do you <span className='textGradient'>feel</span> today?
      </h4>
      <div className='flex items-stretch flex-wrap gap-4'>
        {Object.keys(moods).map((mood, index) => {
          const moodKey = mood as
            | 'happy'
            | 'sad'
            | 'angry'
            | 'anxious'
            | 'neutral';
          return (
            <button
              onClick={() => {
                const currentMoodValue = index + 1;
                handleSetMood(currentMoodValue.toString());
              }}
              className={
                'p-4 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 flex flex-col items-center gap-2 flex-1'
              }
              key={index}
            >
              <p className='text-5xl sm:text-6xl md:text-7xl'>
                {' '}
                {moods[moodKey]}
              </p>
              <p className={'text-indigo-500 ' + fugaz.className}>{mood}</p>
            </button>
          );
        })}
      </div>
      <Calendar completeData={data} handleSetMood={handleSetMood} />
    </div>
  );
}
