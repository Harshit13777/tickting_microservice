import axios from "axios";

export default ({ req }) => {
  //'req'(request obj) is recived only on server side
  // req obj contain browser request
  if (typeof window === "undefined") {
    //we are on server !
    //client (next.js) make request inside kubenete cluster in container to a cluster ip service ingress-nginx
    // http://SERVICENAME.NAMESPACE.svc.cluster.local
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    //we are in browser !;
    return axios.create({
      baseURL: "/",
    });
  }
};
