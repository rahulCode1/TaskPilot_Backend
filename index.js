require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")

const { initializeDb } = require("./data/db.connect")
const HttpError = require("./model/http_error")
const errorHandler = require("./middleware/errorHandler")
const userRoute = require("./routes/user_routes")
const taskRoute = require("./routes/task_routes")
const teamRoute = require("./routes/team_routes")
const projectRoute = require("./routes/project_routes")
const tagRoute = require("./routes/tag_routes")

initializeDb()


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors())



app.use(express.json())


app.use("/api/user", userRoute)
app.use("/api/task", taskRoute)
app.use("/api/team", teamRoute)
app.use("/api/project", projectRoute)
app.use("/api/tags", tagRoute)

app.use((req, res, next) => {
    next(new HttpError("This route doesn't exist.", 404))
})


app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})