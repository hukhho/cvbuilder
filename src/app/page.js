'use client';

import React from 'react';
import Image from 'next/image';
import UserLayout from './components/Layout/UserLayout';
import { ConfigProvider } from 'antd';
import { Button, Card } from 'antd';
const { Meta } = Card;
import Header from './components/Header';
import CVCard from './components/Card/CVCard';
import UserHeader from './components/UserHeader';

const Home = () => {
    return (
        <main >
            <ConfigProvider>
                <UserLayout 
                    userHeader={<UserHeader />}
                    content={<CVCard />
                } />
            </ConfigProvider>
        </main>

    );
};

export default Home;
