import { useEffect, useState } from "react";
import "./styles.css"

interface Props {
    id: string;
    goalValue: number;
    sellingValue: number;
    color: string;
}

export default function Knob(props: Props) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let value = (props.sellingValue * 100) / props.goalValue;
        setValue(value);
        updateKnob();
    }, [props.goalValue, props.sellingValue, value]);

    function updateKnob() {
        const range = document.getElementById(`range-${props.id}`);
        const knobCircle = document.getElementById(`knob-circle-${props.id}`);
        const knobValue = document.getElementById(`knob-value-${props.id}`);

        const radius = 80;
        const circumference = 2 * Math.PI * radius;
        knobCircle.style.strokeDasharray = circumference.toString();

        const value = range.getAttribute("value");
        const offset = circumference - (Number(value) / 100) * circumference;
        knobCircle.style.strokeDashoffset = offset.toString();
        knobValue.textContent = (value === "NaN" ? "0" : value) + "%";
    }

    return (
        <div className="knob-container">
            <svg width="200" height="200" viewBox="0 0 200 200">
                <circle
                    id="knob-background"
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="#ddd"
                    strokeWidth="40"
                    fill="none"
                />
                <circle
                    id={`knob-circle-${props.id}`}
                    className="knob-circle"
                    cx="100"
                    cy="100"
                    r="80"
                    stroke={props.color}
                    strokeWidth="40"
                    fill="none"
                    strokeDasharray="630"
                    strokeDashoffset="0"
                    transform="rotate(-90 100 100)"
                />
            </svg>
            <input
                id={`range-${props.id}`}
                className="knob-input-range"
                type="range"
                min="0"
                max="100"
                value={value.toFixed(2)}
                readOnly
            />
            <div className="knob-value" id={`knob-value-${props.id}`}>50%</div>
        </div>
    );
}