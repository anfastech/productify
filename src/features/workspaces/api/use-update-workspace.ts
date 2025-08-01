import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { rpc } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof rpc.api.workspaces[":workspaceId"]["$patch"], 200>;
type RequestType = InferRequestType<typeof rpc.api.workspaces[":workspaceId"]["$patch"]>;


export const useUpdateWorkspace = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({form, param}) => {
            const response = await rpc.api.workspaces[":workspaceId"]["$patch"]({form, param});

            if (!response.ok) {
                throw new Error("Failed to update workspace");
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("Workspace updated successfully");

            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
        },
        onError: () => {
            toast.error("Failed to update workspace");
        }
    })

    return mutation;
};
