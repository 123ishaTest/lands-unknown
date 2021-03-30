import {SaveData} from "./SaveData";

export interface Saveable {
    saveKey: string;

    save(): SaveData;

    load(data: SaveData): void;
}

export function isSaveable(arg: any): arg is Saveable {
    return arg && arg.saveKey && typeof(arg.saveKey) == 'string';
}
