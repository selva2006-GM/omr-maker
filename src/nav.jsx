import React, { useState } from "react";
import CreateOMR from "./Createomr";

export default function Nav() {
    const [data, setData] = useState(null);

    function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        setData({
            title: formData.get("title"),
            noq: formData.get("noq")
        });
    }

    if (data) {
        return (
            <CreateOMR
                tit={data.title}
                Noq={data.noq}
            />
        );
    }

    return (
        <>
            <h1>OMR</h1>

            <form onSubmit={onSubmit}>
                <label>
                    Enter the title:
                    <input
                        type="text"
                        placeholder="title"
                        name="title"
                    />
                </label>

                <br />

                <label>
                    Enter the no question:
                    <input
                        type="number"
                        name="noq"
                    />
                </label>

                <br />

                <button type="submit">Submit</button>
            </form>
        </>
    );
}
