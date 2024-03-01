import React, { useEffect } from "react";
import { useState } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import AIService from "../../services/ai.service";
import ExpandedQuestionSubjective from "./questionTemplates/ExpandedQuestionSubjective";
import { Maximize2, Minimize2 } from "lucide-react";
import CollapsedQuestion from "./questionTemplates/CollapsedQuestion";
import Dropdown from "../../components/Dropdown";
import AddBoardModal from "./AddBoardModal";
import utilityService from "../../services/utility.service";
import Toast from "../../components/Toast";
import Button from "../../components/Button";
import ExpandedQuestionMCQ from "./questionTemplates/ExpandedQuestionMCQ";

const Questionnaire = () => {
  const [lastSelectedQuestionType, setLastSelectedQuestionType] =
    useState("Subjective");
  const [lastSelectedMarks, setLastSelectedMarks] = useState(3);
  const defaultQuestionTemplate = {
    type: lastSelectedQuestionType,
    marks: lastSelectedMarks,
    isExpanded: true,
    keywords: [],
    selectedKeywords: [],
    questions: [
      {
        id: "1",
        text: "",
        isChosen: true,
      },
    ],
    answers: [
      {
        id: "1",
        text: "",
        isChosen: true,
      },
    ],
  };
  const defaultTemplate = {
    1: {
      sectionLabel: "Section 1",
      sectionType: "MCQ",
      sectionPoints: "",
      questionList: [
        {
          id: "1",
          isExpanded: true,
          questions: [
            {
              id: "1",
              text: "",
              isChosen: true,
            },
          ],
          answers: [
            {
              id: "1",
              text: "",
              isChosen: true,
            },
          ],
        },
      ],
    },
  };
  const [questions, setQuestions] = useState({ 1: defaultQuestionTemplate });
  const [stepNum, setStepNum] = useState(1);
  const [addBoardModalShown, setAddBoardModalShown] = useState(false);
  const [error, setError] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [allBoards, setAllBoards] = useState([]);
  const [standard, setStandard] = useState("");

  const updateHandler = (questionIndex, itemType, e) => {
    const updatedQuestions = JSON.parse(JSON.stringify(questions));
    switch (itemType) {
      // case "sectionLabel":
      //   updatedQuestions[[sectionIndex]].sectionLabel = e.target.value;
      //   break;
      case "question_type":
        updatedQuestions[[questionIndex]].type = e;
        setLastSelectedQuestionType(e);
        break;
      case "question_points":
        updatedQuestions[[questionIndex]].marks = e.target.value;
        setLastSelectedMarks(e.target.value);
        break;
      case "entered_question":
        updatedQuestions[[questionIndex]].questions[0].text = e;
        break;
      case "similar_questions":
        updatedQuestions[[questionIndex]].questions = [
          updatedQuestions[[questionIndex]].questions[0],
        ];

        let existing_length = 1;
        e.map((item) => {
          updatedQuestions[[questionIndex]].questions.push({
            id: `${existing_length + 1}`,
            text: item,
            isChosen: false,
          });
          existing_length += 1;
        });
        break;
      case "selected_similar_question":
        updatedQuestions[[questionIndex]].questions.map((questionItem) => {
          if (questionItem.text === e) questionItem.isChosen = true;
          else questionItem.isChosen = false;
        });
        break;
      case "keywords_generated":
        updatedQuestions[[questionIndex]].keywords = e;
        break;
      case "keyword_selected":
        if (updatedQuestions[[questionIndex]].selectedKeywords.indexOf(e) >= 0)
          updatedQuestions[[questionIndex]].selectedKeywords = updatedQuestions[
            [questionIndex]
          ].selectedKeywords.filter((item) => item != e);
        else updatedQuestions[[questionIndex]].selectedKeywords.push(e);
        break;
      case "generated_answers":
        updatedQuestions[[questionIndex]].answers = [
          { id: "1", text: e, isChosen: true },
        ];
        break;
      case "improve_answers":
        updatedQuestions[[questionIndex]].answers = updatedQuestions[
          [questionIndex]
        ].answers.filter((item) => item.isChosen == true);
        updatedQuestions[[questionIndex]].answers[0].id = "1";
        updatedQuestions[[questionIndex]].answers.push({
          id: "2",
          isChosen: false,
          text: e,
        });
        break;
      // case "generated_answers":
      //   updatedQuestions[[sectionIndex]].questionList.map((questionItem) => {
      //     if (questionItem.id == questionIndex) {
      //       questionItem.answers = questionItem.answers.filter(
      //         (item) => item.id == "1"
      //       );
      //       let existing_length = questionItem.answers.length;
      //       e.map((item) => {
      //         questionItem.answers.push({
      //           id: `${existing_length + 1}`,
      //           text: item,
      //           isChosen: false,
      //         });
      //         existing_length += 1;
      //       });
      //     }
      //   });
      //   break;
      case "selected_answer":
        updatedQuestions[[questionIndex]].answers.map((item) => {
          if (item.text == e) item.isChosen = true;
          else item.isChosen = false;
        });

        break;
      // case "toggle_view":
      // updatedQuestions[[sectionIndex]].questionList.map((questionItem) => {
      //   if (questionItem.id == questionIndex) questionItem.isExpanded = e;
      //   else questionItem.isExpanded = false;
      // });
      // break;
    }
    setQuestions(updatedQuestions);
  };
  const questionsBtnClickHandler = (questionIndex, text) => {
    AIService.generateSimilarQuestions(text, 4, questions[[questionIndex]].type)
      .then((res) => {
        updateHandler(
          questionIndex,
          "similar_questions",
          res.similar_questions
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(questions);
  const answersBtnClickHandler = (taskType, questionIndex) => {
    const questionItem = questions[[questionIndex]];
    const questionText = questionItem.questions.filter(
      (item) => item.isChosen == true
    )[0].text;
    let answerText = questionItem.answers.filter(
      (item) => item.isChosen == true && item.text != ""
    );
    answerText = answerText.length > 0 ? answerText[0].text : "";
    const limit = 1;
    const keywords = questionItem.keywords;
    const points = questionItem.marks;

    AIService.generateAnswers(
      questionText,
      answerText,
      taskType,
      limit,
      keywords,
      points,
      selectedBoard,
      standard
    )
      .then((res) => {
        updateHandler(
          questionIndex,
          taskType == "Generate" ? "generated_answers" : "improve_answers",
          res.generated_answers
          // questionItemIndex
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addQuestionHandler = (sectionIndex) => {
    const updatedQuestions = JSON.parse(JSON.stringify(questions));
    updatedQuestions[[sectionIndex]].questionList.filter((item) => {
      item.questions.map((questionItem) => {
        questionItem.isExpanded = false;
      });
    });
    const maxQuestionId =
      Math.max(
        parseInt(
          updatedQuestions[[sectionIndex]].questionList.map((item) => item.id)
        )
      ) + 1;
    const updatedDefaultTemplate = {
      ...JSON.parse(JSON.stringify(defaultTemplate[1].questionList[0])),
    };
    updatedDefaultTemplate.id = `${maxQuestionId}`;
    updatedQuestions[[sectionIndex]].questionList.push({
      ...updatedDefaultTemplate,
    });
    setQuestions(updatedQuestions);
  };
  const generateKeywordsBtnClickHandler = (questionIndex) => {
    AIService.generateKeywords(
      questions[[questionIndex]].questions[0].text,
      selectedBoard,
      standard
    )
      .then((res) => {
        updateHandler(
          questionIndex,
          "keywords_generated",
          res.question_keywords
        );
      })
      .then((err) => {
        console.log(err);
      });
  };
  const addBoardHandler = (shortCode, description) => {
    if (
      !shortCode ||
      !description ||
      shortCode.trim().length == 0 ||
      description.trim().length == 0
    ) {
      setError("Fill all the fields before proceeding.");
      return;
    }
    utilityService
      .addExaminationBoard(shortCode, description)
      .then((res) => {
        setAddBoardModalShown(false);
        setSelectedBoard(description);
        getBoardList();
      })
      .catch((error) => {
        if (error.response.data.detail) setError(error.response.data.detail);
      });
  };
  const getBoardList = () => {
    utilityService
      .fetchExaminationBoards()
      .then((res) => {
        const updatedBoards = res?.data?.map((item) => item.description);
        setAllBoards(updatedBoards);
      })
      .catch((error) => {
        if (error.response.data.detail) setError(error.response.data.detail);
      });
  };
  function getQuestionTemplate(questionItem, questionIndex) {
    switch (questions[[questionIndex]].type) {
      case "Subjective":
        return (
          <ExpandedQuestionSubjective
            index={questionIndex}
            questionItem={questionItem}
            updateHandler={updateHandler}
            questionsBtnClickHandler={questionsBtnClickHandler}
            answersBtnClickHandler={answersBtnClickHandler}
            generateKeywordsBtnClickHandler={generateKeywordsBtnClickHandler}
          />
        );
      case "MCQ":
        return (
          <ExpandedQuestionMCQ
            index={questionIndex}
            questionItem={questionItem}
            updateHandler={updateHandler}
            questionsBtnClickHandler={questionsBtnClickHandler}
            answersBtnClickHandler={answersBtnClickHandler}
          />
        );
    }
  }
  useEffect(() => {
    updateHandler("1", "toggle_view", true, "1");
    getBoardList();
  }, []);
  let display;
  if (stepNum === 1) {
    display = (
      <div className="entry-wrapper">
        <h4>Let's begin by setting the tone of the questions</h4>
        <div className="section">
          <p className="info">For which class is this paper intended?</p>
          <Input
            placeHolder="1,2,3, etc"
            value={standard}
            changeHandler={(e) => {
              setStandard(e.target.value);
            }}
          />
        </div>
        <div className="section">
          <p className="info">Educational Board</p>
          <Dropdown
            display={addBoardModalShown}
            options={allBoards}
            clickHandler={() => {
              setAddBoardModalShown(true);
            }}
            selectHandler={(board) => {
              setSelectedBoard(board);
              setAddBoardModalShown(false);
            }}
            selected={selectedBoard}
            otherNeeded={true}
          />
        </div>
        <div className="controls">
          <Button
            text="Proceed"
            clickHandler={() => {
              if (
                !standard ||
                !selectedBoard ||
                standard.trim().length == 0 ||
                selectedBoard.trim().length == 0
              ) {
                setError(
                  "Please fill all fields before proceeding. This helps us generate appropriate responses."
                );
                return false;
              }
              setStepNum(2);
            }}
            extraClasses="px-5 mt-5"
          />
        </div>
      </div>
    );
  } else
    display = (
      <div className="questions-wrapper">
        {Object.keys(questions).map((questionIndex) => (
          <>
            <div className="question-content">
              <div className="header-row">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "1em",
                    alignItems: "center",
                  }}
                >
                  <h6 style={{ marginTop: "1em" }}>QUESTION</h6>

                  {questions[[questionIndex]].isExpanded ? (
                    <Minimize2
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        updateHandler(questionIndex, "toggle_view", false);
                      }}
                    />
                  ) : (
                    <Maximize2
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!questions[[questionIndex]].isExpanded)
                          updateHandler(questionIndex, "toggle_view", true);
                      }}
                    />
                  )}
                </div>
                <div className="controls-wrapper">
                  <div className="section">
                    <p className="info">Type</p>
                    <Dropdown
                      options={["Subjective", "MCQ"]}
                      selected={questions[[questionIndex]].type}
                      selectHandler={(value) => {
                        updateHandler(questionIndex, "question_type", value);
                      }}
                      otherNeeded={false}
                    />
                  </div>
                  <div className="section">
                    <p className="info">Points</p>
                    <Input
                      value={questions[[questionIndex]].marks}
                      changeHandler={(e) => {
                        updateHandler(questionIndex, "question_points", e);
                      }}
                      type="number"
                      extraStyles={{ width: "5em" }}
                    />
                  </div>
                </div>
              </div>
              {questions[[questionIndex]].isExpanded ? (
                getQuestionTemplate(questions[[questionIndex]], questionIndex)
              ) : (
                <CollapsedQuestion
                  index={questionIndex}
                  questionItem={questions[[questionIndex]]}
                />
              )}
            </div>
            <button
              className="btn questionnaire-btn"
              style={{ margin: "0 0 1em 1em" }}
              onClick={() => {
                addQuestionHandler(questionIndex);
              }}
            >
              ADD QUESTION
            </button>
          </>
        ))}
      </div>
    );
  return (
    <Layout>
      <div className="container questionnaire-container">
        <div className="header">
          <div className="hr"></div>
          <h3>QUESTIONNAIRE</h3>
          <div className="hr"></div>
        </div>
        {display}
      </div>
      <AddBoardModal
        show={addBoardModalShown}
        hideModal={() => {
          setAddBoardModalShown(false);
        }}
        clickHandler={addBoardHandler}
      />
      {error && (
        <Toast
          text={error}
          type={error ? "fail" : "success"}
          hideModal={() => {
            setError(false);
          }}
        />
      )}
    </Layout>
  );
};

export default Questionnaire;
