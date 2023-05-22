import mongoose from "mongoose"

export const mongooseConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    // console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    console.log(
      "MongoDB Connected".padEnd(process.env.CONSOLE_TAB_SIZE, "."),
      `${conn.connection.host}:${conn.connection.port}`.cyan.underline
    )
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
