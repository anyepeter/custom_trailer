"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setTrucks, setLoading, setError } from "@/store/trucksSlice";
import { getAllTrucks } from "@/app/actions/getAllTrucks";

export default function TrucksLoader() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadTrucks = async () => {
      dispatch(setLoading(true));
      try {
        const result = await getAllTrucks();
        if (result.success) {
          dispatch(setTrucks(result.data));
        } else {
          dispatch(setError(result.error || "Failed to load trucks"));
        }
      } catch (error) {
        dispatch(setError("An unexpected error occurred"));
      }
    };

    loadTrucks();
  }, [dispatch]);

  return null; // This component doesn't render anything
}
