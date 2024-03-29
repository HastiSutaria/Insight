const Form = require("../models/form");
const Questions = require("../models/question");
const User = require("../models/user");
const randomString = require("randomstring");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require('path')



module.exports = {
  register: async (req, res) => {
    let userData = req.body;
    await User.findOne({ email: userData.email }).then((user) => {
      if (user) {
        res.status(400).send("You have already registered!");
        return;
      }
    });

    let user = new User({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      acceptTerms: req.body.acceptTerms,
    });
    await user
      .save()
      .then(async (registeredUser) => {
        console.log("RegUser:", registeredUser);
        let payload = { subject: registeredUser._id };
        let token = jwt.sign(payload, "secretKey");
        res.status(200).send({ token });

        user.token = token;
        await user
          .save()
          .then(() => {
            console.log("Token Saved");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  login: async (req, res) => {
    let userData = req.body;

    await User.findOne({ email: userData.email })
      .then(async (user) => {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!user) {
          res.status(401).send("Invalid Email");
        } else if (!passwordIsValid) {
          res.status(401).send("Invalid Password");
        } else {
          let username = user.username;

          let payload = { subject: user.__v };
          let token = jwt.sign(payload, "secretKey");
          user.token = token;
          await user.save().then(() => {
            console.log("token updated");
          });
          res.status(200).send({ token, username });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  profile: async (req, res) => {
    try {
      console.log('----- Profile Fetched -------')
      const token = req.headers.authorization.replace("Bearer ", "");
      console.log("token: ", token);

      await User.findOne({ token }).then((user) => {
        console.log("user: ", user);

        res.status(200).json({ user });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },

  editProfile: async (req, res) => {
    try {
      console.log('------ edit Profile Fetched --------------')
      const token = req.headers.authorization.replace("Bearer ", "");
      if (req.body.password !== "") {
        await User.updateOne(
          { token },
          {
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
          }
        )
          .then(() => {
            console.log("edited profile and password");
            res.status(201).json({ msg: "edited profile and password" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await User.updateOne(
          { token },
          {
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
          }
        )
          .then((data) => {
            console.log("edited profile");
            res.status(201).json({ msg: "edited profile", data });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      res
        .status(error.statusCode)
        .json({ status: error.statusCode, error: error.message });
    }
  },

  profilePicture: async (req, res) => {
    try {
      console.log('------ Get Profile Picture----------')
      const token = req.headers.authorization.replace("Bearer ", "");
      console.log(token)
      await User.findOne({ token }).then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        if (!user.profilePath) {
          return res.status(404).json({ error: "Profile picture not found" });
        }
        res.sendFile(user.profilePath);
        console.log('working', user.profilePath)
      });

      // res.set('Content-Type', 'image/png')
      // res.send(user.avatar)
    } catch (e) {
      console.log(e)
      res.status(404).send(e);
    }
  },

  profilePictureEdit: async (req, res) => {
    try {
      //   const buffer = await sharp(req.file.buffer).resize({ width: 230, height: 223 }).png().toBuffer()
      // req.user.avatar = buffer
      // await req.user.save()
      // res.send()
   
      const token = req.headers.authorization.replace("Bearer ", "");
      await User.findOne({token}).then(async (user) =>{
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
  
        const profilePicturePath = path.join(__dirname, '../../app/utils/storage/images/', req.file.filename);
        console.log(profilePicturePath)
        user.profilePath = profilePicturePath;
        await user.save();
  
        res.status(201).json({ message: "Profile picture updated successfully", profilePicturePath });
      })
     

     
    } catch (error) {
      console.log(error.message);
    }
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
    // try {
    //   const data = req.params;
    //   console.log(data);

    //   if (!data.key) {
    //     throw { statusCode: 404, message: "MISSING_PARAMS" };
    //   }
    //   const form = await Form.findByIdAndUpdate({ key: data.key });

    //   await Questions.findByIdAndUpdate({ _id: { $in: form.questions } });

    //   if (!form) {
    //     throw { statusCode: 404, message: "Form_NOT_FOUND" };
    //   }
    // } catch (error) {
    //   res
    //     .status(error.statusCode)
    //     .json({ status: error.statusCode, error: error.message });
    // }
    const { formId } = req.params.id;
    const { name, description, questionIds } = req.body;
    console.log(req.body) 
    try{
      const form = await Form.findById(formId);

      if (!form) {

        return res.status(404).json({ error: 'Form not found' });
      }
      const questions = await Questions.find({ _id: { $in: questionIds } });
      form.name = name;
      form.description = description;
      form.questions = questions.map(question => question._id);
  
      await form.save();
  
      res.json(form);
    }
    catch (err) {

      res.status(500).json({ error: err.message });
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
