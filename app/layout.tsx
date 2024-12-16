'use client';
import { useAuth } from './context/AuthContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();

  return (
      <div>
        <button onClick={logout} style={{ margin: '10px' }}>
          Logout
        </button>
        {children}
      </div>
  );
}
