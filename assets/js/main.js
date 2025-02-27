
const range = document.getElementById("range");
const knobCircle = document.getElementById("knob-circle");
const knobBackground = document.getElementById("knob-background");
const knobValue = document.getElementById("knob-value");

// The circumference of the circle with radius 80 (this will be the stroke-dasharray value)
const radius = 80;
const circumference = 2 * Math.PI * radius;
knobCircle.style.strokeDasharray = circumference;

// Function to update the stroke-dashoffset based on the input range
function updateKnob() {
    const value = range.value;
    const offset = circumference - (value / 100) * circumference;
    knobCircle.style.strokeDashoffset = offset;
    knobValue.textContent = value + "%";
}

// Initialize the knob with the current value
updateKnob();

// Update the knob when the input value changes
range.addEventListener("change", updateKnob);


// function handleClick(event) {
//     // Get the mouse position relative to the SVG
//     const rect = event.target.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;
    
//     // Calculate the angle based on the click position
//     const angle = Math.atan2(y - 100, x - 100) * 180 / Math.PI;
//     let percentage = (angle + 90) / 360 * 100;

//     if (percentage < 0) {
//         percentage += 100; // To handle negative values (when clicked in the lower half of the circle)
//     }

//     // Set the input value and update the knob
//     range.value = percentage;
//     updateKnob();
// }

// knobCircle.addEventListener("click", handleClick);
// knobBackground.addEventListener("click", handleClick);


function buildWeeklyChart() {
    var week_days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    var values = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1); // Valores aleatórios entre 1 e 100

    const weeklyChart = document.querySelector("#weeklyChart");
    new Chart(weeklyChart, {
        type: 'bar',
        data: {
          labels: week_days,
          datasets: [{
            label: 'Monitoramento semanal',
            data: values,
            borderWidth: 0
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
    });
}

function buildMonthlyChart() {
    var date = new Date();
    var month_days_count = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    var month_days = Array.from({ length: month_days_count }, (_, index) => index + 1);
    var values = Array.from({ length: month_days_count }, () => Math.floor(Math.random() * 100) + 1); // Valores aleatórios entre 1 e 100

    new Chart(monthlyChart, {
        type: 'bar',
        data: {
          labels: month_days,
          datasets: [{
            label: 'Monitoramento mensal',
            data: values,
            borderWidth: 0
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
    });
}

window.onload = function () {
    buildWeeklyChart();
    buildMonthlyChart();
}     