export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E2F2FF] border-t-[#1D70C5]" />
        <p className="text-p3 text-gray-500">Loading…</p>
      </div>
    </div>
  );
}
