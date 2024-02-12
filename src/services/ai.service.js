import api from "./api";

const generateSimilarQuestions = (text, limit) => {
  return api
    .post("/ai/generate_similar_questions", {
      questionText: text,
      limit,
    })
    .then((response) => {
      return response.data;
    });
};

const generateAnswers = (text, limit) => {
  return api
    .post("/ai/generate_answers", {
      answerText: text,
      limit,
    })
    .then((response) => {
      return response.data;
    });
};

const AIService = { generateSimilarQuestions, generateAnswers };

export default AIService;
