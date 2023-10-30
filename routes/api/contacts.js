const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../decorators");
const schemas = require("../../schemas/contacts");

const addContactValidate = validateBody(schemas.contactAddSchema);

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", addContactValidate, ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", ctrl.updateById);

module.exports = router;
