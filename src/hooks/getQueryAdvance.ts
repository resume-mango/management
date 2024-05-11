import { useQuery } from "react-query";
import { useAuth } from "../contexts/authProvider";

const getQueryAdvance = (
  identifier: any,
  fetcher: () => any,
  enabled = true,
  params?: any
) => {
  const { user, token } = useAuth();

  return useQuery(identifier, fetcher, {
    enabled: !!token && enabled,
    ...params,
  });
};

export default getQueryAdvance;
