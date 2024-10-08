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
import FormContainer from "./FormContainer";
const FormProducts = ({ id }) => {
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

  console.log("isEdit", isEdit);

  const handleSubmit = (values) => {
    if (!isEdit) {
      dispatch(addProduct({ ...values, id: uuidv4() }));
    } else {
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
    if (isEdit) {
      form.setFieldsValue(products);
    }
  }, [isEdit, products]);
  return (
    <FormContainer
      form={form} // Truyền instance form từ FormCategory
      formLayout={formLayout}
      onFormLayoutChange={onFormLayoutChange}
      handleSubmit={handleSubmit}
      handleBack={handleBack}
      isEdit={isEdit}
    >
      <Form.Item label="Tên" name={"name"}>
        <Input autoFocus={isEdit} placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Id thể loại" name="category_id">
        <Input autoFocus={isEdit} placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Vị trí" name={"order_num"}>
        <Input
          autoFocus={isEdit}
          placeholder="input placeholder"
        />
      </Form.Item>
    </FormContainer>
  );
};
export default FormProducts;
