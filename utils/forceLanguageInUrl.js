import { languages, languagesPattern } from "../consts";

export default ctx => {
  if (ctx && ctx.req) {
    const pattern = `^(${languagesPattern})$`;
    const regex = new RegExp(pattern, "gm");
    const firstUrlParam = ctx.req.url.split("/").filter(i => i !== "")[0];
    if (firstUrlParam !== "locales") {
      const language = languages.find(l => l === firstUrlParam);
      if (!regex.test(language)) {
        const supportedLanguage = ctx.req.acceptsLanguages(languages) || "en";
        ctx.res.writeHead(302, {
          Location: `${ctx.req.protocol}://${
            ctx.req.headers.host
          }/${supportedLanguage}${ctx.req.url}`
        });
        ctx.res.end();
      }
    }
  }
};
