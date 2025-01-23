import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { Product, CustomOptions, CartItem } from "../types";
import { AppDispatch } from "../store";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useState } from "react";

interface ProductOptions extends CustomOptions {
  quantity: number;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  description,
  category,
}: Product): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState<ProductOptions>({
    width: "1/2inch",
    length: "12inch",
    quantity: 1,
  });

  const handleOpenModal = (): void => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const handleOptionChange = (
    option: keyof ProductOptions,
    value: string | number
  ): void => {
    setOptions((prev) => ({
      ...prev,
      [option]: value,
    }));
  };

  const handleAddToCart = (options: {
    quantity: number;
    width?: string;
    length?: string;
  }) => {
    const cartOptions: Record<string, string> = {};

    if (options.width) {
      cartOptions.width = options.width;
    }
    if (options.length) {
      cartOptions.length = options.length;
    }

    const cartItem: CartItem = {
      id,
      name,
      price,
      image,
      category,
      quantity: options.quantity,
      options: cartOptions,
    };

    dispatch(addItem(cartItem));
    handleCloseModal();
  };

  return (
    <>
      <Card
        onClick={handleOpenModal}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 4,
          },
        }}
      >
        <CardMedia
          component="div"
          sx={{
            height: 200,
            position: "relative",
            "& img": {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }}
        >
          <img
            src={image}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </CardMedia>
        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
          <Box
            sx={{
              mt: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="p">
              ${price}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal();
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              Customize
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="product-customization-modal"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxWidth: 600,
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <img
                src={image}
                alt={name}
                style={{ width: "100%", height: "auto", borderRadius: 8 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="h2" gutterBottom>
                {name}
              </Typography>
              <Typography variant="body1" paragraph>
                {description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                ${price}
              </Typography>

              <Box sx={{ my: 2 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Size</InputLabel>
                  <Select
                    value={options.width}
                    label="Size"
                    onChange={(e) =>
                      handleOptionChange("width", e.target.value)
                    }
                  >
                    <MenuItem value="1/2inch">1/2 inch</MenuItem>
                    <MenuItem value="3/4inch">3/4 inch</MenuItem>
                    <MenuItem value="1inch">1 inch</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Length</InputLabel>
                  <Select
                    value={options.length}
                    label="Length"
                    onChange={(e) =>
                      handleOptionChange("length", e.target.value)
                    }
                  >
                    <MenuItem value="12inch">12 inches</MenuItem>
                    <MenuItem value="24inch">24 inches</MenuItem>
                    <MenuItem value="36inch">36 inches</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Quantity</InputLabel>
                  <Select
                    value={options.quantity}
                    label="Quantity"
                    onChange={(e) =>
                      handleOptionChange("quantity", Number(e.target.value))
                    }
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleAddToCart(options)}
                sx={{ mt: 2 }}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
