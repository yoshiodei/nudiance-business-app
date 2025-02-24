'use client'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RootState } from '@/redux/store';
import { showToast } from '../utils/showToast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { company } = useSelector((state: RootState) => state.company);

  useEffect(() => {
    if (!company.uid) {
      showToast('Login to access page','error');  
      router.push('/login');
    }
  }, [company, router]);

  // Render children only if logged in
  if (!company.uid) {
    return null; // Or add a loader/spinner
  }

  return <>{children}</>;
}