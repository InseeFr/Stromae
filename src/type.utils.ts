type Defined<T> = T extends undefined | infer V ? V : T;

export type ItemOf<ArrayType> = Defined<ArrayType> extends (infer ElementType)[]
    ? ElementType
    : never;
