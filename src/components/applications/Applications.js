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
  let [totalRowsCount, setTotalRowsCount] = useState(0);
  let [rowsCount, setRowsCount] = useState(10);
  let [currentPage, setCurrentPage] = useState(0);

  let [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL + `application?limit=${rowsCount}&currentPage=${currentPage}`, {headers : {
        'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
      }})
      .then((response) => {
        setRows(response.data.data);
        setTotalRowsCount(response.data.totalRecords);
      })
      .catch((error) => console.log(error));
  }, [currentPage, rowsCount]);

  let onRowPerPageChange = (event) => {
      setRowsCount(parseInt(event.target.value));
  }

  let onPageChnge = (event, page) => {
    setCurrentPage(page);
  };

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
                count={totalRowsCount}
                onPageChange={onPageChnge}
                page={currentPage}
                rowsPerPage={rowsCount}
                rowsPerPageOptions={[100, 50, 20, 10]}
                onRowsPerPageChange={onRowPerPageChange}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Applications;
