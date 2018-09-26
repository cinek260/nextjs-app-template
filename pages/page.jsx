import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import { Link } from "components";
import loadTranslations from "utils/loadTranslations";
import { string, func } from "prop-types";

const namespaces = ["page", "common"];

class Page extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = {};

    pageProps.i18n = loadTranslations(ctx, namespaces);

    return { ...pageProps };
  }

  render() {
    const { t, lng } = this.props;
    return (
      <div>
        <p>{t("common:hello")}</p>
        <p>{t("common:missingKey")}</p>
        <Link route="/" lng={lng}>
          <a>{t("page")}</a>
        </Link>
      </div>
    );
  }
}

Page.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default withI18next(namespaces)(Page);
