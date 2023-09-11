"use client";

import React, {useState} from "react";
// import {observer} from 'mobx-react-lite';
import {Button, Card, Checkbox, Col, Form, Input, Modal, Row, Typography, message, notification} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { store } from "#/store";

const Login = () => {
    // const store = useStore();
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    // let history = useHistory();

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const loginResult = await store.auth.login(values.email, values.password);
            notification.success({ message: "Successfully Logged In" });
            if (loginResult.body.data.access_token) {
              router.push("/transaction");
              return;
            } else {
              router.push("/");
              return;
            }
          } catch (e: any) {
            Modal.error({
              className: "capitalize",
              okButtonProps: { type: "primary", className: "antPrimaryButton" },
              title: "Login failed",
              content: e?.response?.body?.message ?? e?.response?.body?.error ?? "Unknown error",
            });
          } finally {
            setLoading(false);
          }
      };

    return <div style={{width: '100vw', display: 'flex', justifyContent: 'center'}}>
        <Row justify={'center'}>
            <Col>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    marginTop: '5vh',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
                        <Typography.Paragraph
                            style={{
                                margin: 0,
                                padding: 0,
                                fontSize: 20,
                                marginLeft: 5,
                                fontWeight: 600,
                                color: "#413d3e",
                            }}
                        >
                            Boilerplate
                        </Typography.Paragraph>
                    </div>
                    <Card
                        style={{width: 320, textAlign: 'center'}}
                        headStyle={{fontSize: 13, fontWeight: 200}}
                        className={"shadow"}
                        bordered={true}
                        title={'Sign in to your account'}
                    >
                        <Form
                            layout={'vertical'}
                            name="normal_login"
                            className="login-form"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                // size={'large'}
                                rules={[{required: false, message: 'Please input your Username!'}]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon"/>}
                                    type="text"
                                    placeholder="Email"/>
                            </Form.Item>

                            <Form.Item
                                style={{
                                    marginBottom: 0,
                                }}
                                label="Password"
                                name="password"
                                // size={'large'}
                                rules={[{required: false, message: 'Please input your Password!'}]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                style={{
                                    marginTop: 0,
                                    marginBottom: 20,
                                    padding: 0
                                }}
                                // label="Password"
                                name="forgot-password"
                                // size={'small'}
                                rules={[{required: false, message: 'Please input your Password!'}]}
                            >
                                <a className="login-form-forgot" href="">
                                    Forgot password
                                </a>
                            </Form.Item>

                            <Form.Item
                                style={{
                                    marginBottom: 5,
                                    textAlign: 'left'
                                }}>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item
                                style={{
                                    marginBottom: 0,
                                }}>
                                <Button type="primary"
                                        block
                                        loading={loading}
                                        htmlType="submit"
                                        size={'large'}
                                        className="login-form-button">
                                    Sign In
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </Col>
        </Row>

    </div>;
};

export default Login;
