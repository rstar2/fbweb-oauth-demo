"use client";

import {logout as logoutAction} from "@/lib/actions";

export default function Logout() {
    return (
        <button onClick={() => logoutAction()}> Logout </button>
    );
}