"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  editCategory,
  setIsEdit,
} from "@/app/store/slice/categorySlice";
import { v4 as uuidv4 } from "uuid";
const FormCategory = ({ id, setCategoryId }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const { isEdit } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const category = useSelector((state) =>
    state.category.categories.find((item) => item.id === id)
  );

  console.log("category", category);
  console.log("id", id);

  const handleSubmit = (values) => {
    if (!isEdit) {
      dispatch(addCategory({ ...values, id: uuidv4() }));
    } else {
      // console.log("vào đây", id);
      dispatch(
        editCategory({
          id: id,
          values: values,
        })
      );
    }
  };
  const handleBack = () => {
    dispatch(setIsEdit(false));
    form.resetFields();
    setCategoryId(null);
  };
  useEffect(() => {
    form.setFieldsValue(category);
  }, [category, form]);
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
      <Form.Item label="name" name={"name"}>
        <Input autoFocus={isEdit} placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="short_name" name="short_name">
        <Input autoFocus={isEdit} placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="order_num" name={"order_num"}>
        <Input
          autoFocus={isEdit}
          value={"hello"}
          placeholder="input placeholder"
        />
      </Form.Item>
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
export default FormCategory;
