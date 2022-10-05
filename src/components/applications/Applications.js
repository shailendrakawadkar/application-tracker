import {
  Button,
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
import "./Applications.css";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import Header from "../header/Header";

const Applications = () => {
  let columns = ["Company", "Job Role", "Maximum Package", "Status", "Date"];
  let [totalRowsCount, setTotalRowsCount] = useState(0);
  let [rowsCount, setRowsCount] = useState(5);
  let [currentPage, setCurrentPage] = useState(0);

  let [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(
        API_URL + `application?limit=${rowsCount}&currentPage=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setRows(response.data.data);
        setTotalRowsCount(response.data.totalRecords);
      })
      .catch((error) => console.log(error));
  }, [rowsCount]);

  const loadMore = () => {
    setRowsCount(rowsCount + 5);
  };

  return (
    <Container>
      <Header />
      <TableContainer class="table-container">
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
            {rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell align="center">{row.company}</TableCell>
                <TableCell align="center">{row.role}</TableCell>
                <TableCell align="right">{row.maxPackage}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{marginTop : 20, textAlign : 'right', float : 'right'}}>
        <Button
          variant="contained"
          onClick={loadMore}
          disabled={rowsCount >= totalRowsCount}
        >
          Load More
        </Button>
      </div>
    </Container>
  );
};

export default Applications;
