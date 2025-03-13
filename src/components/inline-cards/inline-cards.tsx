import { getMonthDayCountExceptSundays } from "../../helpers/date-helper";
import Price from "../../helpers/price-helper";
import { Goal } from "../../types";
import "./styles.css";

interface Props {
    goal: Goal
}

export default function InlineCards(props: Props) {
    function getMidDailyValue(goalValue: number) {
        const daysInMonth = getMonthDayCountExceptSundays();
        return goalValue / daysInMonth;
    }

    return (
        <div className="inline-cards">
            <div className="card goal-card-silver">
                <span className="material-symbols-outlined">paid</span>
                <span className="goal-value">{Price(props?.goal?.silver)}</span>
                <span className="daily-value">{Price(getMidDailyValue(props?.goal?.silver))}</span>
            </div>
            <div className="card goal-card-gold">
                <span className="material-symbols-outlined">paid</span>
                <span className="goal-value">{Price(props?.goal?.gold)}</span>
                <span className="daily-value">{Price(getMidDailyValue(props?.goal?.gold))}</span>
            </div>
            <div className="card goal-card-diamond">
                <span className="material-symbols-outlined">diamond</span>
                <span className="goal-value">{Price(props?.goal?.diamond)}</span>
                <span className="daily-value">{Price(getMidDailyValue(props?.goal?.diamond))}</span>
            </div>
        </div>
    );
}