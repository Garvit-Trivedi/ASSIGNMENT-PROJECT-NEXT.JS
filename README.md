# 🌟 Assignment Project – Next.js  

A modern **Next.js project** showcasing React, Javascript, and Playwright testing with a clean architecture.  
This project is designed as part of an assignment to demonstrate **, API routes, UI components, and testing workflows**.  

---

## ✨ Features  

- ⚡ **Next.js 14** – App Router & Server Components  
- 🎨 **Tailwind CSS** – Modern UI styling  
- 🧪 **Playwright** – End-to-end testing with reports  
- 🔗 **API Routes** – Example backend integration  
- 📦 **Reusable Components** – Modular & maintainable  
- 🚀 **Deployment Ready** – Works on Vercel or any Node.js server  

---

## 📂 Project Structure  

```bash
my-next-app/
│── app/               # Next.js App Router (pages, layouts, etc.)
│── components/        # Reusable React components
│── public/            # Static assets
│── tests/             # Playwright test cases
│── playwright-report/ # Test reports (generated after running tests)
│── playwright.config.ts # Playwright configuration
│── package.json       # Project dependencies & scripts
│── tailwind.config.js # Tailwind CSS configuration
└── README.md          # Project documentation

```
## 🚀 Getting Started  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/your-username/assignment-project-next.git
cd assignment-project-next/my-next-app
```

### 2️⃣ Install dependencies
```
npm install
```

### 3️⃣ Run the development server
```
npm run dev
```


# 🧪 Running Tests

## We use Playwright for end-to-end testing.

### Run tests
```
npx playwright test
```

### Generate & view HTML test report
```
npx playwright test --reporter=html
npx playwright show-report
```