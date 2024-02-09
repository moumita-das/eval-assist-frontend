import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import AuthContext from "../../store/auth-context";

import "./Dashboard.scss";

const Dashboard = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [activitySelected, setActivitySelected] = useState("");
  const activityOptions = [
    {
      id: 1,
      label: "Generate Question Paper",
      imageURL: `url('/assets/images/file-question.svg')`,
      description:
        "Our AI can curate an entire question paper for you in just a couple of clicks",
      navigateTo: "/dashboard/questionnaire",
    },
    {
      id: 2,
      label: "Evaluate Answers",
      imageURL: `url('/assets/images/file-check-2.svg')`,
      description:
        "Use our AI to check answers for your students, provide personalised feedbacks, scores, etc.",
      navigateTo: "/dashboard/evaluation",
    },
  ];
  return (
    <Layout>
      <div className="container dashboard-container">
        <h3 className="mb-3">Welcome back, {authCtx.userDetails.userName}</h3>
        <div className="section">
          <div className="left-content">
            <p className="mt-4 info">Here are a few thing you can do</p>
            {activityOptions.map((item) => (
              <div
                key={item.id}
                className="inverted-triangle-banner"
                onMouseEnter={() => {
                  setActivitySelected(item);
                }}
                onMouseLeave={() => {
                  setActivitySelected(null);
                }}
                onClick={() => {
                  navigate(item.navigateTo);
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
          <div className="right-content">
            {activitySelected && (
              <div className="wrapper">
                <div
                  className="img-bg"
                  style={{
                    backgroundImage: activitySelected?.imageURL,
                  }}
                ></div>
                <div className="info">{activitySelected?.description}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
