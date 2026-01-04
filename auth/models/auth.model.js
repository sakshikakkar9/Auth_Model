import { MongoClient } from "mongodb";
import dotenv from "dotenv"
dotenv.config({path:"E:\practice\backend\.env"})

const client = new MongoClient(process.env.MONGO);

const db = client.db("auth");

const userValidator = {
  $jsonSchema: {
    bsonType: "object",
    required: ["email", "passwordHash", "createdAt"],

    properties: {
      name: { bsonType: "string" },

      email: {
        bsonType: "string",
        description: "Unique user email"
      },

      passwordHash: {
        bsonType: "string",
        description: "Hashed password"
      },

      role: {
        bsonType: "string",
        enum: ["user", "admin", "super_admin"]
      },

      isVerified: { bsonType: "bool" },

      isActive: { bsonType: "bool" },

      createdAt: { bsonType: "date" },

      updatedAt: { bsonType: "date" }
    }
  }
};

export async function applyUserValidator() {
  try {
    console.log("🟢 Creating users collection with schema validator...");

    // 🔹 Create collection with validator
    await db.createCollection("users", {
      validator: userValidator,
      validationLevel: "strict",
      validationAction: "error"
    });

    console.log("✅ Users collection created successfully");

    // 🔒 Unique email index
    await db.collection("users").createIndex(
      { email: 1 },
      { unique: true }
    );

    console.log("✅ Unique index on email created");

  } catch (err) {
    if (err.code === 48) {
      console.log("ℹ️ Users collection already exists");
    } else {
      console.error("❌ Failed to create users collection:", err.message);
    }
  }
}

applyUserValidator();