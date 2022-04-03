/* eslint-disable react-hooks/exhaustive-deps */
import Container from '@mui/material/Container';
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import _ from "lodash";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from './Title';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Dashboard from './Dashboard'
import { IconButton } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// Generate Order Data


const rows = [
  {
    field: "id",
    headerName: "#",
  },
  {
    field: "title",
    headerName: "Title",
  },
];

function preventDefault(event) {
  event.preventDefault();
}

export default function LostItems() {
  let [items, setItems] = useState([]);
  let [lost, setLost] = useState([]);
  let { authTokens, logoutUser, user } = useContext(AuthContext);

  /* console.log("AllItems", items);
  console.log("UserItems", userItem);
  console.log("User", user); */
  const getItems = async () => {
    let response = await fetch("https://lostandfoundwebapp.herokuapp.com/app/all/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setItems(data);
    } else if (response.statusText === "Unauthorized") {
    /*   logoutUser(); */
    }
  };
  const getLostItems = async () => {
    const lostItem = _.filter(items, (item) => item.item_type === "LOST");
    setLost(lostItem);
  };
  useEffect(() => {
    getItems();
    getLostItems();
  }, [getItems, getLostItems]);
  return (
    <Dashboard>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <React.Fragment>
       <Title>Lost Items</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>ID No</TableCell>
            <TableCell>Date</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
         

          {lost.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.item_type}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.id_number}</TableCell>
              <TableCell>{row.report}</TableCell>
              <TableCell>{row.date_added}</TableCell>
               {/* add a button to the right of the table*/}
               <IconButton style={{ padding: 8 }}></IconButton>


            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </React.Fragment>
                </Paper>

              </Grid>
              
              
            </Grid>
            </Container>
    
    </Dashboard>
  );
}
