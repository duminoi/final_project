"use client";
import React from "react";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import Link from "next/link";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { loginAccount } from "@/app/store/slice/authSlice";
import { ClimbingBoxLoader } from "react-spinners";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { token, isLoading } = useSelector((state) => state.auth);
  console.log("token", token);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(loginAccount(values));
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClimbingBoxLoader size={15} color="#2ecca4" />
      </div>
    );
  }
  return (
    <>
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <a href="">Forgot password</a>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <Link href={"/auth/register"}>Register now!!</Link>
        </Form.Item>
      </Form>
    </>
  );
}
