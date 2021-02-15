const express = require("express");
var cors = require("cors");
var axios = require("axios");

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

let resp = { data: {}, requests: 0 };
let date = null;

app.get("/", (req, res) => {
  res.json({ requests: resp.requests, lastReq: date });
});

const getData = async () => {
  const response = await axios
    .get("https://online-market-project.herokuapp.com/product/fetchProducts")
    .then(({ data }) => {
      resp = { data: data, requests: resp.requests + 1 };
    });

  await axios.get("https://online-market-project.herokuapp.com/");
  await axios.get(
    "https://online-market-project.herokuapp.com/?category=technology"
  );
};

const fetchProducts = async () => {
  await axios
    .get("https://online-market-project.herokuapp.com/product/fetchProducts")
    .then(() => {
      const d = new Date();
      date = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    });
};

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  setInterval(getData, 60000);
  setInterval(fetchProducts, 5000);
});
