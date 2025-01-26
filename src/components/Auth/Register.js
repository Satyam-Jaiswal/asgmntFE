import React, { Fragment } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import { Button, Row, Input, Form, message } from "antd";
import { postData } from "../../api/api.js";
import { set_token, get_user_name } from "../../@helper/localstorage";

const FormItem = Form.Item;

function Register() {
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const onFinish = (values) => {
    let data = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    postData("api/auth/register", data).then((result) => {
      if (result?.success === true) {
        messageApi.open({
          type: "success",
          content: "User registered successfully",
        });
        set_token(result.body.token);
        navigate("/login");
      }
    });
  };

  const handleGoogleSignUp = () => {
    window.open("/api/auth/google", "_self");
  };

  return (
    <Fragment>
      {contextHolder}

      <div className="form">
        <div className="formfields">
          <div className="logo">
            <div className="logo">App logo</div>
            <span></span>
          </div>
          <div>
            <Form style={{ "margin-top": "40px" }} onFinish={onFinish}>
              <FormItem name="username" rules={[{ required: true }]}>
                <Input placeholder={"Username"} />
              </FormItem>

              <FormItem name="email" rules={[{ required: true }]} hasFeedback>
                <Input placeholder={"Email"} />
              </FormItem>

              <FormItem name="password" rules={[{ required: true }]}>
                <Input type="password" placeholder={`Password`} />
              </FormItem>
              <FormItem
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input type="password" placeholder="Confirm Password" />
              </FormItem>

              <Row>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  <div>Sign up</div>
                </Button>
              </Row>
              <Row>
                <Button
                  type="default"
                  style={{ width: "100%", marginTop: "10px" }}
                  onClick={handleGoogleSignUp}
                >
                  <div>Sign up with Google</div>
                </Button>
              </Row>
              <div style={{ textAlign: "center" }}>
                Already have an account? <a href="/login">Login</a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Register;
