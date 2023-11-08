import React from 'react';
import UserHeader from '../UserHeader';
import CreateResume from '../Modal/CreateResume';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Card, ConfigProvider, Layout, Menu, Space, theme, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileAlt, faFileCircleCheck } from '@fortawesome/free-solid-svg-icons';

const { Title, Paragraph, Text, Link } = Typography;

const { Header, Content, Footer, Sider } = Layout;

import './sidebar.css';
import AiToken from './AIToken';

const items = [
  {
    key: '1',
    icon: <FontAwesomeIcon icon={faFile} style={{ background: '#3c2e8d', fill: '#fff' }} />, //fad fa-file
    label: (
      <a href="/resume" rel="noopener noreferrer">
        <span style={{ color: '#ffffff', fontSize: 11 }}>MY DASHBOARD</span>
      </a>
    ),
  },
  {
    key: '2',
    icon: <FontAwesomeIcon icon={faFileAlt} style={{ background: '#3c2e8d', fill: '#fff' }} />, //fad fa-file
    label: (
      <a href="/review/new" rel="noopener noreferrer">
        <span style={{ color: '#ffffff', fontSize: 11 }}>SAMPLE LIBRARY</span>
      </a>
    ),
  },
  {
    key: '3',
    icon: (
      <FontAwesomeIcon
        icon={faFileCircleCheck}
        style={{ background: '#3c2e8d', fill: '#ffffff' }}
      />
    ), //fad fa-file
    label: (
      <a href="/review/new" rel="noopener noreferrer">
        <span style={{ color: '#ffffff', fontSize: 11 }}>REVIEW MY RESUME</span>
      </a>
    ),
    href: '/my-dashboard',
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
const UserLayout = ({ userHeader, content, selected }) => {
 
  console.log('selected', selected);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            iconMarginInlineEnd: 24,
            itemSelectedBg: 'transparent',
            itemSelectedColor: '#4d70eb',
          },
        },
        token: {
          // Seed Token
          colorPrimary: '#fbfbfb',
          borderRadius: 2,
          colorBgContainer: '#fbfbfb',
        },
      }}
    >
      <Layout hasSider>
        <Sider
          width="280px"
          style={{
            backgroundColor: '#3C2E8D',
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <div className="demo-logo-vertical" />
          <svg
            style={{
              width: '80px',
              height: '80px',
              marginLeft: 40,
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
            <CreateResume />
          </Space>

          <Menu
            style={{
              iconSize: 59,
              backgroundColor: '#3C2E8D',
              color: '#ffffff',
              width: '100%',
              fontSize: '11.2',
              fontFamily: 'Source Sans Pro',
              fontWeight: 'bold',
            }}
            iconMarginInlineEnd={50}
            mode="inline"
            defaultSelectedKeys={[selected]}
            items={items}
          />
          {/* 
        <nav className="nav">
          <a
            id="my-resumes"
            aria-current="page"
            className="side-bar-nav nav-item button-nav active"
            href="/dashboard/resumes"
            target=""
          >
            <i className="fad fa-file src-components-IconButton--V-yuP6X940M=" aria-hidden="true" />
            <div className="src-components-IconButton--Ru0PkId2mxI=" />
            <span className="icon-button-label st-current">My dashboard</span>
          </a>
         
        </nav> */}
          <div className="flex align-center" style={{ justifyContent: 'center' }}>
            <div
              style={{ width: '208px', height: '30px',  }}
            >
             <AiToken numberToken={'5,627'} />
            </div>
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
            {/* <div style={{ marginTop: 20, display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: 'yellow',
                  }}
                >
                  Get hired fast
                </span>
                <span style={{ fontSize: '10px', color: 'white' }}>Unlock all future in under</span>
              </div>
              <Button
                type="primary"
                style={{
                  fontSize: '12px',
                  padding: '4px 8px',
                  fontWeight: 'bold',
                  marginLeft: '10px',
                }}
              >
                UPGRADE
              </Button>
            </div> */}

            {/* <Link href="/login">
              <Text
                strong
                style={{
                  marginTop: 40,
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                LOGOUT
              </Text>
            </Link> */}
          </Space>
        </Sider>

        <Layout
          className="site-layout"
          style={{
            marginLeft: 300,
            background: '#fbfbfb',
          }}
        >
          <Header
            style={{
              marginTop: '40px',
              padding: 10,
              paddingLeft: 60,
              background: '#fbfbfb',
              backgroundColor: '#fbfbfb',
            }}
          >
            {userHeader}
            {/* <UserHeader /> */}
          </Header>

          <Content
            style={{
              margin: '24px 16px 0',
              minHeight: '100vh',
              overflow: 'initial',
              background: '#fbfbfb',
              backgroundColor: '#fbfbfb',
            }}
          >
            <div
              style={{
                padding: 24,
                textAlign: 'center',
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
};
export default UserLayout;
