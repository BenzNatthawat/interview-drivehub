export type DataSourceCar = {
    fields: {
        title: string;
        photo: string;
        price: number;
    };
};

export type DataSourceDiscount = {
    fields: {
        amount: number;
        code: string;
    };
};

export type DataCart = {
    title: string;
    photo: string;
    price: number;
    amount: number;
}

export type DataDiscount = {
    amount: number;
    code: string;
};
