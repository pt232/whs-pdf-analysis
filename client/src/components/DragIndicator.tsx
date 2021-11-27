export default function DragIndicator() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-thenex-blue bg-opacity-70 z-20">
      <div className="relative w-32 h-32 pointer-events-none">
        <div className="absolute left-2/4 w-5 h-full bg-white transform -translate-x-2/4 rounded-full shadow-lg" />
        <div className="absolute top-2/4 left-2/4 w-5 h-full bg-white transform rotate-90 -translate-y-2/4 -translate-x-2/4 rounded-full" />
      </div>
    </div>
  );
}
