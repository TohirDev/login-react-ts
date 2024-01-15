import { useEffect } from "react";
import { getUserToken, removeToken } from "../../lib/global";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userToken = getUserToken();
    if (!userToken) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h3">Logo</Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ mx: 2 }}>Home</Typography>
        <Typography sx={{ mx: 2 }}>About</Typography>
        <Typography sx={{ mx: 2 }}>Service</Typography>
        <Typography sx={{ mx: 2 }}>Shop</Typography>
        <Typography sx={{ mx: 2 }}>Contact</Typography>
      </Box>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          removeToken();
          navigate("/login");
        }}
      >
        Log Out
      </Button>
    </Box>
  );
};

export default HomePage;
