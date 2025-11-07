import { CreateBucketCommand, HeadBucketCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from '@src/services/clients/aws-s3.client'

const BUCKET = 'eks-sqs-s3-crud'

export class S3Service {
  static async upload(file: Buffer, filename: string, mimetype: string) {
    await this.ensureBucketExists()

    const params = {
      Bucket: BUCKET,
      Key: filename,
      Body: file,
      ContentType: mimetype,
    }

    try {
      await s3.send(new PutObjectCommand(params))
      return `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`
    } catch (err) {
      console.error(`error on file upload 🚨`, { err })
    }
  }

  private static async ensureBucketExists() {
    try {
      await s3.send(new HeadBucketCommand({ Bucket: BUCKET }))
      return true
    } catch (err) {
      if (err.name === 'NotFound' || err.$metadata?.httpStatusCode === 404) {
        await this.createBucket()
      }

      throw new Error()
    }
  }

  private static async createBucket() {
    try {
      await s3.send(new CreateBucketCommand({ Bucket: BUCKET }))
      console.log(`bucket [${BUCKET}] was created ✅`)
    } catch (err) {
      console.error(`error when trying to setup bucket: ${BUCKET}`)
    }
  }
}
