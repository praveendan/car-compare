const exception = (req, exception, message, code) => {
    return {
        exception: exception || 'AppException',
        message: message || 'Unknown error',
        url: req.path,
        code: code || 500
    }
}

export default exception
