'use client'
import { useState, useEffect } from 'react';
import { Report } from '../types/Report';
import { uploadReport, getReport } from '../services/api';
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation';

export const useReport = () => {
  const [report, setReport] = useState<Report[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  const fetchReport = async()=>{
    setLoading(true);
    setError(null);
    try {
        const reportData = await getReport();
        setReport(reportData);
    } catch (err:any) {
      setError(err?.message ? err?.message : 'Error getting report');
    } finally {
        setLoading(false);
    }
  }

  useEffect(()=>{
    fetchReport()
  },[])

  const processReport = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const { reportId } = await uploadReport(file);

      setTimeout(() => {
        router.push('/'); 
      }, 300); 
  
     
    } catch (err:any) {
      setError(err?.message ? err?.message : 'Error processing report');
      toast.error(err?.message)
    } finally {
      setLoading(false);
    }
  };

  return { report, loading, error, processReport };
};