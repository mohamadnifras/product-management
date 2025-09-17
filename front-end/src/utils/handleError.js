export const handleError = (error) => {

    const defaultMessage = 'Something went wrong. Please try again.'
    return (error?.response?.data?.message || error?.message || defaultMessage)
}