import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const DataTable = ({ userData, regData, userDataDb, initUserData }) => {
  function createData(name, surName, Email, status, domain) {
    return { name, surName, Email, status, domain };
  }

  let rows;

  if (regData) {
    rows = userData.map((user, i) => {
      return createData(
        user.name,
        user.surName,
        user.login,
        regData[i].success === "error"
          ? "Already registered"
          : "Registered Successfuly",
        regData[i].domain
      );
    });
  } else {
    rows = initUserData.map((user, i) => {
      return createData(
        user.name,
        user.surName,
        user.login,
        user.success === "error" ? "Already registered" : "Registered ",
        user.domain
      );
    });
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ minWidth: "20vw", width: "55vw", margin: "1vh auto" }}
    >
      <Table sx={{ minWidth: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Surname</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.surName}</TableCell>
              {regData ? (
                <TableCell align="right">
                  {row.Email}@{row.domain}
                </TableCell>
              ) : (
                <TableCell align="right">{row.Email}</TableCell>
              )}
              <TableCell
                sx={{
                  color: row.status === "Already registered" ? "red" : "green",
                }}
                align="right"
              >
                {row.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
