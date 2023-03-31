const Forms = require("../models/form");
const Questions = require("../models/question");
const randomString = require("randomstring");
const User = require("../models/user")

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
    let user = new User(userData);
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
        if (!user) {
          res.status(401).send("Invalid Email");
        } else if (user.password !== userData.password) {
          res.status(401).send("Invalid Password");
        } else {
          let payload = { subject: user.__v };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  
  createSurvey: async (req, res) => {
    try {
      const data = req.body;
      let questionsData = data.dynamicInputs;
      let formName = data.name;
      const questions = await Questions.insertMany(questionsData);
      const question_ids = questions.map((question) => question.id);
      const form = new Forms({
        name: formName,
        key: randomString.generate(),
        questions: question_ids,
      });
      form.save((err, form) => {
        if (err) {
          throw new Error(err);
        }
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
      const form = await Forms.findOne(conditions).populate("questions");
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
      const form = await Forms.find();
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
      const form = await Forms.findOne({ key: data.key });
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

  getSurveyResponses: async (req, res) => {
    try {
      const data = req.params;
      if (!data.key) {
        throw new Error("MISSING_PARAMS");
      }
      const form = await Forms.findOne({ key: data.key }).populate("questions");
      if (!form) {
        throw new Error("FORM_NOT_FOUND");
      }
      res.status(200).json({ status: 200, data: form });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },
};
