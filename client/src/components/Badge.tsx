type BadgeProps = {
  text: string;
  loading: boolean;
};

export default function Badge({ text, loading }: BadgeProps) {
  return (
    <div
      className={`flex justify-center items-center w-min px-1 text-xs uppercase border rounded-sm md:col-start-3 md:row-start-1 md:justify-self-center  ${
        loading ? "text-yellow-500 border-yellow-500" : "text-green-500 border-green-500"
      }`}
    >
      {text}
    </div>
  );
}
