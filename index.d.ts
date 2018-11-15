// Type definitions for fbelt [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

///<reference lib="es6"/>


/*
 * missing functions are:
 * functions.js
 *  apply
 *  call
 *  callWith
 * list.js
 *  all
 *  any
 *  uniqBy
 *  ap
 *  mapply
 *  mapify
 * logic.js
 *  vxor
 * map.js
 *  mapO
 *  listify
 *  remap
 *  remove
 *  mapAny
 *  mapplyO
 *  apO
 *  apAny
 * promise.js
 *  allO
 *  allAny
 *  traverse
 *  callbackify
 *  mapplyP
 *  filterP
 *  composeP
 */

/**
 * Returns the arity (number of arguments) of the given functions.
 * @param fn
 */
export function arity(fn: Function): number;

/**
 * Returns the arity (number of arguments) of the given functions.
 * @param fn
 */
export function ary(fn: Function): number;

type Arity1<A, B> = (a: A) => B;

/**
 * Returns a new composed function of the given functions.
 * The functions will be called from right to left with the return value of the right function or the value for the last function.
 * @param f
 */
export function compose<A, B>(f: Arity1<A, B>): Arity1<A, B>;
export function compose<A, B, C>(g: Arity1<B, C>, f: Arity1<A, B>): Arity1<A, C>;
export function compose<A, B, C, D>(h: Arity1<C, D>, g: Arity1<B, C>, f: Arity1<A, B>): Arity1<A, D>;
export function compose<A, B, C, D, E>(i: Arity1<D, E>, h: Arity1<C, D>, g: Arity1<B, C>, f: Arity1<A, B>): Arity1<A, E>;
export function compose<A, B, C, D, E, F>(j: Arity1<E, F>, i: Arity1<D, E>, h: Arity1<C, D>, g: Arity1<B, C>, f: Arity1<A, B>): Arity1<A, F>;
export function compose<A, B, C, D, E, F, G>(l: Arity1<G, F>, j: Arity1<E, F>, i: Arity1<D, E>, h: Arity1<C, D>, g: Arity1<B, C>, f: Arity1<A, B>): Arity1<A, G>;


/**
 * Calls the function with the later provided value and returns the value.
 * The return value of the function will be ignored.
 * @param fn
 */
export function effect<T>(fn: (x: T) => any): (x: T) => T;

/**
 * Converts a function with multiple arguments to a function which takes one argument and returns a function which also takes one argument until all argument slots are filled.
 * @param fn
 */
export function curry<T, R>(fn : (x : T) => R) : (x : T) => R;
export function curry<T, T1, R>(fn : (x : T, y : T1) => R) : (x : T) => (y : T1) => R;
export function curry<T, T1, T2, R>(fn : (x : T, y : T1, z : T2) => R) : (x : T) => (y : T1) => (z : T2) => R;
export function curry<T, T1, T2, T3, R>(fn : (x : T, y : T1, z : T2, a : T3) => R) : (x : T) => (y : T1) => (z : T2) => (a : T3) => R;

// export function uncurry<T, R>(fn : (x : T) => R) : (x : T) => R;
// export function uncurry<T, T1, R>(fn : (x : T) => (y : T1) => R) : (x : T, y : T1) => R;
// export function uncurry<T, T1, T2, R>(fn : (x : T) => (y : T1) => (z : T2) => R) : (x : T, y : T1, z : T2) => R;
// export function uncurry<T, T1, T2, T3, R>(fn : (x : T) => (y : T1) => (z : T2) => (a : T3) => R) : (x : T, y : T1, z : T2, a : T3) => R;

export function flip<T, T1, R>(fn: (x: T1) => (x: T) => R): (x: T) => (x: T1) => R;

export function isArray(x: any): boolean;

interface IHasLength {
    length: number
}

export function len(x: IHasLength): number;

export function filter<T>(fn : (currentValue : T, index : number, array : T[]) => boolean): (xs: T[]) => T[];

export function map<T, R>(fn: (currentValue: T, index: number, array: T[]) => R): (xs: T[]) => R[];

/**
 * Creates a composed functions out of the given functions and maps over every array entry.
 * @param f
 */
export function mapC<T, A>(f: Arity1<T, A>) : (array : T[]) => A[];
export function mapC<T, A, B>(g: Arity1<A, B>, f : Arity1<T, A>) : (array : T[]) => B[];
export function mapC<T, A, B, C>(h: Arity1<B, C>, g: Arity1<A, B>, f : Arity1<T, A>) : (array : T[]) => C[];
export function mapC<T, A, B, C, D>(i: Arity1<C, D>, h: Arity1<B, C>, g: Arity1<A, B>, f : Arity1<T, A>) : (array : T[]) => D[];
export function mapC<T, A, B, C, D, E>(j: Arity1<D, E>, i: Arity1<C, D>, h: Arity1<B, C>, g: Arity1<A, B>, f : Arity1<T, A>) : (array : T[]) => E[];
export function mapC<T, A, B, C, D, E, F>(k: Arity1<E, F>, j: Arity1<D, E>, i: Arity1<C, D>, h: Arity1<B, C>, g: Arity1<A, B>, f : Arity1<T, A>) : (array : T[]) => F[];

/**
 * Returns an array containing tuples (an array) of the argument array.
 * @param xs
 */
export function zip<A>(xs: A[]): <B>(ys: B[]) => Array<[A, B]>;

export function zipWith<T, R>(fx: (xs: T[]) => R) : <R1>(fy: (xs: T[]) => R1) => (xs: T[]) => Array<[R, R1]>;

export function odds<T>(xs: T[]): T[];

export function evens<T>(xs: T[]): T[];

export function pairs<T>(xs: T[]): Array<[T, T]>;

export function none<T>(fn: (x: T) => any): (xs: T[]) => boolean;

export function find<T>(pr: (currentValue: T, index: number, array: T[]) => boolean): (xs: T[]) => T | undefined;

export function cons<T>(x: T): (xs: T[]) => T[];

export function push<T>(x: T): (xs: T[]) => T[];

export function contains<T>(x: T): (xs: T[]) => boolean;

export function head<T>(xs: T[]): T | undefined;

export function last<T>(xs: T[]): T;

export function id<T>(x: T): T;

export function always<T>(x: T): () => T;

export function ftrue(): boolean;

export function ffalse(): boolean;

export function iif<T>(pr: (x: T) => boolean): (t: (x: T) => any) => (f: (x: T) => any) => (x: T) => any;

export function not<T>(fn: (x: T) => boolean): (x: T) => boolean;

export function and<T>(pra: (x: T) => boolean): (prb: (x: T) => boolean) => (x: T) => boolean;

export function or<T>(pra: (x: T) => boolean): (prb: (x: T) => boolean) => (x: T) => boolean;

export function xor<T>(pra: (x: T) => boolean): (prb: (x: T) => boolean) => (x: T) => boolean;

export function equals(x: any): (y: any) => boolean;

export function vnot(x: any): boolean;

export function vand<T>(pr : (x : T) => boolean) : (x : T) => (y : T) => boolean;

export function vor<T>(pr : (x : T) => boolean) : (x : T) => (y : T) => boolean;

export function isUndefined(x: any): boolean;

export function equalsBy<T>(pr: (x: T) => any): (a: T) => (b: T) => boolean;

/**
 * Calls every first tuple member with the provided value.
 * Executes the second tuple member with the value and returns the result.
 * @param ms
 */
export function match<T, R>(ms: Array<[(x: T) => boolean, (x: T) => R]>): (x: T) => R;

/**
 * Returns true if executed.
 */
export function otherwise(): boolean;

export function isObject(x: any): boolean;

export function isPlainObject(x: any): boolean;

export function keys(x: object): string[];

export function merge<T>(a : T) : T;
export function merge<T, T1>(a : T, b : T1) : T & T1;
export function merge<T, T1, T2>(a : T, b : T1, c : T2) : T & T1 & T2;
export function merge<T, T1, T2, T3>(a : T, b : T1, c : T2, d : T3) : T & T1 & T2 & T3;
export function merge<T, T1, T2, T3, T4>(a : T, b : T1, c : T2, d : T3) : T & T1 & T2 & T3;
export function merge<T, T1, T2, T3, T4, T5>(a : T, b : T1, c : T2, d : T3, e : T4) : T & T1 & T2 & T3 & T4;
export function merge<T, T1, T2, T3, T4, T5, T6>(a : T, b : T1, c : T2, d : T3, e : T4, f : T5) : T & T1 & T2 & T3 & T4 & T5;

// export function pick<T, K extends keyof  T>(props: K[]) : Pick<T, K>;

// export function get<T, K extends keyof T>(prop: K) : (x : T) => T[K];

export function has(prop: string) : (map : object) => boolean;

export function resolve<T>(value: T | PromiseLike<T>): Promise<T>;

export function reject<T = never>(reason?: any): Promise<T>;

export function all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
export function all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
export function all<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
export function all<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promise<[T1, T2, T3, T4, T5, T6, T7]>;
export function all<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promise<[T1, T2, T3, T4, T5, T6]>;
export function all<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Promise<[T1, T2, T3, T4, T5]>;
export function all<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Promise<[T1, T2, T3, T4]>;
export function all<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<[T1, T2, T3]>;
export function all<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<[T1, T2]>;
export function all<T1>(values: (T1 | PromiseLike<T1>)): Promise<T1[]>;

export function isTraversable(x : any) : boolean;

export function effectP<T>(fn : (x : T) => Promise<any>) : (x : T) => Promise<T>;

export function then<T, R>(fn : (x : T) => R) : (p : Promise<T>) => Promise<R>;

export function seq(pfns: Array<() => Promise<any>>) : Promise<any>;

export function assert<T>(pr : (x : T) => boolean) : Promise<T>;

export function assertE<T>(msg: string, pr: (x : T) => boolean) : (x : T) => Promise<T>;

export function assertP<T, R>(pr : (x : T) => R) : (x : T) => Promise<T>;

export function assertPE<T, R>(msg: string, pr : (x : T) => R) : (x : T) => Promise<T>;

// set.js //////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function asArray<T>(set: Set<T>): T[] ;

export function union<T>(sa: Set<T>): (sb: Set<T>) => Set<T>;

// tuple.js ////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function pairWith<T, T1>(fn: (x: T) => T1): (x: T) => Array<[T, T1]>;

export function first<T, T1>(tuple: [T, T1]): T;

export function second<T, T1>(tuple: [T, T1]): T1;

export function mapFirst<T, T1, R>(fn: (x: T) => R): (tuple: [T, T1]) => R;

export function mapSecond<T, T1, R>(fn: (x: T1) => R): (tuple: [T, T1]) => R;