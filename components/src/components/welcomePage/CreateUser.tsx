import { Label } from "@mui/icons-material";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Input,
  InputLabel,
  Snackbar,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { loginState, setUserInBrowserStorage } from "../state/loginState";

export const CreateUser = () => {
  const router = useRouter();
  const setLoginState = useSetRecoilState(loginState);
  // TODO: validate data
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setConfirmationPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    email: Yup.string().email().required("email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: ({
      username,
      password,
      email,
    }: {
      username: string;
      password: string;
      email: string;
    }) => {
      handleCreateUser({
        username,
        password,
        email,
      });
    },
  });

  const [toastData, setToastData] = useState<{
    show: boolean;
    message: string;
    type: string;
  } | null>(null);

  const handleCreateUser = async ({
    username,
    password,
    email,
  }: {
    username: string;
    password: string;
    email: string;
  }) => {
    if (username.length == 0) return;
    const userId = await axios
      .post(`http://localhost:8080/createUser`, {
        username,
        email,
        password,
      })
      .then((res) => {
        setToastData({
          show: true,
          message: "User created successfully",
          type: "success",
        });
        setLoginState({ id: res.data.id, username: res.data.name });
        setUserInBrowserStorage(res.data.name, res.data.id);
        router.push("/");
      })
      .catch((error) => {
        setToastData({
          show: true,
          message: "Username already exists",
          type: "error",
        });
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 400,
          height: 500,
          borderRadius: "5%",
          backgroundColor: "#eddcb7",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <InputLabel
            htmlFor="username"
            style={{ color: "#1976d2", fontSize: "20px" }}
          >
            Username
          </InputLabel>
          <TextField
            value={formik.values.username}
            id="username"
            label="Pick a username"
            variant="outlined"
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <InputLabel
            htmlFor="email"
            style={{ color: "#1976d2", fontSize: "20px" }}
          >
            Email
          </InputLabel>
          <TextField
            value={formik.values.email}
            id="email"
            name="email"
            label="email@domain.com"
            variant="outlined"
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <InputLabel
            htmlFor="password"
            style={{ color: "#1976d2", fontSize: "20px" }}
          >
            Password
          </InputLabel>
          <TextField
            value={formik.values.password}
            type={showPassword ? "text" : "password"}
            id="password"
            label="password"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button
            sx={{ marginTop: "20px", width: "200px", alignSelf: "center" }}
            variant="contained"
            type="submit"
          >
            Register now!
          </Button>
        </form>
        <Snackbar
          open={toastData?.show}
          autoHideDuration={5000}
          onClose={(e) => setToastData(null)}
        >
          <Alert
            severity={toastData?.type as AlertColor}
            sx={{ width: "100%" }}
          >
            {toastData?.message}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};
