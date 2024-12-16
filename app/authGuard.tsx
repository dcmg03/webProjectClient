'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        if (!username) {
            router.push('/login'); // Redirige al login si no hay sesión
        }
    }, [router]);

    return <>{children}</>;
};

export default AuthGuard;
