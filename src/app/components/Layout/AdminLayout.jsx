/* eslint-disable */

import React, { useEffect, useState } from 'react';
import UserHeader from '../UserHeader';
import CreateResume from '../Modal/CreateResume';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  FileDoneOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, ConfigProvider, Layout, Menu, Space, theme, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoins,
  faFile,
  faFileAlt,
  faFileCircleCheck,
  faFileClipboard,
  faSignOut,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import './sidebar.css';
import AiToken from './AIToken';
import dynamic from 'next/dynamic';

import { useAuth0 } from '@/lib/Auth0';
import { getProtectedResource } from '@/app/services/message.service';
import AuthenticationGuard from '@/app/components/AuthenticationGuard';
import { parse, serialize } from 'cookie';
import Image from 'next/image';
import AuthLayout from './AuthLayout';
import useStore from '@/store/store';
// Dynamically import CanvasGradient with ssr: false
const CanvasGradient = dynamic(() => import('../../testlayout/CanvasGradient'), {
  ssr: false,
});

const { Title, Paragraph, Text } = Typography;

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: '1',
    icon: (
      <FontAwesomeIcon
        icon={faFile}
        style={{ fontSize: '16.8px', background: 'transparent', fill: '#ffffff' }}
      />
    ),
    label: (
      <Link href="/admin/dashboard">
        <span style={{ color: '#ffffff', fontSize: 11 }}>Dashboard</span>
      </Link>
    ),
    roles: ['ADMIN'], // Define roles that can access this item
  },
  {
    key: '2',
    icon: (
      <FontAwesomeIcon
        icon={faFileAlt}
        style={{ fontSize: '16.8px', background: 'transparent', fill: '#fff' }}
      />
    ), // fad fa-file
    label: (
      <Link href="/admin/users">
        <span style={{ color: '#ffffff', fontSize: 11 }}>Manage users</span>
      </Link>
    ),
    roles: ['ADMIN'], // Define roles that can access this item
  },
  {
    key: '3',
    icon: (
      <FontAwesomeIcon
        icon={faFileAlt}
        style={{ fontSize: '16.8px', background: 'transparent', fill: '#fff' }}
      />
    ), // fad fa-file
    label: (
      <Link href="/admin/job-postings">
        <span style={{ color: '#ffffff', fontSize: 11 }}>Manage job posting</span>
      </Link>
    ),
    roles: ['ADMIN'], // Define roles that can access this item
  },
  {
    key: '4',
    icon: <FileDoneOutlined />, // fad fa-file
    label: (
      <Link href="/admin/withdraws">
        <span style={{ color: '#ffffff', fontSize: 11 }}>Request withdraw money</span>
      </Link>
    ),
    roles: ['ADMIN'], // Define roles that can access this item
  },
  {
    key: '5',
    icon: <FileDoneOutlined />, // fad fa-file
    label: (
      <Link href="/admin/criteria-scores">
        <span style={{ color: '#ffffff', fontSize: 11 }}> Configure Criteria Score</span>
      </Link>
    ),
    roles: ['ADMIN'], // Define roles that can access this item
  },
  {
    key: '6',
    icon: <FileDoneOutlined />, // fad fa-file
    label: (
      <Link href="/admin/subscription">
        <span style={{ color: '#ffffff', fontSize: 11 }}> Configure Subcriptions</span>
      </Link>
    ),
    roles: ['ADMIN'], // Define roles that can access this item
  },
  {
    key: '7',
    icon: <FileDoneOutlined />, // fad fa-file
    label: (
      <Link href="/admin/apikey">
        <span style={{ color: '#ffffff', fontSize: 11 }}>Configure OpenAI API key</span>
      </Link>
    ),
    roles: ['ADMIN'], // Define roles that can access this item
  },
];

const COLORS = {
  Primary: '#372e8f',
  Secondary: '#9a227f',
  Three: '#020d3b',
};

const styles = {
  compareBox: {
    margin: '0 0 0 0',
    minWidth: '2000px',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },

  threeColorGradient: {
    backgroundImage: `linear-gradient(61.63deg, ${COLORS.Primary} 0%, ${COLORS.Secondary} 50%, ${COLORS.Three} 100%)`,
  },
};
const AdminLayout = React.memo(({ userHeader, content, selected, onCreated }) => {
  const { setMessage, setEmail, setAvatar, setUserRole, setBalance } = useStore();

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;
    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      console.log('accessToken', accessToken);
      // Set the cookie
      document.cookie = serialize('token', accessToken, {
        path: '/', // The path for which the cookie is valid
        maxAge: 60 * 60 * 24 * 7, // 1 week (adjust as needed)
        secure: false, // Use 'secure' in production for HTTPS-only cookies
      });

      const { data, error } = await getProtectedResource(accessToken);
      if (!isMounted) {
        return;
      }
      if (data) {
        setMessage(JSON.stringify(data, null, 2));
        localStorage.setItem('email', data.email);
        localStorage.setItem('avatar', data.avatar);
        localStorage.setItem('userId', data.id);

        // setCookie('userId', data.id, 7); // 7 days for cookie expiration

        localStorage.setItem('userRole', data.role.roleName);

        // Update Zustand store with user data
        setEmail(data.email);
        setAvatar(data.avatar);
        setBalance(data.accountBalance);
        setUserRole(data.role.roleName);
      }
      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };
    getMessage();
    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  console.log('selected', selected);
  const {
    token: { colorPrimary, borderRadius, colorBgContainer },
  } = theme.useToken();
  // Log the extracted values for debugging
  console.log('colorPrimary:', colorPrimary);
  console.log('borderRadius:', borderRadius);
  console.log('colorBgContainer:', colorBgContainer);
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    // <AuthenticationGuard>
    <AuthLayout>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              iconmargininlineend: 24,
              itemSelectedBg: 'transparent',
              itemSelectedColor: '#4d70eb',
            },
          },
          token: {
            colorPrimary,
            borderRadius,
            colorBgContainer,
          },
        }}
      >
        <Layout style={{ background: colorBgContainer }} hasSider>
          <Sider
            position="relative"
            width="280px"
            style={{
              backgroundColor: COLORS.Primary,
              overflow: 'hidden',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
              paddingLeft: 0,
              paddingRight: 0,
              zIndex: 99,
            }}
          >
            {/* <div style={{ ...styles.compareBox }}>
              <CanvasGradient
                animated
                angle={61.63}
                stops={[
                  { offset: 0.0, color: COLORS.Primary },
                  { offset: 0.25, color: COLORS.Secondary },
                  { offset: 0.5, color: COLORS.Three },
                  { offset: 0.75, color: COLORS.Secondary },
                  { offset: 1.0, color: COLORS.Primary },
                ]}
              />
            </div> */}

            <Space
              direction="vertical"
              size="middle"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                left: 0,
                bottom: 0,
              }}
            ></Space>
            <Space
              direction="vertical"
              size="middle"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                left: 0,
                bottom: 0,
                marginTop: -15,
              }}
            ></Space>
            <Menu
              style={{
                marginTop: '50px',
                marginLeft: '10px',
                iconSize: 59,
                backgroundColor: 'transparent',
                color: '#ffffff',
                width: '100%',
                fontSize: '11.2',
                fontFamily: 'Source Sans Pro',
                fontWeight: 'bold',
              }}
              iconmargininlineend={50}
              mode="inline"
              defaultSelectedKeys={[selected]}
              items={items}
            />

            <div style={{ position: 'absolute', bottom: 30, left: 40, width: '100%' }}>
              <Space
                direction="vertical"
                size="middle"
                style={{
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'center',
                  left: 0,
                  bottom: 0,
                }}
              >
                <div className="">
                  <div />
                  <div style={{ display: 'none' }} />
                  <div className="space-align-block">
                    <Space align="center">
                      <FontAwesomeIcon
                        style={{
                          color: 'white',
                          fontFamily: 'Source Sans Pro, sans-serif',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          fontSize: '16.8px',
                          fontWeight: '700',
                        }}
                        icon={faSignOutAlt}
                        onClick={handleLogout}
                      />
                      <span
                        className="icon-button-label ml-2"
                        style={{
                          color: 'white',
                          fontFamily: 'Source Sans Pro, sans-serif',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          fontSize: '11.2px',
                          fontWeight: '700',
                        }}
                        onClick={handleLogout}
                      >
                        Log out
                      </span>
                    </Space>
                  </div>
                </div>
              </Space>
            </div>
          </Sider>

          <Layout
            className="site-layout"
            style={{
              marginLeft: 350,
              background: colorBgContainer,
            }}
          >
            <Header
              style={{
                marginTop: '0px',
                padding: 0,
                paddingLeft: 0,
                background: colorBgContainer,
                position: 'relative',
              }}
            >
              {userHeader}
              {/* {windowWidth >= 967 ? (
                <div style={{ position: 'absolute', top: '-15px', right: 50, zIndex: 0 }}>
                  <Space align="center">
                    <Avatar src={avatar} size={50} />
                    <span className="mock-block">{email}</span>
                  </Space>
                </div>
              ) : null} */}
            </Header>
            <Content
              style={{
                margin: '0 0 0 0',
                minHeight: '100vh',
                overflow: 'initial',
              }}
            >
              <div
                style={{
                  textAlign: 'left',
                  background: colorBgContainer,
                }}
              >
                {content}
              </div>
            </Content>

            {/* <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023
        </Footer> */}
          </Layout>
        </Layout>
      </ConfigProvider>
    </AuthLayout>
  );
});

// const UserLayout = ({ userHeader, content, selected }) => {
//   console.log('selected', selected);
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   return (

//   );
// };
export default AdminLayout;
