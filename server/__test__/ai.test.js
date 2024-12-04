import request from 'supertest'
import { app } from '../app.js'
import BuildingModel from '../models/building.js'
import { signToken } from '../helpers/jwt.js';
import { hashPassword } from '../helpers/bcrypt.js';
import { User } from '../models/user.js';
import CourtModel from '../models/court.js';
import RoomModel from '../models/room.js';