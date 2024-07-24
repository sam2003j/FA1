'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
    const [user, setUser] = useState(null);

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
                    console.error(error);
                }
            }
        };

        fetchProfile();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>ID: {user.id}</p>
            <p>Role: {user.role}</p>
        </div>
    );
}
