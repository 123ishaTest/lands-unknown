import {Game} from "./ig-template/Game";
import {Wallet} from "@/ig-template/features/wallet/Wallet";
import {CurrencyType} from "@/ig-template/features/wallet/CurrencyType";
import {Settings} from "@/ig-template/features/settings/Settings";
import {Statistics} from "@/ig-template/features/statistics/Statistics";
import {Achievements} from "@/ig-template/features/achievements/Achievements";
import {RedeemableCodes} from "@/ig-template/features/codes/RedeemableCodes";
import {SpecialEvents} from "@/ig-template/features/special-events/SpecialEvents";
import {Inventory} from "@/ig-template/features/inventory/Inventory";
import {ItemList} from "@/ig-template/features/items/ItemList";
import {Adventurer} from "@/ig-template/features/adventurer/Adventurer";
import {WorldBuilder} from "@/ig-template/features/world-map/WorldBuilder";
import {Skills} from "@/lands-unknown/features/skills/Skills";
import {ActionList} from "@/lands-unknown/features/action-list/ActionList";

export class App {
    static inProduction: boolean = (process.env.NODE_ENV === "production");

    static game: Game;

    static start(): void {

        this.game = this.getDefaultGame();
        this.game.initialize();
        this.game.load();
        this.game.start();
    }


    public static getDefaultGame(): Game {
        return new Game(
            {
                // TODO Add more currencies here
                wallet: new Wallet([CurrencyType.Money, CurrencyType.Secondary]),
                settings: new Settings(),
                codes: new RedeemableCodes(),
                inventory: new Inventory(),
                itemList: new ItemList(),
                skills: new Skills(),
                worldMap: WorldBuilder.createWorld(),
                actionList: new ActionList(),
                adventurer: new Adventurer(),
                specialEvents: new SpecialEvents(),
                statistics: new Statistics(),
                achievements: new Achievements(),
            }
        );
    }
}
