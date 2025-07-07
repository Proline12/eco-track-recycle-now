
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Database } from '@/integrations/supabase/types';

type EWasteSubmission = Database['public']['Tables']['ewaste_submissions']['Row'];
type EWasteSubmissionInsert = Database['public']['Tables']['ewaste_submissions']['Insert'];

export const useEWasteSubmissions = () => {
  const [submissions, setSubmissions] = useState<EWasteSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchSubmissions = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ewaste_submissions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createSubmission = async (submission: Omit<EWasteSubmissionInsert, 'user_id'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('ewaste_submissions')
        .insert([{ ...submission, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      
      // Refresh submissions
      await fetchSubmissions();
      
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [user]);

  return {
    submissions,
    loading,
    error,
    createSubmission,
    refreshSubmissions: fetchSubmissions
  };
};
