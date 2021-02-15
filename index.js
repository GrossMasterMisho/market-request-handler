const express = require("express");
var cors = require("cors");
var axios = require("axios");

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

const getData = async () => {
  const response = await axios
    .get("https://online-market-project.herokuapp.com/product/fetchProducts")
    .then(({ data }) => console.log(data));
};

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  setInterval(getData, 5000);
});
