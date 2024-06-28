import { Button } from "@mui/material";
import React, { memo, useEffect, useMemo } from "react";
import { styles } from "./MemoizedMyStyles";

const MemoizedMyList = memo(({ exampleData }) => {
  const myList = useMemo(
    () => JSON.parse(localStorage.getItem("myList")) || [],
    []
  );

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

  const handleDelete = (index) => {
    const newUserList = [...myList];
    newUserList.splice(index, 1);
    localStorage.setItem("myList", JSON.stringify(newUserList));
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
          <th style={styles.columnHeader}>Rumuz</th>
          <th style={styles.columnHeader}>Email</th>
          <th style={styles.columnHeader}>City</th>
          <th style={styles.columnHeader}>Info Text</th>
          <th style={styles.columnHeader}>Action</th>
        </tr>
      </thead>
      <tbody>
        {exampleData.map((user, index) => (
          <tr key={index} style={{ borderBottom: "1px solid #f0f0f0" }}>
            <td style={styles.cell}>{user.rumuz}</td>
            <td style={styles.cell}>{user.email}</td>
            <td style={styles.cell}>{user.city}</td>
            <td style={styles.cell}>{user.infoText}</td>
            <td style={styles.cell}>
              <Button variant="contained" onClick={() => handleDelete(index)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default MemoizedMyList;
