import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { SERVER_URLS } from '@config';

import authStore from '@stores/AuthStore';

import { filterOpenRedirect } from '@utils/filterOpenRedirect';

export const AuthContextProvider = ({ children }: Props) => {
  const update = authStore((state: any) => state.update);
  const router = useRouter();
  const next = router.query?.next as string;

  const nextRedirect = () =>
    router.push(next ? filterOpenRedirect(next) : SERVER_URLS.URL_HOME);
  const landingRedirect = () => router.push(SERVER_URLS.URL_LANDING);

  useEffect(() => {
    update(nextRedirect, landingRedirect);
  }); // just first time it loads

  return <>{children}</>;
};
