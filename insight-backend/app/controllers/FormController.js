const Form = require("../models/form");
const Questions = require("../models/question");
const User = require("../models/user");
const randomString = require("randomstring");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { use } = require("../routes/routes");

module.exports = {
  register: async (req, res) => {
    let userData = req.body;
    await User.findOne({ email: userData.email })
      .then((user) => {
        if (user) {
          res.status(400).send("You have already registered!");
          return;
        }
      })
      .catch((err) => {});

    let user = new User({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      acceptTerms: req.body.acceptTerms,
      role: req.body.role,
    });
    await user
      .save()
      .then((registeredUser) => {
        console.log("RegUser:", registeredUser);
        let payload = { subject: registeredUser._id };
        let token = jwt.sign(payload, "secretKey");
        res.status(200).send({ token });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  login: async (req, res) => {
    let userData = req.body;
	
    await User.findOne({ email: userData.email })
      .then((user) => {
		var passwordIsValid = bcrypt.compareSync(
			req.body.password,
			user.password
		  );
        if (!user) {
          res.status(401).send("Invalid Email");
        } else if (!passwordIsValid) {
          res.status(401).send("Invalid Password");
        } else {
          let username = user.username
          let payload = { subject: user.__v };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token, username });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  createSurvey: async (req, res) => {
    try {
      const data = req.body;
      console.log("Data: ", data);
      let questionsData = data.dynamicInputs;
      let formName = data.name;
      let formDesc = data.description;
      const questions = await Questions.insertMany(questionsData);
      const question_ids = questions.map((question) => question.id);
      const form = new Form({
        name: formName,
        description: formDesc,
        key: randomString.generate(),
        questions: question_ids,
      });

      console.log("\n-------------------------------\nForm", form);

      form.save().then((form) => {
        res.status(201).json(form);
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  surveyByKey: async (req, res) => {
    try {
      const data = req.params;
      const conditions = {};
      if (!data.key) {
        throw { statusCode: 404, message: "MISSING_PARAMS" };
      }
      conditions.key = data.key;
      const form = await Form.findOne(conditions).populate("questions");
      if (!form) {
        throw { statusCode: 404, message: "Form_NOT_FOUND" };
      }
      res.status(200).json(form);
    } catch (error) {
      res
        .status(error.statusCode)
        .json({ status: error.statusCode, error: error.message });
    }
  },

  getSurveys: async (req, res) => {
    try {
      const form = await Form.find();
      if (form.length === 0) {
        throw { error: "NOT_FOUND", statusCode: 404 };
      }
      res.status(200).json(form);
    } catch (error) {
      res.status(error.statusCode).json(error);
    }
  },

  saveSurveyResponse: async (req, res) => {
    try {
      const data = req.body;
      let email;
      console.log(data);
      if (!data.responses || !data.key) {
        throw { statusCode: 404, message: "Missing_params" };
      }
      if (data.responses[0].email !== undefined) {
        email = data.responses[0].email;
      }
      const form = await Form.findOne({ key: data.key });
      const questionIds = form.questions;

      data.responses.forEach(async (response, index) => {
        await Questions.updateOne(
          { _id: questionIds[index] },
          { $push: { responses: response } }
        );
      });
      const contactObj = {
        properties: [{ property: "email", value: `${email}` }],
      };
      // const contact = await hubspot.contacts.create(contactObj);
      res
        .status(200)
        .json({ status: 200, message: "Response saved", data: contactObj });
    } catch (error) {
      console.log(error.message);
      res.status(400).json(error);
    }
  },

  updateSurvey: async (req, res) => {
    try {
      const data = req.params;
      console.log(data);

      if (!data.key) {
        throw { statusCode: 404, message: "MISSING_PARAMS" };
      }
      const form = await Form.findByIdAndUpdate({ key: data.key });

      await Questions.findByIdAndUpdate({ _id: { $in: form.questions } });

      if (!form) {
        throw { statusCode: 404, message: "Form_NOT_FOUND" };
      }
    } catch (error) {
      res
        .status(error.statusCode)
        .json({ status: error.statusCode, error: error.message });
    }
  },
  deleteSurvey: async (req, res) => {
    try {
      const data = req.params;
      console.log(data);

      if (!data.key) {
        throw { statusCode: 404, message: "MISSING_PARAMS" };
      }
      const form = await Form.findOne({ key: data.key });

      await Questions.deleteMany({ _id: { $in: form.questions } });
      await Form.deleteOne({ key: data.key });
      if (!form) {
        throw { statusCode: 404, message: "Form_NOT_FOUND" };
      }
    } catch (error) {
      res
        .status(error.statusCode)
        .json({ status: error.statusCode, error: error.message });
    }
  },

  editQuestion: async (req, res) => {
    try {
      const id = req.params.id;
      const label = req.body.label;
      await Questions.findByIdAndUpdate(id, { label })
        .then(() => {
          res.status(200).send("Question Updated!");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      res
        .status(error.statusCode)
        .json({ status: error.statusCode, error: error.message });
    }
  },

  getSurveyResponses: async (req, res) => {
    try {
      const data = req.params;
      if (!data.key) {
        throw new Error("MISSING_PARAMS");
      }
      const form = await Form.findOne({ key: data.key }).populate("questions");
      if (!form) {
        throw new Error("FORM_NOT_FOUND");
      }
      res.status(200).json({ status: 200, data: form });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },
};
