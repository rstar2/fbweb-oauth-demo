import {v4 as uuid} from "uuid";
import NodeCache from "node-cache";

const oauthStateCache = new NodeCache({
    stdTTL: 5 * 60, // in seconds
    checkperiod: 30 // in seconds
});
// holding any valid authorized access-tokens,
// if they are JWT then expiration time can be parsed and stored with proper TTL,
// otherwise will remove on first 403 response from FbWeb
const oauthAccessTokenCache = new NodeCache({
    checkperiod: 60 // in seconds
});

function clear(uid: string) {
    console.log("remove state-cache for", uid, oauthStateCache.take(uid));
    console.log("remove accessToken-cache for", uid, oauthAccessTokenCache.take(uid));
}

function addOAuthState(uid: string) {
    const oauthState = `${uid}_${uuid()}`;
    oauthStateCache.set(uid, oauthState);
    return oauthState;
}

function addOauthAccessToken(uid: string, oauthState: string, oauthAccessToken: string) {
    if (oauthAccessTokenCache.has(uid))
        throw new Error("Already authorized");
    if (oauthStateCache.take(uid) !== oauthState)
        throw new Error("Invalid state");

    console.log("store accessToken-cache for", uid, oauthAccessToken);
    oauthAccessTokenCache.set(uid, {accessToken: oauthAccessToken});
}


function getOAuthAccessToken(uid: string): string | undefined {
    const oauthAccessToken = oauthAccessTokenCache.get<{ accessToken?: string }>(uid)?.accessToken;
    console.log("get accessToken-cache for", uid, oauthAccessToken);
    return oauthAccessToken;
}


// NOTE: Prevent Next.js to instantiate/load each JS/TS on each compile in DEV mode
// https://stackoverflow.com/questions/75272877/how-to-prevent-next-js-from-instantiating-a-singleton-class-object-multiple-time
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices


const sessionsConfigCreate = () => {
    console.log("construct sessions", new Date().toLocaleString());

    return {
        clear,
        addOAuthState,
        addOauthAccessToken,
        getOAuthAccessToken
    };
  }

declare const globalThis: {
    sessionsGlobal: ReturnType<typeof sessionsConfigCreate>;
  } & typeof global;


const sessions = globalThis.sessionsGlobal ?? sessionsConfigCreate();
export default sessions;

// if (process.env.NODE_ENV !== "production")
    globalThis.sessionsGlobal = sessions;
