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
    description: {
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
    category_id: {
        optional: true, // TODO: remove late in development
        isInt: {
            errorMessage: "Category ID must be an integer."
        },
        toInt: true,
        custom: {
            options: (value: number) => {
                // allow undefined/null
                if (value === undefined || value === null) return true;

                if (value < 1) {
                    throw new Error("Category ID must be at least 1");
                }
                return true;
            }
        }
    },
    brand_id: {
        optional: true, // TODO: remove late in development
        isInt: {
            errorMessage: "Brand ID must be an integer."
        },
        toInt: true,
        custom: {
            options: (value: number) => {
                // allow undefined/null
                if (value === undefined || value === null) return true;

                if (value < 1) {
                    throw new Error("Brand ID must be at least 1");
                }
                return true;
            }
        }
    },
    versioning: {
        optional: true,
        custom: {
            options: (value: any) => {
                // allow undefined/null
                if (value === undefined || value === null) return true;
                // already an object -> accept
                if (typeof value === 'object') return true;
                // allow JSON string (will be parsed by controller if needed)
                if (typeof value === 'string') {
                    try {
                        JSON.parse(value);
                        return true;
                    } catch (e) {
                        throw new Error('versioning must be a valid JSON string');
                    }
                }
                throw new Error('versioning must be an object or a JSON string');
            }
        }
    }
};

export default createProductValidationSchema;