import "../styles/globals.css";
import buildClient from "../api/build-client";
import Header from "../components/Header";

const Appcomponent = ({ Component, pageProps, currentUser }) => {
  console.log("current user app", currentUser);
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
  let pageProps = {};
  let currentUser = undefined;
  try {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get("/api/users/currentuser");
    currentUser = data.currentUser;

    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    //console.log("pageprops", pageProps);
  } catch (err) {
    console.log(err);
  }
  return { pageProps, ...currentUser };
};

export default Appcomponent;
