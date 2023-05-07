import express from "express";
import { 
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// create read routes
// represents where we grab information, not saving anything to DB

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/friendId", verifyToken, addRemoveFriend);

export default router;
