const router = require("express").Router();
const FormController = require("../controllers/FormController");

router.post("/register", FormController.register);
router.post("/login", FormController.login);
router.post("/create/survey", FormController.createSurvey);
router.get("/survey/:key", FormController.surveyByKey);
router.get("/surveys", FormController.getSurveys);
router.post("/survey/response", FormController.saveSurveyResponse);
router.post("update/survey/:key", FormController.updateSurvey)
router.get("/survey/:key/responses", FormController.getSurveyResponses);
router.delete("/survey/:key", FormController.deleteSurvey)
router.get("/", (_, res) => res.send("Server up and running!"));


module.exports = router;
