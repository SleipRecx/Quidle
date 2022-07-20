import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

const useGroupId = () => {
  const router = useRouter();
  const [groupId, setGroupId] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (router.query?.id) {
      setGroupId(router.query.id as string);
    }
  }, [router]);

  return groupId;
};

export default useGroupId;
