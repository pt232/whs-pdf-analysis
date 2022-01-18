type DownloadButtonProps = {
  fileId: string;
  loading: boolean;
};

export default function DownloadButton({ fileId, loading }: DownloadButtonProps) {
  function handleClick() {
    if (loading) return;
    window.open(process.env.REACT_APP_SERVER_HOST + "/api/file/download/" + fileId);
  }

  return (
    <button
      className={`col-start-3 row-start-1 md:col-start-5 justify-self-end py-2 px-4 text-white dark:text-darkmode-lighter ${
        loading ? "bg-thenex-gray-light dark:bg-darkmode cursor-not-allowed" : "bg-thenex-blue"
      } rounded-sm transition-all hover:bg-opacity-80`}
      onClick={handleClick}
    >
      Download
    </button>
  );
}
