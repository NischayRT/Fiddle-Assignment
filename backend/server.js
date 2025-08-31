import express from "express";
import cors from "cors";
import axios from "axios";
import NodeCache from "node-cache";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

// Middleware
app.use(cors());
app.use(express.json());

// Mistral API configuration - Using your specific API key
const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";
const MISTRAL_API_KEY =
  process.env.MISTRAL_API_KEY || "7CNJcfNxEGPq5dl85bWpjRu8oZumBUwO";

// Tone mapping
const toneMapping = {
  "formal-casual": { from: "formal", to: "casual" },
  "formal-friendly": { from: "formal", to: "friendly" },
  "formal-professional": { from: "formal", to: "professional" },
  "casual-formal": { from: "casual", to: "formal" },
  "casual-friendly": { from: "casual", to: "friendly" },
  "casual-professional": { from: "casual", to: "professional" },
  "friendly-formal": { from: "friendly", to: "formal" },
  "friendly-casual": { from: "friendly", to: "casual" },
  "friendly-professional": { from: "friendly", to: "professional" },
};

// API endpoint to change tone
app.post("/api/change-tone", async (req, res) => {
  try {
    const { text, tone } = req.body;

    if (!text || !tone) {
      return res.status(400).json({ error: "Text and tone are required" });
    }

    // Check cache first
    const cacheKey = `${text}-${tone}`;
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
      return res.json(cachedResponse);
    }

    // Get tone mapping
    const toneDirection = toneMapping[tone];
    if (!toneDirection) {
      return res.status(400).json({ error: "Invalid tone selection" });
    }

    // Prepare prompt for Mistral
    const prompt = `Please convert the following text from a ${toneDirection.from} tone to a ${toneDirection.to} tone. Only respond with the converted text, no additional commentary:\n\n"${text}"`;

    console.log(
      "Making request to Mistral API with key:",
      MISTRAL_API_KEY.substring(0, 10) + "..."
    );

    // Make request to Mistral API
    const response = await axios.post(
      MISTRAL_API_URL,
      {
        model: "mistral-small",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2000,
      },
      {
        headers: {
          Authorization: `Bearer ${MISTRAL_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000, // 30 second timeout
      }
    );

    const convertedText = response.data.choices[0].message.content.trim();

    // Cache the response
    cache.set(cacheKey, { convertedText });

    res.json({ convertedText });
  } catch (error) {
    console.error(
      "Error calling Mistral API:",
      error.response?.data || error.message
    );

    if (error.response?.status === 401) {
      return res
        .status(401)
        .json({
          error:
            "Invalid API key. Please check your Mistral AI API key configuration.",
        });
    } else if (error.response?.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded. Please try again later." });
    } else if (error.code === "ECONNABORTED") {
      return res
        .status(408)
        .json({ error: "Request timeout. Please try again." });
    } else if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      return res
        .status(503)
        .json({
          error: "Service temporarily unavailable. Please try again later.",
        });
    }

    res.status(500).json({ error: "Failed to process tone change" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    apiKeyConfigured: !!MISTRAL_API_KEY,
    apiKeyPrefix: MISTRAL_API_KEY
      ? MISTRAL_API_KEY.substring(0, 8) + "..."
      : "Not configured",
  });
});

// Test endpoint to verify API key without making a full request
app.get("/api/test-key", async (req, res) => {
  try {
    const response = await axios.get("https://api.mistral.ai/v1/models", {
      headers: {
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
      },
      timeout: 10000,
    });

    res.json({
      status: "API key is valid",
      models: response.data.data.map((model) => model.id),
    });
  } catch (error) {
    console.error(
      "Error testing API key:",
      error.response?.data || error.message
    );

    if (error.response?.status === 401) {
      res
        .status(401)
        .json({
          error: "Invalid API key. The provided key is not authorized.",
        });
    } else {
      res.status(500).json({ error: "Failed to test API key" });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(
    `Mistral API key: ${
      MISTRAL_API_KEY
        ? "Configured (" + MISTRAL_API_KEY.substring(0, 8) + "...)"
        : "Not configured"
    }`
  );

  // Test the API key on startup
  if (
    MISTRAL_API_KEY &&
    MISTRAL_API_KEY !== "7CNJcfNxEGPq5dl85bWpjRu8oZumBUwO"
  ) {
    console.log("Testing API key...");
    axios
      .get("https://api.mistral.ai/v1/models", {
        headers: {
          Authorization: `Bearer ${MISTRAL_API_KEY}`,
        },
        timeout: 10000,
      })
      .then((response) => {
        console.log(
          "API key is valid. Available models:",
          response.data.data.map((model) => model.id).join(", ")
        );
      })
      .catch((error) => {
        console.error(
          "API key test failed:",
          error.response?.data?.detail || error.message
        );
      });
  }
});
