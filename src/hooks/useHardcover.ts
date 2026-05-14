import { useState, useEffect } from 'react';
import type { HardcoverResponse } from '../types/hardcover';

interface UseHardcoverReturn {
  data: HardcoverResponse | null;
  loading: boolean;
  error: string | null;
}

export function useHardcover(): UseHardcoverReturn {
  const [data, setData] = useState<HardcoverResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/hardcover')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((json: HardcoverResponse) => {
        setData(json);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}