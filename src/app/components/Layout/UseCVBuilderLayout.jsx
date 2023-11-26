import React, { useState } from 'react';
import UserHeader from '../UserHeader';
import CreateResume from '../Modal/CreateResume';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Card, Layout, Menu, Space, theme, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCake,
  faFile,
  faFileAlt,
  faFileCircleCheck,
  faFileCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import './input.css';
import './date.css';
import './datepicker.css';

const { Title, Paragraph, Text, Link } = Typography;

const { Header, Content, Footer, Sider } = Layout;

const items = [
  // {
  //   key: '1',
  //   icon: <FontAwesomeIcon icon={faFileCirclePlus} />,
  //   label: 'CREATE NEW RESUME',

  // },
  {
    key: '1',
    icon: <FontAwesomeIcon icon={faFile} />,
    label: 'MY DASHBOARD',
    href: '/resume',
  },
  // {
  //   key: '3',
  //   icon: <FontAwesomeIcon icon={faFileAlt} />,
  //   label: 'SAMPLE LIBRARY',
  // },
  {
    key: '2',
    icon: <FontAwesomeIcon icon={faFileCircleCheck} />,
    label: 'REVIEW MY RESUME',
    href: '/review/list/expert',
  },
];
const UserCVBuilderLayout = ({ userHeader, content }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout
      style={{
        backgroundColor: '#fbfbfb',
      }}
      hasSider
    >
      <Sider
        style={{
          overflow: 'initial',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 99,
          backgroundImage:
            "url('https://photos.pinksale.finance/file/pinksale-logo-upload/1699259953581-c26be60cfd1ba40772b5ac48b95ab19b.png')",
        }}
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" style={{ marginTop: '30px' }} />
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
            <svg
              style={{
                width: '80px',
                height: '80px',
                marginLeft: '50px',
              }}
              xmlns="https://www.w3.org/2000/svg"
              viewBox="0 0 389 185"
              className="src-components-Sidebar--tdHjSULsyBY="
            >
              <path
                fill="#48c9b0"
                d="M37.6 35.9V185L0 147.3V36.9L36.9 0h55.2L129 36.9v16.3L91.1 90.8v-55zm91.4 91.8v56.2H91.3l-.3-57H74.8L38.7 90.8h53.4z"
              />
            </svg>
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
          }}
        />
        <Menu
          style={{
            background: 'transparent',
            color: '#fbfbfb',
            fontSize: '12.6px',
            fontFamily: 'Source Sans Pro',
            fontWeight: 'bold',
          }}
          mode="inline"
          defaultSelectedKeys={['4']}
          items={items}
          inlineCollapsed={collapsed}
        />
      </Sider>

      <Layout
        className="site-layout"
        style={{
          position: 'relative',
          background: '#fbfbfb',
          marginLeft: '100px',
        }}
      >
        <Header
          style={{
            marginTop: '40px',
            background: '#fbfbfb',
          }}
        >
          {userHeader}
        </Header>

        <Content
          style={{
            overflow: 'initial',
            background: '#fbfbfb',
          }}
        >
          <div
            style={{
              padding: 0,
              overflow: 'initial',
              marginLeft: '30px',
              marginRight: '75px',
              marginBottom: '100px',
              textAlign: 'center',
              background: '#fbfbfb',
            }}
          >
            {content}
          </div>
        </Content>
        <Footer
          style={{
            marginTop: '0px',
            textAlign: 'center',
            background: '#fbfbfb',
          }}
        />
      </Layout>
    </Layout>
  );
};
export default UserCVBuilderLayout;
