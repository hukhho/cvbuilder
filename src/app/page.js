'use client';

import React from 'react';
import Image from 'next/image';
import { Button, Card, ConfigProvider } from 'antd';
import UserLayout from './components/Layout/UserLayout';
import Header from './components/Header';
import CVCard from './components/Card/CVCard';
import UserHeader from './components/UserHeader';

const { Meta } = Card;

const Home = () => {
  return (
    <main>
      <ConfigProvider>
        <UserLayout userHeader={<UserHeader />} content={<CVCard />} />
      </ConfigProvider>
    </main>
  );
};

export default Home;
