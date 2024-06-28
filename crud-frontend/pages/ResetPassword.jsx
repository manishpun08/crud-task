import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import $axios from "../lib/axios.instance";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { isLoading, mutate } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async (values) => {
      return await $axios.put("/otp/change-password", {
        email: localStorage.getItem("email"),
        newPassword: values.newPassword,
      });
    },
    onSuccess: (res) => {
      navigate("/login");
      localStorage.clear();
    },
  });

  return (
    <div className="container" style={{ marginTop: "10%" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h2 className="text-center">Reset Password</h2>
            <p className="text-center">Please choose your new password.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutate({
                  newPassword: e.target.newPassword.value,
                  confirmNewPassword: e.target.confirmNewPassword.value,
                });
              }}
            >
              {/* Password */}
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="newPassword"
                  name="newPassword"
                  aria-describedby="passwordHelp"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label htmlFor="confirmNewPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  required
                />
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

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
