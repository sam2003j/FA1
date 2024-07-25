'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    id: string | number;
    role: string;
}

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const response = await axios.get('/api/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data.user);
                } catch (error) {
                    setError('Failed to fetch profile');
                } finally {
                    setLoading(false);
                }
            } else {
                setError('No token found');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!user) {
        return <div>No user data</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Profile</h1>
            <p>ID: {user.id}</p>
            <p>Role: {user.role}</p>
        </div>
    );
}
