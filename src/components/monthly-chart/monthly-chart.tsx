import { Bar } from 'react-chartjs-2';
import { DailyGoal } from '../../types';
import Price from '../../helpers/price-helper';
import { getMonthDayCount } from '../../helpers/date-helper';

interface Props {
    goals: DailyGoal[];
    total: number;
}

export default function MonthlyChart(props: Props) {
    return (
        <div className="card">
            <div className="chart">
                <h3>Monitoramento Mensal</h3>
                <span>
                    Acumulado: {Price(props.total)}
                </span>
                <Bar style={{ width: "100%" }}
                    data={{
                        labels: Array.from({ length: getMonthDayCount() }, (_, index) => index + 1),
                        datasets: [{
                            label: "Valores",
                            data: Array.from(props.goals, (x) => x.value),
                            borderWidth: 0,
                            backgroundColor: "#4ecddabf"
                        }]
                    }}
                />
            </div>
        </div>
    );
}