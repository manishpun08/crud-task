import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import $axios from "../lib/axios.instance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // api hit
  const { isLoading, isError, error, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (values) => {
      return await $axios.post("/user/register", values);
    },
    // on success
    onSuccess: (response) => {
      navigate("/login");
      return response?.data?.message;
    },
  });
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        gender: "",
        password: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(50, "Must be 50 characters or less")
          .required("User name is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        gender: Yup.string()
          .nullable()
          .oneOf(["male", "female", "other"], "Invalid gender")
          .required("Gender is required"),
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
          <h1 className="text-center fw-bold">Sign Up</h1>

          <div className="row mb-3">
            <div className="col-3 d-flex align-items-center">
              <label htmlFor="name" className="form-label me-2 mb-0">
                Name
              </label>
            </div>
            <div className="col-9">
              <input
                id="name"
                name="name"
                type="text"
                className={`form-control ${
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }`}
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="invalid-feedback">{formik.errors.name}</div>
              ) : null}
            </div>
          </div>

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
                <div className="invalid-feedback">{formik.errors.password}</div>
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

          <div className="row mb-3">
            <div className="col-3 d-flex align-items-center">
              <label htmlFor="gender" className="form-label me-2 mb-0">
                Gender
              </label>
            </div>
            <div className="col-9">
              <select
                id="gender"
                name="gender"
                className={`form-select ${
                  formik.touched.gender && formik.errors.gender
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("gender")}
              >
                <option value="" label="Select gender" />
                <option value="male" label="Male" />
                <option value="female" label="Female" />
                <option value="other" label="Other" />
              </select>
              {formik.touched.gender && formik.errors.gender ? (
                <div className="invalid-feedback">{formik.errors.gender}</div>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            style={{ width: "50%", margin: "0 auto" }}
            className="btn btn-primary text-center align-center"
          >
            Submit
          </button>

          <Link to="/login" className="text-center">
            {" "}
            Already Registered? Login
          </Link>
        </form>
      )}
    </Formik>
  );
};

export default RegisterUser;
