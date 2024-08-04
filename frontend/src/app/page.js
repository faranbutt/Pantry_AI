import styles from "./page.module.css";
import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import MainContent from "@/components/MainContent/MainContent";

export default function Home() {
  return (
    <Box width={"100vw"} height={"100vh"}>
      <Stack
        width={"100%"}
        height={"10%"}
        direction={"row"}
        bgcolor={"#F5F5F5"}
        justifyContent={"space-between"}
        paddingX={2}
        alignItems={"center"}
        borderBottom={"2px solid gray"}
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          <Box>
            <Image
              src={"/logo.png"}
              alt="logo"
              width={50}
              height={50}
              style={{ borderRadius: 10 }}
            />
          </Box>
          <Box>Pantry AI</Box>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          <Box
            fontSize={20}
            color={"#6A0DAD"}
            sx={{
              "&:hover": {
                color: "#8B4513", // Saddle Brown on hover
              },
            }}
          >
            Lunch
          </Box>
          <Box
            fontSize={20}
            color={"#6A0DAD"}
            sx={{
              "&:hover": {
                color: "#8B4513", // Rich Purple on hover
              },
            }}
          >
            Buy
          </Box>
          <Box
            fontSize={20}
            color={"#6A0DAD"}
            sx={{
              "&:hover": {
                color: "#8B4513", // Rich Purple on hover
              },
            }}
          >
            Stock
          </Box>
        </Stack>
        <Stack direction={'row'} gap={2}>
        <Link href={"https://github.com/faranbutt/Pantry_AI"}>
          <Stack
            width={"60px"}
            height={"60px"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={2}
            style={{
              background: "linear-gradient(to right, #6a0dad, #e6e6fa)", // Gradient from purple to whitest purple
              position: "relative",
              overflow: "hidden",
            }}
          >
            <GitHub color="white" />
          </Stack>
        </Link>
        <Link href={"https://www.linkedin.com/in/faranbutt/"}>
            {" "}
            <Stack
              width={"60px"}
              height={"60px"}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={2}
              style={{
                background: "linear-gradient(to right, #89CFF0, #FFFFFF)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <LinkedIn color="white" />
            </Stack>
          </Link>
        </Stack>
      </Stack>
      <Box width={"100%"} height={"1000px"}>
        <MainContent />
      </Box>
      <Stack
        width={"100%"}
        height={"10%"}
        direction={"row"}
        bgcolor={"#F5F5F5"}
        justifyContent={"space-between"}
        paddingX={2}
        alignItems={"center"}
        borderTop={"2px solid gray"}
      >
        <Box>
          <Typography>Made by Faran with ❤️</Typography>
        </Box>
        <Stack direction={"row"} gap={2}>
          <Link href="https://github.com/faranbutt/Pantry_AI">
            {" "}
            <Stack
              width={"60px"}
              height={"60px"}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={2}
              style={{
                background: "linear-gradient(to right, #6a0dad, #e6e6fa)", // Gradient from purple to whitest purple
                position: "relative",
                overflow: "hidden",
              }}
            >
              <GitHub color="white" />
            </Stack>{" "}
          </Link>
          <Link href={"https://www.linkedin.com/in/faranbutt/"}>
            {" "}
            <Stack
              width={"60px"}
              height={"60px"}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={2}
              style={{
                background: "linear-gradient(to right, #89CFF0, #FFFFFF)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <LinkedIn color="white" />
            </Stack>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
