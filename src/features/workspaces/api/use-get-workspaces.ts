import { useQuery } from "@tanstack/react-query";

import { rpc } from "@/lib/rpc";

export const useGetWorkspaces = () => {
    const query = useQuery({
        queryKey: ["workspaces"],
        queryFn: async () => {
            const response = await rpc.api.workspaces.$get();

            if (!response.ok) {
                throw new Error("Failed to fetch workspaces");
            }

            const { data } = await response.json();

            return data;
        }
    });

    return query;

}