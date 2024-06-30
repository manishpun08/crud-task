import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import $axios, { deleteUser } from "../../lib/axios.instance";

const DeleteUserModal = (props) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalToggle = () => setModalVisible(!modalVisible);

  // api hit
  const { isLoading, mutate } = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async (_id) => {
      return await $axios.delete(`/user/delete/${_id}`);
    },

    onSuccess: (res) => {
      navigate("/home");
      queryClient.invalidateQueries("get-user");
      console.log(res?.data?.message);
    },

    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });

  return (
    <React.Fragment>
      <button onClick={handleModalToggle} className="btn btn-danger">
        <i className="fa-solid fa-trash"></i>
      </button>

      <div
        className={`modal fade ${modalVisible ? "show d-block" : "d-none"}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Are you sure you want to delete this user?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleModalToggle}
              ></button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleModalToggle}
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleModalToggle();
                  mutate(props._id);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      {modalVisible && (
        <div
          className="modal-backdrop fade show"
          onClick={handleModalToggle}
        ></div>
      )}
    </React.Fragment>
  );
};

export default DeleteUserModal;
