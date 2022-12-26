import { Storage } from "@google-cloud/storage";
import { ulid } from "ulid";
import { format } from "util";

const storage = new Storage();

const bucketName =
  process.env.GCS_BUCKET || "any-bucket-name-may-multo-sa-likod-mo-huhu";

const storageBucket = storage.bucket(bucketName);

export const uploadStreamToGcs = async (data: NodeJS.ReadableStream) => {
  try {
    return new Promise((resolve, reject) => {
      const blob = storageBucket.file(`${ulid()}/test.pdf`);

      const blobStream = data.pipe(
        blob.createWriteStream({
          resumable: false,
        })
      );

      blobStream
        .on("finish", () => {
          const url = format(`gs://${storageBucket.name}/${blob.name}`);
          resolve(url);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  } catch (error) {
    throw new Error("Error uploading to GCS");
  }
};
