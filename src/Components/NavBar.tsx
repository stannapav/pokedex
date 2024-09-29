import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h4" className="logo">
        Pokedex
      </Typography>
      <div className="navlinks">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/list" className="link">
          List
        </Link>
      </div>
    </Toolbar>
  </AppBar>
);

export default NavBar;
