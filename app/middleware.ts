import { NextResponse } from 'next/server';

export async function middleware(req: Request) {
    const token = req.cookies.get('token');

    if (!token) {
        const url = new URL('/login', req.url); // Redirige al login si no hay token
        return NextResponse.redirect(url);
    }

    // Validar el token si es necesario (opcional, se puede validar en el backend)
    return NextResponse.next();
}

export const config = {
    matcher: ['/rubros/:path*', '/nuevo-rubro/:path*'], // Rutas protegidas
};
