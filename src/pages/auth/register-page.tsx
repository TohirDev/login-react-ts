import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserToken, removeToken, setToken } from "../../lib/global";
import { useForm } from "react-hook-form";

type TInputFieldTypes = {
  username: string;
  password: string;
};

type TData = {
  token: string;
  message: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<TInputFieldTypes>();
  const [data, setData] = useState<TData>();
  const submitRegister = async (registerData: TInputFieldTypes) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
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
      console.log(error);
      // throw new Error(error)
    }
  };

  useEffect(() => {
    const userToken = getUserToken();
    if (userToken) {
      navigate("/");
    }
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
      <form onSubmit={handleSubmit((data) => submitRegister(data))}>
        <Card sx={{ maxWidth: "500px", width: "500px" }}>
          <CardContent>
            <Typography variant="h3">Sign Up</Typography>
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
                navigate("/login");
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
              Sign In?
            </Typography>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
};

export default RegisterPage;
