const mongoose = require('mongoose');

/**
 * USER (AUTH) SCHEMA
 * This schema defines how a user document will look in MongoDB
 */
const userSchema = new mongoose.Schema(
  {
    // User full name
    name: {
      type: String,
      required: true,
      trim: true
    },

    // User email (unique identifier)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    // Encrypted password (never returned in queries)
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },

    // Role for authorization (scalable)
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },

    // Soft delete / block user
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    // Automatically adds createdAt & updatedAt
    timestamps: true
  }
);

/**
 * Indexes for performance
 * Improves login speed (email lookup)
 */
userSchema.index({ email: 1 });

/**
 * Create User Model
 * MongoDB collection name will be: "users"
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
