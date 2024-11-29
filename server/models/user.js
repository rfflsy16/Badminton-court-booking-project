import { db } from "../config/mongoDB.js";
import { ObjectId } from "mongodb";
import crypto from "crypto";
import { hashPassword, comparePassword } from "../helpers/bcrypt.js";
import { signToken } from "../helpers/jwt.js";
import BuildingModel from "./building.js";

export class User {
  // Mendapatkan koleksi Users
  static getCollection() {
    return db.collection("Users");
  }

  // Mendapatkan semua user
  static async get() {
    const collection = this.getCollection();
    return await collection.find().toArray();
  }
  
  // Mendapatkan user berdasarkan ID
  static async getById(id) {
    const _id = new ObjectId(id);
    const collection = this.getCollection();
    const user = await collection.findOne({ _id });
    if (!user) throw { name: "NotFound" };
    return user;
  }

  // Register user baru
  static async register(body) {
    const { fullName, email, password, role = "user" } = body;
    const collection = this.getCollection();

    // Validasi email unik
    const existingUser = await collection.findOne({ email });
    if (existingUser) throw { name: "EmailUnique" };

    // Hash password
    const hashedPassword = hashPassword(password);

    const defaultImgUrl = "https://example.com/default-profile.png";
    const generatedDeviceId = crypto.randomBytes(16).toString("hex");

    // Data user baru
    const newUser = {
      fullName,
      email,
      password: hashedPassword,
      role,
      imgUrl: defaultImgUrl, // Diisi otomatis
      deviceId: generatedDeviceId, // Diisi otomatis
      createdAt: new Date(),
      updatedAt: new Date(),
      location: null, // Lokasi default null
    };

    const result = await collection.insertOne(newUser);
    return result
  }

  // Login user
  static async login(body) {
    const { email, password } = body;
    const collection = this.getCollection();

    if (!email || !password) {
      throw { name: "BadRequest" };
    }

    // Cari user berdasarkan email
    const user = await collection.findOne({ email });
    if (!user) throw { name: "LoginError" };

    // Cocokkan password
    if (!comparePassword(password, user.password)) {
      throw { name: "LoginError" };
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const access_token = signToken(payload);

    return {
      message: "Login successful",
      access_token,
    };
  }

  static async updateUserLocation(deviceId, location) {
    const collection = this.getCollection();

    if (!location || !location.coordinates || location.coordinates.length !== 2) {
      throw new Error("Invalid location data");
    }

    const updateData = {
      location: {
        type: "Point",
        coordinates: location.coordinates, // [longitude, latitude]
      },
      updatedAt: new Date(),
    };

    const result = await collection.findOneAndUpdate(
      { deviceId },
      { $set: updateData },
      { returnDocument: "after" }
    );

    if (!result.value) {
      throw new Error("User not found");
    }

    return result.value;
  }

  static async findNearestBuildings(deviceId) {
    const collection = this.getCollection();

    const user = await collection.findOne({ deviceId });
    if (!user || !user.location) {
      throw new Error("User location not found");
    }

    const userLocation = user.location.coordinates;

    // Menemukan building terdekat
    const buildings = await BuildingModel.findNearestBuildings(userLocation, 1000); // max distance 1km
    return buildings;
  }
}
