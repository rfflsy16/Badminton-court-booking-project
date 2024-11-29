import { ObjectId } from "mongodb";
import { hashPassword, comparePassword } from "../helpers/bcrypt.js";
import { signToken } from "../helpers/jwt.js";
import { db } from "../config/mongoDB.js";
import crypto from "crypto"; // Untuk membuat deviceId secara otomatis

export class User {
  static getCollection() {
    return db.collection('Users');
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

    // Hooks untuk imgUrl dan deviceIduser
    const defaultImgUrl = "https://example.com/default-profile.png"; // Ganti dengan URL gambar default
    const generatedDeviceId = crypto.randomBytes(16).toString("hex"); // Membuat deviceId unik

    // Buat data user baru
    const newUser = {
      fullName,
      email,
      password: hashedPassword,
      role,
      imgUrl: defaultImgUrl, // Diisi otomatis
      deviceId: generatedDeviceId, // Diisi otomatis
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Masukkan ke database
    const result = await collection.insertOne(newUser);
    return result
  }

  // Login user
  static async login(body) {
    const { email, password } = body;
    const collection = this.getCollection();

    if (!email || !password) {
      throw { name: 'BadRequest' }
    }

    // Cari user berdasarkan email

    const user = await collection.findOne({ email });
    if (!user) throw { name: "LoginError" }

    // Cocokkan password
    if (!comparePassword(password, user.password)) {
      throw { name: "LoginError" }
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role
    }

    const access_token = signToken(payload)

    return {
      message: "Login successful",
      access_token
    };
  }
}
