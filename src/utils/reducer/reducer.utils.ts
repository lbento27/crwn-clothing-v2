import { AnyAction } from 'redux';

//withMatcher function that takes some actionCreator func and add additional functionality so they can determine if a pass action as the same type as the corresponding action that they create
//AC=action creator
type Matchable<AC extends () => AnyAction> = AC & {
  //& = intersection
  type: ReturnType<AC>['type']; //get the return type from the action creator AC, in the key sting and set to type;
  match(action: AnyAction): action is ReturnType<AC>; //match method receiver an action and narrow the type
};

//receive with no params
export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>; //withMatcher(fetchCategoriesStart), that way we have access to the type and match methods

//receive with params
//...args : any[]  = concatenate any arguments into an array of type any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(
  actionCreator: AC,
): Matchable<AC>;

//func
// eslint-disable-next-line @typescript-eslint/ban-types
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

///
export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

//func overloading
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

export function createAction<T extends string>(type: T, payload: void): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
//if we only get an action with type we will return Action, if we get type and payload we will return ActionWithPayload
//export const createAction = (type, payload) => ({ type, payload });
