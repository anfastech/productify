import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { getWorkspace } from "@/features/workspaces/queries";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";

interface WorkspaceIdSettingsPageProps {
    params: {
        workspaceId: string;
    };
};

const WorkspaceSettingsPage = async ({
    params,
}: WorkspaceIdSettingsPageProps) => {
    const user = await getCurrent();
    if (!user) redirect("/signin");

    const initialValues = await getWorkspace({
        workspaceId: params.workspaceId,
    });

    return (
        <div className="w-full lg:max-w-xl">
            <EditWorkspaceForm initialValues={initialValues} />
        </div>
    );
}

export default WorkspaceSettingsPage;