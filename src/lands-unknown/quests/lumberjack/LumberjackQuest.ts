import {Quest} from "@/lands-unknown/quests/Quest";
import {QuestId} from "@/lands-unknown/quests/QuestId";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";
import {LumberjackDialog} from "@/ig-template/features/npcs/lumberjack/LumberjackDialog";
import {DialogInjection} from "@/lands-unknown/quests/injections/DialogInjection";
import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {DialogText} from "@/ig-template/tools/dialog/DialogText";
import {Features} from "@/ig-template/Features";
import {QuestStepId} from "@/lands-unknown/quests/QuestStepId";
import {DialogQuestStep} from "@/lands-unknown/quests/steps/DialogQuestStep";
import {KingDialog} from "@/ig-template/features/npcs/king/KingDialog";

export class LumberjackQuest extends Quest {
    before(): void {
        const introInjection = new DialogInjection<LumberjackDialog>(
            NpcId.Lumberjack,
            "I need something to do",
            new Dialog(LumberjackDialog.QuestIntro, [
                new DialogText(NpcId.Player, "Give quest"),
                new DialogText(NpcId.Lumberjack, "Ok", () => {
                    this.start();
                    introInjection.eject(this._features);
                }),
            ])
        );
        introInjection.inject(this._features);
    }

    completion(): void {
        console.log("Quest completed!!!");
    }

    constructor(features: Features) {
        super(QuestId.Lumberjack, "Can you help the lumberjack cut 100 logs?", [
                new DialogQuestStep(QuestStepId.Intro, new DialogInjection<LumberjackDialog>(
                    NpcId.Lumberjack,
                    "Talk about lumberjack quest",
                    new Dialog(LumberjackDialog.QuestExplanation, [
                        new DialogText(NpcId.Lumberjack, "Can you please go to the king?"),
                        new DialogText(NpcId.Player, "Ok", () => {
                            this.completeStep(QuestStepId.Intro)
                        }),
                    ])
                    )
                ),
                new DialogQuestStep(QuestStepId.AskPermissionFromKing, new DialogInjection<KingDialog>(
                    NpcId.King,
                    "That's a nice looking forest you got there",
                    new Dialog(KingDialog.AskWoodCuttingPermission, [
                        new DialogText(NpcId.Player, "Hi, I want to help the lumberjack?"),
                        new DialogText(NpcId.King, "What do you need from me?"),
                        new DialogText(NpcId.Player, "Well I need to cut some trees in the forest"),
                        new DialogText(NpcId.King, "And...?"),
                        new DialogText(NpcId.Player, "And... I heard I needed your permission"),
                        new DialogText(NpcId.King, "That is true"),
                        new DialogText(NpcId.Player, "..."),
                        new DialogText(NpcId.Player, "So can I get that permission?"),
                        new DialogText(NpcId.King, "..."),
                        new DialogText(NpcId.Player, "..."),
                        new DialogText(NpcId.King, "Fine"),
                        new DialogText(NpcId.Player, "Thanks...", () => {
                            this.completeStep(QuestStepId.AskPermissionFromKing)
                        }),
                    ])
                    )
                )
            ],
            new NoRequirement(), features);
    }
}
