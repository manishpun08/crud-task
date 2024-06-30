import React from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import $axios, { getUserDetails } from "../lib/axios.instance";

const UserDetail = (props) => {
  const params = useParams();

  // api hit
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-user-details"],
    queryFn: () => {
      return getUserDetails(params?.id);
    },
  });
  const userDetails = data?.data.userDetails;
  console.log(userDetails);

  return (
    <>
      <div className="container text-center">
        <h1 className="fw-bold">User Details</h1>
      </div>

      <div
        className="container my-2"
        style={{
          gap: "1rem",
          padding: "2rem",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          width: "800px",
          borderRadius: "10px",
          transform: "translateY(5%)",
          margin: "auto",
        }}
      >
        <div className="row">
          <div className="col-6">
            <strong>User Name:</strong>
          </div>
          <div className="col-6">
            <p className="text-capitalize"> {userDetails?.name}</p>
          </div>
          <div className="col-6">
            <strong>Email Address:</strong>
          </div>
          <div className="col-6">
            <p>{userDetails?.email}</p>
          </div>

          <div className="col-6">
            <strong>Gender:</strong>
          </div>
          <div className="col-6">
            <p className="text-capitalize">{userDetails?.gender}</p>
          </div>
          <div className="col-6">
            <strong>Created At:</strong>
          </div>
          <div className="col-6">
            <p className="text-capitalize">{userDetails?.createdAt}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
