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
      <Link href="/resume">
        <span style={{ color: '#ffffff', fontSize: 11 }}>MY DASHBOARD</span>
      </Link>
    ),
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
      <Link href="/expert/requests">
        <span style={{ color: '#ffffff', fontSize: 11 }}>EXPERT ZONE</span>
      </Link>
    ),
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
      <Link href="/hr/list">
        <span style={{ color: '#ffffff', fontSize: 11 }}>HR ZONE</span>
      </Link>
    ),
  },
  {
    key: '4',
    icon: <FileDoneOutlined />, // fad fa-file
    label: (
      <Link href="/review/list/expert">
        <span style={{ color: '#ffffff', fontSize: 11 }}>REVIEW MY RESUME</span>
      </Link>
    ),
  },
  {
    key: '5',
    icon: <FileDoneOutlined />, // fad fa-file
    label: (
      <Link href="/expert/config">
        <span style={{ color: '#ffffff', fontSize: 11 }}>EXPERT CONFIG</span>
      </Link>
    ),
  },
  {
    key: '6',
    icon: <FileDoneOutlined />, // fad fa-file
    label: (
      <Link href="/hr/config">
        <span style={{ color: '#ffffff', fontSize: 11 }}>HR CONFIG</span>
      </Link>
    ),
  },
  {
    key: '7',
    icon: <FileDoneOutlined />, // fad fa-file
    label: (
      <Link href="/candidate/config">
        <span style={{ color: '#ffffff', fontSize: 11 }}>CANDIDATE CONFIG</span>
      </Link>
    ),
  },
  // {
  //   key: '4',
  //   // icon: <BarChartOutlined />,
  //   label: 'REVIEW MY RESUME',
  // },
  // {
  //   key: '5',
  //   // icon: <CloudOutlined />,
  //   label: 'MY PROFILE',
  // },
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
const UserLayout = React.memo(({ userHeader, content, selected, onCreated }) => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  const { getAccessTokenSilently } = useAuth0();
  const [windowWidth, setWindowWidth] = useState(1000);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window?.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        setEmail(data.email);
        setAvatar(data.avatar);
        document.cookie = serialize('userId', data.id, {
          path: '/', // The path for which the cookie is valid
          maxAge: 60 * 60 * 24 * 7, // 1 week (adjust as needed)
          secure: false, // Use 'secure' in production for HTTPS-only cookies
        });
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
    <AuthenticationGuard>
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
            <div style={{ ...styles.compareBox }}>
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
            </div>

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
            >
              <Link href="/">
                <div style={{ width: '208px', marginTop: '19px' }}>
                  <svg
                    style={{
                      width: '80px',
                      height: '80px',
                    }}
                    xmlns="https://www.w3.org/2000/svg"
                    viewBox="0 0 389 185"
                    className="src-components-Sidebar--tdHjSULsyBY="
                  >
                    <path
                      fill="#48c9b0"
                      d="M37.6 35.9V185L0 147.3V36.9L36.9 0h55.2L129 36.9v16.3L91.1 90.8v-55zm91.4 91.8v56.2H91.3l-.3-57H74.8L38.7 90.8h53.4z"
                    />
                    <path
                      fill="#16a085"
                      d="M37.6 46.7 0 36.9l1-1h36.6zm53.5-10.8H80.2L89.5 0H91zm37.1 91 .8.8-37.9 10.1V127h37.1z"
                    />
                    <g fill="#fff">
                      <path d="M242.1 134.3h-26.7l-20.2-31.7h-.2v31.7h-21.4V51.8h32c16.3 0 28.7 7.8 28.7 25.4 0 11.4-6.3 21.2-18.1 23.3zm-47.2-45.5h2.1c7 0 14.9-1.3 14.9-10.3S204 68.2 197 68.2h-2.1zM302.4 109.6h-41.9c0 8.1 4.3 12.5 12.5 12.5 4.3 0 7.3-1.4 9.5-5.1h19.1c-3.2 13.2-15.8 19.3-28.5 19.3-18.6 0-32.5-10.5-32.5-29.9 0-18.7 12.8-30 31.1-30 19.5 0 30.7 12 30.7 31.2zm-18.5-11.5c-1-5.4-5.9-8.9-11.3-8.9-5.8 0-10.6 3.1-11.8 8.9zM359.9 117.8v16.5H303l26.4-39.6h-22.9V78.2h56l-26.3 39.6zM388.2 56.6c0 6.1-5 11.2-11.2 11.2s-11.2-5-11.2-11.2c0-6.1 5-11.2 11.2-11.2s11.2 5.1 11.2 11.2zm-1.2 77.7h-19.9V78.2H387z" />
                    </g>
                  </svg>
                </div>
              </Link>
            </Space>
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
            >
              <CreateResume onCreated={onCreated} />
            </Space>
            <Menu
              style={{
                marginTop: '26px',
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
            >
              <div
                className="flex justify-center items-center"
                style={{
                  marginTop: '19px',
                  fontFamily: 'Source Sans Pro',
                  fontWeight: 'bold',
                  fontSize: '11.2',
                }}
              >
                <div
                  className="pl-2  py-2 bg-white bg-opacity-40 rounded-md justify-between items-start flex"
                  style={{ width: '208px' }}
                >
                  <div className="whitespace-nowrap text-left text-white text-xs font-black  uppercase leading-3">
                    AI Credits
                  </div>
                  <div className="pr-2 flex ml-4">
                    <div className="text-white text-xs font-bold uppercase leading-3">3,096</div>
                    <div className="ml-1 text-white text-xs font-black font-['Font Awesome 5 Free'] uppercase leading-3">
                      <FontAwesomeIcon icon={faCoins} />{' '}
                    </div>
                  </div>
                </div>
              </div>
            </Space>
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
                marginTop: '40px',
                padding: 0,
                paddingLeft: 0,
                background: colorBgContainer,
                position: 'relative',
              }}
            >
              {userHeader}
              {windowWidth >= 967 ? (
                <div style={{ position: 'absolute', top: '-15px', right: 50, zIndex: 0 }}>
                  <Space align="center">
                    <Avatar src={avatar} size={50} />
                    <span className="mock-block">{email}</span>
                  </Space>
                </div>
              ) : null}
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
    </AuthenticationGuard>
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
export default UserLayout;
