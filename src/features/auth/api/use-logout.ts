import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { rpc } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof rpc.api.auth.logout["$post"]>;

export const useLogout = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await rpc.api.auth.logout["$post"]();

            if (!response.ok) {
                throw new Error("Failed to logout");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("Logged out successfully");
            // window.location.reload();
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["current"] });
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        },
        onError: () => {
            toast.error("Failed to logout");
        }
    })

    return mutation;
};
