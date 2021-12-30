type BadgeProps = {
  text: string;
  loading: boolean;
  finished: boolean;
};

export default function Badge({ text, loading, finished }: BadgeProps) {
  function getBadgeColor() {
    return finished ? "text-thenex-blue border-thenex-blue" : "text-green-500 border-green-500";
  }

  return (
    <div
      className={`flex justify-center items-center w-min px-1 text-xs uppercase whitespace-nowrap
       border rounded-sm ${loading ? "text-yellow-500 border-yellow-500" : getBadgeColor()}`}
    >
      {text}
    </div>
  );
}
