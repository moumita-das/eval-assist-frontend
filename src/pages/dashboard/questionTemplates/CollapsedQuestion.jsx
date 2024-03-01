import React from "react";

const CollapsedQuestion = ({ index, questionItem }) => {
  const chosenQuestion = questionItem.questions.filter(
    (item) => item.isChosen == true
  )[0];
  const chosenAnswer = questionItem.answers.filter(
    (item) => item.isChosen == true
  )[0];
  return (
    <>
      <div className="entered-question" style={{ fontWeight: "100" }}>
        {chosenQuestion.text}
      </div>
      <h6 style={{ marginTop: "1em" }}>ANSWER</h6>
      <div className="answer-content" style={{ fontWeight: "100" }}>
        {chosenAnswer?.text}
      </div>
    </>
  );
};

export default CollapsedQuestion;
