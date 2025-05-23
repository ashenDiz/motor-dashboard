const express = require("express");
const router = express.Router();
const {
  createMotorData,
  getAllMotorData,
  getMotorDataById,
  updateMotorData,
  deleteMotorDataById,
  updateMotorDataById,
} = require("../controllers/motorController");

//routes
router.post("/create", createMotorData);
router.get("/getAll", getAllMotorData);
router.get("/:id", getMotorDataById);
router.delete("/:id", deleteMotorDataById);
router.put("/:id", updateMotorDataById);

module.exports = router;
