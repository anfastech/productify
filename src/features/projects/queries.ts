import { createSessionClient } from "@/lib/appwrite";

import { DATABASE_ID, PROJECTS_ID } from "@/config";
import { getMember } from "@/features/members/utils";

import { Project } from "./types";

interface GetProjectProps {
    projectId: string;
  }
  
  export const getProject = async ({ projectId }: GetProjectProps) => {
    
    const { databases, account } = await createSessionClient();

    const user = await account.get();
    
    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    );
    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: project.workspaceId,
    });

    if (!member) {
      return null;
    }

    if (!member) {
      throw new Error("Unauthorized");
    }
    return project;
};