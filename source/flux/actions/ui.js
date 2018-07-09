import { START_SPINNING, STOP_SPINNING} from "./types";

export const startSpinning = () => ({
    type: START_SPINNING,
    payload: true,
});

export const stopSpinning = () => ({
    type: STOP_SPINNING,
    payload: false,
});