import "./styles.css";

interface Props {
    activeKnob: string;
    setActiveKnob(value: string): void;
}

export default function KnobButtons(props: Props) {
    return (
        <div className="knob-chart-buttons">
            <button
                className={props.activeKnob === "silver" ? "active" : ""}
                onClick={() => props.setActiveKnob("silver")}
                style={{ background: "#afafaf" }}
            >
                <span className="material-symbols-outlined">paid</span>
            </button>
            <button
                className={props.activeKnob === "gold" ? "active" : ""}
                onClick={() => props.setActiveKnob("gold")}
                style={{ background: "#ff9b00" }}
            >
                <span className="material-symbols-outlined">paid</span>
            </button>
            <button
                className={props.activeKnob === "diamond" ? "active" : ""}
                onClick={() => props.setActiveKnob("diamond")}
                style={{ background: "#7adae3" }}
            >
                <span className="material-symbols-outlined">diamond</span>
            </button>
        </div>
    );
}