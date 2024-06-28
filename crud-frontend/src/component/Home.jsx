import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Home = () => {
  return (
    <div>
      <div className="mt-3">
        <div className="container">
          <div className="add_btn  my-2">
            <button className="btn btn-primary">Add Person</button>
          </div>
          <div className="table-responsive">
            <table className="table mt-2 ">
              <thead>
                <tr className="table-dark">
                  <th scope="col">id </th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto@gmail.com</td>
                  <td>male</td>
                  <td className="d-flex justify-content-between">
                    <button className="btn btn-success">
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    <button className="btn btn-primary">
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button className="btn btn-danger">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
