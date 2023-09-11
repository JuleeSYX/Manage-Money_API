module.exports = (req:any, res:any, next:any) => {
    res.status(404).send('🔍 - Not Found');
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}