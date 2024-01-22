import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getUserToken, removeToken, setToken } from "../../lib/global";

type TInputFieldTypes = {
  username: string;
  password: string;
};

type TData = {
  token: string;
  message: string;
};

const LoginPage = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<TInputFieldTypes>();

  const [data, setData] = useState<TData>();



  const submitLogin = async (loginData: TInputFieldTypes) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );
      const result = await response.json();
      setData(result);
      if (result.token !== undefined) {
        setToken(result.token);
        navigate("/");
      }
    } catch (error: unknown) {
      removeToken();
      console.error((error as Error).message);
      throw new Error((error as Error).message);
    }
  };

  useEffect(() => {
    const userToken = getUserToken();
    if (userToken) navigate("/");
  }, [navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit((data) => submitLogin(data))}>
        <Card sx={{ maxWidth: "500px", width: "500px" }}>
          <CardContent>
            <Typography variant="h3">Sign In</Typography>
            <TextField
              {...register("username", { required: true })}
              placeholder="Username"
              fullWidth
              sx={{ mt: 4 }}
            />
            <TextField
              {...register("password", { required: true })}
              placeholder="Password"
              fullWidth
              sx={{ mt: 4 }}
            />
            <Button
              sx={{ mt: 4 }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              SUBMIT
            </Button>
            <Typography sx={{ mt: 2 }} color="red">
              {data?.message}
            </Typography>
            <Typography
              onClick={() => {
                navigate("/register");
              }}
              variant="body1"
              sx={{
                color: "blue",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Do not have account? Sign Up
            </Typography>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
};

export default LoginPage;
