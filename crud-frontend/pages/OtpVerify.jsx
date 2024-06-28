import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import $axios from "../lib/axios.instance";

const VerifyOtp = () => {
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["otp-verify"],
    mutationFn: async (values) => {
      return await $axios.post("/otp/verify", {
        email: localStorage.getItem("email"),
        otp: values.otp,
      });
    },
    onSuccess: (res) => {
      navigate("/reset-password");
    },
  });

  return (
    <Formik
      initialValues={{
        otp: "",
      }}
      validationSchema={Yup.object({
        otp: Yup.number().required("Otp is required."),
      })}
      onSubmit={(values) => {
        mutate(values);
        console.log(values);
      }}
    >
      {(formik) => (
        <form
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
          onSubmit={formik.handleSubmit}
        >
          <h2 className="fw-bold text-center ">OTP Verification</h2>

          <p>Please enter the OTP sent to your email</p>
          <div className="mb-3">
            <input
              type="text"
              className={`form-control text-center ${
                formik.touched.otp && formik.errors.otp ? "is-invalid" : ""
              }`}
              {...formik.getFieldProps("otp")}
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                letterSpacing: "40px",
              }}
            />
            {formik.touched.otp && formik.errors.otp ? (
              <div className="invalid-feedback">{formik.errors.otp}</div>
            ) : null}
          </div>

          <div className="d-flex flex-column gap-2">
            <button type="submit" className="btn btn-primary">
              Verify
            </button>
            <button type="button" className="btn btn-outline-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default VerifyOtp;
