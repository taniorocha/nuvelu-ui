import { useEffect, useState } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import Knob from '../../components/knob/knob';
import WeeklyChart from '../../components/weekly-chart/weekly-chart';
import MonthlyChart from '../../components/monthly-chart/monthly-chart';
import Api from '../../Api';
import Header from '../../components/header/header';
import { Goal } from '../../types';
import InlineCards from '../../components/inline-cards/inline-cards';
import KnobButtons from '../../components/knob-buttons/knob-buttons';
import GeneralInfo from '../../components/general-info/general-info';
import { useAuth } from '../../contexts/auth-context';
import Loading from '../../components/loading/loading';
import Swal from 'sweetalert2';

ChartJS.register(...registerables);

export default function Home() {
    const { user } = useAuth();
    const [totalWeekValue, setTotalWeekValue] = useState(0);
    const [totalMonthValue, setTotalMonthValue] = useState(0);
    const [goal, setGoal] = useState<Goal>(null);
    const [weeklyValues, setWeeklyValues] = useState([]);
    const [monthlyValues, setMonthlyValues] = useState([]);
    const [bestDay, setBestDay] = useState(null);
    const [activeKnob, setActiveKnob] = useState("silver");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.querySelector("body").style.overflow = "";
        GetGoalData();
    }, []);

    async function GetGoalData() {
        if (!user)
            return;

        const needToCheckGoalAchieved = totalMonthValue !== 0;
        const lastTotalMonthValue = totalMonthValue;

        setLoading(true);
        var result = await Api.GetGoals();
        if (result)
            setGoal(result);

        var values = await Api.GetValues();
        setWeeklyValues(values.weekly);
        setMonthlyValues(values.monthly);

        let bestValue = { value: 0 };
        values.monthly.forEach((item) => bestValue = item.value > bestValue.value ? item : bestValue);
        setBestDay(bestValue);

        if (values.weekly.length > 0) {
            let totalWeekValue = values.weekly.map(item => item.value).reduce((prev, next) => prev + next, 0);
            setTotalWeekValue(totalWeekValue);
        }

        if (values.monthly.length > 0) {
            let totalMonthValue = values.monthly.map(item => item.value).reduce((prev, next) => prev + next, 0);
            setTotalMonthValue(totalMonthValue);

            if (needToCheckGoalAchieved)
                await checkGoalAchieved(lastTotalMonthValue, totalMonthValue);
        }

        setLoading(false);
    }

    async function confetti() {
        const canvas = document.getElementById('confetti_canvas');
        canvas.style.display = "block";
        const jsConfetti = new window.JSConfetti({ canvas });

        await jsConfetti.addConfetti();
        canvas.style.display = "none";
    }

    function getAchievedGoals(value: number) {
        let achievedGoals = [];

        if (value >= goal.silver)
            achievedGoals.push("silver");

        if (value >= goal.gold)
            achievedGoals.push("gold");

        if (value >= goal.diamond)
            achievedGoals.push("diamond");

        return achievedGoals;
    }

    async function showGoalAchievedMessage(title: string, text: string, imageUrl: string) {
        confetti();
        await Swal.fire({
            title: title,
            text: text,
            imageUrl: imageUrl,
            imageWidth: 200,
            imageHeight: 200,
            confirmButtonColor: "#7adae3",
            imageAlt: "silver-goal-achieved-image",
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen() {
                Swal.showLoading();
                setTimeout(() => Swal.hideLoading(), 2000);
            },
        });
    }

    async function checkGoalAchieved(lastTotalMonthValue: number, currentTotalMonthValue: number) {
        if (lastTotalMonthValue === currentTotalMonthValue)
            return;

        const lastAchievedGoals = getAchievedGoals(lastTotalMonthValue);
        const currentAchievedGoals = getAchievedGoals(currentTotalMonthValue);

        if (currentAchievedGoals.includes("diamond") && !lastAchievedGoals.includes("diamond")) {
            showGoalAchievedMessage(
                "💎 UAU! Você é Diamante!",
                "Esse é o topo da excelência! Poucos chegam aqui, e você é um deles! Agora é hora de comemorar e se preparar para novos desafios ainda maiores. Você é simplesmente incrível! 🚀🎇",
                "/images/goal-img.png"
            );
            
            return;
        }

        if (currentAchievedGoals.includes("gold") && !lastAchievedGoals.includes("gold")) {
            showGoalAchievedMessage(
                "🏆 Você é Ouro!",
                "Isso sim é determinação! Seu esforço e compromisso trouxeram você até aqui, e essa vitória é toda sua. Continue brilhando! 💛🎊",
                "/images/goal-img.png"
            );
            
            return;
        }

        if (currentAchievedGoals.includes("silver") && !lastAchievedGoals.includes("silver")) {
            showGoalAchievedMessage(
                "🎉 Você é Prata!",
                "Parabéns pelo esforço e dedicação. Celebre essa conquista e continue avançando o próximo nível está logo ali! 🚀✨",
                "/images/goal-img.png"
            );

            return;
        }
    }

    return (
        <div className="container">
            <Loading show={loading} />
            <Header callback={() => GetGoalData()} />
            <div className="knob-chart">
                <KnobButtons activeKnob={activeKnob} setActiveKnob={(value) => setActiveKnob(value)} />
                <div>
                    {activeKnob === "silver" &&
                        <Knob
                            id="silver"
                            goalValue={goal?.silver}
                            sellingValue={totalMonthValue}
                            color="#afafaf"
                        />
                    }
                    {activeKnob === "gold" &&
                        <Knob
                            id="gold"
                            goalValue={goal?.gold}
                            sellingValue={totalMonthValue}
                            color="#ff9b00"
                        />
                    }
                    {activeKnob === "diamond" &&
                        <Knob
                            id="diamond"
                            goalValue={goal?.diamond}
                            sellingValue={totalMonthValue}
                            color="#7adae3"
                        />
                    }
                </div>
            </div>
            <section>
                <WeeklyChart values={weeklyValues} total={totalWeekValue} />
                <InlineCards goal={goal} />
                <GeneralInfo bestDay={bestDay} monthlyValues={monthlyValues} />
                <MonthlyChart values={monthlyValues} total={totalMonthValue} />
            </section>
        </div>
    );
}