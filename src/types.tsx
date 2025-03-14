export interface Goal {
    id: string;
    user_id: string;
    silver: number;
    gold: number;
    diamond: number;
    date: string;
}

export interface DailyValue {
    id: string;
    user_id: string;
    value: number;
    date: Date;
}

export interface User {
    id: string;
    name: string;
    username: string;
    password: string;
    cover: string;
}

export interface PushSubscription {
    user_id: string;
    subscription: string;
}

export interface ValueResult {
    monthly: DailyValue[];
    weekly: DailyValue[];
}