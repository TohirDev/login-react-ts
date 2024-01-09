import { useEffect } from "react";
import { getUserToken, removeToken } from "../../lib/global";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userToken = getUserToken();
    if (!userToken) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Typography variant="h1">HomePage</Typography>
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
    </>
  );
};

export default HomePage;
