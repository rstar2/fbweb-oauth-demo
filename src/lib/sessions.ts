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

let sessions = {
    clear,
    addOAuthState,
    addOauthAccessToken,
    getOAuthAccessToken
};

// if (process.env.NODE_ENV !== "production") {
    // @ts-ignore
    if (!global.__sessions)
        // @ts-ignore
        global.__sessions = sessions;
    // @ts-ignore
    sessions = global.__sessions;
// }

export default sessions;
