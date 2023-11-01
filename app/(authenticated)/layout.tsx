"use client";

import React from 'react';
import {HomeFilled, ControlOutlined, FileOutlined, NotificationOutlined, UserOutlined, CreditCardOutlined} from '@ant-design/icons';
import {Button, MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {useRouter} from "next/navigation";
import Home from '../page';
import Page from './transaction/page';

const {Header, Content, Sider} = Layout;

const items1: MenuProps['items'] = ['1',].map((key) => ({
  key,
  label: `nav ${key}`,
}));


interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({children}) => {
  const router = useRouter();

  const {
    token: {colorBgContainer},
  } = theme.useToken();

  const menu: MenuProps['items'] = [
    {
      key: `/dashboard`,
      icon: <HomeFilled/>,
      label: `Dashboard`,
    },
    {
      key: `/transaction`,
      icon: <CreditCardOutlined />,
      label: `Transaction`,
    },
    {
      key: `/voucher`,
      icon: <FileOutlined />,
      label: `Voucher`,
    },
    {
      key: `/users`,
      icon: <UserOutlined />,
      label: `Users`,
    },
  ]

  // Function to handle logout
  const handleLogout = () => {
    // Remove the access token from local storage
    localStorage.removeItem("accessToken");
    // Redirect the user to the login page using the router
    router.push("/login");
  };

  return (
    <Layout>
      <Header className="header flex justify-between items-center">
        <div className={"text-white"}>Admin</div>
        <Button onClick={handleLogout}>Logout</Button>
      </Header>
      <Layout>
        <Sider width={200} style={{background: colorBgContainer}}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{height: '100%', borderRight: 0, paddingTop: 10}}
            items={menu}
            onClick={({key}) => {
              router.push(key);
              // console.log(`key ${key} route not found`);
            }}
          />
        </Sider>
        <Layout style={{padding: '0 24px 24px', height: 'calc(100vh - 64px)'}}>
          <Content
            style={{
              padding: 24,
              margin: '16px 0 0 0',
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AuthenticatedLayout;
