// 目覚まし時計の状態
export const State = Object.freeze({
    NORMAL: Symbol("normal"), // 通常
    ALARM_SET: Symbol("alarmSet"), // アラームセット中
    ALARM_SOUNDING: Symbol("alarmSounding"), // アラーム鳴動中
    SNOOZING: Symbol("snoozing"), // スヌーズ中
});

// イベント時に発生するアクション
export const Action = Object.freeze({
    NONE: Symbol("none"), // 何もしない
    SOUND_ALARM: Symbol("soundAlarm"), // アラームを鳴らす
    STOP_ALARM: Symbol("stopAlarm"), // アラームを止める
});

// 補足:
// JavaScript では 列挙型を上記のように記述するが
// TypeScript では 列挙型を `type Action = "none" | "soundAlarm" | "stopAlarm";` のように代数的データ型を使って記述するのが一般的

// 目覚まし時計クラス

//関数型プログラミングを採用した場合
export class AlarmClockFuncType {
    #state; // private な属性

    constructor() {
        this.#state = State.NORMAL;
    }

    // アラーム設定イベント
    setAlarm(now_state) {
        //発生するアクションと次の状態のペアを返り値として返す
        switch (now_state) {
            case State.NORMAL:
                return { action : Action.NONE, state : State.ALARM_SET };
            default:
                return { action : Action.NONE, state: now_state };
        }
    }

    // アラーム解除イベント
    cancelAlarm(now_state) {
        switch (now_state) {
            case State.ALARM_SET:
                return { action: Action.NONE, state: State.NORMAL };
            case State.ALARM_SOUNDING:
                return { action: Action.STOP_ALARM, state: State.NORMAL };
            case State.SNOOZING:
                return { action: Action.NONE, state: State.NORMAL };
            default:
                return { action: Action.NONE, state: now_state };
        }
    }

    // アラーム設定時刻到達イベント
    reachedToAlarmTime(now_state) {
        switch (now_state) {
            case State.ALARM_SET:
                return { action: Action.SOUND_ALARM, state: State.ALARM_SOUNDING };
            default:
                return { action: Action.NONE, state: now_state };
        }
    }

    // スヌーズイベント
    snooze(now_state) {
        switch (now_state) {
            case State.ALARM_SOUNDING:
                return { action: Action.STOP_ALARM, state: State.SNOOZING };
            default:
                return { action: Action.NONE, state: now_state };
        }
    }

    // スヌーズ設定時間経過イベント
    elapseSnoozeTime(now_state) {
        switch (now_state) {
            case State.SNOOZING:
                return { action: Action.SOUND_ALARM, state: State.ALARM_SOUNDING };
            default:
                return { action: Action.NONE, state: now_state };
        }
    }
}
