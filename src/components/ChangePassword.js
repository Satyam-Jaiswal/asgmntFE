import React, { useEffect, useState } from "react";
import { Form, Input, Button, Divider, Row, message, Spin } from "antd";
import { postDatawithtoken } from "../api/api";
import { get_token, get_user_name } from "../@helper/localstorage";

function ChangePassword(props) {
  const [form] = Form.useForm();
  const token = localStorage.getItem("TOKEN");

  useEffect(() => {
    console.log("Rendered change password page");
  }, []);

  const onFinish = (values) => {
    let data = {};
    data = {
      token: get_token(),
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,

      retypePassword: values.retypePassword,
    };
    postDatawithtoken("api/auth/changepw", data, token).then((result) => {
      if (result.success === true) {
        message.success("Password Changed Successfully");
      }
    });
  };
  return (
    <div>
      <p
        className="site-description-item-profile-p"
        style={{
          fontWeight: "bold",
          textDecoration: "underline",
          margin: "20px",
        }}
      >
        Change Password
      </p>
      <div
        style={{
          padding: "25px",
        }}
      >
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Old Password"
            name="oldPassword"
            required={true}
            hasFeedback
          >
            <Input type="password" placeholder={`Old Password`} required />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            required={true}
            hasFeedback
          >
            <Input type="password" placeholder={`New Password`} required />
          </Form.Item>
          <Form.Item
            label="Re-enter New Password"
            name="retypePassword"
            required={true}
            hasFeedback
          >
            <Input type="password" placeholder={`New Password`} required />
          </Form.Item>
          <Button
            type="primary"
            shape="round"
            htmlType="submit"
            className="upbutton"
            style={{ width: "100%" }}
          >
            Change Password
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ChangePassword;
