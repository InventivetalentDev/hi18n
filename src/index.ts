import { i18n } from "./i18n";


if (typeof window !== "undefined") {
    // @ts-ignore
    window.hi18n = i18n;
}
// @ts-ignore
if (typeof global !== "undefined") {
    // @ts-ignore
    global.hi18n = i18n;
}

export default i18n;
