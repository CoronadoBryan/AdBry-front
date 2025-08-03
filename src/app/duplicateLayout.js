
'use client'
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "@/components/shared/header/Header";
import NavigationManu from "@/components/shared/navigationMenu/NavigationMenu";
import SupportDetails from "@/components/supportDetails";
import useBootstrapUtils from "@/hooks/useBootstrapUtils"
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contentApi/AuthProvider';

export default function DuplicateLayout({ children }) {
    const pathName = usePathname();
    useBootstrapUtils(pathName);
    const { isAuthenticated, loading } = useContext(AuthContext);

    useEffect(() => {
        console.log('[DuplicateLayout] loading:', loading, 'isAuthenticated:', isAuthenticated);
    }, [loading, isAuthenticated]);

    if (loading) {
        console.log('[DuplicateLayout] Loading...');
        return null;
    }
    if (!isAuthenticated) {
        console.log('[DuplicateLayout] Usuario no autenticado, no se renderiza el layout');
        return null;
    }

    return (
        <>
            <Header />
            <NavigationManu />
            <main className="nxl-container">
                <div className="nxl-content">
                    {children}
                </div>
            </main>
            <SupportDetails />
        </>
    );
}
