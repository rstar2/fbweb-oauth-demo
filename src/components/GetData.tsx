"use client";

import {useState} from "react";
import {JsonView, allExpanded, defaultStyles} from 'react-json-view-lite';
import "react-json-view-lite/dist/index.css";

import {getData as getDataAction} from "@/lib/actions";

const demoPath = "/fbweb/app/protected/ajax/list_activity?data=%7B\"p\"%3A\"%7B%5C\"isNewer%5C\"%3Afalse%2C%5C\"readState%5C\"%3A%5C\"unread%5C\"%2C%5C\"coid%5C\"%3A%5C\"_default%5C\"%7D\"%7D&rid=3";
export default function GetData({uid}: { uid: string }) {
    const [path, setPath] = useState<string>(demoPath);
    const [data, setData] = useState<any>();

    return (
        <>
            <div className="card flexRow">
                <input className="url" value={path} onChange={(e) => setPath(e.target.value)}/>
                <button onClick={async () => {
                    const data = await getDataAction(uid, path);
                    setData(data);
                }}> Get Data
                </button>
            </div>
            {data &&
                <div className="card fullW textLeft">
                    <JsonView data={data} shouldExpandNode={allExpanded} style={defaultStyles}/>
                </div>
            }
        </>
    );
}