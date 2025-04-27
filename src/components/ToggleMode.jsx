import React from "react";
// State
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
import PropTypes from "prop-types";
// Components
import { Box, IconButton, Stack } from "@mui/material";
// Icons
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

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
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        width: "100%",
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
    </Stack>
  );
};

ToggleMode.propTypes = propTypes;
// #endregion

export default ToggleMode;
