import mongoose from "mongoose"

export const mongooseConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
