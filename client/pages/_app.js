import "../styles/globals.css";
import buildClient from "../api/build-client";
import Header from "../component/Header";

const Appcomponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser}></Header>
      <Component {...pageProps} />;
    </div>
  );
};

Appcomponent.getInitialProps = async (appContext) => {
  //appContext = {Component ,ctx:{req,res}}
  console.log("i m app");
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = appContext.Component.getInitialProps(appContext.ctx);
  }
  return { pageProps, ...data.currentUser };
};

export default Appcomponent;
