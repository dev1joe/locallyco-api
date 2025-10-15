const createSkuValidationSchema = {
    sku_code: {
        isString: {
            errorMessage: "sku_code must be a string."
        },
        notEmpty: {
            errorMessage: "sku_code cannot be empty."
        },
        // isLength: {}
        // TODO: specify sku_code length
    },
    quantity: {
        isInt: {
            errorMessage: "Quantity must be an integer."
        },
        toInt: true,
        custom: {
            options: (value: number) => {
                if (value < 1) {
                    throw new Error("Quantity must be at least 1");
                }
                return true;
            }
        }
    },
    price_cent: {
        isInt: {
            errorMessage: "Price must be an integer."
        },
        toInt: true,
        custom: {
            options: (value: number) => {
                if (value < 1) {
                    throw new Error("Price must be at least 1");
                }
                return true;
            }
        }
    }
}

export default createSkuValidationSchema;