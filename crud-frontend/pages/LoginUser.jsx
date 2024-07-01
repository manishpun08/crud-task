import { Formik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import $axios from "../lib/axios.instance";

const handleClickShowPassword = () => setShowPassword((show) => !show);

const LoginUser = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  //api hit
  const { isLoading, isError, error, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (values) => {
      return $axios.post("/user/login", values);
    },
    // on success
    onSuccess: (response) => {
      navigate("/home");
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("name", response?.data?.user?.name);
      localStorage.setItem("userId", response?.data?.user?._id);
    },
  });
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .required("Password is required.")
            .trim()
            .min(4, "Password must be at least 4 characters.")
            .max(20, "Password must be at most 20 characters."),
        })}
        onSubmit={(values) => {
          console.log(values);
          mutate(values);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "2rem",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              width: "400px",
              borderRadius: "10px",
              transform: "translateY(5%)",
              margin: "auto",
            }}
          >
            <h1 className="text-center fw-bold">Sign In</h1>

            <div className="row mb-3">
              <div className="col-3 d-flex align-items-center">
                <label htmlFor="email" className="form-label me-2 mb-0">
                  Email
                </label>
              </div>
              <div className="col-9">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-control ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>

            <div className="row ">
              <div className="col-3 d-flex align-items-center">
                <label htmlFor="password" className="form-label me-2 mb-0">
                  Password
                </label>
              </div>
              <div className="col-9 position-relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${
                    formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("password")}
                />

                {formik.touched.password && formik.errors.password ? (
                  <div className="invalid-feedback">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </div>
            {/* Toggle password visibility */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="showPassword"
                onChange={handleClickShowPassword}
              />
              <label className="form-check-label" htmlFor="showPassword">
                Show Password
              </label>
            </div>

            <button
              type="submit"
              style={{ width: "70%", margin: "0 auto" }}
              className="btn btn-primary text-center align-center"
            >
              Submit
            </button>

            <Link to="/forgot-password" className="text-center">
              Forget Password?
            </Link>
            <Link to="/register" className="text-center">
              New here? Register
            </Link>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginUser;
