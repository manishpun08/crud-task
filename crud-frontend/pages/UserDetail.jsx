import React from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import $axios from "../lib/axios.instance";

const UserDetail = (props) => {
//   console.log(props);
  const params = useParams();
  const id = params?._id;

  console.log(id);

  //   const navigate = useNavigate();

  // api hit
  useQuery({
    queryKey: ["get-user-details"],
    queryFn: async () => {
      return await $axios.get(`/user/details/${id}`);
    },
  });
  return <div>hello</div>;
};

export default UserDetail;
