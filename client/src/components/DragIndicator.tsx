export default function DragIndicator() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-thenex-blue bg-opacity-70 z-20">
      <div className="relative w-28 h-28 pointer-events-none">
        <div className="absolute left-2/4 w-4 h-full bg-white transform -translate-x-2/4 shadow-lg" />
        <div className="absolute top-2/4 left-2/4 w-4 h-full bg-white transform rotate-90 -translate-y-2/4 -translate-x-2/4" />
      </div>
    </div>
  );
}
