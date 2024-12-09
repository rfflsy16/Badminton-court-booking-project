export const errorHandler = (err, req, res, next) => {
    let status = 500
    let message = 'Internal Server Error'

    // console.log(err, "<<<<,")

    if (err.name == 'SequelizeValidationError') {
        status = 400
        message = err.errors[0].message
    }

    if (err.name == 'SequelizeUniqueConstraintError') {
        status = 400
        message = err.errors[0].message
    }

    if (err.name === 'InvalidCoordinates') {
        status = 400
        message = 'Invalid Coordinates'
    }

    if (err.name == 'SequelizeDatabaseError' || err.name == 'SequelizeForeignKeyConstraintError') {
        status = 400
        message = 'Invalid input'
    }
    if (err.name === 'BADREQUEST') {
        message = 'Please input all of the field'
        status = 400
    }

    if (err.name == 'validationErrorId') {
        status = 400
        message = "Id must be 24 characters long"
    }

    if (err.name == 'BadRequest') {
        message = 'Please input email or password'
        status = 401
    }

    if (err.name === 'InvalidInputID') {
        message = 'input must be a 24 character hex string'
        status = 400
    }

    if (err.name == 'LoginError') {
        message = 'Invalid email or password'
        status = 401
    }

    if (err.name == 'Unauthorized' || err.name == 'JsonWebTokenError') {
        message = 'Please login first'
        status = 401
    }

    if (err.name == 'Forbidden') {
        message = 'You dont have any access'
        status = 403
    }

    if (err.name == 'NotFound') {
        status = 404
        message = `Data not found`
    }

    if (err.name === "ValidationError") {
        status = 400
        message = err.message
    }

    if (err.name === "EmailUnique") {
        status = 400
        message = 'Email already exists'
    }

    if (err.name === 'BuildingNotFound') {
        status = 404
        message = 'Cannot find GOR'
    }

    if (err.name === 'CourtNotFound') {
        status = 404
        message = 'Cannot find Court'
    }

    if (err.name === 'CastError') {
        status = 400;
        message = 'Invalid ID format';
    }

    if (err.name === 'MongoServerError') {
        status = 400;
        message = 'Database error';
    }

    res.status(status).json({
        message
    })
}

