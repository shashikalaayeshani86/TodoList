import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';
import { FlowerRain } from './FlowerRain';

const api = "http://localhost:8080/api/todos";

const Home = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const fetchAllTodos = async () => {
    try {
      const { data } = await axios.get(api);
      setTodos(data);
    } catch (error) {
      console.log("catch error:", error);
    }
  };

  const createTodo = async () => {
    if (!title.trim()) return;
    try {
      const { data } = await axios.post(api, { title });
      setTodos([...todos, data]);
      setTitle('');
    } catch (error) {
      console.log("catch error:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${api}/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setTitle((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditedTitle(todo.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedTitle('');
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`${api}/${id}`, { title: editedTitle });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, title: editedTitle } : todo))
      );
      setEditingId(null);
      setEditedTitle('');
    } catch (error) {
      console.log("Edit error:", error);
    }
  };

  // Greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    else if (hour < 18) return "Good afternoon";
    else return "Good evening";
  };

  // Format current date in readable form
  const getFormattedDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 relative overflow-hidden z-10">
      <FlowerRain/>
      {/* Background Blobs */}
      <div className="absolute w-72 h-72 bg-pink-300 opacity-30 rounded-full top-10 -left-20 blur-3xl animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-purple-300 opacity-30 rounded-full bottom-10 -right-20 blur-3xl animate-pulse"></div>

      <div className="w-full max-w-2xl bg-white/60 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10 relative z-10">
        {/* Greeting and Date */}
        <div className="text-center mb-4 text-gray-700 text-lg font-semibold">
          {getGreeting()}! Today is {getFormattedDate()}.
        </div>

        <h1 className="text-4xl font-bold text-center text-purple-700 mb-6 tracking-wide">
          🌈 My Magical Todo List
        </h1>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="✍️ Write something amazing..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                createTodo();
              }
            }}
            className="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
          />

          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="px-4 bg-yellow-300 rounded-xl hover:scale-105 transition"
          >
            😀
          </button>
          <button
            onClick={createTodo}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:scale-105 hover:shadow-lg transition-all"
          >
            ➕ Add
          </button>
        </div>

        {showEmojiPicker && (
          <div className="mb-4 z-50">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🗂️ Your Tasks</h2>

        <div className="space-y-4 max-h-64 overflow-y-auto pr-2 scroll-smooth">
          {todos.length === 0 && (
            <p className="text-center text-gray-500 italic">✨ Start by adding something!</p>
          )}

          {todos.map((item, index) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white border border-purple-200 px-4 py-3 rounded-xl shadow-sm transition hover:shadow-md hover:bg-purple-50"
            >
              {editingId === item.id ? (
                <div className="flex-grow flex items-center gap-2">
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="flex-grow border border-gray-300 rounded-lg px-2 py-1"
                  />
                  <button
                    onClick={() => saveEdit(item.id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    💾
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-red-500 hover:text-red-700"
                  >
                    ❌
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-800 font-medium flex-grow">
                    <span className="text-purple-500">{index + 1}.</span> {item.title}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteTodo(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
