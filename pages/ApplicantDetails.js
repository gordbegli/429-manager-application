import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
  
  Drawer,
  Divider,
  ListItemButton,
  ListItemIcon,
  FolderIcon,
  ImageIcon,
  DescriptionIcon,
  InputBase,
  SearchIcon,
  Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, alpha } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#990000", // UMass Red
    },
    background: {
      default: "#ffffff",
    },
  },
});

const StyledSearch = styled('div')(
  ({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  })  
);

const SearchIconWrapper = styled('div')(
  ({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(
  ({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const search = (
  <StyledSearch>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase placeholder="Suchen…" inputProps={{ 'aria-label': 'search' }} />
  </StyledSearch>
)

const ApplicantDetails = ({ applicants }) => {
  const { id } = useParams();
  const applicant = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    major: "Computer Science",
    gpa: "3.8",
    whyRightForJob:
      "I have a strong background in computer science and have worked on multiple projects.",
    whyJobRightForMe:
      "This job will provide me with the opportunity to further develop my skills and work on challenging projects.",
  };

  if (!applicant) {
    return <div>Applicant not found</div>;
  }

  /*
  react useState hook to save the current open/close state of the drawer,
  normally variables dissapear afte the function was executed
  */
  const [open, setState] = useState(false);

  
  /*
  function that is being called every time the drawer should open or close,
  the keys tab and shift are excluded so the user can focus between
  the elements with the keys
  */
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    //changes the function state according to the value of open
    setState(open);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="lg" disableGutters="true">
          <Toolbar>

              <Typography variant="h6" sx={{flexGrow: 1, fontWeight: 700}}>
                Brand
              </Typography>

              <Box component="div" sx={{
                display: {
                  xs: 'none',
                  sm: 'block',
                }
              }}>
                {search}
              </Box>

              <IconButton 
                edge="start" 
                color="inherit" 
                aria-label="open drawer" 
                onClick={toggleDrawer(true)}
                sx={{ 
                  mr: 2,
                  display: {
                    xs: 'block',
                    sm: 'none',
                  }
                }}
              >
                <MenuIcon />
              </IconButton>

              {/* The outside of the drawer */}
              <Drawer
                //from which side the drawer slides in
                anchor="right"
                //if open is true --> drawer is shown
                open={open}
                //function that is called when the drawer should close
                onClose={toggleDrawer(false)}
                //function that is called when the drawer should open
                onOpen={toggleDrawer(true)}
              >
                  {/* The inside of the drawer */}
                  <Box sx={{
                    p: 2,
                    height: 1,
                    backgroundColor: "#dbc8ff",
                  }}>

                    {/* 
                    when clicking the icon it calls the function toggleDrawer 
                    and closes the drawer by setting the variable open to false
                    */}
                    <IconButton sx={{mb: 2}}>
                      <CloseIcon onClick={toggleDrawer(false)} />
                    </IconButton>

                    <Divider sx={{mb: 2}} />

                    <Box sx={{mb: 2}}>
                      <ListItemButton>
                        <ListItemIcon>
                          <ImageIcon sx={{color: "primary.main"}}/>
                        </ListItemIcon>
                        <ListItemText primary="Pictures" />
                      </ListItemButton>

                      <ListItemButton>
                        <ListItemIcon>
                          <DescriptionIcon sx={{color: "primary.main"}}/>
                        </ListItemIcon >
                        <ListItemText primary="Documents" />
                      </ListItemButton>

                      <ListItemButton>
                        <ListItemIcon>
                          <FolderIcon sx={{color: "primary.main"}} />
                        </ListItemIcon>
                        <ListItemText primary="Other" />
                      </ListItemButton>
                    </Box>
                    
                    {search}

                    <Box sx={{
                      display: "flex", 
                      justifyContent:"center", 
                      position: "absolute", 
                      bottom: "0", 
                      left: "50%", 
                      transform: "translate(-50%, 0)"}}
                    >
                      <Button variant="contained" sx={{m:1, width: .5}}>Register</Button>
                      <Button variant="outlined" sx={{m:1, width: .5}}>Login</Button> 
                    </Box>
                  </Box>
                
              </Drawer>

            </Toolbar>
        </Container>
      </AppBar>
  );
      <Container>
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h1">{applicant.name}</Typography>
          <Typography variant="h2">Applicant Details</Typography>
          <List>
            <ListItem>
              <ListItemText primary="ID" secondary={applicant.id} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Name" secondary={applicant.name} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" secondary={applicant.email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Major" secondary={applicant.major} />
            </ListItem>
            <ListItem>
              <ListItemText primary="GPA" secondary={applicant.gpa} />
            </ListItem>
          </List>
          <Box mb={1}>
            <Typography variant="h2">Why I think I'm right for the job</Typography>
            <Typography variant="body1">{applicant.whyRightForJob}</Typography>
          </Box>
          <Box>
            <Typography variant="h2">Why the job is right for me</Typography>
            <Typography variant="body1">{applicant.whyJobRightForMe}</Typography>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default ApplicantDetails;
