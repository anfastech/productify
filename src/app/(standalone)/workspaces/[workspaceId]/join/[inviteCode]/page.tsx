import { getCurrent } from "@/features/auth/queries";
import { getWorkspaceInfo } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";

interface WorkspaceIdJoinPageProps {
    params: {
        workspaceId: string;
    };
};

const WorkspaceIdJoinPage = async ({
    params,
}: WorkspaceIdJoinPageProps) => {
    const user = await getCurrent();
    if (!user) redirect("/signin");

    const workspace = await getWorkspaceInfo({
        workspaceId: params.workspaceId,
    })
    return (
        <div>
            {JSON.stringify(workspace)}
        </div>
    )
}

export default WorkspaceIdJoinPage;