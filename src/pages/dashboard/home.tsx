import { useEffect } from "react";
import { getUserToken, removeToken } from "../../lib/global";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Button, Collapse, CollapseProps } from "antd";
import useFetch from "../../hooks/useFetch";
const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userToken = getUserToken();
    if (!userToken) {
      navigate("/login");
    }
  }, [navigate]);

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "This is panel header 1",
      children: <p>{text}</p>,
    },
    {
      key: "2",
      label: "This is panel header 2",
      children: <p>{text}</p>,
    },
    {
      key: "3",
      label: "This is panel header 3",
      children: <p>{text}</p>,
    },
  ];

  const { data } = useFetch({ url: "https://dummyjson.com/products" });
  if (data !== undefined) console.log(data);
  return (
    <>
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
          type="primary"
          color="error"
          onClick={() => {
            removeToken();
            navigate("/login");
          }}
        >
          Log Out
        </Button>
      </Box>
      <Button type="primary">aasdf</Button>
      <Collapse items={items} defaultActiveKey={["1"]} />
    </>
  );
};

export default HomePage;
