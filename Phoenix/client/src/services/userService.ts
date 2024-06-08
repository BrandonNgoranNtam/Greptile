import { get, post, put, del } from "../utils/api";

interface Team {
  external_id: string;
  logo: string;
  id: string;
  name: string;
  country: string;
}

const userService = {
  async getUserTeams(token: string): Promise<Team[]> {
    try {
      const response = await get("/users/teams", token);
      return response;
    } catch (error) {
      console.error("Error fetching user teams:", error);
      throw error;
    }
  },

  async addUserTeams(teams: Team[], token: string): Promise<any> {
    try {
      const response = await post("/users/teams", { teams }, token);
      return response;
    } catch (error) {
      console.error("Error adding user team:", error);
      throw error;
    }
  },

  async updateUserTeams(teamIds: string[], token: string): Promise<any> {
    try {
      const response = await put("/users/teams", { teamIds }, token);
      return response;
    } catch (error) {
      console.error("Error updating user teams:", error);
      throw error;
    }
  },

  async deleteUserTeams(teamIds: string[], token: string): Promise<any> {
    try {
      const response = await del("/users/teams", { teamIds }, token);
      return response;
    } catch (error) {
      console.error("Error deleting user teams:", error);
      throw error;
    }
  },

  async getBlockedKeywords(token: string): Promise<any> {
    try {
      const response = await get("/users/blocked-keywords", token);
      return response;
    } catch (error) {
      console.error("Error fetching blocked keywords:", error);
      throw error;
    }
  },

  async updateTeamBlockStatus(teamId: string, isBlocked: boolean, token: string): Promise<any> {
    try {
      const response = await put("/users/team-block-status", { teamId, isBlocked }, token);
      return response;
    } catch (error) {
      console.error("Error updating team block status:", error);
      throw error;
    }
  },

  async getBlockedTeamIds(token: string): Promise<any> {
    try {
      const response = await get("/users/blocked-teamsIds", token);
      return response;
    } catch (error) {
      console.error("Error fetching blocked teams:", error);
      throw error;
    }
  }
};





export default userService;