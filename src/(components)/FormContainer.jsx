"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import { useSelector } from "react-redux";

const FormContainer = ({
  form,
  children,
  handleSubmit,
  onFormLayoutChange,
  formLayout,
  handleBack,
  isEdit,
}) => {
  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout={formLayout}
      initialValues={{
        layout: formLayout,
      }}
      onValuesChange={onFormLayoutChange}
      style={{
        maxWidth: formLayout === "inline" ? "none" : 600,
      }}
    >
      {children}
      <Form.Item>
        <div className="flex gap-4">
          <Button type="primary" htmlType="submit">
            {isEdit ? "Update Category" : "Add Category"}
          </Button>
          {isEdit && (
            <Button onClick={handleBack} danger type="primary">
              Back
            </Button>
          )}
        </div>
      </Form.Item>
    </Form>
  );
};
export default FormContainer;
