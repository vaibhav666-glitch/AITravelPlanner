# ✈️ Itinera – AI Travel Planner

## 🚀 Overview

**Itinera** is an AI-powered travel planning application that generates **personalized itineraries** based on user preferences, budget, and real-time weather conditions.

It intelligently adapts travel plans using **weather forecasts (via WeatherAPI.com)** and allows users to **edit, customize, and regenerate** their itinerary dynamically.

---

## ✨ Features

* 🌦️ **Weather-Aware Planning**

  * Integrates **WeatherAPI.com**
  * Supports up to **15 days forecast** (high accuracy for first 10 days)
  * Plans activities based on weather conditions

* 🧠 **AI-Powered Itinerary Generation**

  * Generates structured travel plans using Groq + LangChain
  * Includes:

    * Daily activities
    * Budget breakdown
    * Hotel suggestions

* ✏️ **Editable Itinerary**

  * Add / remove activities
  * Modify plans in real-time

* 🔄 **Regenerate Specific Day**

  * Regenerate any day with custom instructions
  * Avoids repetition across days
  * Adapts to weather + preferences

* 🔐 **Authentication & Security**

  * JWT-based authentication & authorization
  * Password hashing using bcrypt

* ⚡ **Robust Error Handling**

  * Try-catch used across services
  * Proper validation on frontend & backend

---

## 🛠 Tech Stack

### Frontend

* Next.js (App Router)
* Tailwind CSS
* Modular architecture (UI, services, domain separation)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### AI & APIs

* Groq (LLM)
* LangChain
* WeatherAPI.com

---

## 🧠 Architecture Highlights

* The frontend is structured using **modular architecture with separation of UI, services, and domain types**, ensuring scalability and maintainability.

* The AI service is designed to return **strictly structured JSON**, making it easy to:

  * store in database
  * modify dynamically
  * render efficiently in UI

* This approach avoids unreliable text parsing and improves system stability.

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/vaibhav666-glitch/AITravelPlanner.git
cd itinera
```

---

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
GROQ_API_KEY=your_groq_key
WEATHER_API_KEY=your_weatherapi_key
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

---

## 📊 How It Works

1. User enters:

   * destination
   * number of days
   * interests
   * budget

2. Backend:

   * fetches weather data from **WeatherAPI.com**
   * sends structured prompt to AI

3. AI:

   * generates itinerary based on:

     * weather
     * preferences
     * constraints

4. User:

   * edits itinerary
   * regenerates specific days
   * customizes experience

---

## 💡 Key Capabilities

* Weather-driven decision making
* Dynamic itinerary editing
* Context-aware AI regeneration
* Structured and scalable system design

---

## 🚀 Future Improvements

* 🗺️ Map-based route visualization
* 💬 Chat-based AI travel assistant
* 🏨 Booking integrations
* 📱 Mobile app support

---

## 👨‍💻 Author

**Vaibhav Kumar**
Full Stack Developer (MERN + AI Integration)

---

## 💥 Conclusion

Itinera transforms travel planning from a static process into an **interactive, intelligent, and adaptive experience**, combining real-world data with AI-driven decision making.
