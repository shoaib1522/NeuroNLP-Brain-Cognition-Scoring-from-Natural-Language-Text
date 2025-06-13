# 🧠 NeuroNLP: Cognitive & Emotional Text Analysis

**NeuroNLP** is a full-stack web application designed to analyze natural language text and provide a comprehensive "Brain Cognition Score." By leveraging advanced pre-trained transformer models, the system evaluates user-submitted text for various cognitive and emotional metrics, presenting the results through an intuitive, interactive chat interface.

This project demonstrates a modern approach to applied NLP, integrating a powerful Python backend microservice with a responsive React frontend.

<p align="center">
  <img src="Interface%20Design.png" alt="NeuroNLP Interface" width="800"/>
</p>

<p align="center">
  <strong>Analyze clarity, coherence, and emotional tone from natural language.</strong>
</p>

<p align="center">
  <a href="#-project-overview">📖 Overview</a> •
  <a href="#-core-metrics-analyzed">📊 Metrics</a> •
  <a href="#-technical-architecture">🛠️ Architecture</a> •
  <a href="#-local-development-setup">🚀 Setup Guide</a> •
  <a href="#-how-it-works">⚙️ How It Works</a> •
  <a href="#-license">📜 License</a>
</p>

---

## 📖 Project Overview

**NeuroNLP** is a sophisticated full-stack application designed to deconstruct and score human language. It goes beyond simple sentiment analysis by providing a multi-faceted evaluation of text, reflecting cognitive attributes like clarity of thought, semantic richness, and grammatical structure.

The system was conceived to provide users with a tool for self-reflection on their written communication, offering actionable, data-driven feedback through an engaging and interactive chat interface. By submitting a piece of text—be it an email, an essay, or a simple thought—the user receives a detailed breakdown and an overall **"Brain Score,"** visualized through dynamic charts.

This project stands as a testament to modern software engineering principles, featuring a decoupled microservice architecture where a powerful Python backend performs the heavy NLP lifting, while a sleek Next.js frontend delivers a seamless user experience.

---

## 📊 Core Metrics Analyzed

The final "Brain Score" is a weighted average of four distinct, independently calculated metrics. Each metric targets a specific aspect of cognitive expression.

#### 1. 🔗 Coherence Score
-   **What it measures:** The logical flow and topical consistency of the text. A high score indicates that sentences follow each other in a reasoned and connected manner.
-   **How it's calculated:** The text is split into sentences. Using the `all-MiniLM-L6-v2` model, each sentence is converted into a vector embedding. The system then calculates the cosine similarity between consecutive sentence vectors. The final score is the average of these similarities, scaled to a 0-100 range.

#### 2. ✅ Grammar Score
-   **What it measures:** The grammatical and stylistic correctness of the text.
-   **How it's calculated:** The system leverages `language-tool-python`, which wraps the powerful LanguageTool engine. It identifies errors and calculates an "errors per 100 words" rate, which is then inverted and scaled to a score where 100 is perfect.

#### 3. 📚 Vocabulary Richness Score
-   **What it measures:** The diversity and lexical richness of the vocabulary. A higher score suggests a broader vocabulary and less repetition.
-   **How it's calculated:** This score is derived from the **Type-Token Ratio (TTR)**. Using spaCy for accurate tokenization, we count unique words (types) versus total words (tokens). The ratio is then scaled to a 0-100 score.

#### 4. 😄 Emotional Tone Analysis
-   **What it measures:** The underlying emotional sentiment of the text across a wide spectrum of feelings.
-   **How it's calculated:** This uses the `SamLowe/roberta-base-go_emotions` transformer model from Hugging Face, fine-tuned to recognize 27 distinct emotions (e.g., *admiration, joy, curiosity, disappointment*). The system returns the probability score for each emotion, which are visualized in a bar chart.

---

## 🛠️ Technical Architecture

NeuroNLP is built on a robust, decoupled microservice architecture. This separation of concerns ensures that the application is scalable, maintainable, and efficient.



#### **Frontend (`/frontend`)** 🖥️
-   **Framework:** **Next.js 14** (with React 18)
-   **Language:** **TypeScript**
-   **Styling:** **Tailwind CSS**
-   **API Communication:** **Axios**
-   **Data Visualization:** **Recharts**

#### **Backend (`/backend_ml`)** 🐍
-   **Framework:** **FastAPI**
-   **Web Server:** **Uvicorn**
-   **Machine Learning & NLP Libraries:**
    -   🤗 Hugging Face `transformers` & `sentence-transformers`
    -   ✨ `spaCy`
    -   ✍️ `language-tool-python`
    -   🔥 `PyTorch`

---

## 🚀 Local Development Setup

This guide provides detailed instructions to get the entire full-stack application running on your local machine.

### **Step 0: Prerequisites**

Before you begin, ensure you have the following installed. The versions listed are recommended for compatibility.

1.  **Python (v3.9+)**
    -   Verify: `python --version`

2.  **Node.js (v20+ LTS, 64-bit)**
    -   **CRITICAL:** Must be the **64-bit** version.
    -   Verify architecture: `node -p "process.arch"` (must output `x64`).
    -   Verify version: `node -v`

3.  **Java Runtime Environment (JRE)**
    -   Required by the grammar-checking library. We recommend [Eclipse Temurin](https://adoptium.net/).
    -   Verify: `java -version`

### **Step 1: Set Up the Backend Server (The Kitchen 🍳)**

The backend is the brain of the operation. Let's get it running first.

1.  **Open your first terminal window** (e.g., PowerShell, Command Prompt, or Git Bash).

2.  **Navigate to the backend directory:**
    ```bash
    cd backend_ml
    ```

3.  **Install all required Python packages:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Download the necessary spaCy model:**
    ```bash
    python -m spacy download en_core_web_sm
    ```

5.  **Start the FastAPI server:**
    ```bash
    uvicorn src.main:app --reload
    ```
    -   The server will start on `http://127.0.0.1:8000`.
    -   *Note: The first time you run this, it will download large ML models. This may take a few minutes.*
    -   **Leave this terminal window running.**

### **Step 2: Set Up the Frontend Application (The Dining Room 🍽️)**

With the backend running, let's start the user interface.

1.  **Open a new, separate terminal window.**

2.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

3.  **Install all Node.js dependencies:**
    ```bash
    npm install
    ```

4.  **Start the Next.js development server:**
    ```bash
    npm run dev
    ```
    -   The application will become available at **`http://localhost:3000`**.

### **Step 3: Use the Application ✨**

With both servers running, your application is ready!

1.  Open your web browser (Chrome, Firefox, Edge).
2.  Navigate to **`http://localhost:3000`**.
3.  You will be greeted by the NeuroNLP chat interface. Type or paste your text, press Enter, and receive your detailed analysis!

---

## ⚙️ How It Works: The Request Lifecycle

1.  **⌨️ User Input:** The user types text into the React frontend and clicks "Send."
2.  **📡 API Call:** The frontend, using `axios`, sends an HTTP POST request to the Python backend at `http://127.0.0.1:8000/analyze`.
3.  **🧠 Backend Processing:** The FastAPI server receives the request. The `orchestrator` module calls each of the four analysis functions.
4.  **⚖️ Score Aggregation:** The `orchestrator` collects all results and calculates the final weighted "Brain Score."
5.  **📤 JSON Response:** The backend sends a single, structured JSON object back to the frontend.
6.  **📈 Data Visualization:** React receives the JSON data, updates its state, and passes the props to the `Recharts` components, rendering the interactive charts for the user.

---

## 📜 License

This project is open-source and available under the **MIT License**. See the [LICENSE](LICENSE) file for more details.
