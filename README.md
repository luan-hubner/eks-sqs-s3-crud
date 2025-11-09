AWS SQS, S3, ECR, EKS, ELB, Lambda.

This application was made as a study object to implement some AWS services. In infraestructure I used ECR to registry my docker image, EKS to orchestrate the containers with Kubernetes and ELB as load balancer. Every piece of infra was made with IaC (.yml files) using eksctl and kubectl tools.

The needed CloudFormation was managed by serverless framework (IaC).

About the application: I've created an simple crud app with image upload. I'm using AWS S3 to store the images. The upload is synchronous and after product creation I'm calling AWS SQS triggering a Lambda that update product row in database with image s3 url (a little bit of over engineering just for fun 😂).
