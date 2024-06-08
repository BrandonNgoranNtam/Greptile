import * as React from "react";
import { AntSwitch } from "./ui/AntSwitch";
import { useUser } from '@clerk/clerk-react'; 

const IMG_URL = "https://media.api-sports.io/football/teams/";

export function SwitchLabel({ team, isChecked, onSwitchChange }) {
    const { user } = useUser();


    const handleSwitchChange = (event) => {
        if (!user) return; // Do nothing if user is not available
        const checked = event.target.checked;
        console.log(checked);
        onSwitchChange(team.id, checked);
    };

    if (!user) {
        return null; // Render nothing if user is not available
    }

    return (
        <div className="flex items-center space-x-4 rounded-md border p-2 hover:bg-slate-100">
            <img src={`${IMG_URL}${team.id}.png`} alt={team.name} className="w-6 h-6" />
            <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                    {team.name}
                </p>
            </div>
            <AntSwitch checked={isChecked} onChange={handleSwitchChange} inputProps={{ 'aria-label': 'ant design' }} />
        </div>
    );
}
