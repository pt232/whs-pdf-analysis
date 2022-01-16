type StepItemProps = {
  count: string;
  title: string;
  description: string;
};

export default function StepItem({ count, title, description }: StepItemProps) {
  return (
    <div className="flex flex-col items-center max-w-xs px-8">
      <div className="flex justify-center items-center w-8 h-8 bg-white text-thenex-blue font-bold border border-solid border-thenex-gray rounded-full">
        {count}
      </div>
      <h3 className="py-2 text-thenex-gray-dark text-center lg:text-lg">{title}</h3>
      <p className="text-thenex-gray text-center text-sm">{description}</p>
    </div>
  );
}
