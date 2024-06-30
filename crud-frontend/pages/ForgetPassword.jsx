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
              Enter your email address below and we will send you a password
              reset OTP.
            </p>

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
                    touched.email && errors.email ? "is-invalid" : ""
                  }`}
                  {...getFieldProps("email")}
                />
                {touched.email && errors.email ? (
                  <div className="invalid-feedback">{errors.email}</div>
                ) : null}
              </div>
            </div>

            <button
              type="submit"
              style={{ width: "50%", margin: "0 auto" }}
              className="btn btn-primary text-center align-center"
            >
              Send Email
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ForgetPassword;
