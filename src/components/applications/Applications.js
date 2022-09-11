import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const Applications = () => {
    return (
        <div>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell hover></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Applications;