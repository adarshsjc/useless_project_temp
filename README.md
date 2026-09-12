<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />

# Hand Notify (Remote Mouse Control) 🎯

**Website (Vercel):** [https://useless-project-temp-seven-beryl.vercel.app/](https://useless-project-temp-seven-beryl.vercel.app/)

## Basic Details
### Team Name: Adarsh's Team

### Team Members
- Team lead: Adarsh v

### Project Description
Hand Notify uses computer vision to turn your hand movements into live mouse control on your friend's computer. Why use a physical mouse when you can frantically wave at your webcam?

### The Problem (that doesn't exist)
Standard mice are too convenient, accurate, and easy to use. Also, sometimes you want to control your friend's cursor to confuse them.

### The Solution (that nobody asked for)
An intentionally ridiculous, over-engineered, computer-vision-based remote mouse controller. Instead of clicking, you simply move your hand at your webcam. The system detects your hand, recognizes the gesture using custom machine learning, and blasts the movement coordinates onto your friend's screen over your local network.

## Technical Details
### Technologies/Components Used
For Software:
- **Languages used:** Python, TypeScript
- **Frameworks used:** React, TailwindCSS, Vite
- **Libraries used:** OpenCV, MediaPipe, Scikit-Learn
- **Tools used:** UDP networking for zero-latency local transmission

### Implementation
**Sender & Receiver Application:**
The core mouse control is built as a standalone `.exe` using Python. 
1. **On the receiver:** Run the executable and click **Start Receiver**.
2. **On the sender:** Run the executable, point your webcam at yourself, and click **Start Sender**.
3. Move your hand to move their mouse, pinch to left-click, and open your hand to right-click.

**Web Dashboard:**
A beautiful, highly-responsive landing page built with React and Tailwind to showcase the project, built for maximum uselessness.

---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)
