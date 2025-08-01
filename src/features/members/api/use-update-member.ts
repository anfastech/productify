import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { rpc } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof rpc.api.members[":memberId"]["$patch"], 200>;
type RequestType = InferRequestType<typeof rpc.api.members[":memberId"]["$patch"]>;


export const useUpdateMember = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({param, json}) => {
            const response = await rpc.api.members[":memberId"]["$patch"]({param, json});

            if (!response.ok) {
                throw new Error("Failed to update member");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("Member Updated");
            queryClient.invalidateQueries({ queryKey: ["members"] });
        },
        onError: () => {
            toast.error("Failed to update member");
        }
    })

    return mutation;
};
