"use client";
import FormProduct from "@/(components)/FormProduct";
import {
  deleteProduct,
  getProduct,
  setIsEdit,
} from "@/app/store/slice/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClimbingBoxLoader } from "react-spinners";
import CommonTable from "@/(components)/CommonTable";
import DialogComponent from "@/(components)/Dialog";
export default function ProductPage() {
  const { isLoading } = useSelector((state) => state.product);
  const [productId, setProductId] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const rows = products;
  // const columns = ["id", "name", "category_id", "order_num"];
  const columns = [
    { value: "id", text: "Id" },
    { value: "name", text: "Tên" },
    { value: "category_id", text: "Id thể loại" },
    { value: "order_num", text: "Vị trí" },
  ];
  const handleEdit = (e) => {
    console.log("vào đây");
    setProductId(e.currentTarget.dataset.id);
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
    dispatch(deleteProduct(deleteId));
    handleClose();
  };

  useEffect(() => {
    dispatch(getProduct());
  }, []);
  return (
    <div className="flex flex-col justify-center items-center gap-3 mx-[5rem]">
      <h1 className="text-3xl">Products</h1>
      <FormProduct id={productId} setProductId={setProductId}></FormProduct>
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
