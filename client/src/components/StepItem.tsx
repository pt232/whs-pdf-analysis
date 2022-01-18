type StepItemProps = {
  count: string;
  title: string;
  description: string;
};

export default function StepItem({ count, title, description }: StepItemProps) {
  return (
    <div className="flex flex-col items-center max-w-xs px-8">
      <div className="flex justify-center items-center w-8 h-8 bg-white dark:bg-darkmode-dark text-thenex-blue dark:text-darkmode-lighter font-bold border border-solid border-thenex-gray dark:border-darkmode-dark rounded-full">
        {count}
      </div>
      <h3 className="py-2 text-thenex-gray-dark dark:text-darkmode-lighter text-center lg:text-lg">
        {title}
      </h3>
      <p className="text-thenex-gray dark:text-darkmode-light text-center text-sm">{description}</p>
    </div>
  );
}
