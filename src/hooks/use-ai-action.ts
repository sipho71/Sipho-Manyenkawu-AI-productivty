import { useCallback, useState } from "react";
import { useServerFn } from "@tanstack/react-start";

import { aiPipeline } from "@/lib/ai.functions";
import { GENERIC_AI_ERROR, type AiAction, type AiResultMap } from "@/lib/ai-types";

export function useAiAction<A extends AiAction>(action: A) {
  const call = useServerFn(aiPipeline);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AiResultMap[A] | null>(null);

  const run = useCallback(
    async (payload: Record<string, unknown>): Promise<AiResultMap[A] | null> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await call({ data: { action, payload } });
        const parsed = JSON.parse(response.json) as AiResultMap[A];
        setData(parsed);
        return parsed;
      } catch (err) {
        console.error(err);
        setError(GENERIC_AI_ERROR);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [action, call],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { run, reset, data, error, isLoading };
}
