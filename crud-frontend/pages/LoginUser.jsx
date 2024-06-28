import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import $axios from "../lib/axios.instance";

const LoginUser = () => {
  const navigate = useNavigate();

  //api hit
  const { isLoading, isError, error, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (values) => {
      return $axios.post("/user/login", values);
    },
    // on success
    onSuccess: (response) => {
      navigate("/home");
      return response?.data?.message;
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

            <div className="email">
              <label className="me-5" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                className="form-label"
                type="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="password">
              <label htmlFor="password" className="form-label me-3">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
            </div>

            <button
              type="submit"
              style={{ width: "50%", margin: "0 auto" }}
              className="btn btn-primary text-center align-center"
            >
              Submit
            </button>

            <Link to="/forgot-password" className="text-center">
              Forget Password{" "}
            </Link>
            <Link to="/register" className="text-center">
              New here? Register{" "}
            </Link>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginUser;
