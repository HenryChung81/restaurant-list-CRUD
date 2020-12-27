// require package used in the project
const express = require("express");
const exphbs = require("express-handlebars");
const RestaurantListModels = require("./models/restaurant")
const mongoose = require("mongoose")
const app = express();
const port = 3000;

// setting template engine
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

// setting static files
app.use(express.static("public"));

// connection
mongoose.connect("mongodb://localhost/restaurant-list", { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on("error", () => {
  console.log("mongodb error!")
})

db.once("open", () => {
  console.log("mongodb connected!")
})

// routes setting
app.get("/", (req, res) => {
  // past the restaurant data into 'index' partial template
  RestaurantListModels.find() //取出 RestaurantListModels 裡面的所有資料
    .lean() //把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render("index", { restaurants })) //將資料傳給 index 樣板
    .catch(error => console.log(error)) //錯誤處理
});

app.get("/restaurants/:restaurant_id", (req, res) => {
  // past the restaurant data into 'show' partial template

  console.log("req.params.restaurant_id", req.params.restaurant_id);

  const restaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  );

  res.render("show", { restaurants: restaurant });
});

app.get("/search", (req, res) => {
  // console.log("req.query", req.query);
  const keyword = req.query.keyword;
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase());
  });
  res.render("index", { restaurants: restaurants, keyword: keyword });
});

// start and listen the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});
