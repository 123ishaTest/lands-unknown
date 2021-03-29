import {Quest} from "@/lands-unknown/quests/Quest";
import {QuestId} from "@/lands-unknown/quests/QuestId";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";
import {LumberjackDialog} from "@/ig-template/features/npcs/lumberjack/LumberjackDialog";
import {DialogInjection} from "@/lands-unknown/quests/injections/DialogInjection";
import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {DialogText} from "@/ig-template/tools/dialog/DialogText";
import {Features} from "@/ig-template/Features";

export class LumberjackQuest extends Quest {
    before(): void {
        const introInjection = new DialogInjection<LumberjackDialog>(
            NpcId.Lumberjack,
            new Dialog(LumberjackDialog.QuestIntro, [
                new DialogText(NpcId.Player, "Give quest"),
                new DialogText(NpcId.Lumberjack, "Ok"),
            ])
        );
        introInjection.inject(this._features);
    }

    completion(): void {
        console.log("Quest completed!!!");
    }

    constructor(features: Features) {
        super(QuestId.Lumberjack, "Can you help the lumberjack cut 100 logs?", [
                // new DialogQuestStep(QuestStepId.Intro,
                // ))
            ],
            new NoRequirement(), features);
    }
}
