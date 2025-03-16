import { DailyValue } from "../types";

declare global {
    interface Date {
        addDays: (days: number) => Date;
        onlyDate: () => Date;
    }
}

Date.prototype.addDays = function (days: number) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.onlyDate = function () {
    var date = new Date(this.valueOf());
    return new Date(`${date.toJSON().substring(0, 10)} 00:00:00`);
}

export function maskDate(date: Date) {
    var day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    var month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

    return `${day}/${month}`;
}

export function getMonthDayCount() {
    var date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getMonthDayCountExceptSundays() { 
    var date = new Date();
    let days_in_month = getMonthDayCount();
    let days_are_not_sunday = 0;

    for (let day = 1; day <= days_in_month; day++) {
        let date_aux = new Date(date.getFullYear(), date.getMonth(), day);
        if (date_aux.getDay() !== 0)
            days_are_not_sunday++;
    }

    return days_are_not_sunday;
}

export function getDatesOfWeek(): Date[] {
    const currentDate = new Date();
    const currentWeekDay = currentDate.getDay(); // 0 to 6

    // Calcula a diferença de dias para o início da semana (segunda-feira)
    const firstWeekDay = new Date(`${currentDate.toJSON().substring(0, 7)} 00:00:00`);
    firstWeekDay.setDate(currentDate.getDate() - currentWeekDay); // Ajusta para domingo

    // Calcula o fim da semana (domingo)
    const lastWeekDay = new Date(firstWeekDay);
    lastWeekDay.setDate(firstWeekDay.getDate() + 6); // Ajusta para sábado

    return getDatesBetweenRange(firstWeekDay, lastWeekDay);
}

export function getDatesOfMonth(): Date[] {
    const currentDate = new Date().toJSON().substring(0, 7);
    const monthDayCount = getMonthDayCount();
    const initialDate = new Date(`${currentDate}-01 00:00:00`);
    const finalDate = new Date(`${currentDate}-${monthDayCount < 10 ? `0${monthDayCount}` : monthDayCount} 00:00:00`);

    return getDatesBetweenRange(initialDate, finalDate);
}

export function getDatesBetweenRange(firstWeekDay: Date, lastWeekDay: Date): Date[] {
    var dateArray = new Array();
    var currentDate: Date = firstWeekDay;
    while (currentDate <= lastWeekDay) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
    }

    return dateArray;
}

export function getWeek(date: Date) {
    const day = date.getDate();
    return Math.floor((day - 1) / 7);
}

export function weekWithHighestValues(data: DailyValue[]) {
    let weeks = [0, 0, 0, 0, 0];

    data.forEach(item => {
        const date = new Date(item.date);
        const week = getWeek(date);
        if (week >= 0 && week < weeks.length) {
            weeks[week] += item.value;
        }
    });

    let weekWithHighestSales = weeks.indexOf(Math.max(...weeks));
    return weekWithHighestSales + 1;
}