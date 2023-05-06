import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router(); // allows express to identify that these routes will be configured so we can have them in separate files

router.post("/login", login);

export default router;
