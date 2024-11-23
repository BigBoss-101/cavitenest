"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '../hooks/userRole';
import AdminSidebar from './components/Submenu/AdminSidebar';
import Loading from '../loading';
import { useSession } from 'next-auth/react';

const AdminPage = () => {
    const router = useRouter();
    const { role, isAdmin } = useRole(); // Destructure role-related properties
    const { data: session, status } = useSession(); // Access the session data and status

    useEffect(() => {
        if (status === 'loading') return; // Wait for session to load

        if (!session?.user) {
            // Redirect to login if no user session
            router.push('/'); 
            return;
        }

        if (!isAdmin) {
            // Redirect non-admin users
            router.push('/');
        } else {
            router.push('/admin/dashboard');
        }
    }, [isAdmin, router, session, status]);

    // Show loading screen while session or role is being verified
    if (status === 'loading' || !isAdmin) {
        return <Loading />;
    }

    return (
        <div>
            <AdminSidebar />
            {/* Your Admin Page Content */}
        </div>
    );
};

export default AdminPage;
