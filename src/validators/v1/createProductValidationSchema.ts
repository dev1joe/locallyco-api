const createProductValidationSchema = {
    name: {
        isString: {
            errorMessage: "Product name must be a string."
        },
        notEmpty: {
            errorMessage: "Product name cannot be empty."
        },
        isLength: {
            options: { min: 3, max: 255 },
            errorMessage: "Product name must be between 3 and 255 characters long."
        }
    },
    desc: {
        isString: {
            errorMessage: "Description must be a string."
        },
        notEmpty: {
            errorMessage: "Description cannot be empty."
        },
        isLength: {
            options: { min: 20, max: 1000 },
            errorMessage: "Description must be between 50 and 1000 characters long."
        }
    },
};

export default createProductValidationSchema;