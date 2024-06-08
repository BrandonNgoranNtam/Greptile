import EditTeams from "../components/editTeams/page";
import React from "react";


export default function EditListView() {
    console.log("EditTeams called");
    return (
        <div>
            <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Edit your teams!</h4>
            <EditTeams />
        </div>
    );
}
