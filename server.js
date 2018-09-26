const express = require("express");
const path = require("path");
const next = require("next");
const i18nextMiddleware = require("i18next-express-middleware");
const Backend = require("i18next-node-fs-backend");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const i18n = require("./i18n");
const routes = require("./routes");
const { languages } = require("./consts");

const handler = routes.getRequestHandler(app);

// init i18next with serverside settings
// using i18next-express-middleware
i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      fallbackLng: "en",
      preload: languages, // preload all langages
      ns: ["common", "home", "page"], // need to preload all the namespaces
      backend: {
        loadPath: path.join(__dirname, "/locales/{{lng}}/{{ns}}.json"),
        addPath: path.join(__dirname, "/locales/{{lng}}/{{ns}}.missing.json")
      },
      detection: {
        // order and from where user language should be detected
        order: ["path", "session", "querystring", "cookie", "header"],

        // keys or params to lookup language from
        lookupQuerystring: "lng",
        lookupCookie: "i18next",
        lookupSession: "lng",
        lookupPath: "lng",
        lookupFromPathIndex: 0,

        // cache user language
        caches: false, // ['cookie']

        // optional expire and domain for set cookie
        cookieExpirationDate: new Date(),
        cookieDomain: "myDomain",
        cookieSecure: true // if need secure cookie
      }
    },
    () => {
      // loaded translations we can bootstrap our routes
      app.prepare().then(() => {
        const server = express();

        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18n));

        // serve locales for client
        server.use(
          "/locales",
          express.static(path.join(__dirname, "/locales"))
        );

        // missing keys
        server.post(
          "/locales/add/:lng/:ns",
          i18nextMiddleware.missingKeyHandler(i18n)
        );

        // use next.js
        server.get("*", (req, res) => handler(req, res));

        server.listen(3000, err => {
          if (err) throw err;
          // eslint-disable-next-line  no-console
          console.log("> Ready on http://localhost:3000");
        });
      });
    }
  );
