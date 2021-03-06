const opn = require("opn");

const PORT = process.env.PORT || 3000;

const { log, chalkSuccess } = require("../chalkpresets");

const app = require("./app");

if (process.env.NODE_ENV === "production") {
  app.listen(PORT, () => {
    log(chalkSuccess(`Wanderer running on port ${PORT}`));
    opn(`http://localhost:${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    log(chalkSuccess(`Wanderer running on port ${PORT}`));
  });
}
