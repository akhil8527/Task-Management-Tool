import mongoose from "mongoose"

const mongodbConnect = async function () {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.log("MongoDB connection failed! ", error)
    process.exit(1)
  }
}

export default mongodbConnect
