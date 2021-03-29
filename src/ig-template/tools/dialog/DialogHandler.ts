import {DialogTree} from "@/ig-template/tools/dialog/DialogTree";
import {DialogType} from "@/ig-template/tools/dialog/DialogType";
import {DialogDecision} from "@/ig-template/tools/dialog/DialogDecision";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";

export class DialogHandler<T> {
    public tree: DialogTree<T> | null;
    public type: DialogType;
    public decision: DialogDecision<T> | null;
    public dialog: Dialog<T> | null;


    constructor() {
        this.tree = null;
        this.type = DialogType.None;
        this.decision = null;
        this.dialog = null;
    }

    public start(tree: DialogTree<T>) {
        tree.reset();
        this.tree = tree;
        const root = this.tree.root;

        // If we only have 1 option we can skip the root
        if (root.options.length === 1) {
            this.goToDestination(root.options[0].reference);
        } else {
            this.setRoot(root);
        }
    }

    public next() {
        if (this.dialog == null) {
            console.warn("Could not go next if dialog is null");
            return;
        }
        this.dialog.next();


        if (this.dialog.isAtEnd()) {
            this.goToDestination(this.dialog.destination);
        }
    }

    public selectOption(index: number) {
        if (this.decision == null) {
            console.warn("Could select option if decision is null");
            return;
        }
        if (index >= this.decision.options.length) {
            console.warn(`Current decision does not have index ${index}, only ${this.decision.options.length} options`);
            return;
        }

        const destination = this.decision.options[index].reference;

        this.goToDestination(destination);
    }

    private goToDestination(destination: T | undefined) {
        if (destination == undefined) {
            this.end();
            return;
        }

        // Check if it's an NPC decision
        const npcDecision = this.tree?.getNpcDecision(destination);

        if (npcDecision) {
            const decided = npcDecision.decide();
            this.goToDestination(decided)
            return;
        }

        // Or a dialog
        const dialog = this.tree?.getDialog(destination);
        if (dialog) {
            this.setDialog(dialog);
            return;
        }

        // Or a player decision
        const decision = this.tree?.getDecision(destination);
        if (decision) {
            this.setDecision(decision)
            return;
        }

        console.error(`Could not transition to id ${destination}. Is it implemented?`)

    }

    private setDialog(dialog: Dialog<T>) {

        this.type = DialogType.Dialog;
        this.decision = null;
        this.dialog = dialog;
    }

    private setRoot(root: DialogDecision<T>) {
        this.type = DialogType.Decision;
        this.dialog = null;
        this.decision = root;
    }

    private setDecision(decision: DialogDecision<T>) {
        this.dialog = null;
        this.decision = decision
        this.type = DialogType.Decision;
    }

    private end() {
        this.dialog = null;
        this.decision = null;
        this.type = DialogType.None;
    }
}
