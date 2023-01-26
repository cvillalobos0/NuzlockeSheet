import { App } from "@/firebase.config";
import { logEvent, getAnalytics } from "firebase/analytics";

const analytics = getAnalytics(App);
let test = 3;

function LogCustomEvent(eventName, params) {
    logEvent(analytics, eventName, params);
}

export default {
    LogCustomEvent,
};
