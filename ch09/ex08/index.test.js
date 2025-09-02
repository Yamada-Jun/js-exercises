import { AlarmClockFuncType, State, Action } from "./index.js";

describe("ch09_ex08", () => {
    let alarmClock;
    
    beforeEach(() => {
        alarmClock = new AlarmClockFuncType();
    });

    test("setAlarm from NORMAL to ALARM_SET", () => {
        const action = alarmClock.setAlarm(State.NORMAL);
        expect(action).toEqual({ action: Action.NONE, state: State.ALARM_SET });
    });

    test("cancelAlarm from ALARM_SET to NORMAL", () => {
        const action = alarmClock.cancelAlarm(State.ALARM_SET);
        expect(action).toEqual({ action: Action.NONE, state: State.NORMAL });
    });

    test("reachedToAlarmTime from ALARM_SET to ALARM_SOUNDING", () => {
        const action = alarmClock.reachedToAlarmTime(State.ALARM_SET);
        expect(action).toEqual({ action: Action.SOUND_ALARM, state: State.ALARM_SOUNDING });
    });

    test("snooze from ALARM_SOUNDING to SNOOZING", () => {
        const action = alarmClock.snooze(State.ALARM_SOUNDING);
        expect(action).toEqual({ action: Action.STOP_ALARM, state: State.SNOOZING });
    });

    test("elapseSnoozeTime from SNOOZING to ALARM_SOUNDING", () => {
        const action = alarmClock.elapseSnoozeTime(State.SNOOZING);
        expect(action).toEqual({ action: Action.SOUND_ALARM, state: State.ALARM_SOUNDING });
    });

    test("cancelAlarm from ALARM_SOUNDING to NORMAL", () => {
        const action = alarmClock.cancelAlarm(State.ALARM_SOUNDING);
        expect(action).toEqual({ action: Action.STOP_ALARM, state: State.NORMAL });
    });

    test("cancelAlarm from SNOOZING to NORMAL", () => {
        const action = alarmClock.cancelAlarm(State.SNOOZING);
        expect(action).toEqual({ action: Action.NONE, state: State.NORMAL });
    });

});
