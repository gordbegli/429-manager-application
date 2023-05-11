import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import DrawerComp from "./Drawer";
import { BrowserRouter, Link } from 'react-router-dom';

import { ref, onValue, child } from "firebase/database"; //dont think i need this

import { useRouter } from "next/router";

const Header = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  const router = useRouter()

  const handleAllApplicantClick = () => {
    router.push('./viewApplications')
  };

  const handlePendingApplicantClick = () => {
    router.push('./viewPendingApplications')
  };

  const handleAcceptedApplicantClick = () => {
    router.push('./viewAcceptedApplications')
  };

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#881c1c" }}>
        <Toolbar>
          <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} />
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                CS429 Manager Application
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "50px" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab label="All Applications" onClick={handleAllApplicantClick}/>
                <Tab label="Accepted Applications" onClick={handleAcceptedApplicantClick}/>
                <Tab label="Pending Applications" onClick={handlePendingApplicantClick}/>
              </Tabs>
              {/* <Button sx={{ marginLeft: "auto" }} variant="contained">
                Login
              </Button>
              <Button sx={{ marginLeft: "10px" }} variant="contained">
                SignUp
              </Button> */}
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;