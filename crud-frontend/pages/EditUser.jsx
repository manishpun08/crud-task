import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import $axios, { getUserDetails } from "../lib/axios.instance";

const EditUser = () => {
  const navigate = useNavigate();
  const params = useParams();

  // api hit
  // api hit
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-user-details"],
    queryFn: () => {
      return getUserDetails(params?.id);
    },
  });
  const userDetails = data?.data.userDetails;

  // for mutating/edit
  const {
    isLoading: editUserLoading,
    isError: editUserError,
    error: userError,
    mutate,
  } = useMutation({
    mutationKey: ["edit-user"],
    mutationFn: async (values) => {
      return await $axios.put(`/user/edit/${params.id}`, values);
    },
    // on success
    onSuccess: (response) => {
      navigate(`/userDetail/${params.id}`);
      console.log(response?.data?.message);
    },
    //on error
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });
  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: userDetails?.name || "",
        email: userDetails?.email || "",
        gender: userDetails?.gender || "",
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
          <h1 className="text-center fw-bold">Edit User</h1>

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
            disabled={isLoading}
            style={{ width: "50%", margin: "0 auto" }}
            className="btn btn-primary text-center align-center"
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default EditUser;
