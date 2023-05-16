import React from "react";
import { useRouter } from 'next/router'
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {

    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">UMass Amherst</Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>

    );
};

export default Header;