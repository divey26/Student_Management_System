import React, { useState, useEffect } from "react";
import { HomeOutlined, UserSwitchOutlined, LogoutOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { FloatButton } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const adminUserItems = [
  { key: "dashboard", icon: <HomeOutlined />, label: "Home" },
  {
    key: "students",
    icon: <HomeOutlined />,
    label: "Students",
    children: [
      { key: "std",icon: <HomeOutlined />, label: "Add Student" },
      { key: "marks",icon: <HomeOutlined />, label: "All Students" },
      {
        key: "cls",
        icon: <HomeOutlined />,
        label: "Classes",
        children: [
          { key: "grade6", icon: <UserSwitchOutlined />, label: "Grade 6" },
          { key: "grade7", icon: <UserSwitchOutlined />, label: "Grade 7" },
          { key: "grade8", icon: <UserSwitchOutlined />, label: "Grade 8" },
          { key: "grade9", icon: <UserSwitchOutlined />, label: "Grade 9" },
         
        ],
      },
    ],
  },
];

const StdUserItems = [
  { key: "dashboard", icon: <HomeOutlined />, label: "Home" },
  { key: "students", icon: <HomeOutlined />, label: "Students" },
];


const headerItems = [
  { key: "2", text: "Logout", icon: <LogoutOutlined /> },
];

const CommonLayout = ({ children, userType }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isBackTopVisible, setIsBackTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsBackTopVisible(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHeaderClick = (key) => {
    if (key === "2") { // Logout option
      localStorage.clear();  // Clear user data from localStorage
      navigate("/"); // Navigate to the login page
    }
    if (key === "1") { // Assuming you have a sign option
      navigate("/sign");  // Redirect to the sign page if needed
    }
  };
  

  const handleMenuClick = (item) => {
    if (item.key === "dashboard") {
      navigate("/");
    }
    if (item.key === "marks") {
      navigate("/students");
    }
    if (item.key === "std") {
      navigate("/add-std");
    }
    if (item.key === "df") {
      navigate("/add-std");
    }

  }

  const getUserMenuItems = () => {
    const userNo = localStorage.getItem('userNo');
    if (userNo?.startsWith('S')) {
      return StdUserItems;
    } else if (userNo?.startsWith('TR')) {
      return adminUserItems;
    } else {
      return 0;
    }
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={200}
        style={{ backgroundColor: "#004f9a", position: "fixed", height: "100vh" }}
      >
        <Menu
          theme="light"
          mode="inline"
          items={getUserMenuItems()}
          onClick={handleMenuClick}
          style={{ backgroundColor: "#ffc221", marginTop: "63px" }}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            position: "fixed",
            top: 0,
            left: collapsed ? 80 : 200,
            width: `calc(100% - ${collapsed ? 80 : 200}px)`,
            backgroundColor: "#004f9a",
            display: "flex",
            justifyContent: "flex-end",
            zIndex: 1,
          }}
        >
          {headerItems.map((item) => (
            <Button
              key={item.key}
              type="text"
              icon={item.icon}
              style={{ color: "Black", fontSize: "20px" }}
              onClick={() => handleHeaderClick(item.key)}
            >
              {item.text}
            </Button>
          ))}
        </Header>

        <Content style={{ marginTop: 64, padding: 24 }}>
          {isBackTopVisible && (
            <FloatButton.Group shape="circle" style={{ right: 24 }}>
              <FloatButton.BackTop visibilityHeight={0} />
            </FloatButton.Group>
          )}
          {children}
        </Content>

        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
};

export default CommonLayout;
