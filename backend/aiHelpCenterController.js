const fetch = require('node-fetch');
const stringSimilarity = require('string-similarity');

exports.aihelpcenterask = async (reqData, res, db) => {
  const question = reqData.question;

  if (!question) {
    return res.json({ success: false, message: "Question is required" });
  }

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-small", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer You-api-key"   //paste  here your api  key  
      },
      body: JSON.stringify({ inputs: question })
    });

    const text = await response.text();
    if (text.includes("<!DOCTYPE html>")) {
      return res.json({ success: false, reply: "⚠️ Unable to process the request at this time." });
    }
    const data = JSON.parse(text);
    const reply = data?.[0]?.generated_text?.trim() || "🤖 Sorry, I couldn't think of a response.";

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("AI error:", error);
    res.json({
      success: false,
      reply: "⚠️ AI is unavailable at the moment.",
    });
  }
};







