"use client";

import {useState} from "react";
import {JsonView, allExpanded, darkStyles, defaultStyles} from 'react-json-view-lite';
import "react-json-view-lite/dist/index.css";

import {getData as getDataAction} from "@/lib/actions";

export default function GetData({initUrl}: { initUrl: string }) {
    const [url, setUrl] = useState<string>(initUrl);
    const [data, setData] = useState<any>();

    return (
        <>
            <div className="card flexRow">
                <input className="url" value={url} onChange={(e) => setUrl(e.target.value)}/>
                <button onClick={async () => {
                    const data = await getDataAction(url);
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