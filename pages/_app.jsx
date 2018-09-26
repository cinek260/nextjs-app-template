import App, { Container } from "next/app";
import { Provider, connect } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { startApp } from "actions/app";
import { I18n as I18nR } from "react-i18next";
import i18nInstance from "i18n";
import forceLanguageInUrl from "utils/forceLanguageInUrl";
import createStore from "../data/store";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    forceLanguageInUrl(ctx);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  constructor(props) {
    super();
    props.startApp();
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <I18nR
            ns="common"
            i18n={(pageProps && pageProps.i18n) || i18nInstance}
          >
            {() => <Component {...pageProps} />}
          </I18nR>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(createStore)(
  withReduxSaga({ async: true })(
    connect(
      null,
      {
        startApp
      }
    )(MyApp)
  )
);
