import {type OAuthSetup} from "@/lib/types";

class Config {
    #oauthSetup: OAuthSetup | undefined;

    getOAuthSetup(): OAuthSetup | undefined {
        console.log("??? get setup", this.#oauthSetup);
        return this.#oauthSetup;
    }

    setOAuthSetup(oauthApp: OAuthSetup | undefined) {
        console.log("??? set setup", oauthApp);
        this.#oauthSetup = oauthApp;
    }
}

// NOTE: Prevent Next.js to instantiate/load each JS/TS on each compile in DEV mode
// https://stackoverflow.com/questions/75272877/how-to-prevent-next-js-from-instantiating-a-singleton-class-object-multiple-time
let config: Config;
if (process.env.NODE_ENV === "production") {
    config = new Config();
} else {
    if (!global.__config) {
        global.__config = new Config();
    }
    config = global.__config;
}

export default config;