import axiosRequest from "../helpers/axiosRequest";

export const apiBulkExportUsersLink = async () => {
  let data;
  let error: string;

  try {
    const options = {
      method: "GET",
      url: "/management/users-export",
    };
    const res = await axiosRequest(options);
    data = res.data as any;
    error = res.error;
    return { data, error };
  } catch (err) {
    return { data: undefined, error: err };
  }
};
