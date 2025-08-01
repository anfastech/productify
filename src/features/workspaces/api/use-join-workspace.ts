import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { rpc } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof rpc.api.workspaces[":workspaceId"]["join"]["$post"], 200>;
type RequestType = InferRequestType<typeof rpc.api.workspaces[":workspaceId"]["join"]["$post"]>;


export const useJoinWorkspace = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({param, json}) => {
            const response = await rpc.api.workspaces[":workspaceId"]["join"]["$post"]({param, json});

            if (!response.ok) {
                throw new Error("Failed to join workspace");
            }

            return await response.json();
        },
        onSuccess: ({data}) => {
            toast.success("Joined workspace");
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
        },
        onError: () => {
            toast.error("Failed to join workspace");
        }
    })

    return mutation;
};
