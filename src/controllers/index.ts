const router = require('express').Router();
const user = require("./users");
const category = require("./categories");
const price = require("./prices");
const store = require("./stores");
const role = require("./roles");
const invoice = require("./invoices");

router.use(user);
router.use(category);
router.use(price);
router.use(store);
router.use(role);
router.use(invoice);

module.exports = router;