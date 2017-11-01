export class OptionBase<T> {
  constructor(public value?: T) {}

  isSome(): this is Some<T> {
    return this.value != null;
  }

  isNone(): this is None<T> {
    return this.value == null;
  }

  expect(message: string): T {
    if (this.isSome()) {
      return this.value;
    }
    throw new Error(message);
  }

  unwrap(): T {
    if (this.isSome()) {
      return this.value;
    }
    throw new Error("Expected value but found 'undefined'");
  }

  unwrapOr(def: T): T {
    return this.value != null ? this.value : def;
  }

  unwrapOrElse(def: () => T): T {
    return this.value != null ? this.value : def();
  }

  map<U>(def: (value: T) => U): Option<U> {
    if (this.isSome()) {
      return Option.some(def(this.value));
    }
    return Option.none();
  }

  mapOr<U>(f: (value: T) => U, def: U): U {
    return this.map(f).unwrapOr(def);
  }

  mapOrElse<U>(f: (value: T) => U, def: () => U): U {
    return this.map(f).unwrapOrElse(def);
  }

  and<U>(other: Option<U>): Option<U> {
    if (this.isSome()) {
      return other;
    }
    return Option.none();
  }

  andThen<U>(f: (value: T) => Option<U>): Option<U> {
    if (this.isSome()) {
      return f(this.value);
    }
    return Option.none();
  }

  or(other: Option<T>): Option<T> {
    if (this.isSome()) {
      return this;
    }
    return other;
  }

  orElse(f: () => Option<T>): Option<T> {
    if (this.isSome()) {
      return this;
    }
    return f();
  }

  getOrInsert(value: T): T {
    if (this.isSome()) {
      return this.value;
    }
    this.value = value;
    return value;
  }

  getOrInsertWith(f: () => T): T {
    if (this.isSome()) {
      return this.value;
    }
    const value = f();
    this.value = value;
    return value;
  }
}

export class Some<T> extends OptionBase<T> {
  value: T;
}

export class None<T> extends OptionBase<T> {
  value: T | undefined;
}

export type Option<T> = Some<T> | None<T>;

// tslint:disable-next-line
export namespace Option {
  export function some<T>(value: T): Option<T> {
    return new Some(value);
  }

  export function none<T>(): Option<T> {
    return new None<T>();
  }

  export function from<T>(value: T | undefined): Option<T> {
    return value != null ? Option.some(value) : Option.none();
  }
}
