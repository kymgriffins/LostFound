import React, { useContext } from "react";
import AuthContext from '../context/AuthContext'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Link} from 'react-router-dom'
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dashboard from './Dashboard'
const theme = createTheme();
const itemType = [
  {
    label: "Lost",
    value: "LOST",
  },
  {
    label: "Found",
    value: "FOUND",
  },
];
const itemCategory = [
  {
    label: "ID",
    value: "ID",
  },
  {
    label: "Document",
    value: "DOCUMENT",
  },
];

export default function SubmitItem() {
   const {user} = useContext(AuthContext)
  /*   console.log(user) */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const postItem = async (e) => {
    const postedItems = {
      title: title,
      category: category,
      name: name,
      id_number: idNumber,
      description: description,
      location: location,
      item_type: type,
      is_claimed: false,
      report: "",
       user: user.user_id 
    };
    const response = axios.post(
      "https://lostandfoundwebapp.herokuapp.com/app/post-item/",
      postedItems
    );
    console.log(response.data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postItem();
  };
  return (

    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Submit Lost/Found Items
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title of the Item"
              name="title"
              autoComplete="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description of the lost/found item"
              name="description"
              //autoComplete=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="location"
              label="Location where found/lost"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name if any of the owner "
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="current-name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email if any (optional)"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="current-email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="ID Number if any of the owner "
              type="name"
              id="name"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              autoComplete="current-name"
            />
            
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Is the it?"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              {itemType.map((item) => (
                <MenuItem value={item.value}>{item.label}</MenuItem>
              ))}
             
            </Select>
            </FormControl>
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Item Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
             {itemCategory.map((item) => (
                <MenuItem value={item.value}>{item.label}</MenuItem>
              ))}
            </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Link to="/">Go home</Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

  );
}
