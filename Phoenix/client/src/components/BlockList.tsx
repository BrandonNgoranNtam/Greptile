import React, { useEffect, useState } from 'react';
import { SwitchLabel } from './SwitchLabel'; // Adjust the import path accordingly
import { useUser } from '@clerk/clerk-react';
import userService from '../services/userService';
import { useAuth } from '@clerk/chrome-extension';
import { ScrollArea } from './ui/scroll-area';

const IMG_URL = "https://media.api-sports.io/football/teams/";

export function BlockList() {
    const { getToken } = useAuth();
    const { user } = useUser();
    const [teams, setTeams] = useState([]);
    const [blockedKeywords, setBlockedKeywords] = useState([]);

    useEffect(() => {
        const fetchTeamsAndKeywords = async () => {
            if (!user) return;

            try {
                const token = await getToken();
                const userTeams = await userService.getUserTeams(token);
                const blockedTeamIds = await userService.getBlockedTeamIds(token);

                setTeams(userTeams.map(teamData => ({
                    id: teamData.external_id,
                    name: teamData.name,
                    logo: `${IMG_URL}${teamData.external_id}.png`,
                    isBlocked: blockedTeamIds.some(team => team.external_id === teamData.external_id),
                })));

                const keywords = await userService.getBlockedKeywords(token);
                setBlockedKeywords(keywords);

                chrome.storage.local.set({ blockedKeywords: keywords });

            } catch (error) {
                console.error("Error fetching user's teams:", error);
            }
        };

        fetchTeamsAndKeywords();
    }, [user, getToken]);

    const handleTeamSwitchChange = async (teamId, isBlocked) => {
        try {
            const token = await getToken();
            await userService.updateTeamBlockStatus(teamId, isBlocked, token);

            setTeams(prevTeams =>
                prevTeams.map(team =>
                    team.id === teamId ? { ...team, isBlocked } : team
                )
            );

            const keywords = await userService.getBlockedKeywords(token);
            setBlockedKeywords(keywords);

            chrome.storage.local.set({ blockedKeywords: keywords });
        } catch (error) {
            console.error("Error updating team block status:", error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ScrollArea className="h-[260px] w-[380px] rounded-md border p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Your Teams</h4>
                {teams.length > 0 ? (
                    teams.map(team => (
                        <div className='pt-1 pb-1' key={team.id}>
                            <SwitchLabel
                                team={team}
                                isChecked={team.isBlocked}
                                onSwitchChange={handleTeamSwitchChange}
                            />
                        </div>
                    ))
                ) : (
                    <div>No teams found.</div>
                )}
            </ScrollArea>
        </div>
    );
}
