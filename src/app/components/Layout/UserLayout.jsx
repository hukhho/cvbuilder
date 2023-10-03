import React from 'react';
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
import { Button, Card, Layout, Menu, Space, theme, Typography } from 'antd';
import UserHeader from '../UserHeader';

const { Title, Paragraph, Text, Link } = Typography;

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: '1',
    // icon: <UserOutlined />,
    label: 'MY DASHBOARD',
  },
  {
    key: '2',
    // icon: <VideoCameraOutlined />,
    label: 'MY MATCHED JOBS',
  },
  {
    key: '3',
    // icon: <UploadOutlined />,
    label: 'SAMPLE LIBRARY',
  },
  {
    key: '4',
    // icon: <BarChartOutlined />,
    label: 'REVIEW MY RESUME',
  },
  {
    key: '5',
    // icon: <CloudOutlined />,
    label: 'MY PROFILE',
  },
];
const UserLayout = ({ userHeader, content }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider
        width="15%"
        style={{
          backgroundColor: '#3C2E8D',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          width: '20%',
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
          <Button
            style={{
              background: '#4D70EB',
              fontSize: '12px',
              padding: '4px 8px',
              color: '#ffffff',
              fontWeight: 'bold',
            }}
          >
            CREATE NEW RESUME
          </Button>
        </Space>

        <Menu
          style={{
            backgroundColor: '#3C2E8D',
            color: '#ffffff',
            marginTop: 50,
            marginLeft: 20,
            width: '80%',
            fontSize: '12.6px',
            fontFamily: 'Source Sans Pro',
            fontWeight: 'bold',
          }}
          mode="inline"
          defaultSelectedKeys={['4']}
          items={items}
        />

        <Text
          strong
          style={{
            margin: 40,
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          ALL CREDITS3,096
        </Text>
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
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center' }}>
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
          </div>

          <Link href="/login">
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
          </Link>
        </Space>
      </Sider>

      <Layout
        className="site-layout"
        style={{
          marginLeft: 300,
          background: 'white',
        }}
      >
        <Header
          style={{
            padding: 10,
            paddingLeft: 60,
            background: colorBgContainer,
          }}
        >
          {userHeader}
          {/* <UserHeader /> */}
        </Header>

        <Content
          style={{
            margin: '24px 16px 0',
            height: '100vh',
            overflow: 'initial',
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
            }}
          >
            {content}
          </div>
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default UserLayout;
