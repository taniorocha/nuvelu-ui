import Data from './data.json';
import { DailyGoal, Goal } from './types';

export default new class Api {
    async Login(username: string, password: string) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return Data.users.find(x => x.username == username && x.password == password);
    }

    async GetMainGoals(userId: number) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const currentDate = new Date().toJSON();
        const date_str = currentDate.substring(0, 7);
        return Data.main_goals.find(x => x.user_id === userId && x.date === date_str);
    }

    async GetWeekGoals(userId: number) {
        const currentDate = new Date();
        const currentWeekDay = currentDate.getDay(); // 0 to 6

        // Calcula a diferença de dias para o início da semana (segunda-feira)
        const firstWeekDay = new Date(currentDate);
        firstWeekDay.setDate(currentDate.getDate() - currentWeekDay + 1); // Ajusta para segunda-feira

        // Calcula o fim da semana (domingo)
        const lastWeekDay = new Date(firstWeekDay);
        lastWeekDay.setDate(firstWeekDay.getDate() + 6); // Ajusta para domingo

        return Data.daily_goals.filter(item => {
            const data = new Date(item.date); // Converte a string para objeto Date
            return data >= firstWeekDay && data <= lastWeekDay && item.user_id === userId;
        });
    }

    async GetMonthGoals(userId: number) {
        const currentDate = new Date();
        const curentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        return Data.daily_goals.filter(item => {
            const data = new Date(item.date);
            return data.getMonth() === curentMonth && data.getFullYear() === currentYear && item.user_id === userId;
        });
    }

    async SetGoal(goal: Goal) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("Cadastrando meta mensal:", goal);
    }

    async SetDailyGoal(dailyGoal: DailyGoal) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("Lançamento diário:", dailyGoal);
    }
}