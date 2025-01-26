import React, { Suspense, useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Spin } from "antd";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  LogoutOutlined,
  HeartOutlined,
  DiffOutlined,
  LoginOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import ChangePassword from "./ChangePassword";
import {
  get_token,
  get_user_name,
  remove_token,
} from "../@helper/localstorage";
import TaskBoard from "./TaskManagement/TaskBoard";
import { postData } from "../api/api";
import { TaskProvider } from "../context/TaskContext";
import Feeds from "./Feed/Feed";

const { Header, Footer, Content, Sider } = Layout;

function Dashboard(props) {
  const [collapsed, setcollapsed] = useState(false);
  const [valid, setvalid] = useState(false);
  const navigate = useNavigate();
  const token = get_token();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      postData(`api/auth/verify-token`, { token: token }).then((result) => {
        if (result?.success !== true) {
          navigate("/login");
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [token, navigate]);

  function logout() {
    remove_token();
    navigate("/");
  }

  const menu = (
    <Menu style={{ marginTop: "12px" }}>
      <Menu.Item key="1">
        <a onClick={() => logout()}>
          <LogoutOutlined /> Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <Layout
          style={{
            minHeight: "100vh",
            "margin-left": collapsed ? "80px" : "200px",
            "-webkit-transition": "all 1s ease-in-out",
            " -moz-transition": "all 1s ease-in-out",
            "-o-transition": "all 1s ease-in-out",
            transition: "all .5s ease-in-out",
          }}
        >
          <div>
            <Sider
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
                transition: "all .5s ease-in-out",
                "z-index": "999",
              }}
              collapsible
            >
              <div className="logo">
                {!get_user_name() ? "USER" : get_user_name()}
              </div>

              <Menu
                theme="dark"
                defaultSelectedKeys={["/"]}
                selectedKeys={window.location.pathname}
                mode="inline"
              >
                <Menu.Item key="/home" icon={<DiffOutlined />}>
                  <NavLink to="/home">Feeds</NavLink>
                </Menu.Item>
                <Menu.Item key="/home/tasks" icon={<PieChartOutlined />}>
                  <NavLink to="/home/tasks">Tasks</NavLink>
                </Menu.Item>
                <Menu.Item key="/home/changepw" icon={<LoginOutlined />}>
                  <NavLink to="/home/changepw">Change Password</NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
          </div>

          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <div className="userinfo">
                <Dropdown overlay={menu}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span style={{ margin: "20px" }}>{get_user_name()}</span>
                  </a>
                </Dropdown>
                <span className="avatar-item">
                  <Avatar size="large" icon={<UserOutlined />} />
                </span>
              </div>
            </Header>

            <Content
              style={{
                margin: "24px 16px 0",
                overflow: "auto",
                backgroundcolor: "white",
              }}
            >
              <Suspense fallback={<Spin />}>
                <Routes>
                  <Route
                    path="/tasks"
                    element={
                      token ? (
                        <TaskProvider>
                          <TaskBoard />
                        </TaskProvider>
                      ) : (
                        <Spin />
                      )
                    }
                  />
                  <Route path="/" element={<Feeds />} />
                  <Route path="/changepw" element={<ChangePassword />} />
                </Routes>
              </Suspense>
            </Content>

            <Footer style={{ textAlign: "center" }}>
              <strong style={{ float: "left" }}>
                React Application © 2025
              </strong>
              <p style={{ float: "right" }}>
                Made with <HeartOutlined /> by Satyam Jaiswal
              </p>
            </Footer>
          </Layout>
        </Layout>
      )}
    </div>
  );
}

export default Dashboard;
