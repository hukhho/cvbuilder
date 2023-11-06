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
import { faCake, faFile, faFileAlt, faFileCircleCheck, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';

const { Title, Paragraph, Text, Link } = Typography;

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: '1',
    icon: <FontAwesomeIcon icon={faFileCirclePlus} />,
    label: 'CREATE NEW RESUME',
  },
  {
    key: '2',
    icon: <FontAwesomeIcon icon={faFile} />,
    label: 'MY DASHBOARD',
  },
  {
    key: '3',
    icon: <FontAwesomeIcon icon={faFileAlt} />,
    label: 'SAMPLE LIBRARY',
  },
  {
    key: '4',
    icon: <FontAwesomeIcon icon={faFileCircleCheck} />,
    label: 'REVIEW MY RESUME',
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
          // backgroundColor: '#3C2E8D',
          backgroundImage: `url('https://photos.pinksale.finance/file/pinksale-logo-upload/1699259953581-c26be60cfd1ba40772b5ac48b95ab19b.png')`,
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <div className="demo-logo-vertical" />

        <Link href="/">
          <svg
            style={{
              width: '80px',
              height: '80px',
              marginLeft: '20px',
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
          background: '#fbfbfb',
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
            margin: '24px 16px 0',
            background: '#fbfbfb',
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
        <Footer
          style={{
            marginTop: '200px',
            textAlign: 'center',
            background: '#fbfbfb',
          }}
        />
      </Layout>
    </Layout>
  );
};
export default UserCVBuilderLayout;
