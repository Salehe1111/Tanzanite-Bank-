// Full Online Bank App: Auth + Admin + Loans + Charts + Notifications import React, { useState } from "react"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { Input } from "@/components/ui/input"; import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"; import { useNavigate } from "react-router-dom";

const initialUsers = [ { email: "admin@safebank.com", password: "admin", name: "Admin", account: "SAF00000001", role: "admin", balance: 0, transactions: [], loans: [], }, ];

export default function SafebankApp() { const [auth, setAuth] = useState({ name: "", email: "", password: "" }); const [user, setUser] = useState(null); const [usersData, setUsersData] = useState(initialUsers); const [amount, setAmount] = useState(0); const [recipient, setRecipient] = useState(""); const [loanAmount, setLoanAmount] = useState(0); const [notification, setNotification] = useState(""); const [search, setSearch] = useState("");

const handleLoginOrRegister = () => { const found = usersData.find( (u) => u.email === auth.email && u.password === auth.password ); if (found) { setUser(found); setNotification(Welcome back, ${found.name}!); } else { if (!auth.name || !auth.email || !auth.password) return alert("Please fill all fields to register."); const newUser = { email: auth.email, password: auth.password, name: auth.name, account: SAF${Math.floor(10000000 + Math.random() * 90000000)}, role: "user", balance: 0, transactions: [], loans: [], }; const updatedUsers = [...usersData, newUser]; setUsersData(updatedUsers); setUser(newUser); setNotification(Account created successfully for ${newUser.name}); } setTimeout(() => setNotification(""), 3000); };

const handleTransfer = () => { if (!recipient || amount <= 0 || amount > user.balance) { alert("Invalid recipient or amount"); return; } const recipientUser = usersData.find(u => u.account === recipient); if (!recipientUser) return alert("Recipient account not found");

const newUsers = usersData.map((u) => {
  if (u.email === user.email) {
    return {
      ...u,
      balance: u.balance - amount,
      transactions: [
        ...u.transactions,
        { to: recipient, amount, date: new Date().toLocaleString(), type: "debit" },
      ],
    };
  } else if (u.account === recipient) {
    return {
      ...u,
      balance: u.balance + amount,
      transactions: [
        ...u.transactions,
        { from: user.account, amount, date: new Date().toLocaleString(), type: "credit" },
      ],
    };
  }
  return u;
});

setUsersData(newUsers);
setUser(newUsers.find((u) => u.email === user.email));
setAmount(0);
setRecipient("");
setNotification("Transfer successful!");
setTimeout(() => setNotification(""), 3000);

};

const handleLoanRequest = () => { if (loanAmount <= 0) return alert("Enter a valid loan amount"); const newUsers = usersData.map((u) => { if (u.email === user.email) { return { ...u, balance: u.balance + loanAmount, loans: [ ...u.loans, { amount: loanAmount, date: new Date().toLocaleString() }, ], }; } return u; });

setUsersData(newUsers);
setUser(newUsers.find((u) => u.email === user.email));
setLoanAmount(0);
setNotification("Loan approved and

