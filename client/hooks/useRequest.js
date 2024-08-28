import axios from "axios";
import { useState } from "react";

export default ({ url, method, onSuccess }) => {
  const [Errors, set_Errors] = useState(null);

  const doRequest = async (body) => {
    set_Errors(null);
    try {
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      set_Errors(
        <div className="m-10  text-center flex-col items-center justify-center p-5">
          <p className="text-red-500 italic text-center">Ooops...</p>
          <ul>
            {error?.response?.data?.Error?.map((err, i) => (
              <li className=" list-disc text-red-500 text-xs italic" key={i}>
                {err.message}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, Errors };
};
