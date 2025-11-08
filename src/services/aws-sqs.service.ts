import { SendMessageCommand } from '@aws-sdk/client-sqs'
import { sqs } from '@src/services/clients/aws-sqs.client'

export class SQSService {
  private static queueUrl = process.env.AWS_SQS_QUEUE_URL!

  static publish(message: Record<string, any>) {
    const params = {
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(message),
    }

    try {
      sqs.send(new SendMessageCommand(params))
    } catch (err) {
      console.error(`error on message publishing 🚨`)
    }
  }
}
