import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import $axios from "../lib/axios.instance";

const ForgetPassword = () => {
  const navigate = useNavigate();

  //api hit
  const { isLoading, isError, error, mutate } = useMutation({
    mutationKey: ["forget-password"],
    mutationFn: async (values) => {
      localStorage.setItem("email", values.email);
      return $axios.post("/otp/send", values);
    },
    onSuccess: (res) => {
      navigate("/otp-verify");
    },
  });

  return (
    <>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Must be a valid email.")
            .required("Email is required."),
        })}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {({ handleSubmit, getFieldProps, touched, errors }) => (
          <form
            onSubmit={handleSubmit}
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
            <h2 className="text-center">Forgot password?</h2>
            <p>
              Enter your email address below and we will send you password reset
              OTP.
            </p>

            <div className="email">
              <label className="me-5" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                className="form-label"
                type="email"
                {...getFieldProps("email")}
              />
              {touched.email && errors.email ? (
                <div className="text-danger">{errors.email}</div>
              ) : null}
            </div>

            <button
              type="submit"
              style={{ width: "50%", margin: "0 auto" }}
              className="btn btn-primary text-center align-center"
            >
              send email
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ForgetPassword;
