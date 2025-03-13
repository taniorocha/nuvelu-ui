import { weekWithHighestValues } from "../../helpers/date-helper";
import Price from "../../helpers/price-helper";
import { DailyValue, Goal } from "../../types";
import "./styles.css"

interface Props {
    bestDay: Goal,
    monthlyValues: DailyValue[]
}

export default function GeneralInfo(props: Props) {
    function getRemainingDays() {
        const date = new Date();
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        return daysInMonth - date.getDate();
    }

    function getMidDailyValue() {
        const days_with_values = props.monthlyValues.filter(x => x.value > 0) ?? [];
        const value = days_with_values.map(item => item.value).reduce((prev, next) => prev + next, 0);
        return Price((value / days_with_values.length));
    }

    return (
        <div className="card">
            <div className="general-info">
                <h3>Informações Gerais</h3>
                <div className="general-info-item">
                    <span>Melhor dia de vendas:</span>
                    <span>{props?.bestDay?.date ? new Date(`${props?.bestDay?.date} 00:00:00`).getDate() : 0}</span>
                </div>
                <div className="general-info-item">
                    <span>Melhor semana:</span>
                    <span>{weekWithHighestValues(props.monthlyValues)}</span>
                </div>
                <div className="general-info-item">
                    <span>Dias restantes:</span>
                    <span>{getRemainingDays()}</span>
                </div>
                <div className="general-info-item">
                    <span>Média diária:</span>
                    <span>{getMidDailyValue()}</span>
                </div>
            </div>
        </div>
    );
}