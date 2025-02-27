import './App.css';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);
// import logo from './logo.svg';

declare global {
  interface Window {
    Chart?: any;
  }
}

// const range = document.getElementById("range");
// const knobCircle = document.getElementById("knob-circle");
// const knobValue = document.getElementById("knob-value");
// const weeklyChart = document.querySelector("#weeklyChart");
// const monthlyChart = document.querySelector("#monthlyChart");

function App() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // updateKnob();
    // buildWeeklyChart();
    // buildMonthlyChart();
  }, []);


  function updateKnob() {
    // if (!knobCircle)
    //   return;

    // const radius = 80;
    // const circumference = 2 * Math.PI * radius;
    // knobCircle.style.strokeDasharray = circumference.toString();

    // const value = range.getAttribute("value");
    // const offset = circumference - (Number(value) / 100) * circumference;
    // knobCircle.style.strokeDashoffset = offset.toString();
    // knobValue.textContent = value + "%";
  }
  
  function getMonthDayCount() {
    var date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  return (
    <div className="container">
      Gerenciador de Meta
      <div className="knob-container">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle id="knob-background" cx="100" cy="100" r="80" stroke="#ddd" strokeWidth="40" fill="none"></circle>
          <circle cx="100" cy="100" r="80" stroke="#9ad0f5" strokeWidth="40" fill="none" strokeDasharray="630" strokeDashoffset="0" id="knob-circle" transform="rotate(-90 100 100)"></circle>
        </svg>
        <input type="range" id="range" min="0" max="100" value="50" readOnly />
        <div className="knob-value" id="knob-value">50%</div>
      </div>
      <div className="chart">
        <Bar
          data={{
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{
              label: 'Monitoramento semanal',
              data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1),
              borderWidth: 0
            }]
          }}></Bar>
      </div>
      <div>
        <span>Informações</span>
        <div>
          <span>Metas</span>
          <span>Prata: R$ 150.000,00</span>
          <span>Ouro: R$ 150.000,00</span>
          <span>Diamante: R$ 150.000,00</span>
        </div>
        <div>
          Acumulado semanal: R$ 25.350,23
        </div>
        <div>
          Acumulado mensal: R$ 25.350,23
        </div>
        <div>
          Melhor dia de vendas: 15
        </div>
      </div>
      <div className="chart">
        <Bar
          data={{
            labels: Array.from({ length: getMonthDayCount() }, (_, index) => index + 1),
            datasets: [{
              label: 'Monitoramento semanal',
              data: Array.from({ length: getMonthDayCount() }, () => Math.floor(Math.random() * 100) + 1),
              borderWidth: 0
            }]
          }}></Bar>
      </div>
    </div>
  );
}

export default App;
