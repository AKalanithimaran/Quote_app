# Book Quote Shorts

A small web app that displays short quotes or snippets from books in a "shorts" or "reels" style format.

---

## Demo

Check out the live demo here: [Live URL](https://quote-app-blond.vercel.app/)

---

## Features

- Display short quotes or snippets from books like "shorts" or "reels"
- Navigate through quotes by clicking/tapping or auto-play
- Shows quote text, author name, and book title
- Smooth transitions (slide/fade) between quotes
- Responsive layout for seamless experience across devices
- Bonus: Like button and basic share mock-up

---

## Tech Stack

- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **JavaScript** - Core programming language
- Responsive design for all screen sizes

---

## Installation & Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/AKalanithimaran/Quote_app

2. Navigate into the project directory:
   cd your-repo

3.Install dependencies:

npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

*Configure Tailwind to remove unused styles in production
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust based on your stack
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

*Add Tailwind directives to your CSS
@tailwind base;
@tailwind components;
@tailwind utilities;

4.Run the app locally:
npm run dev

5.Deployment

This app is deployed on Vercel
 and automatically updates with every push to the main branch.

*Folder Structure
your-repo/
├── public/             # Static assets
├── src/                # Source code (components, styles)
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # React components (if any)
│   ├── styles/         # Tailwind CSS configurations and styles
├── index.html          # Entry HTML file
├── vite.config.js      # Vite configuration
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation

*Author
Kalanithimaran A

License

This project is licensed under the MIT License - see the LICENSE
 file for details.

 MIT License

Copyright (c) 2025 Kalanithimaran A

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in  
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING  
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS  
IN THE SOFTWARE.

Contact
Feel free to reach out for any questions or feedback!

Email: akalanithimaran@gmail.com
LinkedIn: https://www.linkedin.com/in/kalanithi-maran-16227629b
---
