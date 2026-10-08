"use client";

import { Printer } from "lucide-react";

// Opens the browser print dialog, where "Save as PDF" produces the CV file.
export default function PrintButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      <Printer className="w-5 h-5" aria-hidden /> Simpan sebagai PDF
    </button>
  );
}
