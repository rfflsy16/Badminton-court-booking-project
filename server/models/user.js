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
    console.log(user, "<<<<< ini di model user")
    return user;
  }

  // Mendapatkan user berdasarkan email
  static async getByEmail(email) {

    const collection = this.getCollection();
    const user = await collection.findOne({ email });
    if (!user) throw { name: "NotFound" };
    return user;
  }
  // Register user baru
  static async register(body) {
    const { fullName, email, password, role = "user", deviceId } = body;

    if (!fullName || !email || !password) {
      throw { name: 'BADREQUEST' }
    }
    if (password.length < 1) {
      throw { name: 'BADREQUEST' }
    }

    const collection = this.getCollection();

    const existingUser = await collection.findOne({ email });
    if (existingUser) throw { name: "EmailUnique" };

    const hashedPassword = hashPassword(password);

    const defaultImgUrl = "https://example.com/default-profile.png";
    // const generatedDeviceId = crypto.randomBytes(16).toString("hex");

    const newUser = {
      fullName,
      email,
      password: hashedPassword,
      role,
      imgUrl: defaultImgUrl,
      deviceId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newUser);
    return result
  }

  static async login(body) {

    console.log(body, "<<<<< ini dari model")
    const { email, password } = body;
    const collection = this.getCollection();

    console.log(email, password, "<<<<<<< ini setelah distructer")

    if (!email || !password) {
      throw { name: "BADREQUEST" };
    }

    const user = await collection.findOne({ email });
    if (!user) throw { name: "LoginError" };

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

  static async findByEmail(email) {
    const collection = this.getCollection()
    const findUser = await collection.findOne({ email: email })
    // console.log('masukkk')
    if (!findUser) throw { name: 'Unauthorized' }
    return findUser
  }

  static async updateUserLocation(deviceId, location) {
    const collection = this.getCollection();

    if (!location || !location.coordinates || location.coordinates.length !== 2) {
      throw new Error("Invalid location data");
    }

    const updateData = {
      location: {
        type: "Point",
        coordinates: location.coordinates,
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
