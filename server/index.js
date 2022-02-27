const app = require("./app");
const scheduler = require("./services/scheduler/index");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  scheduler();
});
