import "../styles/globals.css";
import buildClient from "../api/build-client";
import Header from "../components/Header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  let pageProps = {};
  let datares = undefined;
  try {
    const { data } = await client.get("/api/users/currentuser");

    datares = data;
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
  } catch (e) {
  } finally {
    return {
      pageProps,
      ...datares,
    };
  }
};
//
export default AppComponent;
