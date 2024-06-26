import {type NextRequest} from "next/server";
import {redirect} from "next/navigation";

import config from "@/lib/config";
import sessions from "@/lib/sessions";

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const state = searchParams.get("state");
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error)
        return new Response("Auth failed/denied: " + error);

    // validate code
    if (!code)
        return new Response("Missing code", {status: 400});
    // validate uid/state
    if (!state)
        return new Response("Missing state", {status: 400});

    const [uid, _state] = state.split("_");
    if (!_state || !uid)
        return new Response("Invalid state", {status: 400});

    const oauthSetup = config.getOAuthSetup();
    if (!oauthSetup)
        return new Response("No OAuth App Setup", {status: 500,});

    // exchange the authorization code for "accessToken"
    console.log("exchange code for", uid, code);
    const fbwebOAuthTokenUid = `${oauthSetup.fbwebUrl}/fbweb/app/public/ajax/oauth_token?` +
        "grant_type=authorization_code&" +
        "client_id=" + encodeURIComponent(oauthSetup.clientId) + "&" +
        "client_secret=" + encodeURIComponent(oauthSetup.clientSecret) + "&" +
        "code=" + encodeURIComponent(code);

    const accessToken = await fetch(fbwebOAuthTokenUid, {
        method: "POST",
    })
        .then(response => {
            if (!response.ok)
                throw new Error(`FailedWithStatus_${response.status}`);
            return response;
        })
        .then(response => response.json())
        .then(response => response["access_token"]);

    sessions.addOauthAccessToken(uid, state, accessToken);

    redirect("/");
}
