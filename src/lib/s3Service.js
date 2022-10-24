const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { editUser } = require("../usecases/user.usecase");
const uuid = require("uuid").v4;

exports.s3UploadProfile = async (files, id) => {
  const S3client = new S3Client();

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_PROFILE_NAME,
      Key: `uploads/${id}/${uuid()}-${file.originalname}`,
      Body: file.buffer,
    };
  });
  return await Promise.all(
    params.map((param) => S3client.send(new PutObjectCommand(param)))
  );
};

//! Esta es mi logica para actualizar al usuario, pero no lo pude meter en el map, si lograra que la función me regresara las Keys
//! solo sería llamar el editUser en un useCase y ya.
// const body = {};
//     const user = editUser(
//       id,
//       `${file.fieldname}: https://s3-fotofi-backend-profile-uploads.s3.amazonaws.com/uploads/${key}`
//     );
