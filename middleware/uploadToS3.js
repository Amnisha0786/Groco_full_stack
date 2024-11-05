const dotenv = require("dotenv")
dotenv.config()
const AWS = require("aws-sdk")

const awsConfig = {
    accessKeyId : process.env.AWS_ID_KEY,
    secretKeyId : process.env.AWS_SECRET_KEY,
    region : process.env.AWS_REGION 
  }
  const S3 = new AWS.S3(awsConfig)


  //upload to bucket
const UploadToS3 = (fileData) => {
    console.log(fileData ,'file')
  return new Promise((resolve , reject) => {
    const params ={
      Bucket : process.env.AWS_BUCKET_NAME,
      Key: `${Date.now().toString()}.jpg`,
      Body:fileData
    }
    S3.upload(params,(err,data) => {
      if(err){
        console.log(err)
        reject(err)
      }
      console.log(params , "params")
      return resolve(data)
    })

  })
}

module.exports = {UploadToS3}