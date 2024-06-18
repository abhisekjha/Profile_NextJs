'use client';

import Register from "@/components/Register";
import {Suspense} from "react";


export default function Page() {

    return (
        <>
            <Suspense fallback={"Loading..."}>
                <Register />
            </Suspense>
        </>
    );
}