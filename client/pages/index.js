import axios from "axios";
import buildClient from "../api/build-client";

const LandingPage = ({ data }) => {
  return data === null ? (
    <>You are not sign in</>
  ) : (
    <h1 className="bg-blue">Landing Page {data?.currentUser?.email}</h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  //'context' prop passed when fun call by next server
  // context = {req,res}
  console.log("i m component");
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default LandingPage;
