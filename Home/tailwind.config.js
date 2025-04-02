/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,ts}",],
  darkMode: 'class', // يمكنك استخدام "media" بدلاً من "class" إذا كنتِ تريدين أن يتغير الوضع تلقائيًا بناءً على إعدادات النظام.

  theme: {
    extend: {
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],  
        Sora:["Sora","sans-serif"],
        Nunito: ["Nunito","sans-serif"]
      },      
      colors: {
        primary: "#499DCA", // لون أساسي
        secondary: "#022333", // لون ثانوي
        thr: "#B3B3B3",
        
      },
    },
  },
  plugins: [require("daisyui")],
};
