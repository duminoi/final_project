import React from 'react'
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function DialogComponent({handleClose,handleDelete,open}) {
  return (
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
  )
}
