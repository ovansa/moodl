import React from 'react';

export default function Main(
  props: Readonly<{
    children?: React.ReactNode;
    className?: string;
  }>
) {
  const { children, className } = props;
  return <main className='flex-1 flex flex-col p-4 sm:p-8'>{children}</main>;
}
