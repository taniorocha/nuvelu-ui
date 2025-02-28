import "./styles.css";

interface Props {
    show: boolean;
}

export default function Loading(props: Props) {
    return (
        <div className={props.show ? "loading show" : "loading"}>
            <div className="loading-background"></div>
            <div className="spinner"></div>
        </div>
    );
}