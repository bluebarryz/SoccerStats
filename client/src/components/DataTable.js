import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});
const DataTable = ({ header, columns, rows }) => {
    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ mb: 5 }}>
                <h2>{header}</h2>
                <TableContainer sx={{ maxHeight: 400 }}>
                    <Table stickyHeader sx={{}} size="small">
                        <TableHead>
                            <TableRow key={"header"}>
                                {columns.map((col) => (
                                    <TableCell
                                        key={col.headerName}
                                        align="left"
                                        sx={{ whiteSpace: "nowrap" }}
                                    >
                                        {col.headerName}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, ind) => (
                                <TableRow
                                    key={ind}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    {columns.map((col) => {
                                        return (
                                            <TableCell
                                                key={col.field}
                                                align="left"
                                                sx={{ whiteSpace: "nowrap" }}
                                            >
                                                {col.renderCell
                                                    ? col.renderCell(row)
                                                    : row[col.field] !== null
                                                    ? row[col.field]
                                                    : 0}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </ThemeProvider>
    );
};

export default DataTable;
