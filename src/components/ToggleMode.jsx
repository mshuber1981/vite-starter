import React from "react";
// Icons
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
// State
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
import PropTypes from "prop-types";
// Components
import { Box, IconButton } from "@mui/material";

// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions
const setStoredMode = (mode) => localStorage.setItem("mode", mode);
// #endregion

// #region component
const propTypes = {
  setMode: PropTypes.func.isRequired,
};

const ToggleMode = ({ setMode }) => {
  const mode = useSelector(selectMode);

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    setStoredMode(newMode);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
        p: 3,
      }}
    >
      <IconButton
        sx={{ ml: 1 }}
        onClick={() => toggleMode()}
        color="inherit"
        aria-label={`Toggle theme, currently ${mode}.`}
      >
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};

ToggleMode.propTypes = propTypes;
// #endregion

export default ToggleMode;
