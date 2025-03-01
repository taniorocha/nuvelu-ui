import { Bar } from 'react-chartjs-2';
import { DailyValue } from '../../types';
import Price from '../../helpers/price-helper';

interface Props {
    values: DailyValue[];
    total: number;
}

export default function WeeklyChart(props: Props) {
    return (
        <div className="card">
            <div className="chart">
                <h3>Monitoramento Semanal</h3>
                <span>
                    Acumulado: {Price(props.total)}
                </span>
                <Bar
                    data={{
                        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
                        datasets: [{
                            label: "Valores",
                            data: Array.from(props.values, (x) => x.value),
                            borderWidth: 0,
                            backgroundColor: "#4ecddabf"
                        }]
                    }}
                />
            </div>
        </div>
    );
}