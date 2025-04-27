import React, { useState, useEffect } from "react";
import { useGetUserActivityQuery } from "../features/github/githubApiSlice";
import {
  Box,
  CircularProgress,
  Grid,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

// #region constants
const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const today = new Date();
const fourWeeksAgo = new Date();
fourWeeksAgo.setDate(today.getDate() - 28);
// Define a consistent tile width
const tileWidth = "3rem";
// Define colors for activity levels
const activityColorsDark = [
  "#1e1e1e", // Level 0 (no activity)
  "#3c3c3c", // Level 1
  "#4d4d4d", // Level 2
  "#5c5c5c", // Level 3
  "#6b6b6b", // Level 4
  "#7a7a7a", // Level 5 (most activity)
];
const activityColorsLight = [
  "#ebedf0", // Level 0 (no activity)
  "#c6e48b", // Level 1
  "#7bc96f", // Level 2
  "#239a3b", // Level 3
  "#196127", // Level 4
  "#0f3d16", // Level 5 (most activity)
];
// #endregion

// #region functions
const formatDate = (date) =>
  `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
// #endregion

// #region component
const GitHubActivity = () => {
  const [activityLevels, setActivityLevels] = useState(
    Array.from({ length: 4 }, () => Array(7).fill(0))
  );
  const { data: activities, error, isLoading } = useGetUserActivityQuery();
  const theme = useTheme();
  // Update activity levels when activities change
  useEffect(() => {
    if (activities) {
      const updatedActivityLevels = Array.from({ length: 4 }, () =>
        Array(7).fill(0)
      );
      activities.forEach((activity) => {
        const activityDate = new Date(activity.created_at);
        // Check if the activity date is within the last 4 weeks
        if (activityDate >= fourWeeksAgo && activityDate <= today) {
          const weekIndex = Math.floor(
            (today - activityDate) / (7 * 24 * 60 * 60 * 1000)
          );
          const dayIndex = activityDate.getDay();
          // Increment the activity level for the corresponding week and day
          if (weekIndex < 4 && dayIndex >= 0 && dayIndex < 7) {
            updatedActivityLevels[weekIndex][dayIndex]++;
          }
        }
      });

      setActivityLevels(updatedActivityLevels);
    }
  }, [activities]);
  // Use the appropriate color palette based on the theme mode
  const activityColors =
    theme.palette.mode === "dark" ? activityColorsDark : activityColorsLight;
  // Get username from the first activity (fallback to "Unknown User")
  const username = activities?.[0]?.actor?.login || "Unknown User";
  // Format the date range for display
  const dateRange = `${formatDate(fourWeeksAgo)} - ${formatDate(today)}`;

  // Handle loading state
  if (isLoading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <CircularProgress />
      </Box>
    );
  }
  // Handle error state
  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: "center", marginTop: "2rem" }}>
        Error fetching data
      </Typography>
    );
  }
  // Ensure activities is defined and has data
  if (!activities || activities.length === 0) {
    return (
      <Typography
        color="textSecondary"
        sx={{ textAlign: "center", marginTop: "2rem" }}
      >
        No activity data available.
      </Typography>
    );
  }

  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      {/* Dynamic Date Range Tile */}
      <Typography
        variant="h6"
        sx={{
          marginBottom: "1rem",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {username} GitHub Activity ({dateRange})
      </Typography>
      {/* Container */}
      <Stack
        sx={{
          flexDirection: "column",
          maxWidth: "90vw",
        }}
      >
        {/* Days of the Week Grid */}
        <Grid container justifyContent="space-evenly" flexWrap="nowrap">
          {daysOfWeek.map((day, index) => (
            <Grid
              key={`day-label-${index}`}
              sx={{
                width: tileWidth,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>
        {/* Activity Grid */}
        <Grid container>
          {Array.from({ length: 7 }).map((_, dayIndex) => (
            <Grid key={`day-${dayIndex}`}>
              <Stack flexDirection={"column"}>
                {activityLevels.map((week, weekIndex) => {
                  const level = week[dayIndex];
                  const colorIndex = Math.min(level, activityColors.length - 1);
                  const activityColor = activityColors[colorIndex];
                  return (
                    <Tooltip
                      key={`week-${weekIndex}`}
                      title={`${level} event${level !== 1 ? "s" : ""}`}
                      arrow
                    >
                      <Box
                        sx={{
                          width: tileWidth,
                          height: tileWidth,
                          border: `1px solid ${
                            theme.palette.mode === "dark" ? "#444" : "#ccc"
                          }`,
                          margin: "0.1rem 0",
                          borderRadius: "2px",
                          backgroundColor: activityColor,
                        }}
                      />
                    </Tooltip>
                  );
                })}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};
// #endregion

export default GitHubActivity;
