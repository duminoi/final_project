"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  setIsEdit,
  editCategory,
} from "@/app/store/slice/categorySlice";
import { v4 as uuidv4 } from "uuid";
import FormContainer from "./FormContainer";
const FormCategory = ({ id }) => {
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

  const handleSubmit = (values) => {
    if (!isEdit) {
      dispatch(addCategory({ ...values, id: uuidv4() }));
    } else {
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
  };
  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue(category);
    }
  }, [isEdit, category]);
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
      <Form.Item label="Tên ngắn" name="short_name">
        <Input autoFocus={isEdit} placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Vị trí" name={"order_num"}>
        <Input
          autoFocus={isEdit}
          value={"hello"}
          placeholder="input placeholder"
        />
      </Form.Item>
    </FormContainer>
  );
};
export default FormCategory;
