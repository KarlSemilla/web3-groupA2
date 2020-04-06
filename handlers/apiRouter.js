const express = require("express");
//const ImageModel = require('../models/Image.js');
const UserModel = require("../models/User.js");
const helper = require("./helpers.js");
const Movie = require("../models/Movie");
const Brief = require("../models/Brief");

const router = express.Router();

//handle GET requests for [domain]/api/images - return all Images
router.get("/movies", helper.ensureAuthenticated, (req, resp) => {
  // use mongoose to retrieve all imgs from Mongo
  Movie.find({}, function(err, data) {
    if (err) {
      resp.json({ message: "Unable to connect to movies" });
    } else {
      //console.log(data)
      // return JSON retrieved by Mongo as response
      resp.json(data);
    }
  });
});

// handle requests for specific img: e.g., /api/images/1
router.get("/movies/:id", helper.ensureAuthenticated, (req, resp) => {
  Movie.find({ id: req.params.id }, (err, data) => {
    if (err) {
      resp.json({ message: "Img not found" });
    } else {
      resp.json(data[0]);
    }
  });
});

router.get("/brief", helper.ensureAuthenticated, (req, resp) => {
  // use mongoose to retrieve all imgs from Mongo
  Brief.find({}, function(err, data) {
    if (err) {
      resp.json({ message: "Unable to connect to movies" });
    } else {
      //console.log(data)
      // return JSON retrieved by Mongo as response
      resp.json(data);
    }
  });
});

router.get("/find/year/:min/:max", helper.ensureAuthenticated, (req, resp) => {
  Movie.find()
    .where("release_date".slice())
    .gt(req.params.min)
    .lt(req.params.max)
    .sort({ release_date: 1 })

    .exec(function(err, data) {
      if (err) {
        resp.json({ message: "Movies not found" });
      } else {
        resp.json(data);
      }
    });
});
router.get("/find/after/:min", helper.ensureAuthenticated, (req, resp) => {
  Movie.find()
    .where("release_date".slice())
    .gte(req.params.min)
    .sort({ release_date: 1 })

    .exec(function(err, data) {
      if (err) {
        resp.json({ message: "Movies not found" });
      } else {
        resp.json(data);
      }
    });
});
router.get("/find/before/:max", helper.ensureAuthenticated, (req, resp) => {
  Movie.find()
    .where("release_date".slice())
    .lt(req.params.max)
    .sort({ release_date: 1 })

    .exec(function(err, data) {
      if (err) {
        resp.json({ message: "Movies not found" });
      } else {
        resp.json(data);
      }
    });
});

router.get("/find/above/:min", helper.ensureAuthenticated, (req, resp) => {
  Movie.find()
    .where("ratings.average")
    .gte(req.params.min)
    .sort({ "ratings.average": 1 })

    .exec(function(err, data) {
      if (err) {
        resp.json({ message: "Movies not found" });
      } else {
        resp.json(data);
      }
    });
});
router.get("/find/below/:max", helper.ensureAuthenticated, (req, resp) => {
  Movie.find()
    .where("ratings.average")
    .lte(req.params.max)
    .sort({ "ratings.average": 1 })

    .exec(function(err, data) {
      if (err) {
        resp.json({ message: "Movies not found" });
      } else {
        resp.json(data);
      }
    });
});
router.get(
  "/find/rating/:min/:max",
  helper.ensureAuthenticated,
  (req, resp) => {
    Movie.find()
      .where("ratings.average")
      .gt(req.params.min)
      .lt(req.params.max)
      .sort({ "ratings.average": 1 })

      .exec(function(err, data) {
        if (err) {
          resp.json({ message: "Movies not found" });
        } else {
          resp.json(data);
        }
      });
  }
);

router.get(
  "/find/title/:substring",
  helper.ensureAuthenticated,
  (req, resp) => {
    //Image.find({'location.city': req.params.city}, (err,data) => {
    Movie.find(
      { title: new RegExp(req.params.substring, "i") },
      (err, data) => {
        if (err) {
          resp.json({ message: "Img not found" });
        } else {
          resp.json(data);
        }
      }
    );
  }
);

router.get("/users/:id", helper.ensureAuthenticated, (req, resp) => {
  UserModel.find({ id: req.params.id }, (err, data) => {
    if (err) {
      resp.json({ message: "User not found" });
    } else {
      //console.log(data);
      resp.json(data);
    }
  });
});

router.get("/users", helper.ensureAuthenticated, (req, resp) => {
  UserModel.find({}, (err, data) => {
    if (err) {
      resp.json({ message: "User not found" });
    } else {
      //console.log(data);
      resp.json(data);
    }
  });
});

router.get("/getUser", helper.ensureAuthenticated, (req, resp) => {
  UserModel.find({}, (err, data) => {
    if (err) {
      resp.json({ message: "User not found" });
    } else {
      //console.log(data);
      resp.json({
        user: req.user
      });
    }
  });

  router.route("/user/:userid/update/favorite").post(function(req, resp) {
    UserModel.updateOne(
      { id: req.params.userid },
      { favorites: req.body },
      { upsert: true },
      function(err, data) {
        if (err) {
          resp.json({ message: "Nothing was updated" });
        } else {
          resp.json({ message: "User's favorites were updated" });
        }
      }
    );
  });

  //console.log(data);
  //   resp.json({
  //       user: req.user
  //   });
});

module.exports = router;
