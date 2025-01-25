import React, { Fragment } from "react";
import "./auth.css";
import { Button, Row, Input, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { set_token } from "../../@helper/localstorage";
import { postData } from "../../api/api.js";
const FormItem = Form.Item;

function Login() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    let data = {
      email: values.username,
      password: values.password,
    };

    postData("api/auth/login", data).then((result) => {
      console.log(result);
      if (result?.success === true) {
        console.log(result.body);
        message.success("Login Successful");
        set_token(result.body.token);
        navigate("/dashboard");
      }
    });
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic here
    console.log("Google Sign-In clicked");
  };

  return (
    <Fragment>
      <div className="form">
        <div className="formfields">
          <div className="logo">APP logo</div>
          <div>
            <Form style={{ marginTop: "40px" }} onFinish={onFinish}>
              <FormItem name="username" rules={[{ required: true }]}>
                <Input placeholder={"Username"} />
              </FormItem>
              <FormItem name="password" rules={[{ required: true }]}>
                <Input type="password" placeholder={`Password`} />
              </FormItem>
              <Row>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  <div>Sign in</div>
                </Button>
              </Row>
              <Row>
                <Button
                  type="default"
                  style={{ width: "100%", marginTop: "10px" }}
                  onClick={handleGoogleSignIn}
                >
                  <div>Sign in with Google</div>
                </Button>
              </Row>
              <div style={{ textAlign: "center" }}>
                Does not have a account? <a href="/signup">Sign Up</a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
