type HeadingProps = {
  title: string;
  paragraph: string;
};

export default function Heading({ title, paragraph }: HeadingProps) {
  return (
    <div className="text-center">
      <h1 className="pb-2 text-thenex-blue text-2xl lg:text-3xl">{title}</h1>
      <p className="text-thenex-gray lg:text-lg">{paragraph}</p>
    </div>
  );
}
