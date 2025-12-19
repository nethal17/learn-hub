import dotenv from 'dotenv';
import OpenAI from 'openai';
import Course from '../models/Course.js';

dotenv.config();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// In-memory API usage tracker
let apiRequestCount = 0;
const MAX_API_REQUESTS = 250;

// Get current API usage count
export const getUsage = async (req, res) => {
  res.json({
    currentUsage: apiRequestCount,
    maxLimit: MAX_API_REQUESTS,
    remaining: MAX_API_REQUESTS - apiRequestCount
  });
};

// Get AI-powered course recommendations
export const recommend = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ message: 'Please provide a prompt' });
    }

    // Check API usage limit
    if (apiRequestCount >= MAX_API_REQUESTS) {
      return res.status(429).json({ 
        message: 'API request limit reached. Please try again later.',
        usage: apiRequestCount,
        limit: MAX_API_REQUESTS
      });
    }

    // Fetch all available courses from database
    const allCourses = await Course.find().populate('instructor', 'fullName username');

    // Create a formatted list of courses for GPT
    const courseList = allCourses.map((course, index) => 
      `${index + 1}. ${course.title} - ${course.description} (Level: ${course.level}, Category: ${course.category || 'General'})`
    ).join('\n');

    // Construct the prompt for GPT
    const systemPrompt = `You are an educational advisor for an online learning platform. Your job is to recommend only courses that are present in the list below. Do not invent or suggest any courses that are not in the list. Always use the exact course titles from the list. Rank the courses by suitability, with the most suitable course first.

  Available Courses:
  ${courseList}

  Instructions:
  - Carefully analyze the user's query and match it to the most relevant courses from the list above.
  - Recommend exactly 3 courses, and ONLY from the list above. Do NOT recommend any course that is not in the list.
  - For each recommendation, use the exact course title and explain WHY it is relevant to the user's goal.
  - Order your recommendations by suitability, with the most suitable course first.
  - Be encouraging and provide a brief learning path if appropriate.
  - Format your response in a clear, structured way`;

    // Make API call to OpenAI
    apiRequestCount++;
    console.log(`API Request Count: ${apiRequestCount}/${MAX_API_REQUESTS}`);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      max_completion_tokens: 800,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;

    // Extract course titles from AI response and match with actual courses
    const recommendedCourses = allCourses.filter(course => 
      aiResponse.toLowerCase().includes(course.title.toLowerCase())
    );

    res.json({
      success: true,
      prompt: prompt,
      aiResponse: aiResponse,
      recommendedCourses: recommendedCourses.map(course => ({
        _id: course._id,
        title: course.title,
        description: course.description,
        level: course.level,
        category: course.category,
        duration: course.duration,
        instructor: course.instructor
      })),
      apiUsage: {
        current: apiRequestCount,
        limit: MAX_API_REQUESTS,
        remaining: MAX_API_REQUESTS - apiRequestCount
      }
    });

  } catch (error) {
    console.error('AI Recommendation Error:', error);
    
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ 
        message: 'OpenAI API quota exceeded. Please try again later.' 
      });
    }

    res.status(500).json({ 
      message: 'Failed to generate recommendations',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};