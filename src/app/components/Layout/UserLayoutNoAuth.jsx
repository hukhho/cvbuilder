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
import { useRouter } from 'next/navigation';
import { PageLoader } from '../PageLoader';
import Login from '@/app/login/page';
import MemoizedMenu from './MemoizedMenu';
import { LogoutButton } from '../Button/LogoutButton';
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
    roles: ['ADMIN', 'EXPERT', 'CANDIDATE'], // Define roles that can access this item
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
        <span style={{ color: '#ffffff', fontSize: 11 }}>REVIEW CV FOR CANDIDATES</span>
      </Link>
    ),
    roles: ['ADMIN', 'EXPERT'], // Define roles that can access this item
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
    roles: ['ADMIN', 'HR'], // Define roles that can access this item
  },
  {
    key: '4',
    icon: <FileDoneOutlined />, // fad fa-file
    label: (
      <Link href="/review/list/expert">
        <span style={{ color: '#ffffff', fontSize: 11 }}>REVIEW MY RESUME</span>
      </Link>
    ),
    roles: ['ADMIN', 'CANDIDATE'], // Define roles that can access this item
  },
  {
    key: '5',
    icon: <FileDoneOutlined />, // fad fa-file
    label: (
      <Link href="/expert/config">
        <span style={{ color: '#ffffff', fontSize: 11 }}>EXPERT CONFIG</span>
      </Link>
    ),
    roles: ['ADMIN', 'EXPERT'], // Define roles that can access this item
  },
  {
    key: '6',
    icon: <FileDoneOutlined />, // fad fa-file
    label: (
      <Link href="/hr/config">
        <span style={{ color: '#ffffff', fontSize: 11 }}>HR CONFIG</span>
      </Link>
    ),
    roles: ['ADMIN', 'HR'], // Define roles that can access this item
  },
  {
    key: '7',
    icon: <FileDoneOutlined />, // fad fa-file
    label: (
      <Link href="/candidate/config">
        <span style={{ color: '#ffffff', fontSize: 11 }}>CANDIDATE CONFIG</span>
      </Link>
    ),
    roles: ['ADMIN', 'CANDIDATE'], // Define roles that can access this item
  },
  {
    key: '8',
    icon: <FileDoneOutlined />, // fad fa-file
    label: (
      <Link href="/job/list">
        <span style={{ color: '#ffffff', fontSize: 11 }}>JOB LIST</span>
      </Link>
    ),
    roles: ['ADMIN', 'CANDIDATE', 'HR'], // Define roles that can access this item
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
const UserLayoutNoAuth = React.memo(
  ({ userHeader, content, selected, onCreated, isCollapsed, userRole, avatar, email }) => {
    const filteredItems = items.filter(item => item.roles.includes(userRole));

    const {
      token: { colorPrimary, borderRadius, colorBgContainer },
    } = theme.useToken();

    console.log('colorPrimary:', colorPrimary);
    console.log('borderRadius:', borderRadius);
    console.log('colorBgContainer:', colorBgContainer);

    // const handleLogout = () => {
    //   logout({
    //     logoutParams: {
    //       returnTo: window.location.origin,
    //     },
    //   });
    // };

    return (
      // <AuthenticationGuard>
      // <AuthLayout>
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
          <Layout style={{ background: '#fbfbfb' }} hasSider>
            <Sider
              collapsed={isCollapsed}
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
             angle={62} // Adjust the angle to create a wave effect (e.g., 0 for a horizontal wave)
             stops={[
               { offset: 0.1, color: COLORS.Primary },
               { offset: 0.2, color: COLORS.Primary },
               { offset: 0.75, color: COLORS.Secondary },
               { offset: 0.75, color: COLORS.Three },
               { offset: 0.5, color: COLORS.Primary },
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
              >
                <Link href="/">
                  {isCollapsed ? (
                    <svg
                      width={100}
                      height={80}
                      viewBox="0 0 100 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <rect width={100} height={80} fill="url(#pattern0)" />
                      <defs>
                        <pattern
                          id="pattern0"
                          patternContentUnits="objectBoundingBox"
                          width={1}
                          height={1}
                        >
                          <use xlinkHref="#image0_180363_7055" transform="scale(0.01 0.0125)" />
                        </pattern>
                        <image
                          id="image0_180363_7055"
                          width={100}
                          height={80}
                          xlinkHref="data:image/png;base64,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"
                        />
                      </defs>
                    </svg>
                  ) : (
                    <div style={{ width: '208px', marginTop: '19px' }}>
                      <svg
                        width={124}
                        height={99}
                        viewBox="0 0 124 99"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <rect width={124} height={99} fill="url(#pattern0)" />
                        <defs>
                          <pattern
                            id="pattern0"
                            patternContentUnits="objectBoundingBox"
                            width={1}
                            height={1}
                          >
                            <use xlinkHref="#image0_8_4" transform="scale(0.00806452 0.010101)" />
                          </pattern>
                          <image
                            id="image0_8_4"
                            width={124}
                            height={99}
                            xlinkHref="data:image/png;base64,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"
                          />
                        </defs>
                      </svg>
                    </div>
                  )}
                </Link>
              </Space>
              {!isCollapsed && (
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
              )}
              <Menu
                style={{
                  marginTop: '26px',
                  marginLeft: isCollapsed ? 0 : '10px',
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
                items={filteredItems}
              />

              {!isCollapsed && (
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
                        <div className="text-white text-xs font-bold uppercase leading-3">
                          3,096
                        </div>
                        <div className="ml-1 text-white text-xs font-black font-['Font Awesome 5 Free'] uppercase leading-3">
                          <FontAwesomeIcon icon={faCoins} />{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                </Space>
              )}
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
                     
                        <LogoutButton isCollapsed={isCollapsed} />
                       
                      </Space>
                    </div>
                  </div>
                </Space>
              </div>
            </Sider>

            <Layout
              className="site-layout"
              style={{
                marginLeft: isCollapsed ? 150 : 350,
                background: '#fbfbfb',
              }}
            >
              <Header
                style={{
                  marginTop: '40px',
                  padding: 0,
                  paddingLeft: 0,
                  background: '#fbfbfb',
                  position: 'relative',
                }}
              >
                {userHeader}
                {!isCollapsed && (
                  <div style={{ position: 'absolute', top: '-15px', right: 50, zIndex: 0 }}>
                    <Space align="center">
                      <Avatar src={avatar} size={30} />
                      <span className="mock-block">{email}</span>
                    </Space>
                  </div>
                )}
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
                    background: '#fbfbfb',
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
    );
  },
);

export default UserLayoutNoAuth;
