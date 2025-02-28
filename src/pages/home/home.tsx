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
ChartJS.register(...registerables);

export default function Home() {
    const { user } = useAuth();
    const [totalWeekValue, setTotalWeekValue] = useState(0);
    const [totalMonthValue, setTotalMonthValue] = useState(0);
    const [mainGoal, setMainGoal] = useState<Goal>(null);
    const [weeklyGoals, setWeeklyGoals] = useState([]);
    const [monthlyGoals, setMonthlyGoals] = useState([]);
    const [bestDay, setBestDay] = useState(null);
    const [activeKnob, setActiveKnob] = useState("silver");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.querySelector("body").style.overflow = "";
        GetGoalData();
    }, []);

    async function GetGoalData() {
        if(!user)
            return;

        setLoading(true);  
        var result = await Api.GetMainGoals(user.id);
        if (!result) {
            setLoading(false);
            return;
        }

        setMainGoal(result);

        var weekGoals = await Api.GetWeekGoals(user.id);
        setWeeklyGoals(weekGoals);

        let totalWeekValue = weekGoals.map(item => item.value).reduce((prev, next) => prev + next);
        setTotalWeekValue(totalWeekValue);

        var monthGoals = await Api.GetMonthGoals(user.id);
        setMonthlyGoals(monthGoals);

        let totalMonthValue = monthGoals.map(item => item.value).reduce((prev, next) => prev + next);
        setTotalMonthValue(totalMonthValue);

        let bestDay = { value: 0 };
        monthGoals.forEach((item) => bestDay = item.value > bestDay.value ? item : bestDay);
        setBestDay(bestDay);

        setLoading(false);
    }

    return (
        <div className="container">
            <Loading show={loading} />
            <Header callback={()=> GetGoalData()} />
            <div className="knob-chart">
                <KnobButtons activeKnob={activeKnob} setActiveKnob={(value) => setActiveKnob(value)} />
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
                <WeeklyChart goals={weeklyGoals} total={totalWeekValue} />
                <InlineCards goal={mainGoal} />
                <GeneralInfo bestDay={bestDay} />
                <MonthlyChart goals={monthlyGoals} total={totalMonthValue} />
            </section>
        </div>
    );
}