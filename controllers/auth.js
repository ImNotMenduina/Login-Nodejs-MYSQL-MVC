//Request.body is what comes from forms

exports.register = (req, res) => {
    console.log(req.body)
    res.send("Form submitted")
}