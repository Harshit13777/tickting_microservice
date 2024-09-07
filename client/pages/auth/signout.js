import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";

export default () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "get",
    onSuccess: () => {
      console.log("hello i run after logout");
      Router.push("/");
    },
  });
  useEffect(() => {
    doRequest();
  }, []);
  return <div>Signing you out...</div>;
};
