# 🛒 বাজার দর (BazarDor)

দৈনন্দিন নিত্যপ্রয়োজনীয় পণ্যের (চাল, ডাল, তেল, সবজি, মাছ, মাংস ইত্যাদি) বাজার দর এক নজরে দেখার জন্য একটি আধুনিক ও রেসপনসিভ ওয়েব অ্যাপ্লিকেশন।

## 🚀 লাইভ ডেমো
- **লাইভ ওয়েবসাইট:** [https://bazardor-project.vercel.app](https://bazardor-project.vercel.app)

---

## 🛠️ ব্যবহৃত প্রযুক্তি (Technologies Used)
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + DaisyUI
- **Authentication:** BetterAuth (Email/Password, Google & GitHub OAuth)
- **Notifications:** React Hot Toast
- **Deployment:** Vercel

---

## ✨ প্রজেক্টের ৫টি প্রধান বৈশিষ্ট্য (Key Features)

1. **রিয়েল-টাইম প্রাইস ট্র্যাকার ওTicker:** ওয়েবসাইটের টপে ইনফিনিট স্ক্রোলিং প্রাইস মার্কি যা প্রতিদিনের দরবৃদ্ধি ও দরপতন নির্দেশ করে।.
2. **বাংলা সংখ্যা ও তারিখ সাপোর্ট:** সম্পূর্ণ অ্যাপ্লিকেশনটিতে বাংলা সংখ্যা ফরম্যাটিং ও স্থানীয় তারিখ রেন্ডারিং ব্যবহৃত হয়েছে।
3. **স্মার্ট সর্টিং ফিল্টার (Bengali Numerals Aware):** চাল, ডাল বা সবজির দামে বাংলা ডিজিট যুক্ত মান দিয়ে কম থেকে বেশি বা বেশি থেকে কম অর্ডারে সর্ট করার সুবিধা।
4. **সুরক্ষিত প্রোডাক্ট বিস্তারিত পেজ (Protected Route):** লগইন করার মাধ্যমে প্রতিটি পণ্যের জন্য বিস্তারিত বাজারভিত্তিক সর্বনিম্ন, সর্বাধিক ও গড় দামের তুলনামূলক টেবিল দেখার সুবিধা।
5. **প্রোফাইল তথ্য আপডেট (BetterAuth Integration):** ব্যবহারকারীরা তাদের নাম ও প্রোফাইল ইনফরমেশন খুব সহজেই আপডেট করতে পারবেন।.

---

## 📦 লোকাল সেটআপ (Local Installation)

১. রেপোজিটরি ক্লোন করুন:
git clone https://github.com/abirroybappy/bazar-dor
cd bazardor


২. প্যাকেজ ইনস্টল করুন:
npm install


৩. পরিবেশ সংকেত (Environment Variables) কনফিগার করুন (`.env.local`):
NEXT_PUBLIC_APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret



৪. প্রজেক্ট রান করুন:
npm run dev
