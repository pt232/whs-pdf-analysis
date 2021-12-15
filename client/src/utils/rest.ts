import axios from "axios";

export async function post(endpoint: string, bodyData: FormData) {
  const fittingEndpoint = endpoint.startsWith("/")
    ? endpoint.substring(1, endpoint.length)
    : endpoint;

  try {
    const { status, data } = await axios.post(
      `${process.env.REACT_APP_SERVER_HOST + "/" + fittingEndpoint}`,
      bodyData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return { status, data };
  } catch (err) {
    throw err;
  }
}
