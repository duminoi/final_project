import React from "react";
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
export default function CommonTable({
  columns,
  rows,
  handleEdit,
  handleOpen,
  maxWidth,
}) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, maxWidth: maxWidth, margin: "0 auto" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.value}>{column.text}</TableCell>
              ))}
              <TableCell>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id} // Đảm bảo mỗi hàng có một key duy nhất
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((column) => (
                  <TableCell key={`${column.value}-${row.id}`}>
                    {row[column.value]}
                  </TableCell>
                ))}
                <TableCell data-id={row.id}>
                  <div data-id={row.id} className="flex gap-4">
                    <EditFilled
                      style={{ color: "#1DA57A", fontSize: "18px" }}
                      onClick={handleEdit}
                      data-id={row.id}
                    />

                    <DeleteFilled
                      style={{ color: "#F44336", fontSize: "18px" }}
                      onClick={handleOpen}
                      data-id={row.id}
                    />
                    <EyeFilled data-id={row.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
