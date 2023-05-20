const validateBody = (request, response, next) => {
    const {body} = request;

    if (body.password == undefined ) {
       return response.status(400).json ({message:'The field "id" is required' });
    }

    if (body.password == '' ) {
       return response.status(400).json ({message:'title cannot be empty' });
    }

    next();
};

module.exports = {
    validateBody,
};