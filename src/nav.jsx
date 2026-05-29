import React, { useState } from "react";
import CreateOMR from "./Createomr";

export default function Nav() {
    const [data, setData] = useState(null);

    function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        setData({
            title: formData.get("title"),
            noq: formData.get("noq"),
            negative: Number(formData.get("negative"))
        });
    }

    if (data) {
        return (
            <CreateOMR
            tit={data.title}
            Noq={data.noq}
            negative={data.negative}
            newTest={() => setData(null)}
        />
        );
    }

    return (
        <div className="nav-container">
            <h1>OMR Generator</h1>
    
            <form className="omr-form" onSubmit={onSubmit}>
                <label>
                    Enter the title:
                    <input
                        type="text"
                        placeholder="title"
                        name="title"
                    />
                </label>
    
                <label>
                    Enter the no question:
                    <input
                        type="number"
                        name="noq"
                    />
                </label>

                <label>
                    Negative Mark:
                    <input
                        type="number"
                        step="0.25"
                        name="negative"
                        defaultValue={0}
                    />
                </label>
    
                <button type="submit">
                    Create OMR
                </button>
            </form>
        </div>
    );
}
