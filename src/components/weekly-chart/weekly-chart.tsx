import { Bar } from 'react-chartjs-2';
import { DailyGoal } from '../../types';

interface Props {
    goals: DailyGoal[];
}

export default function WeeklyChart(props: Props) {
    return (
        <div className="chart">
            <Bar
                data={{
                    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                    datasets: [{
                        label: 'Monitoramento semanal',
                        data: Array.from(props.goals, (x) => x.value),
                        borderWidth: 0
                    }]
                }}
            />
        </div>
    );
}