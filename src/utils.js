// Update tab titles
export const updateTitle = (title) => (document.title = title);

// Theming
export const getStoredMode = () => localStorage.getItem("mode");

export const getPreferredMode = () => {
  const storedMode = getStoredMode();
  if (storedMode) {
    return storedMode;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};
