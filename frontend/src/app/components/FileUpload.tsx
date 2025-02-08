"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface FileUploadProps {
  onFileUpload: (file: File) => Promise<void>; // Ensure this is async
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await onFileUpload(file); 
      toast.success("Successfully added the data");

      setTimeout(() => {
        router.replace("/"); 
      }, 500);
    } catch (error: any) {
      toast.error(error?.message || "Error uploading file");
    }
  };

  return (
    <div className="mt-4">
      <input
        type="file"
        accept=".xml"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload XML File
      </button>
    </div>
  );
};
