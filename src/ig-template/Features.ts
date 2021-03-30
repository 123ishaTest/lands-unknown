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
import {ActionList} from "@/lands-unknown/features/action-list/ActionList";
import {KeyItems} from "@/ig-template/features/key-items/KeyItems";
import {Npcs} from "@/ig-template/features/npcs/Npcs";
import {Quests} from "@/lands-unknown/quests/Quests";

export interface Features {
    wallet: Wallet;
    settings: Settings;
    codes: RedeemableCodes;
    inventory: Inventory;
    itemList: ItemList;
    quests: Quests;
    keyItems: KeyItems;
    npcs: Npcs;
    skills: Skills;
    worldMap: WorldMap;
    actionList: ActionList;
    adventurer: Adventurer;
    specialEvents: SpecialEvents;
    statistics: Statistics;
    achievements: Achievements;
}
