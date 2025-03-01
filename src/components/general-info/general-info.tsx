import { weekWithHighestValues } from "../../helpers/date-helper";
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

    return (
        <div className="card">
            <h3>Informações Gerais</h3>
            <div>
                <span>
                    Melhor dia de vendas: {
                        props?.bestDay?.date ? new Date(`${props?.bestDay?.date} 00:00:00`).getDate() : 0
                    }
                </span>
            </div>
            <div>
                <span>Melhor semana: {weekWithHighestValues(props.monthlyValues)}</span>
            </div>
            <div>
                <span>Dias restantes: {getRemainingDays()}</span>
            </div>
        </div>
    );
}