"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  editProduct,
  setIsEdit,
} from "@/app/store/slice/productSlice";
import { v4 as uuidv4 } from "uuid";
const Formproducts = ({ id }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const { isEdit } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const products = useSelector((state) =>
    state.product.products.find((item) => item.id === id)
  );

  console.log("products", products);
  console.log("id", id);

  const handleSubmit = (values) => {
    if (!isEdit) {
      dispatch(addProduct({ ...values, id: uuidv4() }));
    } else {
      // console.log("vào đây", id);
      dispatch(
        editProduct({
          id: id,
          values: values,
        })
      );
    }
  };
  const handleBack = () => {
    dispatch(setIsEdit(false));
    form.resetFields();
  };
  useEffect(() => {
    form.setFieldsValue(products);
  }, [products, form]);
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
      <Form.Item label="category_id" name="category_id">
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
            {isEdit ? "Update products" : "Add products"}
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
export default Formproducts;
