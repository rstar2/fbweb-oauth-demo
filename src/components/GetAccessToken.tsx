"use client";

import {getAccessToken as getAccessTokenAction} from "@/lib/actions";

export default function Logout() {
    return (
        <button onClick={async () => alert(await getAccessTokenAction())}> Get Access Token </button>
    );
}