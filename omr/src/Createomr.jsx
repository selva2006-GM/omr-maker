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

    
    
    function calculateScore() {
        let total = 0;
        let notAttempted = 0;
    
        for (let i = 1; i <= Number(props.Noq); i++) {
    
            if (!studentAnswers[i]) {
                notAttempted++;
                continue;
            }
    
            if (studentAnswers[i] === correctAnswers[i]) {
                total++;
            }
        }
    
        setScore(total);
        setUnattempted(notAttempted);
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

    

    function OMR({title,
        answers,
        marker,
        buttonText,
        onFinish}) {
        return (
            <>
                <h2>{title}</h2>

                {questions.map((_, qIndex) => (
                    <div key={qIndex}>
                        <span>Q{qIndex + 1}</span>

                        {options.map((option) => (
                            <label key={option} className="omr-option">
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

                <button onClick={onFinish}>{buttonText}</button>
            </>
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
                <OMR
                title="Correct Answers"
                answers = {correctAnswers}
                marker = {markCorrect}
                buttonText="Submit"
                onFinish={calculateScore}
                />
            )}

{page === "result" && (
    <>
        <h2>Result</h2>
        <h3>Score: {score} / {props.Noq}</h3>

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
                        Student:{" "}
                        <span
                            style={{
                                color:
                                    status === "correct"
                                        ? "green"
                                        : status === "wrong"
                                        ? "red"
                                        : "purple",
                                fontWeight: "bold"
                            }}
                        >
                            {student || "Not Attempted"}
                        </span>
                    </span>

                    <span>
                        Correct:{" "}
                        <span
                            style={{
                                color: "green",
                                fontWeight: "bold"
                            }}
                        >
                            {correct || "-"}
                        </span>
                    </span>
                </div>
            );
        })}
    </>
)}
          
        </>
    );
}