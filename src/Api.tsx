import { LOCAL_STORAGE_TOKEN_NAME, URL_API } from './constanst';
import { getDatesOfMonth, getDatesOfWeek } from './helpers/date-helper';
import { DailyValue, Goal, ValueResult } from './types';

export default new class Api {
    async Login(username: string, password: string) {
        return await fetch(`${URL_API}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password })
        }).then(x => x.status === 200 ? x.json() : null);
    }

    async CheckToken(token: string) {
        return await fetch(`${URL_API}/check/token`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        }).then(x => x.status === 200 ? true : false);
    }

    async GetGoals() {
        const currentDate = new Date().toJSON();
        const date_str = currentDate.substring(0, 7);

        const result = await fetch(`${URL_API}/goals`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
            },
        }).then(x => x.status === 200 ? x.json() : null);
        if (!result)
            return [];

        return result.goals.find((x: Goal) => x.date === date_str);
    }

    async GetValues(): Promise<ValueResult> {
        const result = await fetch(`${URL_API}/values`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
            },
        }).then(x => x.status === 200 ? x.json() : null);
        if (!result)
            return { monthly: [], weekly: [] };

        const weeklyList = getDatesOfWeek().map((date: Date) => {
            var value = result.values.find((item: DailyValue) =>
                new Date(item.date).onlyDate().getTime() === date.onlyDate().getTime());
            if (value)
                return value;
            else
                return { date: date, value: 0 } as DailyValue
        });

        const monthlyList = getDatesOfMonth().map((date: Date) => {
            var value = result.values.find((item: DailyValue) => 
                new Date(item.date).onlyDate().getTime() === date.onlyDate().getTime());
            if (value)
                return value;
            else
                return { date: date, value: 0 } as DailyValue
        });

        return {
            monthly: monthlyList,
            weekly: weeklyList
        }
    }

    async SetGoal(goal: Goal) {
        return await fetch(`${URL_API}/goals`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
            },
            body: JSON.stringify(goal)
        }).then(x => x.status === 200 || x.status === 201 ? true : false);
    }

    async SetDailyValue(dailyValue: DailyValue) {
        return await fetch(`${URL_API}/values`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
            },
            body: JSON.stringify(dailyValue)
        }).then(x => x.status === 200 || x.status === 201 ? true : false);
    }
}