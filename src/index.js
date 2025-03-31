import app from "./app.js"
import dotenv from "dotenv"
import mongodbConnect from "./db/db_connect.js"

dotenv.config({
  path: "./.env",
})

const PORT = process.env.PORT || 4005

mongodbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port 4000")
    })
  })
  .catch((err) => {
    console.error("MongoDB connection failed.")
    process.exit(1)
  })
