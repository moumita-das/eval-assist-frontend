import React, { useEffect } from "react";
import { useState } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import { useRef } from "react";
import TiptapEditor from "../../components/TipTapEditor";
import AIService from "../../services/ai.service";
import ChildListItem from "../../components/ChildListItem";

const Section = ({
  index,
  sectionDetail,
  updateHandler,
  questionsBtnClickHandler,
  answersBtnClickHandler,
}) => {
  console.log(sectionDetail);
  return (
    <div className="questions-wrapper">
      <div className="header">
        <div className="label">
          <Input
            value={sectionDetail.sectionLabel}
            changeHandler={(e) => {
              updateHandler(sectionDetail, index, "sectionLabel", e);
            }}
          />
        </div>
        <div className="controls-wrapper">
          <button className="btn">Type</button>
          <button className="btn">Point</button>
        </div>
      </div>
      <div className="question-content">
        {sectionDetail.questionList.map((questionItem) => (
          <>
            <div className="list-wrapper">
              {questionItem.questions.map(
                (item) =>
                  questionItem.isActive &&
                  item.id == "1" &&
                  (questionItem.questions.length == 1 ? (
                    <div className="entered-question">
                      <TiptapEditor
                        text={item.text}
                        updateText={(html) => {
                          updateHandler(
                            index,
                            "enteredQuestion",
                            html,
                            questionItem.id
                          );
                        }}
                      />
                    </div>
                  ) : (
                    <div className="entered-question">
                      <ChildListItem
                        text={
                          <TiptapEditor
                            text={item.text}
                            updateText={(html) => {
                              updateHandler(
                                index,
                                "enteredQuestion",
                                html,
                                questionItem.id
                              );
                            }}
                          />
                        }
                        id={`${index}-${questionItem.id}-${item.id}`}
                        isSelected={item.isChosen}
                        selectHandler={() => {
                          updateHandler(
                            index,
                            "selectedSimilarQuestion",
                            item.text,
                            questionItem.id
                          );
                        }}
                      />
                    </div>
                  ))
              )}
              {questionItem.questions.length > 1 && (
                <div className="similar-questions-wrapper">
                  {questionItem.questions.map(
                    (item) =>
                      item.id != "1" && (
                        <ChildListItem
                          key={item.id}
                          text={item.text}
                          id={`${index}-${questionItem.id}-${item.id}`}
                          isSelected={item.isChosen}
                          selectHandler={(answerText) => {
                            updateHandler(
                              index,
                              "selectedSimilarQuestion",
                              answerText,
                              questionItem.id
                            );
                          }}
                        />
                      )
                  )}
                </div>
              )}
            </div>
            <div className="controls-wrapper">
              <button
                className="btn"
                onClick={() => {
                  questionsBtnClickHandler(
                    questionItem.questions.filter((item) => item.id === "1")[0]
                      .text,
                    index,
                    questionItem.id
                  );
                }}
              >
                Similar Questions
              </button>
              <button
                className="btn"
                onClick={() => {
                  console.log(sectionDetail);
                  answersBtnClickHandler(
                    questionItem.answers.length == 0
                      ? ""
                      : questionItem.answers[0].text,
                    index,
                    questionItem.id
                  );
                }}
              >
                Generate Answers
              </button>
            </div>
            <h6 style={{ marginTop: "1em" }}>ANSWER</h6>
            <div className="answer-content">
              {questionItem.answers.length <= 1 ||
              questionItem.answers["1"].text == "" ? (
                <TiptapEditor
                  text=""
                  updateText={(html) => {
                    updateHandler(
                      index,
                      "enteredAnswer",
                      html,
                      questionItem.id
                    );
                  }}
                />
              ) : (
                questionItem.answers.length > 1 && (
                  <>
                    <TiptapEditor
                      text=""
                      updateText={(html) => {
                        updateHandler(
                          index,
                          "enteredAnswer",
                          html,
                          questionItem.id
                        );
                      }}
                    />
                    <div className="answers-wrapper">
                      <ChildListItem
                        text={
                          <TiptapEditor
                            text=""
                            updateText={(html) => {
                              updateHandler(
                                index,
                                "selected_answer",
                                html,
                                questionItem.id
                              );
                            }}
                          />
                        }
                      />
                    </div>
                  </>
                )
              )}

              {/* {questionItem.answers.length > 1 && (
                <div className="answers-wrapper">
                  {questionItem.answers
                    .filter((item) => item.id !== "1")
                    .map((item) => (
                      <ChildListItem
                        key={item.id}
                        text={item.text}
                        id={`${index}-${questionItem.id}-${item.id}`}
                        isSelected={item.isChosen}
                        selectHandler={(answerText) => {
                          updateHandler(
                            index,
                            "selected_answer",
                            answerText,
                            questionItem.id
                          );
                        }}
                      />
                    ))}
                </div>
              )} */}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
const Questionnaire = () => {
  const [questions, setQuestions] = useState({
    "section-1": {
      sectionLabel: "Section 1",
      commonType: "",
      commonPoints: "",
      questionList: [
        {
          id: "1",
          isActive: true,
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
  });
  const updateHandler = (sectionIndex, itemType, e, questionIndex) => {
    const updatedQuestions = JSON.parse(JSON.stringify(questions));
    switch (itemType) {
      case "sectionLabel":
        updatedQuestions[[sectionIndex]].sectionLabel = e.target.value;
        break;
      case "enteredQuestion":
        updatedQuestions[[sectionIndex]].questionList.map((questionItem) => {
          if (questionItem.id == questionIndex) {
            questionItem.questions.map((item) => {
              if (item.id === "1") {
                item.text = e;
              }
            });
          }
        });
        break;
      case "similar_questions":
        updatedQuestions[[sectionIndex]].questionList.map((questionItem) => {
          if (questionItem.id == questionIndex) {
            questionItem.questions = questionItem.questions.filter(
              (item) => item.id == "1"
            );
            let existing_length = questionItem.questions.length;
            e.map((item) => {
              questionItem.questions.push({
                id: `${existing_length + 1}`,
                text: item,
                isChosen: false,
              });
              existing_length += 1;
            });
          }
        });
        break;
      case "selectedSimilarQuestion":
        updatedQuestions[[sectionIndex]].questionList.map((questionItem) => {
          if (questionItem.id == questionIndex) {
            questionItem.questions.map((item) => {
              if (item.text === e) item.isChosen = true;
              else item.isChosen = false;
            });
          }
        });
        break;
      case "enteredAnswer":
        updatedQuestions[[sectionIndex]].questionList.map((questionItem) => {
          if (questionItem.id == questionIndex) {
            questionItem.answers = [{ id: "1", text: e, isChosen: false }];
          }
        });
        break;
      case "generated_answers":
        updatedQuestions[[sectionIndex]].questionList.map((questionItem) => {
          if (questionItem.id == questionIndex) {
            questionItem.answers = questionItem.answers.filter(
              (item) => item.id == "1"
            );
            let existing_length = questionItem.answers.length;
            e.map((item) => {
              questionItem.answers.push({
                id: `${existing_length + 1}`,
                text: item,
                isChosen: false,
              });
              existing_length += 1;
            });
          }
        });
        break;
      case "selected_answer":
        updatedQuestions[[sectionIndex]].questionList.map((questionItem) => {
          if (questionItem.id == questionIndex) {
            questionItem.answers.map((item) => {
              if (item.text === e) item.isChosen = true;
              else item.isChosen = false;
            });
          }
        });
        break;
    }
    setQuestions(updatedQuestions);
  };
  console.log(questions);
  const questionsBtnClickHandler = (text, sectionIndex, questionItemIndex) => {
    AIService.generateSimilarQuestions(text, 4)
      .then((res) => {
        updateHandler(
          sectionIndex,
          "similar_questions",
          res.similar_questions,
          questionItemIndex
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const answersBtnClickHandler = (text, sectionIndex, questionItemIndex) => {
    AIService.generateAnswers(text, 4)
      .then((res) => {
        console.log(res);
        updateHandler(
          sectionIndex,
          "generated_answers",
          res.generated_answers,
          questionItemIndex
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Layout>
      <div className="container questionnaire-container">
        <div className="header">
          <div className="hr"></div>
          <h3>QUESTIONNAIRE</h3>
          <div className="hr"></div>
        </div>
        <div className="sections-wrapper">
          {Object.keys(questions).map((itemKey) => (
            <Section
              key={itemKey}
              index={itemKey}
              sectionDetail={questions[[itemKey]]}
              updateHandler={updateHandler}
              questionsBtnClickHandler={questionsBtnClickHandler}
              answersBtnClickHandler={answersBtnClickHandler}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Questionnaire;
