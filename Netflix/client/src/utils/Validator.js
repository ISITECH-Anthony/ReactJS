const messages = {
    required: "Le champ \":attribute\" est requis !",
    email: "Le champ \":attribute\" doit être une adresse email valide (:value) !",
    minLength: "Le champ doit contenir un minimum de :param caractères !",
    maxLength: "Le champ doit contenir un maximum de :param caractères !",
    regex: "Le champ doit correspondre à l'expression régulière: :param !",
};

const rules = {
    required: (value) => value !== "",
    email: (value) => {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

        return emailRegex.test(value);
    },
    minLength: (value, minLength) => value.length >= minLength,
    maxLength: (value, maxLength) => value.length <= maxLength,
    regex: (value, regex) => regex.test(value),
};

const Validator = (data, data_rules, custom_messages = {}, custom_attributes = {}) => {
    const errors = {};

    Object.keys(data).forEach((input) => {
        let attribute;
        let value = data[input];

        if (custom_attributes[input]) {
            attribute = custom_attributes[input];
        } else {
            attribute = input;
        }

        Object.keys(data_rules[input]).forEach((rule) => {
            const param = data_rules[input][rule];

            if (rules[rule](value, param) === false) {
                let message;

                if (custom_messages[rule]) {
                    if (typeof custom_messages[rule] === "string") {
                        message = custom_messages[rule];
                    } else {
                        message = custom_messages[rule][input];
                    }
                } else {
                    message = messages[rule];
                }

                message = message.replace(":attribute", attribute);
                message = message.replace(":value", value);

                if (typeof param === "number") {
                    message = message.replace(":param", param);
                } else {
                    message = message.replace(":param", param.toString());
                }

                if (!errors[input]) {
                    errors[input] = [];
                }

                errors[input].push(message);
            }
        });
    });

    return errors;
}

export default Validator;