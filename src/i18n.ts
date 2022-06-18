import { Options, StringMap } from "./types";

const ORIGINAL_ATTR = 'hi18n-original';

const DEFAULT_OPTIONS: Options = {
    auto: false,
    selector: ".hi18n",
    langDir: "lang",
    debug: false
}

export class i18n {

    private readonly _options: Options;
    private readonly _cache: { [k: string]: Promise<StringMap> };
    private _language: string;

    constructor(options: Partial<Options>) {
        this._options = { ...DEFAULT_OPTIONS, ...options };
        this._cache = {};
        this.language = this.getUserLanguage();
    }

    get options() {
        return this._options;
    }

    get language() {
        return this._language;
    }

    set language(language: string) {
        this._language = language;

        if (this.options.auto) {
            this.translateAll();
        }
    }

    private log(...data: any[]) {
        if (!this.options.debug) return;
        console.log(...data);
    }

    private async loadStrings(lang: string): Promise<StringMap> {
        this.log("loading", lang + ".json");
        return fetch(this.options.langDir + "/" + lang + ".json")
            .then(async (res) => {
                if (res.ok) {
                    return res.json();
                }
                this.log("no language file for", lang);
                if (lang.includes('-')) {
                    // try again, e.g. en-GB -> en
                    return this.loadStrings(lang.split('-', 2)[0]);
                }
                return {};
            })
            .then(json => {
                return json as StringMap;
            });
    }

    private async getStrings(lang: string): Promise<StringMap> {
        if (lang in this._cache) {
            return this._cache[lang];
        }
        return this._cache[lang] = this.loadStrings(lang);
    }

    private async getTranslation(text: string): Promise<string> {
        const lang = this.language;

        const strings = await this.getStrings(lang);
        if (Object.keys(strings).length <= 0) {
            this.log("empty strings for", lang);
            return text;
        }

        return strings[text] || text;
    }

    getUserLanguage() {
        const lang = navigator.language;
        this.log("user language:", lang);
        return lang;
    }

    translateAll() {
        document.querySelectorAll(this.options.selector).forEach(el => {
            if (isHtmlElement(el)) {
                this.translate(el);
            }
        });
    }

    translate(element: HTMLElement) {
        this.translateContent(element);
    }


    translateContent(element: HTMLElement) {
        let text = element.innerText;
        if (element.hasAttribute(ORIGINAL_ATTR)) {
            text = atob(element.getAttribute(ORIGINAL_ATTR));
        } else {
            element.setAttribute(ORIGINAL_ATTR, btoa(text));
        }
        this.getTranslation(text).then(translated => {
            element.innerText = translated;
        })
    }

}

function isHtmlElement(obj: any): obj is HTMLElement {
    return 'innerText' in obj;
}
