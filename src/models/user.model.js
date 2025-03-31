import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"

const UserSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        path: String,
      },
      default: {
        url: "https://placehold.jp/3e4670/ffffff/150x150.png",
        path: "",
      },
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
      required: [true, "Username is required"],
    },
    fullname: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
)

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  )
}

UserSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  )
}

UserSchema.methods.generateTempToken = async function () {
  const unhashedToken = crypto.randomBytes(32).toString("hex")

  const hashedToken = crypto
    .createHash("sha256")
    .update(unhashedToken)
    .digest("hex")

  const tokenExpiry = Date.now() + 20 * 60 * 1000

  return { hashedToken, unhashedToken, tokenExpiry }
}

export const User = mongoose.model("User", UserSchema)
