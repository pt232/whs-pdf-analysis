type StepProps = {
  count: string;
  title: string;
  description?: string;
};

export default function Step({ count, title }: StepProps) {
  return (
    <div className="flex flex-col items-center max-w-sm px-8">
      <div className="flex justify-center items-center w-8 h-8 bg-white text-thenex-blue font-bold border border-solid border-thenex-gray rounded-full">
        {count}
      </div>
      <h3 className="py-2 lg:text-lg">{title}</h3>
      <p className="text-thenex-gray text-center text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex debitis, fugit possimus minus
        corrupti, deleniti excepturi accusantium quia dolores quaerat maxime adipisci ipsa,
        repudiandae deserunt quisquam.
      </p>
    </div>
  );
}
