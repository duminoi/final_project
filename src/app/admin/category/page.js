"use client";
import FormCategory from "@/(components)/FormCategory";
import {
  deleteCategory,
  getCategory,
  setIsEdit,
} from "@/app/store/slice/categorySlice";
import { EditFilled, DeleteFilled, EyeFilled } from "@ant-design/icons";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function () {
  // function createData(name, calories, fat, carbs, protein) {
  //   return { name, calories, fat, carbs, protein };
  // }
  const [categoryId, setCategoryId] = useState(false);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const rows = categories;
  const columns = ["id", "name", "short_name", "order_num"];

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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id} // Đảm bảo mỗi hàng có một key duy nhất
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((column) => (
                  <TableCell key={`${column}-${row.id}`}>
                    {row[column]}
                  </TableCell>
                ))}
                <TableCell data-id={row.id}>
                  <div data-id={row.id} className="flex gap-4">
                    <EditFilled onClick={handleEdit} data-id={row.id} />
                    <DeleteFilled onClick={handleOpen} data-id={row.id} />
                    <EyeFilled data-id={row.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận trước khi xóa?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn đã chắn chắn xóa dữ liệu này? nếu đã xóa sẽ không thể khôi phục
            được
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Không</Button>
          <Button onClick={handleDelete} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
