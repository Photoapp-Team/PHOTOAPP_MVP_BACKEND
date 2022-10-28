const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { editUser } = require("../usecases/user.usecase");
const uuid = require("uuid").v4;

exports.s3UploadProfile = async (files, id) => {
  const S3client = new S3Client();

  const paramsS3 = Object.entries(files).map(([fieldname, files]) => {
    const file = files[0];
    const key = `uploads/${id}/${uuid()}-${file.originalname}`;
    return {
      Bucket: process.env.AWS_BUCKET_PROFILE_NAME,
      Key: key,
      Body: file.buffer,
      fieldname: file.fieldname,
    };
  });
  const s3ObjectResponse = await Promise.all(
    paramsS3.map((param) => S3client.send(new PutObjectCommand(param)))
  );
  return { s3ObjectResponse, paramsS3 };
};

exports.s3UploadPackage = async (files, id) => {
  const S3client = new S3Client();

  const paramsS3 = Object.entries(files)
    .map(([fieldname, files]) => {
      if (files instanceof Array) {
        const mapResult = files.map((file) => {
          const key = `uploads/${id}/${uuid()}-${file.originalname}`;
          return {
            Bucket: process.env.AWS_BUCKET_PACKAGE_NAME,
            Key: key,
            Body: file.buffer,
            fieldname: file.fieldname,
          };
        });
        return mapResult;
      } else {
        const file = files[0];
        const key = `uploads/${id}/${uuid()}-${file.originalname}`;

        return {
          Bucket: process.env.AWS_BUCKET_PACKAGE_NAME,
          Key: key,
          Body: file.buffer,
          fieldname: file.fieldname,
        };
      }
    })
    .flat(1);

  const s3ObjectResponse = await Promise.all(
    paramsS3.map((param) => S3client.send(new PutObjectCommand(param)))
  );
  return { s3ObjectResponse, paramsS3 };
};

exports.s3UploadSession = async (files, id, route) => {
  const S3client = new S3Client();

  const paramsS3 = files.map((file) => {
    const key = `uploads/${id}/${route}/${uuid()}-${file.originalname}`;

    return {
      Bucket: process.env.AWS_BUCKET_SESSION_NAME,
      Key: key,
      Body: file.buffer,
      fieldname: file.fieldname,
    };
  });
  const s3ObjectResponse = await Promise.all(
    paramsS3.map((param) => S3client.send(new PutObjectCommand(param)))
  );
  return { s3ObjectResponse, paramsS3 };
};
