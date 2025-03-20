'use client';

import Button from './Button';
import Link from 'next/link';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Logout() {
  const { logout, currentUser } = useAuth();
  const pathname = usePathname();

  if (!currentUser) {
    return null;
  }

  if (pathname === '/') {
    return (
      <Link href={'/dashboard'}>
        <Button text='Go to dashboard' />
      </Link>
    );
  }

  return <Button text='Logout' clickHandler={logout} />;
}
