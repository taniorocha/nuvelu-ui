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
import { Goal } from './types';
ChartJS.register(...registerables);

export default function App() {
  const [totalWeekValue, setTotalWeekValue] = useState(0);
  const [totalMonthValue, setTotalMonthValue] = useState(0);
  const [mainGoal, setMainGoal] = useState<Goal>(null);
  const [weeklyGoals, setWeeklyGoals] = useState([]);
  const [monthlyGoals, setMonthlyGoals] = useState([]);
  const [bestDay, setBestDay] = useState(null);
  const [activeKnob, setActiveKnob] = useState("silver");

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

  function getRemainingDays() {
    const date = new Date();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    return daysInMonth - date.getDate();
  }

  function getMidDailyValue(goalValue: number) {
    const date = new Date();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    return goalValue / daysInMonth;
  }

  return (
    <div className="container">
      <Header />
      <div className="knob-chart">
        <div className="knob-chart-buttons">
          <button className={activeKnob === "silver" ? "active": ""} style={{ background: "#afafaf" }} onClick={() => setActiveKnob("silver")}>
            <span className="material-symbols-outlined">paid</span>
          </button>
          <button className={activeKnob === "gold" ? "active": ""} style={{ background: "#ff9b00" }} onClick={() => setActiveKnob("gold")}>
            <span className="material-symbols-outlined">paid</span>
          </button>
          <button className={activeKnob === "diamond" ? "active": ""} style={{ background: "#7adae3" }} onClick={() => setActiveKnob("diamond")}>
            <span className="material-symbols-outlined">diamond</span>
          </button>
        </div>
        <div>
          {activeKnob === "silver" &&
            <Knob
              id="silver"
              goalValue={mainGoal?.silver}
              sellingValue={totalMonthValue}
              color="#afafaf"
            />
          }

          {activeKnob === "gold" &&
            <Knob
              id="gold"
              goalValue={mainGoal?.gold}
              sellingValue={totalMonthValue}
              color="#ff9b00"
            />
          }

          {activeKnob === "diamond" &&
            <Knob
              id="diamond"
              goalValue={mainGoal?.diamond}
              sellingValue={totalMonthValue}
              color="#7adae3"
            />
          }
        </div>
      </div>
      <section>
        <div className="card">
          <WeeklyChart goals={weeklyGoals} total={totalWeekValue} />
        </div>
        <div className="inline-carts">
          <div className="card goal-card-silver">
            <span className="material-symbols-outlined">paid</span>
            <span className="goal-value">{Price(mainGoal?.silver)}</span>
            <span className="daily-value">{Price(getMidDailyValue(mainGoal?.silver))}</span>
          </div>
          <div className="card goal-card-gold">
            <span className="material-symbols-outlined">paid</span>
            <span className="goal-value">{Price(mainGoal?.gold)}</span>
            <span className="daily-value">{Price(getMidDailyValue(mainGoal?.gold))}</span>
          </div>
          <div className="card goal-card-diamond">
            <span className="material-symbols-outlined">diamond</span>
            <span className="goal-value">{Price(mainGoal?.diamond)}</span>
            <span className="daily-value">{Price(getMidDailyValue(mainGoal?.diamond))}</span>
          </div>
        </div>
        <div>
          <div className="card">
            <h3>Informações Gerais</h3>
            <div>
              Melhor dia de vendas: {new Date(bestDay?.date).getDate()}
            </div>
            <div>
              Dias restantes: {getRemainingDays()}
            </div>
          </div>
        </div>
        <div className="card">
          <MonthlyChart goals={monthlyGoals} total={totalMonthValue} />
        </div>
      </section>
    </div>
  );
}