import React, { useState } from "react";
import "./index.css";
export default function CreateOMR(props) {
    const questions = Array.from({ length: Number(props.Noq) });
    const options = ["A", "B", "C", "D"];
    
    const [page, setPage] = useState("test");
    const [studentAnswers, setStudentAnswers] = useState({});
    const [correctAnswers, setCorrectAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [unattempted, setUnattempted] = useState(0);  
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    
    
        function calculateScore() {
            let total = 0;
            let notAttempted = 0;
            let correct = 0;
            let wrong = 0;
        
            for (let i = 1; i <= Number(props.Noq); i++) {
        
                if (!studentAnswers[i]) {
                    notAttempted++;
                    continue;
                }
        
                if (studentAnswers[i] === correctAnswers[i]) {
                    correct++;
                    total += 1;
                } else {
                    wrong++;
                    total -= Number(props.negative || 0);
                }
            }
        
            setCorrectCount(correct);
            setWrongAnswers(wrong);
            setUnattempted(notAttempted);
            setScore(total);
            setPage("result");
        }
    

    function markStudent(qno, option) {
        setStudentAnswers(prev => {
            const updated = {
                ...prev,
                [qno]: option
            };
    
            console.log(updated);
            return updated;
        });
    }
    

    function markCorrect(qno, option) {
        setCorrectAnswers(prev => {
            const updated = {
                ...prev,
                [qno]: option
            };
    
            console.log(updated);
            return updated;
        });
    }

    

    function OMR({ title,answers, marker, buttonText, onFinish }) {
        return (
            <div className="omr-container">
                <h2>{title}</h2>
    
                <div className="omr-grid">
                    {questions.map((_, qIndex) => (
                        <div
                            key={qIndex}
                            className="question-row"
                        >
                            <span className="question-number">
                                {qIndex + 1}
                            </span>
    
                            {options.map((option) => (
                                <label
                                    key={option}
                                    className="omr-option"
                                >
                                    <input
                                    type="radio"
                                    name={`${title}-q${qIndex + 1}`}
                                    value={option}
                                    checked={answers[qIndex + 1] === option}
                                    onChange={() => marker(qIndex + 1, option)}
                                />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                    ))}
                </div>
    
                <button
                    className="omr-btn"
                    onClick={onFinish}
                >
                    {buttonText}
                </button>
            </div>
        );
    }
    return (
        <>
            <h1>{props.tit} OMR Sheet</h1>
          
            {page === "test" && (
                <OMR
                title="Student Answers"
                answers={studentAnswers}
                marker = {markStudent}
                buttonText="Next"
                onFinish={() => setPage("answerKey")}
                />
            )}
         

            {page === "answerKey" && (
                <>
                <OMR
                title="Correct Answers"
                answers = {correctAnswers}
                marker = {markCorrect}
                buttonText="Submit"
                onFinish={calculateScore}
                />


                <button
                    onClick={() => setPage("test")}
                >
                    Previous
                </button>

                </>

                
            )}

{page === "result" && (
    <>
        <h2>Result</h2>
        <h3>Score: {score} / {props.Noq}</h3>
        <h3 style={{ color: "green" }}>
            Correct Answers: {correctCount}
        </h3>

        <h3 style={{ color: "red" }}>
            Wrong Answers: {wrongAnswers}
        </h3>

        <h3 style={{ color: "purple" }}>
            Not Attempted: {unattempted}
        </h3>
                

        {questions.map((_, qIndex) => {
            const qno = qIndex + 1;
            const student = studentAnswers[qno];
            const correct = correctAnswers[qno];

            let status = "wrong";

            if (!student) {
                status = "unattempted";
            } else if (student === correct) {
                status = "correct";
            }

            return (
                <div
                    key={qno}
                    style={{
                        display: "flex",
                        gap: "20px",
                        margin: "10px 0",
                        padding: "10px",
                        border: "1px solid #ccc"
                    }}
                >
                    <strong>Q{qno}</strong>

                    <span>
                        Student:
                        <span
                            style={{
                                color:
                                    status === "correct"
                                        ? "green"
                                        : status === "wrong"
                                        ? "red"
                                        : "purple",
                                fontWeight: "bold",
                                marginLeft: "5px"
                            }}
                        >
                            {student || "Not Attempted"}
                        </span>
                    </span>

                    <span>
                        Correct:
                        <span
                            style={{
                                color: "green",
                                fontWeight: "bold",
                                marginLeft: "5px"
                            }}
                        >
                            {correct || "-"}
                        </span>
                    </span>
                </div>
            );
        })}

        <div
            style={{
                marginTop: "20px",
                display: "flex",
                gap: "10px"
            }}
        >
            <button onClick={() => setPage("answerKey")}>
                Back
            </button>

            <button onClick={props.newTest}>
                New Test
            </button>
        </div>
    </>
)}
          
        </>
    );
}
