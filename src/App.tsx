import './App.css';
import './logo.svg';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import Knob from './components/knob/knob';
import WeeklyChart from './components/weekly-chart/weekly-chart';
import MonthlyChart from './components/monthly-chart/monthly-chart';
import Api from './Api';
import Price from './helpers/PriceHelper';
import Header from './components/header/header';
ChartJS.register(...registerables);

export default function App() {
  const [totalWeekValue, setTotalWeekValue] = useState(0);
  const [totalMonthValue, setTotalMonthValue] = useState(0);
  const [mainGoal, setMainGoal] = useState(null);
  const [weeklyGoals, setWeeklyGoals] = useState([]);
  const [monthlyGoals, setMonthlyGoals] = useState([]);
  const [bestDay, setBestDay] = useState(null);

  useEffect(() => {
    GetGoalData();
  }, []);

  async function GetGoalData() {
    var result = await Api.GetMainGoals(123);
    if (!result)
      return;

    setMainGoal(result);

    var weekGoals = await Api.GetWeekGoals(123);
    setWeeklyGoals(weekGoals);

    let totalWeekValue = weekGoals.map(item => item.value).reduce((prev, next) => prev + next);
    setTotalWeekValue(totalWeekValue);

    var monthGoals = await Api.GetMonthGoals(123);
    setMonthlyGoals(monthGoals);

    let totalMonthValue = monthGoals.map(item => item.value).reduce((prev, next) => prev + next);
    setTotalMonthValue(totalMonthValue);

    let bestDay = { value: 0 };
    monthGoals.forEach((item) => bestDay = item.value > bestDay.value ? item : bestDay);
    setBestDay(bestDay);
  }

  return (
    <div className="container">
      <Header />
      <Knob goal={mainGoal} value={totalMonthValue} />
      <WeeklyChart goals={weeklyGoals} />
      <div>
        <span>Informações</span>
        <div>
          <span>Metas</span>
        </div>
        <div>
          <span>Prata: R$ {Price(mainGoal?.silver)}</span>
        </div>
        <div>
          <span>Ouro: R$ {Price(mainGoal?.gold)}</span>
        </div>
        <div>
          <span>Diamante: R$ {Price(mainGoal?.diamond)}</span>
        </div>
        <div>
          Acumulado semanal: R$ {Price(totalWeekValue)}
        </div>
        <div>
          Acumulado mensal: R$ {Price(totalMonthValue)}
        </div>
        <div>
          Melhor dia de vendas: {new Date(bestDay?.date).getDate()}
        </div>
      </div>
      <MonthlyChart goals={monthlyGoals} />
    </div>
  );
}