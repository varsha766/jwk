const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const { expressjwt } = require("express-jwt");
require("dotenv").config();
const jwksClient = require("jwks-rsa");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(
  expressjwt({
    secret: jwksClient.expressJwtSecret({
      jwksUri: "http://localhost:4000/jwks.json",
      cache: true,
      rateLimit: true,
    }),
    algorithms: ["RS256"],
  }).unless({ path: ["/"] }) // this line is to make get('/') route unProtected
);
// use also HS
app.get("/", async (req, res, next) => {
  res.send({ message: "This is resource api" });
});

app.get("/protected", async (req, res, next) => {
  res.send({ message: "This is a protected route " });
});
app.use("/api", require("./routes/api.route"));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
