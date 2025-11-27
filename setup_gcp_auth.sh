#!/bin/bash

# Set the project ID
PROJECT_ID="ethereal-technologies"
SA_NAME="terraform-deployer"
SA_EMAIL="$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com"
KEY_FILE="ethereal-technologies-key.json"

echo "1. Setting GCP Project to $PROJECT_ID..."
gcloud config set project $PROJECT_ID

echo "2. Creating Service Account $SA_NAME..."
# Create SA if it doesn't exist
gcloud iam service-accounts create $SA_NAME --display-name "Terraform Deployer" || echo "Service account likely already exists"

echo "3. Granting permissions..."
# Grant Owner role (simplest for setup, restrict later if needed)
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SA_EMAIL" \
    --role="roles/owner"

echo "4. Generating JSON Key..."
# Create the key file
gcloud iam service-accounts keys create $KEY_FILE \
    --iam-account=$SA_EMAIL

echo "--------------------------------------------------------"
echo "SUCCESS! A new key has been generated at: $KEY_FILE"
echo "--------------------------------------------------------"
echo "Copy the content below and paste it into your GitHub Secret 'GOOGLE_SERVICES_JSON':"
echo ""
cat $KEY_FILE
echo ""
echo "--------------------------------------------------------"
