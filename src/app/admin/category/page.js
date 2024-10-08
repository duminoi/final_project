"use client";
import FormCategory from "@/(components)/FormCategory";
import {
  deleteCategory,
  getCategory,
  setIsEdit,
} from "@/app/store/slice/categorySlice";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogComponent from "@/(components)/Dialog";
import CommonTable from "@/(components)/CommonTable";

export default function CategoryPage() {
  const { isLoading } = useSelector((state) => state.category);
  console.log(isLoading);

  const [categoryId, setCategoryId] = useState(false);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const rows = categories;

  const columns = [
    { value: "id", text: "Id" },
    { value: "name", text: "Tên" },
    { value: "short_name", text: "Tên ngắn" },
    { value: "order_num", text: "Vị trí" },
  ];
  const handleEdit = (e) => {
    // console.log("vào đây");
    setCategoryId(e.currentTarget.dataset.id);
    dispatch(setIsEdit(true));
  };
  const handleOpen = (e) => {
    setDeleteId(e.currentTarget.dataset.id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    console.log("deleteId", deleteId);
    dispatch(deleteCategory(deleteId));
    handleClose();
  };

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-3 mx-[5rem]">
      <h1 className="text-3xl">Category</h1>
      <FormCategory
        id={categoryId}
        setCategoryId={setCategoryId}
      ></FormCategory>
      <CommonTable
        columns={columns}
        rows={rows}
        handleEdit={handleEdit}
        handleOpen={handleOpen}
      ></CommonTable>
      <DialogComponent
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      {isLoading && <ClimbingBoxLoader size={15} color="#2ecca4" />}
    </div>
  );
}
