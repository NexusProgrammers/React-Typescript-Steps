import React, { useState } from "react";

const messages = [
  "Step 1: Learn React ⚛️",
  "Step 2: Apply for jobs 💼",
  "Step 3: Invest your new income 🤑",
  "Step 4: Improve your coding skills 🚀",
  "Step 5: Build a portfolio project 🏗️",
  "Step 6: Network with other developers 👥",
  "Step 7: Prepare for interviews 📝",
  "Step 8: Attend tech meetups or conferences 🌐",
  "Step 9: Continue learning and staying updated 📚",
  "Step 10: Land your dream job! 🚀💼",
];

export default function App() {
  return (
    <div>
      <Steps />
      {messages.slice(0, 10).map((message, index) => (
        <StepMessage key={index} step={index + 1}>
          {message}
        </StepMessage>
      ))}
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 10) {
      setStep((s) => s + 1);
    }
  }

  function toggleStepCompletion() {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    } else {
      setCompletedSteps(
        completedSteps.filter((completedStep) => completedStep !== step)
      );
    }
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            {[...Array(10).keys()].map((num) => (
              <div
                key={num}
                className={`step-number ${num + 1 === step ? "active" : ""} ${
                  completedSteps.includes(num + 1) ? "completed" : ""
                }`}
                onClick={() => setStep(num + 1)}
              >
                {num + 1}
              </div>
            ))}
          </div>

          <StepMessage step={step}>
            {messages[step - 1]}
            <div className="buttons">
              <Button
                bgColor="#e7e7e7"
                textColor="#333"
                onClick={() => alert(`Learn how to ${messages[step - 1]}`)}
              >
                Learn how
              </Button>
            </div>
          </StepMessage>

          <div className="buttons">
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              <span>👈</span> Previous
            </Button>

            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              Next <span>👉</span>
              <span>🤓</span>
            </Button>
          </div>

          <div className="buttons">
            <button
              className={`complete-button ${
                completedSteps.includes(step) ? "completed" : ""
              }`}
              onClick={toggleStepCompletion}
            >
              {completedSteps.includes(step)
                ? "Mark Incomplete"
                : "Mark Complete"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const StepMessage: React.FC<StepMessageProps> = ({ step, children }) => {
  return (
    <div className="message">
      <h3>{children}</h3>
      <p>Step {step}</p>
    </div>
  );
};

const Button: React.FC<ButtonProps> = ({
  textColor,
  bgColor,
  onClick,
  children,
}) => {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
