# Fin-Track 📊

Fin-Track is a modern, high-performance financial tracking application designed to help users manage their personal finances with ease. Built with a focus on **Rich Aesthetics** and **Premium User Experience**, it features a sleek "glassmorphic" interface, smooth animations, and comprehensive financial insights.

---

## ✨ Key Features

### 🏢 Dashboard Overview
- **Real-time Metrics**: Instantly view Total Balance, Monthly Income, and Monthly Expenses through elegant summary cards.
- **Interactive Charts**:
    - **Balance Trend**: Visualize your financial growth over time.
    - **Spending Breakdown**: Deep-dive into your expenses by category with interactive pie charts.

### 📝 Transaction Management
- **Full CRUD Support**: Add, view, edit, and delete transactions with ease.
- **Advanced List View**:
    - **Pagination**: Efficiently navigate large transaction sets with smooth page transitions.
    - **Smart Filtering**: Filter by type (Income/Expense), Category, or search by description.
    - **Sorting**: Organize your data by date or amount in ascending or descending order.
- **Safety First**: Implemented confirmation dialogs for destructive actions like deletions.
- **Instant Feedback**: Real-time toast notifications for all major actions (Add, Edit, Delete).

### 🛡️ Smart Access Control
- **Role Management**: Dynamic role switching (Admin/User) to control feature accessibility.
- **Admin Privileges**: Admins have exclusive rights to modify and delete transactions.

### 🎨 Design & Experience
- **Glassmorphism UI**: A stunning, modern design using backdrop-blur effects and curated color palettes.
- **Dark Mode Support**: Seamlessly switch between light and dark themes.
- **Micro-animations**: Smooth transitions and hover effects powered by Framer Motion.

---

## 🛠️ Tech Stack

- **Framework**: [Vite](https://vitejs.dev/) + [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.2](https://tailwindcss.com/)
- **UI Library**: [Radix UI](https://www.radix-ui.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.steveney.com/)
- **Date Handling**: [date-fns](https://date-fns.org/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Fin-Track
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
src/
├── components/       # Reusable UI components
│   ├── dashboard/    # Dashboard-specific cards & charts
│   ├── transactions/ # Transaction list, filters, and forms
│   └── ui/           # Base Shadcn/Radix UI elements
├── context/          # App-wide state (AppContext, ThemeProvider)
├── data/             # Mock data and constants
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Top-level page components
└── assets/           # Static assets
```

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by Shyam-Shaji
