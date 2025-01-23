import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Alert,
  Card,
  CardContent,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { RootState } from "../store/store";
import { clearCart } from "../store/cartSlice";
import emailService from "../services/emailService";
import { CustomerInfo, CartItem } from "../types";

const initialCustomerInfo: CustomerInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
  },
  notes: "",
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  // Accepts formats: (123) 456-7890, 123-456-7890, 1234567890
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
};

const steps = ["Review Order", "Customer Information", "Confirm Order"];

export default function Checkout(): JSX.Element {
  const [activeStep, setActiveStep] = useState(0);
  const [customerInfo, setCustomerInfo] =
    useState<CustomerInfo>(initialCustomerInfo);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    phone?: string;
  }>({});

  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce<number>(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  const handleNext = () => {
    if (activeStep === 1 && !validateForm()) {
      setErrorMessage("Please fill in all required fields");
      setShowError(true);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCustomerInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Clear validation error when user starts typing
    if (name === "email" || name === "phone") {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    if (name.startsWith("address.")) {
      const addressField = name.split(
        "."
      )[1] as keyof typeof customerInfo.address;
      setCustomerInfo((prev) => {
        const newInfo = {
          ...prev,
          address: {
            ...prev.address!,
            [addressField]: value,
          },
        };
        console.log(`Updating ${name} to:`, value);
        console.log("New customer info:", newInfo);
        return newInfo;
      });
    } else {
      setCustomerInfo((prev) => {
        const newInfo = {
          ...prev,
          [name]: value,
        };
        console.log(`Updating ${name} to:`, value);
        console.log("New customer info:", newInfo);
        return newInfo;
      });
    }
  };

  const validateForm = () => {
    const { firstName, lastName, email, phone, address } = customerInfo;
    const errors: { email?: string; phone?: string } = {};

    console.log("Validating form with data:", {
      firstName,
      lastName,
      email,
      phone,
      address,
    });

    if (!firstName || !lastName) {
      console.log("Name validation failed");
      return false;
    }

    if (!email || !isValidEmail(email)) {
      console.log("Email validation failed");
      errors.email = "Please enter a valid email address";
    }

    if (!phone || !isValidPhone(phone)) {
      console.log("Phone validation failed");
      errors.phone = "Please enter a valid phone number";
    }

    if (
      !address?.street ||
      !address?.city ||
      !address?.state ||
      !address?.zipCode
    ) {
      console.log("Address validation failed");
      return false;
    }

    const hasErrors = Object.keys(errors).length > 0;
    console.log("Validation result:", hasErrors ? "Failed" : "Passed");

    if (hasErrors) {
      setValidationErrors(errors);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    // Validate form first
    if (!validateForm()) {
      setErrorMessage("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      // Log customer info before preparing order details
      console.log("Customer info before submission:", {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
        phone: customerInfo.phone,
        notes: customerInfo.notes,
        address: customerInfo.address,
      });

      // Prepare order details
      const orderDetails = {
        customerInfo,
        items,
        total,
        orderDate: new Date().toISOString(),
      };

      console.log(
        "Order details before sending:",
        JSON.stringify(orderDetails, null, 2)
      );

      // Send confirmation email to customer
      const emailSuccess = await emailService.sendOrderConfirmation(
        orderDetails
      );
      console.log("Confirmation email result:", emailSuccess);

      // Send notification email to admin
      const notificationSuccess = await emailService.sendOrderNotification(
        orderDetails
      );
      console.log("Notification email result:", notificationSuccess);

      if (!emailSuccess || !notificationSuccess) {
        setErrorMessage(
          "Order placed but there was an issue sending confirmation emails."
        );
      }

      // Clear cart and redirect to confirmation page
      dispatch(clearCart());
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Error processing order:", error);
      setErrorMessage("Failed to process order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderOrderReview = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {items.map((item: CartItem) => (
          <ListItem key={item.id}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1">{item.name}</Typography>
              {item.options &&
                Object.entries(item.options).map(([key, value]) => (
                  <Typography key={key} variant="body2" color="text.secondary">
                    {key}: {value}
                  </Typography>
                ))}
              <Typography variant="body2" color="text.secondary">
                Quantity: {item.quantity}
              </Typography>
            </Box>
            <Typography variant="body2">
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        <Divider />
        <ListItem>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${total.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
    </Box>
  );

  const renderCustomerInfoForm = () => {
    return (
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="firstName"
              label="First Name"
              value={customerInfo.firstName}
              onChange={handleCustomerInfoChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="lastName"
              label="Last Name"
              value={customerInfo.lastName}
              onChange={handleCustomerInfoChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              value={customerInfo.email}
              onChange={handleCustomerInfoChange}
              error={!!validationErrors.email}
              helperText={validationErrors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="phone"
              label="Phone Number"
              value={customerInfo.phone}
              onChange={handleCustomerInfoChange}
              error={!!validationErrors.phone}
              helperText={validationErrors.phone || "Format: 123-456-7890"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="address.street"
              label="Street Address"
              value={customerInfo.address?.street}
              onChange={handleCustomerInfoChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="address.city"
              label="City"
              value={customerInfo.address?.city}
              onChange={handleCustomerInfoChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              fullWidth
              name="address.state"
              label="State"
              value={customerInfo.address?.state}
              onChange={handleCustomerInfoChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              fullWidth
              name="address.zipCode"
              label="ZIP Code"
              value={customerInfo.address?.zipCode}
              onChange={handleCustomerInfoChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="notes"
              label="Order Notes (Optional)"
              value={customerInfo.notes}
              onChange={handleCustomerInfoChange}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderConfirmation = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order Confirmation
      </Typography>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.50", mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Customer Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              Name: {customerInfo.firstName} {customerInfo.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">Email: {customerInfo.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">Phone: {customerInfo.phone}</Typography>
          </Grid>
          {customerInfo.address && (
            <Grid item xs={12}>
              <Typography variant="body2">
                Address: {customerInfo.address.street},{" "}
                {customerInfo.address.city}, {customerInfo.address.state}{" "}
                {customerInfo.address.zipCode}
              </Typography>
            </Grid>
          )}
          {customerInfo.notes && (
            <Grid item xs={12}>
              <Typography variant="body2">
                Notes: {customerInfo.notes}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
      {renderOrderReview()}
    </Box>
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderOrderReview();
      case 1:
        return renderCustomerInfoForm();
      case 2:
        return renderConfirmation();
      default:
        return "Unknown step";
    }
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Your cart is empty
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button variant="contained" onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card>
        <CardContent>
          {getStepContent(activeStep)}

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ minWidth: 200 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Place Order"}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Order submitted successfully! Redirecting to home page...
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setShowError(false)}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
