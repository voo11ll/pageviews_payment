const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

router.get("/login", (req, res) => res.render("login"));

router.get("/", (req, res) =>
    res.render("main", {
        user: req.user,
    })
);

router.get("/set", ensureAuthenticated, (req, res) =>
    res.render("./EditProfilePage.html", {
        user: req.user,
    })
);

module.exports = router;
