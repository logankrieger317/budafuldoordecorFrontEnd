import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { Product, CartItem } from "../types";
import {
  Card,
  CardContent,
  CardMedia,
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

interface ProductCardProps {
  product: Product;
}

// interface ProductOptions {
//   quantity: number;
// }

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [options, setOptions] = React.useState<{ quantity: number }>({
    quantity: 1,
  });

  // Debug log to see product data
  React.useEffect(() => {
    if (!product) {
      console.warn("ProductCard received undefined product");
      return;
    }

    console.log("ProductCard received product:", {
      sku: product.sku,
      name: product.name,
      price: product.price,
      category: product.category,
      quantity: product.quantity,
      width: product.width,
      length: product.length,
      isWired: product.isWired,
      imageUrl: product.imageUrl,
      description: product.description,
      fullProduct: product, // Log the full product object for complete inspection
    });
  }, [product]);

  if (!product) {
    return (
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey.100",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Product Not Available
          </Typography>
        </Box>
      </Card>
    );
  }

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= product.quantity) {
      setOptions((prev) => ({
        ...prev,
        quantity: newQuantity,
      }));
    }
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      sku: product.sku,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      quantity: options.quantity,
      width: product.width,
      length: product.length,
      isWired: product.isWired,
      customOptions: {
        width: product.width.toString(),
        length: product.length.toString(),
        isWired: product.isWired,
      },
    };
    dispatch(addItem(cartItem));
    handleCloseModal();
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {product?.imageUrl ? (
        <CardMedia
          component="img"
          height="200"
          image={product.imageUrl}
          alt={product.name}
          sx={{ objectFit: "cover" }}
        />
      ) : (
        <Box
          sx={{
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey.100",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No Image Available
          </Typography>
        </Box>
      )}
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        {product?.description && (
          <Typography variant="body2" color="text.secondary" paragraph>
            {product.description}
          </Typography>
        )}
        <Box sx={{ mt: "auto" }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Category: {product.category}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Width: {product.width}" | Length: {product.length}"
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Type: {product.isWired ? "Wired" : "Non-wired"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="h6" component="span">
              ${product.price}
            </Typography>
            <Typography
              variant="body2"
              color={product.quantity > 0 ? "success.main" : "error.main"}
            >
              {product.quantity > 0
                ? `${product.quantity} in stock`
                : "Out of Stock"}
            </Typography>
          </Box>
          <Button
            variant="contained"
            fullWidth
            onClick={handleOpenModal}
            disabled={product.quantity === 0}
            sx={{ mt: 2 }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>

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
            maxWidth: 800,
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
              {product?.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: "100%", height: "auto", borderRadius: 8 }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "grey.100",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    No Image Available
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>
              {product?.description && (
                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>
              )}
              <Typography variant="h6" gutterBottom>
                ${product.price.toFixed(2)}
              </Typography>

              <Box sx={{ my: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="quantity-label">Quantity</InputLabel>
                  <Select
                    labelId="quantity-label"
                    id="quantity-select"
                    value={options.quantity}
                    label="Quantity"
                    onChange={(e) =>
                      handleUpdateQuantity(Number(e.target.value))
                    }
                  >
                    {Array.from(
                      { length: Math.min(10, product.quantity) },
                      (_, i) => i + 1
                    ).map((num) => (
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
                onClick={handleAddToCart}
                sx={{ mt: 2 }}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Card>
  );
};

export default ProductCard;
