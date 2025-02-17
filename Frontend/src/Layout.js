import React, { useState, useEffect } from "react";
import {UsergroupAddOutlined,  ContactsOutlined, NotificationFilled, UserOutlined,  UserAddOutlined ,HomeOutlined, UserSwitchOutlined, LogoutOutlined, AlertOutlined } from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { FloatButton } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const AdminUserItems = [
  { key: "AdminDashboard", icon: <HomeOutlined />, label: "Home" },
  {
    key: "students",
    icon: <HomeOutlined />,
    label: "Students",
    children: [
      { key: "std",icon: <UserAddOutlined />, label: "Add Student" },
      {
        key: "cls",
        icon: <ContactsOutlined />,
        label: "Classes",
        children: [
          { key: "6", icon: <UserSwitchOutlined />, label: "Grade 6" },
          { key: "7", icon: <UserSwitchOutlined />, label: "Grade 7" },
          { key: "8", icon: <UserSwitchOutlined />, label: "Grade 8" },
          { key: "9", icon: <UserSwitchOutlined />, label: "Grade 9" },
         
        ],
      },

    ],
    
  },
  { key: "Tr",icon: < UserOutlined/>, label: "Teachers",
    children: [
      { key: "TRadd",icon: <UsergroupAddOutlined />, label: "Add Teacher" },
    ]
   },

   { key: "admins", icon: <UserAddOutlined />, label: "Admin" },


];


const TeacherUserItems = [
  {
    key: "students",
    icon: <UserOutlined />,
    label: "Dashboard",
   
  },
  { key: "add-announ", icon: <AlertOutlined />, label: "Add Announcements" },

];

const StdUserItems = [
  { key: "students", icon: <UserOutlined />, label: "Students" },
  { key: "announ", icon: <NotificationFilled />, label: "Announcements" },
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
    if (item.key === "TRadd") {
      navigate("/addtr");
    }
    if (item.key === "AdminDashboard") {
      navigate("/dash");
    }
    if (item.key === "6" || item.key === "7" || item.key === "8" || item.key === "9") {
      navigate(`/students/grade/${item.key}`);  // Navigate to the filtered students page with grade in the URL
    }
    if (item.key === "students") {
      navigate("/sts");
    }
    if (item.key === "add-announ") {
      navigate("/AddAnoun");
    }
    if (item.key === "announ") {
      navigate("/Announ");
    }
    if (item.key === "admins") {
      navigate("/admin");
    }

  }

  const getUserMenuItems = () => {
    const userNo = localStorage.getItem('userNo');
    if (userNo?.startsWith('S')) {
      return StdUserItems;
    } else if (userNo?.startsWith('TR')) {
      return TeacherUserItems;
    } else if (userNo?.startsWith('AD')) {
      return AdminUserItems;
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
