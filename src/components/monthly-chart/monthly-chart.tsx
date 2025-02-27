import { Bar } from 'react-chartjs-2';
import { DailyGoal } from '../../types';

interface Props {
    goals: DailyGoal[];
}

export default function WeeklyChart(props: Props) {
    function getMonthDayCount() {
        var date = new Date();
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    return (
        <Bar
            data={{
                labels: Array.from({ length: getMonthDayCount() }, (_, index) => index + 1),
                datasets: [{
                    label: 'Monitoramento semanal',
                    data: Array.from(props.goals, (x) => x.value),
                    borderWidth: 0
                }]
            }}
        />
    );
}