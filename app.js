// require package used in the project
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const RestaurantListModels = require("./models/restaurant")
const mongoose = require("mongoose")
const app = express();
const port = 3000;

// setting template engine
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: true }));

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

// index
app.get("/", (req, res) => {
  // past the restaurant data into 'index' partial template
  RestaurantListModels.find() // 取出 RestaurantListModels 裡面的所有資料
    .lean() //把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render("index", { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) //錯誤處理
});

// new
app.get("/new", (req, res) => {
  return res.render("new")
})

app.post("/restaurant", (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body;

  return RestaurantListModels
    .create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error))
})

// detail
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id
  return RestaurantListModels
    .findById(id)
    .lean()
    .then(restaurants => res.render('detail', { restaurants }))
})







// search
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
