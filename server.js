const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("MEDA AI Backend Running");
});

app.post("/analyze", async (req, res) => {
  try {
    const { imageBase64, fileType } = req.body;

    const response = await client.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Analyze this material image and return ONLY valid JSON:
{
  "materials":[
    {
      "name":"Material Name",
      "percentage":50,
      "color":"#00e5ff",
      "properties":"description"
    }
  ],
  "confidence":85,
  "object_description":"object",
  "analysis_notes":"notes",
  "surface_type":"surface",
  "estimated_use":"usage"
}`
            },
            {
              type: "input_image",
              image_url: `data:${fileType};base64,${imageBase64}`
            }
          ]
        }
      ]
    });

    res.json({
      result: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`MEDA running on port ${PORT}`);
});
