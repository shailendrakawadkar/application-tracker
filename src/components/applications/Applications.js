import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import Header from "../header/Header";

const Applications = () => {
  let columns = ["Company", "Job Role", "Maximum Package", "Status", "Date"];

  let onPageChnge = () => {};
  let [rowsCount, setRowsCount] = useState(-1);
  let [currentPage, setCurrentPage] = useState(-1);

  let [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL + "application", {headers : {
        'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
      }})
      .then((response) => setRows(response.data.data))
      .catch((error) => console.log(error));
  }, [currentPage]);

  return (
    <Container>
      <Header />
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow hover>
              {columns.map((column) => (
                <TableCell variant="head" align="center">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
                rows.map((row) => <TableRow key={row._id}>
                    <TableCell align="center">{row.company}</TableCell>
                    <TableCell align="center">{row.role}</TableCell>
                    <TableCell align="right">{row.maxPackage}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                </TableRow>)
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={rowsCount}
                onPageChange={onPageChnge}
                page={currentPage}
                rowsPerPageOptions={[10, 20, 50, 100]}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Applications;
