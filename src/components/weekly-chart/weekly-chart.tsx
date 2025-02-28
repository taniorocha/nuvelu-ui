import { Bar } from 'react-chartjs-2';
import { DailyGoal } from '../../types';
import Price from '../../helpers/PriceHelper';

interface Props {
    goals: DailyGoal[];
    total: number;
}

export default function WeeklyChart(props: Props) {
    return (
        <div className="chart">
            <h3>Monitoramento Semanal</h3>
            <span>
                Acumulado: {Price(props.total)}
            </span>
            <Bar
                data={{
                    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                    datasets: [{
                        label: 'Valores',
                        data: Array.from(props.goals, (x) => x.value),
                        borderWidth: 0,
                        backgroundColor: "#4ecddabf"
                    }]
                }}
            />
        </div>
    );
}