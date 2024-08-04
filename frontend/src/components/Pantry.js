"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  getDoc,
} from "firebase/firestore";
import { firestore } from "@/utils/firebase";
import {
  Box,
  Stack,
  Typography,
  Fab,
  Modal,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { BorderAllRounded, StackedBarChart } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 200,
  bgcolor: "#FFC0CC",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function Pantry() {
  const [inventory, setInventory] = useState([]);
  const [vegeInventory, setVegeInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quant, setQuant] = useState(0);
  const [showdelete, setShowDelete] = useState(false);
  const [showVegedelete, setShowVegeDelete] = useState(false);

  const [typeofInventory, setTypeofInventory] = useState("");
  console.log("typeof inve", typeofInventory);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dragStart = () => setShowDelete(true);
  const dragStop = () => setShowDelete(false);
  const dragStartVege = () => setShowVegeDelete(true);
  const dragStopVege = () => setShowVegeDelete(false);

  const updateStorage = async () => {
    const snapshot = query(collection(firestore, "Fruits"));
    const vegeSnapshot = query(collection(firestore, "Vegetables"));
    const fruitDocs = await getDocs(snapshot);
    const vegeDocs = await getDocs(vegeSnapshot);

    const inventoryList = [];
    const vegeInventoryList = [];
    fruitDocs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    vegeDocs.forEach((doc) => {
      vegeInventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
    setVegeInventory(vegeInventoryList);
  };

  console.log("fruits", inventory);
  console.log("vege", vegeInventory);

  const removeItemCompletely = async (item, typeofInvent) => {
    console.log("ITEeeeeeeeeem", item);
    const docRef = doc(firestore, typeofInvent, item);
    await deleteDoc(docRef);
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "Fruits"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity == 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateStorage();
  };

  const AddItemToStorage = async (itemName, quant, documentName) => {
    const docRef = doc(firestore, documentName, itemName);
    await setDoc(docRef, { quantity: quant });
    updateStorage();
  };

  const AddItem = async (item, typeofInvent) => {
    const docRef = doc(collection(firestore, typeofInvent), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity == 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: Number(quantity) + 1 });
      }
    }
    await updateStorage();
  };

  useEffect(() => {
    updateStorage();
  }, []);
  return (
    <Box width="100%" height={"100%"} bgcolor={""}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack width="100%" direction={"column"} spacing={2}>
            <Stack direction={"row"} justifyContent={"space-between"} gap={2}>
              <Box>
                <Typography>Name</Typography>
                <TextField
                  d="outlined-basic"
                  label="Guava"
                  variant="outlined"
                  fullWidth
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </Box>
              <Box>
                <Typography>Quantity</Typography>
                <TextField
                  d="outlined-basic"
                  label="1000"
                  variant="outlined"
                  fullWidth
                  value={quant}
                  onChange={(e) => setQuant(e.target.value)}
                />
              </Box>
              <Box>
                <Typography>Quantity</Typography>
                <FormControl sx={{ width: "200px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Fruits or Vege
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={typeofInventory}
                    label="Type"
                    onChange={(e) => setTypeofInventory(e.target.value)}
                  >
                    <MenuItem value={"Fruits"}>Fruits</MenuItem>
                    <MenuItem value={"Vegetables"}>Vegetables</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
            <Stack
              width={"100%"}
              justifyContent={"space-between"}
              direction={"row"}
            >
              <Button
                small
                sx={{ bgcolor: "#C8B4E7" }}
                onClick={() => {
                  AddItemToStorage(itemName, quant, typeofInventory);
                  handleClose();
                }}
              >
                Add
              </Button>
              <Button small sx={{ bgcolor: "#C8B4E7" }} onClick={handleClose}>
                Close
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
      <Stack width={"100%"} height={"50%"} alignItems={"center"}>
        <Typography
          variant="h2"
          fontSize={30}
          height={"10%"}
          width={"100%"}
          textAlign={"center"}
          style={{
            background: "linear-gradient(to right, #6a0dad, #e6e6fa)", // Gradient from purple to whitest purple
            position: "relative",
            overflow: "hidden",
          }}
        >
          Fruits
        </Typography>
        <Stack width={"100%"} height={"90%"} direction={"row"}>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            width={showdelete ? "50%" : "100%"}
            height={"100%"}
          >
            <Box
              bgcolor={"pink"}
              width={"500px"}
              height={"380px"}
              overflow={"scroll"}
              padding={"10px"}
              gap={1}
            >
              {inventory.map(({ name, quantity }) => (
                <Stack
                  key={name}
                  borderRadius={3}
                  border={"2px solid gray"}
                  bgcolor={"#C8B4E7"}
                  direction={"row"}
                  height={"80px"}
                  justifyContent={"space-between"}
                  marginBottom={"10px"}
                  alignItems={"center"}
                  paddingX={5}
                  draggable
                  onDragStart={(e) => {
                    dragStart();
                    e.dataTransfer.setData("text/plain", name);
                  }}
                >
                  <Stack>
                    <Typography variant="h5">{name}</Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    gap={2}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Box>
                      <Fab
                        size="small"
                        color="secondary"
                        aria-label="add"
                        onClick={() => AddItem(name, "Fruits")}
                      >
                        <AddIcon />
                      </Fab>
                    </Box>
                    <Box>
                      <Typography variant="h5">{quantity}</Typography>
                    </Box>
                    <Box>
                      <Fab
                        size="small"
                        color="secondary"
                        aria-label="add"
                        onClick={() => removeItem(name)}
                      >
                        <RemoveIcon />
                      </Fab>
                    </Box>
                  </Stack>
                </Stack>
              ))}
            </Box>
            <Box
              border={2}
              borderRadius={10}
              borderColor={"purple"}
              sx={{
                "&:hover": {
                  backgroundColor: "#AEDEF4",
                },
              }}
            >
              <IconButton color="black" aria-label="add to shopping cart">
                <Button onClick={handleOpen}>
                  <AddShoppingCartIcon />
                </Button>
              </IconButton>
            </Box>
          </Stack>
          {showdelete && (
            <Stack
              width={showdelete ? "50%" : "0%"}
              height={"100%"}
              paddingX={20}
              paddingY={10}
              onDrop={async (e) => {
                e.preventDefault();
                const itemName = e.dataTransfer.getData("text/plain");
                console.log("Fffffff", itemName);
                dragStop();
                removeItemCompletely(itemName, "Fruits");
                updateStorage();
              }}
              onDragOver={(e) => e.preventDefault()} // Necessary for drop to work
            >
              <Stack
                id="deleteArea"
                width={"100%"}
                height={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  src={"/dustbin2.png"}
                  alt="dustbin"
                  width={300}
                  height={300}
                />
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
      <Box width={"100%"} height={"50%"}>
        <Stack width={"100%"} height={"100%"} alignItems={"center"}>
          <Typography
            variant="h2"
            fontSize={30}
            height={"10%"}
            width={"100%"}
            textAlign={"center"}
            style={{
              background: "linear-gradient(to right, #6a0dad, #e6e6fa)", // Gradient from purple to whitest purple
              position: "relative",
              overflow: "hidden",
            }}
          >
            Vegetables
          </Typography>
          <Stack width={"100%"} height={"90%"} direction={"row"}>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              width={showVegedelete ? "50%" : "100%"}
              height={"100%"}
            >
              <Box
                bgcolor={"pink"}
                width={"500px"}
                height={"380px"}
                overflow={"scroll"}
                padding={"10px"}
                gap={1}
              >
                {vegeInventory.map(({ name, quantity }) => (
                  <Stack
                    key={name}
                    borderRadius={3}
                    border={"2px solid gray"}
                    bgcolor={"#C8B4E7"}
                    direction={"row"}
                    height={"80px"}
                    justifyContent={"space-between"}
                    marginBottom={"10px"}
                    alignItems={"center"}
                    paddingX={5}
                    draggable
                    onDragStart={(e) => {
                      dragStartVege();
                      e.dataTransfer.setData("text/plain", name);
                    }}
                  >
                    <Stack>
                      <Typography variant="h5">{name}</Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      gap={2}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Box>
                        <Fab
                          size="small"
                          color="secondary"
                          aria-label="add"
                          onClick={() => AddItem(name, "Vegetables")}
                        >
                          <AddIcon />
                        </Fab>
                      </Box>
                      <Box>
                        <Typography variant="h5">{quantity}</Typography>
                      </Box>
                      <Box>
                        <Fab
                          size="small"
                          color="secondary"
                          aria-label="add"
                          onClick={() => removeItem(name)}
                        >
                          <RemoveIcon />
                        </Fab>
                      </Box>
                    </Stack>
                  </Stack>
                ))}
              </Box>
              <Box
                border={2}
                borderRadius={10}
                borderColor={"purple"}
                sx={{
                  "&:hover": {
                    backgroundColor: "#AEDEF4",
                  },
                }}
              >
                <IconButton color="black" aria-label="add to shopping cart">
                  <Button onClick={handleOpen}>
                    <AddShoppingCartIcon />
                  </Button>
                </IconButton>
              </Box>
            </Stack>
            {showVegedelete && (
              <Stack
                width={showVegedelete ? "50%" : "0%"}
                height={"100%"}
                bgcolor={"brown"}
                paddingX={20}
                paddingY={10}
                onDrop={async (e) => {
                  e.preventDefault();
                  const itemName = e.dataTransfer.getData("text/plain");
                  console.log("Fffffff", itemName);
                  dragStopVege();
                  removeItemCompletely(itemName, "Vegetables");
                  updateStorage();
                }}
                onDragOver={(e) => e.preventDefault()} // Necessary for drop to work
              >
                <Stack
                  id="deleteArea"
                  width={"100%"}
                  height={"100%"}
                  bgcolor={"purple"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Image
                    src={"/dustbin2.png"}
                    alt="dustbin"
                    width={100}
                    height={100}
                  />
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
