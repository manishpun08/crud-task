import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import $axios from "../lib/axios.instance";

const EditUser = () => {
  const navigate = useNavigate();
  const params = useParams();

  // api hit
  // get user details
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-user-details"],
    queryFn: async () => {
      return await $axios.get(`/user/details/${params.id}`);
    },
  });

  const userDetails = data?.data?.userDetails;

  // for mutating/edit
  const {
    isLoading: editUserLoading,
    isError: editUserError,
    error: userError,
    mutate,
  } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (values) => {
      return await $axios.post("/user/register", values);
    },
    // on success
    onSuccess: (response) => {
      navigate("/home");
      return response?.data?.message;
    },
  });
  return (
    <Formik
      enableReinitialize
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

          <div className="name">
            <label htmlFor="name" className="form-label me-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="email">
            <label className="me-4" htmlFor="email">
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

          <div className="gender">
            <select
              id="gender"
              name="gender"
              className="form-select"
              {...formik.getFieldProps("gender")}
            >
              <option value="" label="Select gender" />
              <option value="male" label="Male" />
              <option value="female" label="Female" />
              <option value="other" label="Other" />
            </select>
            {formik.touched.gender && formik.errors.gender ? (
              <div className="text-danger">{formik.errors.gender}</div>
            ) : null}
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

export default EditUser;
