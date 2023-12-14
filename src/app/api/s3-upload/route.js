// pages/api/s3-upload.js

import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

async function retrieveFileFromS3(objectKey) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: objectKey,
  };

  const command = new GetObjectCommand(params);
  const response = await s3Client.send(command);

  return {
    body: response.Body,
    contentType: response.ContentType,
  };
}

export const get = async (request) => {
  try {
    if (request.method !== "GET") {
      return NextResponse.json(
        { error: "Method not allowed." },
        { status: 405 }
      );
    }

    const { objectKey } = request.query || {};

    if (!objectKey) {
      return NextResponse.json(
        { error: "Object key is required." },
        { status: 400 }
      );
    }

    const { body, contentType } = await retrieveFileFromS3(objectKey);

    const response = new Response(body, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${objectKey}"`,
      },
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
