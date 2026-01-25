'use client';
import React from 'react';
import LandingPage from '../components/LandingPage';
import { useRouter } from '../App';

export default function Page() {
  const router = useRouter();
  
  return <LandingPage onSelect={(route) => {
    if (route === 'login') router.push('/login');
    if (route === 'admin') router.push('/admin');
  }} />;
}