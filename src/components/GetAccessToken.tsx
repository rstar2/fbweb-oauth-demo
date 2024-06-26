"use client";

import {getAccessToken as getAccessTokenAction} from "@/lib/actions";

export default function Logout({uid}: { uid: string }) {
    return (
        <button onClick={async () => alert(await getAccessTokenAction(uid))}> Get Access Token </button>
    );
}