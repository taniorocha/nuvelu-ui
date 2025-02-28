import { Goal } from "../../types";
import "./styles.css"

interface Props {
    bestDay: Goal
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
                Melhor dia de vendas: {
                    props?.bestDay?.date ? new Date(props?.bestDay?.date).getDate() : 0
                }
            </div>
            <div>
                Dias restantes: {getRemainingDays()}
            </div>
        </div>
    );
}