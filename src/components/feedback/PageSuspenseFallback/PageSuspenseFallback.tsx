import { Suspense } from "react";
import LottieHandler from "../LottieHandler/LottieHandler";

export default function PageSuspenseFallback({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <LottieHandler
          type="loadingRecord"
          message="loading please wait ...."
        />
      }
    >
      {children}
    </Suspense>
  );
}
