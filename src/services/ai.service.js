import api from "./api";

const generateSimilarQuestions = (text, limit, questionType) => {
  return api
    .post("/ai/generate_similar_questions", {
      questionText: text,
      limit,
      questionType,
    })
    .then((response) => {
      return response.data;
    });
};
const generateKeywords = (questionText, examinationBoard, standard) => {
  return api
    .post("/ai/generate_question_keywords", {
      questionText,
      examinationBoard,
      standard,
    })
    .then((response) => {
      return response.data;
    });
};

const generateAnswers = (
  questionText,
  answerText,
  taskType,
  limit,
  keywords,
  points,
  examinationBoard,
  standard
) => {
  return api
    .post("/ai/generate_answers", {
      questionText,
      answerText,
      taskType,
      limit,
      keywords,
      points,
      examinationBoard,
      standard,
    })
    .then((response) => {
      return response.data;
    });
};

const AIService = {
  generateSimilarQuestions,
  generateKeywords,
  generateAnswers,
};

export default AIService;
