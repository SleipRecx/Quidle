import { useEffect, useState } from "react";

const useDomain = () => {
  const [domainName, setDomainName] = useState("");
  useEffect(() => {
    if (!!window) {
      setDomainName(window.location.hostname);
    }
  }, []);

  return {
    domainName: domainName,
  };
};

export default useDomain;
