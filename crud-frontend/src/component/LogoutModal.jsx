import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutModal = (props) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalToggle = () => setModalVisible(!modalVisible);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <React.Fragment>
      <button onClick={handleModalToggle} className="btn btn-primary">
        Logout
      </button>

      <div
        className={`modal fade ${modalVisible ? "show d-block" : "d-none"}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Are you sure you want to logout?</h5>
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
                  handleLogout();
                  handleModalToggle();
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

export default LogoutModal;
