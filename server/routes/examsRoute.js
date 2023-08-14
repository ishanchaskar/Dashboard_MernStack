const router = require('express').Router();
const Exam = require('../models/examModel');
const authMiddleware = require('../middlewares/authMiddleware');

// add exam

router.post('/add', authMiddleware, async (req, res) => {
  
  try {
    //check if exam exists
    const examExists = await Exam.findOne({name: req.body.name});
    if(examExists){
      return res.status(200).send({
        message: 'exam already exists',
        success: false,
      });
    }
    req.body.questions = [];
    const newExam = new Exam(req.body);
    await newExam.save();
    res.send({
        message: 'exam added successfully',
        success: true,
    });
  } catch (error) {
    res.status(500).send({
        message: error.message,
        data: error,
        success: false,
    });
  }
});
// get all exams

router.post('/get-all-exams', authMiddleware, async (req, res) => {
  try {
    const exams = await Exam.find({});
    res.send({
        message: 'exams fetched successfully',
        success: true,
        data: exams,
    });
  } catch (error) {
    res.status(500).send({
        message: error.message,
        data: error,
        success: false,
    });
  }
});

// get exam by id

router.post('/get-exam-by-id', authMiddleware, async (req, res) => {
  try {
    const exam = await Exam.findById(req.body.examId);
    res.send({
        message: 'exam fetched successfully',
        success: true,
        data: exam,
    });
  } catch (error) {
    res.status(500).send({
        message: error.message,
        data: error,
        success: false,
    });
  }
});


// edit exam by id
router.post('/edit-exam-by-id', authMiddleware , async (req, res) => {
  try {
    await Exam.findByIdAndUpdate(req.body.examId , req.body);
    res.send({
        message: 'exam edited successfully',
        success: true,
    });
} catch (error){
  res.status(500).send({
      message: error.message,
      data: error,
      success: false,
  });
}
});

module.exports = router;