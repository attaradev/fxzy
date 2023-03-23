import { useUser } from "@auth0/nextjs-auth0/client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  FC,
} from "react";

type AccessTokenContextType = {
  accessToken: string;
};

type AccessTokenProviderProps = { children: React.ReactNode };

const AccessTokenContext = createContext<AccessTokenContextType>({
  accessToken: "",
});

export const AccessTokenProvider: FC<AccessTokenProviderProps> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    fetch("/api/auth/token")
      .then((res) => res.json())
      .then(({ accessToken }) => {
        setAccessToken(accessToken);
      });
  }, [user]);

  const memoizedValue = useMemo(() => ({ accessToken }), [accessToken]);

  return (
    <AccessTokenContext.Provider value={memoizedValue}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export const useAccessToken = () => {
  return useContext(AccessTokenContext);
};
