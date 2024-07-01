import React from "react";

const Footer = () => {
  return (
    <>
      <div
        className="footer  "
        style={{
          lineHeight: "3rem",
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          background: "#5A639C",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-6">
              <p className="text-light  ">This is Footer </p>
            </div>
            <div className="col-6">
              <p className="text-light text-end ">
                copyrights &#169; by Manish Pun Magar
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
