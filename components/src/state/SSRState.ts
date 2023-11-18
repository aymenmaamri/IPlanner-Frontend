import { atom, useSetRecoilState } from "recoil";

export const ssrState = atom({
  key: "SsrCompleted",
  default: false,
});

/**
 * Because of SSR, the first client-side render has to match the server.
 * Meaning: Any recoil state that reads from LocalStorage (via PersistOnBrowser) will be initially
 * undefined on the client even if LocalStorage actually contains data.
 *
 * Only when this state is true, can you assume that undefined actually means undefined.
 * If it's false, undefined could mean it's not loaded yet.
 */
export const localStorageReadyState = atom<boolean>({
  key: "localStorageReady",
  default: false,
});

export const useSsrState = (): (() => void) => {
  const setSsrCompleted = useSetRecoilState(ssrState);
  return () => setSsrCompleted(true);
};
