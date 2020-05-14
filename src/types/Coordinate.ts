export type Coordinate = Readonly<{
    x: X;
    y: Y;
}>;

export type X = number & { _brand: "X_COORD" };
export type Y = number & { _brand: "Y_COORD" };