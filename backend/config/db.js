import mongoose from "mongoose"

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "MERNStore" })
    .then(() => console.log(`Database connected 👍`))
    .catch((e) => console.log(`Error while database connection : ${e}`))
}
