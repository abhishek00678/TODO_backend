const app = require("./app");
const connectDB = require("./data/database");

const port = 4000;

connectDB();

app.listen(port, () => {
  console.log("server is running at port no 4000");
});
