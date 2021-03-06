import axios from "axios";

export async function get(endpoint: string) {
  const fittingEndpoint = endpoint.startsWith("/")
    ? endpoint.substring(1, endpoint.length)
    : endpoint;

  try {
    const { status, data } = await axios.get(
      `${process.env.REACT_APP_SERVER_HOST + "/api/file/" + fittingEndpoint}`
    );

    return { status, data };
  } catch (err) {
    throw err;
  }
}

export async function post(endpoint: string, bodyData: FormData) {
  const fittingEndpoint = endpoint.startsWith("/")
    ? endpoint.substring(1, endpoint.length)
    : endpoint;

  try {
    const { status, data } = await axios.post(
      `${process.env.REACT_APP_SERVER_HOST + "/api/file/" + fittingEndpoint}`,
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
