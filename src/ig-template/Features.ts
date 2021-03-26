import {Wallet} from "@/ig-template/features/wallet/Wallet";
import {Settings} from "@/ig-template/features/settings/Settings";
import {Statistics} from "@/ig-template/features/statistics/Statistics";
import {Achievements} from "@/ig-template/features/achievements/Achievements";
import {RedeemableCodes} from "@/ig-template/features/codes/RedeemableCodes";
import {SpecialEvents} from "@/ig-template/features/special-events/SpecialEvents";
import {Inventory} from "@/ig-template/features/inventory/Inventory";
import {ItemList} from "@/ig-template/features/items/ItemList";
import {Adventurer} from "@/ig-template/features/adventurer/Adventurer";
import {WorldMap} from "@/ig-template/features/world-map/WorldMap";
import {Skills} from "@/lands-unknown/features/skills/Skills";

export interface Features {
    wallet: Wallet;
    settings: Settings;
    codes: RedeemableCodes;
    inventory: Inventory;
    itemList: ItemList;
    skills: Skills;
    worldMap: WorldMap;
    adventurer: Adventurer;
    specialEvents: SpecialEvents;
    statistics: Statistics;
    achievements: Achievements;
}
