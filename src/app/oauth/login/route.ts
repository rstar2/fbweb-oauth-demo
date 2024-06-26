import {redirect} from "next/navigation";
import {type NextRequest} from "next/server";

import sessions from "@/lib/sessions";
import config from "@/lib/config";

// .../oauth/login?uid=xxx
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const uid = searchParams.get("uid");

    if (!uid)
        return new Response("Missing UID", {status: 400,});

    if (sessions.getOAuthAccessToken(uid))
        return new Response("Already authorized", {status: 400,});

    const oauthSetup = config.getOAuthSetup();
    if (!oauthSetup)
        return new Response("No OAuth App Setup", {status: 500,});

    const state = sessions.addOAuthState(uid);
    const {fbwebUrl, clientId} = oauthSetup;

    const redirectUrl = request.nextUrl.origin + "/oauth/callback";

    const fbwebOAuthAuthorizeUid = `${fbwebUrl}/fbweb/app/public/view/oauth_authorize?` +
        "response_type=code&" +
        "client_id=" + encodeURIComponent(clientId) + "&" +
        "redirect_uri=" + encodeURIComponent(redirectUrl) + "&" +
        "scope=" + encodeURIComponent("read-activity read-data write-data") + "&" +
        "state=" + encodeURIComponent(state);

    redirect(fbwebOAuthAuthorizeUid);
}