import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useSavedTools() {
    const { status } = useSession();
    const queryClient = useQueryClient();

    const fetchSavedTools = async () => {
        const res = await fetch("/api/user/saved");
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
    };

    const { data: savedData, isLoading } = useQuery({
        queryKey: ["savedTools"],
        queryFn: fetchSavedTools,
        enabled: status === "authenticated",
        staleTime: 5 * 60 * 1000,
    });

    const isSaved = (toolId: string) => {
        if (!savedData?.savedToolIds) return false;
        return savedData.savedToolIds.includes(toolId);
    };

    const toggleSaveMutation = useMutation({
        mutationFn: async ({ slug, toolId }: { slug: string; toolId: string }) => {
            const res = await fetch(`/api/tools/${slug}/save`, {
                method: "POST",
            });
            if (!res.ok) throw new Error("Failed to save tool");
            return { ...(await res.json()), toolId };
        },
        onMutate: async ({ toolId }) => {
            await queryClient.cancelQueries({ queryKey: ["savedTools"] });
            const previousData = queryClient.getQueryData(["savedTools"]);

            queryClient.setQueryData(["savedTools"], (old: any) => {
                if (!old) return old;
                const isCurrentlySaved = old.savedToolIds?.includes(toolId);
                return {
                    ...old,
                    savedToolIds: isCurrentlySaved
                        ? old.savedToolIds.filter((id: string) => id !== toolId)
                        : [...(old.savedToolIds || []), toolId],
                };
            });

            return { previousData };
        },
        onError: (err, variables, context: any) => {
            queryClient.setQueryData(["savedTools"], context?.previousData);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["savedTools"] });
        },
    });

    return {
        savedTools: savedData?.savedTools || [],
        savedToolIds: savedData?.savedToolIds || [],
        isLoading,
        isSaved,
        toggleSave: (slug: string, toolId: string) => toggleSaveMutation.mutate({ slug, toolId }),
        isToggling: toggleSaveMutation.isPending,
    };
}
