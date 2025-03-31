import express from "express"
import healthCheckRouter from "./routes/healthcheck.route.js"

const app = express()

app.use("/api/v1/health", healthCheckRouter)

export default app
