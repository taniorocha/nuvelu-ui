import { useEffect, useState } from "react";
import "./styles.css"
import { Goal } from "../../types";

interface Props {
    goal: Goal;
    value: number;
}

export default function Knob(props: Props) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!props.goal)
            return;

        let value = (props.value * 100) / props.goal.diamond;
        setValue(value);
        updateKnob();
    }, [props.value, value]);

    function updateKnob() {
        const range = document.getElementById("range");
        const knobCircle = document.getElementById("knob-circle");
        const knobValue = document.getElementById("knob-value");

        const radius = 80;
        const circumference = 2 * Math.PI * radius;
        knobCircle.style.strokeDasharray = circumference.toString();

        const value = range.getAttribute("value");
        const offset = circumference - (Number(value) / 100) * circumference;
        knobCircle.style.strokeDashoffset = offset.toString();
        knobValue.textContent = value + "%";
    }

    return (
        <div className="knob-container">
            <svg width="200" height="200" viewBox="0 0 200 200">
                <circle id="knob-background" cx="100" cy="100" r="80" stroke="#ddd" strokeWidth="40" fill="none"></circle>
                <circle cx="100" cy="100" r="80" stroke="#9ad0f5" strokeWidth="40" fill="none" strokeDasharray="630" strokeDashoffset="0" id="knob-circle" transform="rotate(-90 100 100)"></circle>
            </svg>
            <input
                type="range"
                id="range"
                min="0"
                max="100"
                value={value.toFixed(2)}
                readOnly
            />
            <div className="knob-value" id="knob-value">50%</div>
        </div>
    );
}