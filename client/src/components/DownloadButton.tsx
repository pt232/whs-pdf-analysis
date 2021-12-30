type DownloadButtonProps = {
  loading: boolean;
};

export default function DownloadButton({ loading }: DownloadButtonProps) {
  return (
    <button
      className={`col-start-3 row-start-1 md:col-start-5 justify-self-end py-2 px-4 text-white ${
        loading ? "bg-thenex-gray-light cursor-not-allowed" : "bg-thenex-blue"
      } rounded-sm transition-all hover:bg-opacity-80`}
    >
      Download
    </button>
  );
}
