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

        setLoading(true);
        var result = await Api.GetGoals();
        if (!result) {
            setLoading(false);
            return;
        }

        setGoal(result);

        var values = await Api.GetValues();
        setWeeklyValues(values.weekly);
        setMonthlyValues(values.monthly);

        let bestDay = { value: 0 };
        values.monthly.forEach((item) => bestDay = item.value > bestDay.value ? item : bestDay);
        setBestDay(bestDay);

        if (values.weekly.length > 0) {
            let totalWeekValue = values.weekly.map(item => item.value).reduce((prev, next) => prev + next);
            setTotalWeekValue(totalWeekValue);
        }

        if (values.monthly.length > 0) {
            let totalMonthValue = values.monthly.map(item => item.value).reduce((prev, next) => prev + next);
            setTotalMonthValue(totalMonthValue);
        }

        setLoading(false);
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
                <GeneralInfo bestDay={bestDay} />
                <MonthlyChart values={monthlyValues} total={totalMonthValue} />
            </section>
        </div>
    );
}