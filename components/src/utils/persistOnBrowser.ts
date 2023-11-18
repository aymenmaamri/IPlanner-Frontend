import { AtomEffect } from "recoil";
import { ssrState } from "../state/SSRState";
import { merge, clone } from "lodash";

export enum DATA_TYPE_TO_PERSIST {
  DEFAULT = "Arrays and Object",
  MAP = "Maps",
  PRIMITIVE = "Strings, numbers and booleans",
}

type NonPrimitive<T> = T extends
  | string
  | number
  | boolean
  | symbol
  | null
  | undefined
  | Map<any, any>
  ? never
  : T;
type IsMap<T> = T extends Map<any, any> ? T : never;

export function persistState<T extends string | boolean | number>(
  key: string,
  persistType: DATA_TYPE_TO_PERSIST.PRIMITIVE
): AtomEffect<T>;
export function persistState<T>(
  key: string,
  persistType: DATA_TYPE_TO_PERSIST.MAP
): AtomEffect<IsMap<T>>;
export function persistState<T>(
  key: string,
  persistType: DATA_TYPE_TO_PERSIST.DEFAULT,
  defaultState: NonPrimitive<T> | undefined
): AtomEffect<NonPrimitive<T>>;
export function persistState<T>(
  key: string,
  persistType: DATA_TYPE_TO_PERSIST,
  defaultState?: T
): AtomEffect<T> {
  return ({ getPromise, setSelf, onSet }) => {
    // this promise is necessary to make SSR and the first hydration in the browser return the same DOM
    // without it, on the first load the state will be loaded from localStorage already, which obviously
    // is not accessible in the server
    // this can lead to mismatches and result in layout bugs (e.g. in the shop, where SSR will always render
    // as if we are logged out and render the login, but if the first load has access to localStorage, we could
    // render the normal UI on first load already)
    getPromise(ssrState).then(() => {
      // check if we are in the browser environment, if in server environment do nothing
      if (typeof window !== "undefined") {
        const savedValue = localStorage.getItem(key);
        if (savedValue !== null) {
          setSelf(parseByPersistType(savedValue, defaultState, persistType));
        }

        onSet((newValue: unknown, _: unknown, isReset: boolean) => {
          isReset
            ? localStorage.removeItem(key)
            : localStorage.setItem(
                key,
                serializeByPersistType(newValue, persistType)
              );
        });
      }
    });
  };
}

const parseByPersistType = <T>(
  savedValue: string,
  defaultState: T | undefined,
  persistType: DATA_TYPE_TO_PERSIST
): T => {
  switch (persistType) {
    case DATA_TYPE_TO_PERSIST.PRIMITIVE:
      return JSON.parse(savedValue) as T;
    case DATA_TYPE_TO_PERSIST.DEFAULT:
      return defaultState !== undefined
        ? merge(clone(defaultState), JSON.parse(savedValue))
        : JSON.parse(savedValue);
    case DATA_TYPE_TO_PERSIST.MAP:
      return new Map(JSON.parse(savedValue)) as unknown as T;
  }
};

const serializeByPersistType = (
  newValue: any,
  persistType: DATA_TYPE_TO_PERSIST
): string => {
  switch (persistType) {
    case DATA_TYPE_TO_PERSIST.PRIMITIVE:
      return JSON.stringify(newValue);
    case DATA_TYPE_TO_PERSIST.DEFAULT:
      return JSON.stringify(newValue);
    case DATA_TYPE_TO_PERSIST.MAP:
      return JSON.stringify([...newValue]);
  }
};
