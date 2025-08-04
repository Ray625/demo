import { Quasar, Notify } from "quasar";
import quasarLang from "quasar/lang/zh-TW.js";
import "quasar/src/css/index.sass";
import "@quasar/extras/material-icons/material-icons.css";

export default {
  install(app, options = {}) {
    app.use(Quasar, {
      plugins: { Notify },
      lang: quasarLang,
    });
  },
};
