import express from "express"
import { RoomController } from "../controllers/RoomsController.js"
import { authorization, checkRoomAndMessage } from "../middlewares/authorization.js"


export default function roomRouter() {
    const router = express.Router()

    router.get("/", RoomController.getAllRooms)
    router.post("/", RoomController.createRoom)
    router.get("/find-room", RoomController.findRoom)
    router.get("/:roomId", checkRoomAndMessage, RoomController.getRoomById)
    router.delete("/:roomId", authorization, RoomController.deleteRoom)

    return router
}
