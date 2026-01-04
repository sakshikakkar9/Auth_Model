import { MongoClient } from "mongodb";
import dotenv from "dotenv"
dotenv.config({path:"../../.env"})

const client = new MongoClient(process.env.MONGO);

const db = client.db("auth");

const usersCollection = db.collection("users")

export async function createUser({ email, name, password }) {
  // 1️⃣ Check if user exists
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  // 2️⃣ Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const now = new Date();

  // 3️⃣ Prepare new user document
  const newUser = {
    email,
    name,
    passwordHash: hashedPassword,
    role: "user",
    isVerified: false,
    createdAt: now,
    updatedAt: now,
  };

  // 4️⃣ Insert into DB
  const result = await usersCollection.insertOne(newUser);

  // 5️⃣ Return user info
  return { ...newUser, id: result.insertedId };
}
// createUser()