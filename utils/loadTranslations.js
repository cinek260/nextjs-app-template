import i18nInstance from "i18n";

export default (ctx, namespaces) => {
  if (i18nInstance.getInitialProps) {
    return i18nInstance.getInitialProps(ctx.req, namespaces).i18n;
  }
  return null;
};
