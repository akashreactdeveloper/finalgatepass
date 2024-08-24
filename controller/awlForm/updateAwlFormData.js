const AwlModel = require("../../models/AwlModel")

async function updateAwlFormDataController(req, res) {
    try {
        const {_id, ...resBody} = req.body

        const updateAwlFormData = await AwlModel.findByIdAndUpdate(_id,resBody)

        res.json({
            message : "Awl Gatepass Updated Successfully",
            data : updateAwlFormData,
            success : true,
            error : false
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateAwlFormDataController