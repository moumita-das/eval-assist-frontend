import React from "react";
import TiptapEditor from "../../../components/TipTapEditor";
import Pill from "../../../components/Pill";

const ChildListItem = ({ text, id, isSelected, listType, selectHandler }) => {
  return (
    <div className={`form-check child-list-item ${isSelected ? "active" : ""}`}>
      <input
        className={`form-check-input`}
        type={listType ? listType : "checkbox"}
        checked={isSelected}
        id={`flexCheckDefault-${id}`}
        onChange={() => {
          selectHandler(text);
        }}
      />
      <label className="form-check-label" for={`flexCheckDefault-${id}`}>
        {text}
      </label>
    </div>
  );
};
const ExpandedQuestionSubjective = ({
  index,
  questionItem,
  updateHandler,
  questionsBtnClickHandler,
  answersBtnClickHandler,
  generateKeywordsBtnClickHandler,
}) => {
  const pillList = [];
  Object.keys(questionItem.keywords)?.map((difficulty) => {
    pillList.push(
      questionItem.keywords[[difficulty]]?.map((word) => (
        <Pill
          text={word}
          extraClasses={difficulty}
          clickHandler={() => {
            updateHandler(index, "keyword_selected", word);
          }}
          isActive={
            questionItem.selectedKeywords.indexOf(word) >= 0 ? "active" : ""
          }
        />
      ))
    );
  });
  return (
    <>
      <div className="list-wrapper">
        {questionItem.questions.map(
          (item) =>
            questionItem.isExpanded &&
            item.id == "1" && (
              <div className="entered-question" key={item.id}>
                {questionItem.questions.length == 1 ? (
                  <TiptapEditor
                    text={item.text}
                    updateText={(html) => {
                      updateHandler(index, "entered_question", html);
                    }}
                    placeholder="Enter your question here..."
                  />
                ) : (
                  <ChildListItem
                    text={
                      <TiptapEditor
                        text={item.text}
                        updateText={(html) => {
                          updateHandler(index, "entered_question", html);
                        }}
                        placeholder="Enter your question here..."
                      />
                    }
                    isSelected={item.isChosen}
                    selectHandler={() => {
                      updateHandler(
                        index,
                        "selected_similar_question",
                        item.text
                      );
                    }}
                  />
                )}
              </div>
            )
        )}

        {questionItem.questions.length > 1 && (
          <div className="similar-questions-wrapper">
            {questionItem.questions.map(
              (item) =>
                item.id != "1" && (
                  <div key={`item-${item.id}`}>
                    <ChildListItem
                      text={item.text}
                      id={`${index}-${questionItem.id}-${item.id}`}
                      isSelected={item.isChosen}
                      selectHandler={(answerText) => {
                        updateHandler(
                          index,
                          "selected_similar_question",
                          answerText
                        );
                      }}
                    />
                  </div>
                )
            )}
          </div>
        )}
      </div>
      {questionItem.questions[0].text != "" && (
        <>
          <div className="footer-row">
            <div className="pill-list">{pillList}</div>
            <div className="controls-wrapper">
              <p className="info">Next steps:&nbsp;&nbsp;</p>
              {!(Object.keys(questionItem.keywords).length > 0) && (
                <button
                  className="btn  questionnaire-btn"
                  onClick={() => {
                    generateKeywordsBtnClickHandler(index);
                  }}
                >
                  Generate Keywords
                </button>
              )}
              {questionItem.answers[0].text == "" ? (
                <button
                  className="btn  questionnaire-btn"
                  onClick={() => {
                    answersBtnClickHandler("Generate", index);
                  }}
                >
                  Get Answers
                </button>
              ) : (
                <button
                  className="btn  questionnaire-btn"
                  onClick={() => {
                    answersBtnClickHandler("Improve", index);
                  }}
                >
                  Improve Answer
                </button>
              )}

              <button
                className="btn  questionnaire-btn"
                onClick={() => {
                  questionsBtnClickHandler(
                    index,
                    questionItem.questions[0].text
                  );
                }}
              >
                Similar Questions
              </button>
            </div>
          </div>
          <h6 style={{ marginTop: "1em" }}>ANSWER</h6>

          <div className="answer-content">
            {questionItem.answers.length > 1 ? (
              questionItem.answers[0].text.trim() != "" && (
                <ChildListItem
                  text={
                    <TiptapEditor
                      text={questionItem.answers[0].text}
                      updateText={(html) => {
                        updateHandler(
                          index,
                          "enteredAnswer",
                          html,
                          questionItem.id
                        );
                      }}
                      placeholder='Enter your answer here or generate answers by clicking on the "Get Answers" button'
                    />
                  }
                  id={`${index}-${questionItem.id}-${1}`}
                  isSelected={questionItem.answers[0].isChosen}
                  selectHandler={() => {
                    updateHandler(
                      index,
                      "selected_answer",
                      questionItem.answers[0].text,
                      questionItem.id
                    );
                  }}
                />
              )
            ) : (
              <TiptapEditor
                text={questionItem.answers[0].text}
                updateText={(html) => {
                  updateHandler(index, "enteredAnswer", html, questionItem.id);
                }}
                placeholder='Enter your answer here or generate answers by clicking on the "Get Answers" button'
              />
            )}

            {questionItem.answers.length > 1 &&
              questionItem.answers
                .filter((item) => item.id != "1")
                .map((item) => (
                  <ChildListItem
                    key={item.id}
                    text={item.text}
                    id={`${index}-${questionItem.id}-${item.id}`}
                    isSelected={item.isChosen}
                    selectHandler={() => {
                      updateHandler(
                        index,
                        "selected_answer",
                        item.text,
                        questionItem.id
                      );
                    }}
                  />
                ))}
          </div>
        </>
      )}
    </>
  );
};

export default ExpandedQuestionSubjective;
