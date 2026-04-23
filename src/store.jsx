import { createContext, useContext, useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "homeloop_state_v1";

const seed = {
  parent: { name: "Alex Parent", address: "" },
  children: [
    { id: "c1", name: "Mia", age: 8, grade: "3rd" },
    { id: "c2", name: "Noah", age: 11, grade: "6th" },
  ],
  tasks: [
    { id: "t1", title: "Math: Fractions worksheet", completed: false, childId: "c1", subject: "Math", minutes: 30, date: today() },
    { id: "t2", title: "Reading: 20 minutes", completed: true, childId: "c1", subject: "English", minutes: 20, date: today() },
    { id: "t3", title: "Science: Plant lifecycle video", completed: false, childId: "c2", subject: "Science", minutes: 25, date: today() },
    { id: "t4", title: "History: Civil War chapter", completed: false, childId: "c2", subject: "History", minutes: 40, date: today() },
  ],
  transcripts: {
    c1: [
      { subject: "Math", hours: 60, grade: "A" },
      { subject: "English", hours: 55, grade: "A-" },
      { subject: "Science", hours: 40, grade: "B+" },
    ],
    c2: [
      { subject: "Math", hours: 80, grade: "B+" },
      { subject: "English", hours: 70, grade: "A" },
      { subject: "Science", hours: 60, grade: "A-" },
      { subject: "History", hours: 50, grade: "B" },
    ],
  },
  streaks: { c1: 4, c2: 2 },
  lastActive: {},
  history: {}, // date -> { completed, total }
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

const Ctx = createContext(null);

export function StoreProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...seed, ...JSON.parse(raw) };
    } catch (e) {}
    return seed;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addTask = useCallback((task) => {
    setState((s) => ({
      ...s,
      tasks: [
        ...s.tasks,
        { id: "t" + Date.now(), completed: false, date: today(), minutes: 30, subject: "General", ...task },
      ],
    }));
  }, []);

  const toggleTask = useCallback((id) => {
    setState((s) => {
      const tasks = s.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
      const task = s.tasks.find((t) => t.id === id);
      const streaks = { ...s.streaks };
      if (task && !task.completed) {
        const last = s.lastActive[task.childId];
        const t = today();
        if (last !== t) {
          streaks[task.childId] = (streaks[task.childId] || 0) + 1;
        }
      }
      const lastActive = task && !task.completed ? { ...s.lastActive, [task.childId]: today() } : s.lastActive;
      return { ...s, tasks, streaks, lastActive };
    });
  }, []);

  const removeTask = useCallback((id) => {
    setState((s) => ({ ...s, tasks: s.tasks.filter((t) => t.id !== id) }));
  }, []);

  const addChild = useCallback((child) => {
    setState((s) => ({
      ...s,
      children: [...s.children, { id: "c" + Date.now(), ...child }],
    }));
  }, []);

  const updateParent = useCallback((patch) => {
    setState((s) => ({ ...s, parent: { ...s.parent, ...patch } }));
  }, []);

  return (
    <Ctx.Provider value={{ state, addTask, toggleTask, removeTask, addChild, updateParent }}>
      {children}
    </Ctx.Provider>
  );
}

export const useStore = () => useContext(Ctx);
