import React from "react"
import JSONPretty from 'react-json-pretty';

const CodeSnippet = () => {

    const data = [
        {
            result: "Normal"
        }];

    return (
        <div>
            <pre>
                <code>
                    API Endpoint
                    <br />
                    https://api-smartafya.herokuapp.com/predict
                </code>
            </pre>

            Result Example:
            <JSONPretty id="json-pretty" data={data}></JSONPretty>

        </div>
    )
}

export default CodeSnippet