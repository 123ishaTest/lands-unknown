import {Feature} from "@/ig-template/features/Feature";
import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {WeeklySpecialEvent} from "@/ig-template/features/special-events/WeeklySpecialEvent";
import {AbstractSpecialEvent} from "@/ig-template/features/special-events/AbstractSpecialEvent";

export class SpecialEvents extends Feature {

    events: AbstractSpecialEvent[]

    // Delay between checking for special events
    private readonly SPECIAL_EVENT_CHECK_TIME: number = 1.0;
    private _checkCounter: number = 0;

    private _onEventStart = new SimpleEventDispatcher<AbstractSpecialEvent>();

    private _onEventEnd = new SimpleEventDispatcher<AbstractSpecialEvent>();


    constructor() {
        super('special-events');
        this.events = [];
    }

    /**
     * Adds an event, also upgrades weeklies if they're out of date.
     */
    addEvent(event: AbstractSpecialEvent) {
        if (event instanceof WeeklySpecialEvent) {
            const now = Date.now()
            while (+event.endTime < now) {
                event.increaseWeek();
            }
        }

        this.events.push(event);
    }


    update(delta: number) {
        this._checkCounter += delta;
        if (this._checkCounter >= this.SPECIAL_EVENT_CHECK_TIME) {
            this.checkForEvents();
            this._checkCounter = 0;
        }
    }

    private checkForEvents(): void {
        const now = new Date();
        for (const event of this.events) {
            if (event.canStart(now)) {
                this._onEventStart.dispatch(event);
                event.start();
            }
            if (event.canEnd(now)) {
                this._onEventEnd.dispatch(event);
                event.end();
            }
        }
    }


    load(): void {
        // Empty
    }

    save(): SaveData {
        return {};
    }

    /**
     * Emitted whenever an event starts
     */
    public get onEventStart(): ISimpleEvent<AbstractSpecialEvent> {
        return this._onEventStart.asEvent();
    }

    /**
     * Emitted whenever an event end
     */
    public get onEventEnd(): ISimpleEvent<AbstractSpecialEvent> {
        return this._onEventEnd.asEvent();
    }


}
