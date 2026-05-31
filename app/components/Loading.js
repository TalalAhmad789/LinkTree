"use client";

import React from "react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center">
        <Loader2 className="h-10 w-10 animate-spin text-gray-700" />
        <p className="mt-4 text-sm text-gray-600">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
