export interface Goal {
    id: number;
    user_id: number;
    silver: number;
    gold: number;
    diamond: number;
    date: string;
}

export interface DailyGoal {
    id: number;
    user_id: number;
    value: number;
    date: Date;
}

export interface User {
    id: number;
    name: string;
    username: string;
    password: string;
    cover: string;
}