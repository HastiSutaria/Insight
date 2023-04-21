const router = require("express").Router();
const FormController = require("../controllers/FormController");
const upload = require("../utils/storage/storage")

router.post("/register", FormController.register);
router.post("/login", FormController.login);

router.get("/profile", FormController.profile);
router.post("/editProfile", FormController.editProfile);

router.get("/profilePicture", FormController.profilePicture);
router.post("/profilePictureEdit", upload.single('profilePath'), FormController.profilePictureEdit);

router.post("/create/survey", FormController.createSurvey);
router.get("/survey/:key", FormController.surveyByKey);
router.get("/surveys", FormController.getSurveys);

router.post("/survey/response", FormController.saveSurveyResponse);
router.get("/survey/:key/responses", FormController.getSurveyResponses);

router.post("/survey/editQuestion/:id", FormController.editQuestion)

router.delete("/survey/:key", FormController.deleteSurvey)
router.get("/", (_, res) => res.send("Server up and running!"));


module.exports = router;
