import api from "./api";

const fetchExaminationBoards = () => {
  return api.get("/utility/fetch_all_boards").then((response) => response);
};

const addExaminationBoard = (shortCode, description) => {
  return api
    .post(
      "/utility/add_board_for_question_paper",
      {
        shortCode,
        description,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.data;
    });
};

export default { fetchExaminationBoards, addExaminationBoard };
