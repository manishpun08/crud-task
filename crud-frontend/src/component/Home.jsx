import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import $axios from "../../lib/axios.instance";
import DeleteUserModal from "./DeleteUserModal";

const Home = () => {
  const navigate = useNavigate();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-user"],
    queryFn: async () => {
      return await $axios.get("/user/get");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const getUser = data?.data;

  return (
    <div>
      <div className="mt-3">
        <div className="container">
          <div className="add_btn my-2">
            <button
              onClick={() => {
                navigate("/add/user");
              }}
              className="btn btn-primary"
            >
              Add Person
            </button>
          </div>
          <div className="table-responsive">
            {isLoading ? (
              <p>Loading...</p>
            ) : isError ? (
              <p>Error: {error.message}</p>
            ) : (
              <table className="table mt-2">
                <thead>
                  <tr className="table-dark">
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th className="text-center" scope="col">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getUser.length === 0 ? (
                    <tr>
                      <td className="text-center" colSpan="5">
                        <h2 className="text-danger fw-bold">No User Found</h2>
                      </td>
                    </tr>
                  ) : (
                    getUser.map((item, index) => (
                      <tr key={item._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.gender}</td>
                        <td className="d-flex justify-content-between">
                          <button
                            onClick={() => {
                              navigate(`/userDetail/${item._id}`);
                            }}
                            className="btn btn-success"
                          >
                            <i className="fa-solid fa-eye"></i>
                          </button>
                          <button
                            onClick={() => {
                              navigate(`/editUser/${item._id}`);
                            }}
                            className="btn btn-primary"
                          >
                            <i className="fa-solid fa-pen"></i>
                          </button>
                          <DeleteUserModal _id={item._id} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
