const express = require("express");
var cors = require("cors");
var axios = require("axios");

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

let resp = { data: {}, requests: 0 };

app.get("/", (req, res) => {
  res.json(resp.requests);
});

const getData = async () => {
  const response = await axios
    .get("https://online-market-project.herokuapp.com/product/fetchProducts")
    .then(({ data }) => {
      resp = { data: data, requests: resp.requests + 1 };
    });
};

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  setInterval(getData, 60000);
});
