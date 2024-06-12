import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ListOfExam = ({ list }) => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "transparent" }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#66bb6a" }}>
            <TableCell>Exam Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Tag</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list?.length>0 && list?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.examName}
              </TableCell>
              <TableCell align="right">
                {new Date(row.examDate).toLocaleDateString()}
              </TableCell>
              <TableCell align="right">
                {row.subject?.charAt(0).toUpperCase() + row.subject?.slice(1)}
              </TableCell>
              <TableCell align="right">{row.score}</TableCell>
              <TableCell align="right">{row.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ListOfExam;
