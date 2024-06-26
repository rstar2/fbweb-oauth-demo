"use client";

import {logout as logoutAction} from "@/lib/actions";

export default function Logout({uid}: { uid: string }) {
    return (
        <button onClick={() => logoutAction(uid)}> Logout </button>
    );
}