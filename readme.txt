MEDA AI Backend

Setup:

1. Upload files to GitHub
2. Create a Render Web Service
3. Connect GitHub repository
4. Build Command:
   npm install

5. Start Command:
   node server.js

6. Add Environment Variable:
   OPENAI_API_KEY = your_openai_api_key

API Endpoint:

POST /analyze

Request:

{
  "imageBase64":"base64-image",
  "fileType":"image/jpeg"
}

Response:

{
  "result":"AI analysis"
}
