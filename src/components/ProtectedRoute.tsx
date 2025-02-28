import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthService } from '../services/api/auth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    console.log(localStorage.getItem('user'));
    const user = localStorage.getItem('user'); // Use correct case
    if (!user) { 
      router.push('/signin');
      return;
    }
  }, [router]);

  return authorized ? <>{children}</> : null;
};

export default ProtectedRoute; 