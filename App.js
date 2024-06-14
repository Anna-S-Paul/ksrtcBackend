const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const {ksrtcmodel}=require("./model/ksrtc")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")



const app = express()
app.use(cors())
app.use(express.json())


const generateHashedPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10)
    return bcryptjs.hash(password, salt)
}

mongoose.connect("mongodb+srv://Annajimmy:annajimmychirackal@cluster0.moqndmi.mongodb.net/ksrtcdb?retryWrites=true&w=majority&appName=Cluster0")

app.post("/post", async (req, res) => {
    let input = req.body
    let hashedPassword = await generateHashedPassword(input.password)
    console.log(hashedPassword)
    input.password = hashedPassword
    let ksrtc = new ksrtcmodel(input)
    ksrtc.save()
    res.json({ "status": "success" })
})


app.listen(8077, () => {
    console.log("server started")
})