"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";

const MIN_STEP = 1;
const MAX_STEP = 3;

export const useCheckoutNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoaded, isSignedIn } = useUser();

  const courseId = searchParams.get("id") ?? "";
  const checkoutStep = Number(searchParams.get("step")) || MIN_STEP;

  const navigateToStep = useCallback(
    (step: number) => {
      if (!courseId) {
        console.warn("Course ID is missing in the URL");
        return;
      }

      const newStep = Math.min(Math.max(MIN_STEP, step), MAX_STEP);
      const showSignUp = isSignedIn ? "true" : "false";

      router.push(`/checkout?step=${newStep}&id=${courseId}&showSignUp=${showSignUp}`,{
        scroll: false,
      });
    },
    [courseId, isSignedIn, router]
  );

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn && checkoutStep > MIN_STEP) {
      console.warn("Unauthenticated user trying to access restricted checkout step");
      navigateToStep(MIN_STEP);
    }
  }, [isLoaded, isSignedIn, checkoutStep, navigateToStep]);

  return { checkoutStep, navigateToStep };
};
