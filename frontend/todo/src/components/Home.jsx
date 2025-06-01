import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';
import { FlowerRain } from './FlowerRain';

const api = `${process.env.REACT_APP_API_URL}/api/todos`;



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

  const createTodo = async (e) => {
    if (e) e.preventDefault();

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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    else if (hour < 18) return "Good afternoon";
    else return "Good evening";
  };

  const getFormattedDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen px-4 overflow-hidden bg-gradient-to-br from-slate-800 via-lime-950 to-amber-950">
      <FlowerRain />
      <div className="absolute bg-pink-300 rounded-full w-72 h-72 opacity-30 top-10 -left-20 blur-3xl animate-pulse"></div>
      <div className="absolute bg-purple-300 rounded-full w-72 h-72 opacity-30 bottom-10 -right-20 blur-3xl animate-pulse"></div>

      <div className="relative z-10 w-full max-w-2xl p-10 border shadow-2xl bg-white/60 backdrop-blur-xl border-white/20 rounded-3xl">
        <div className="mb-4 text-lg font-semibold text-center text-gray-700">
          {getGreeting()}! Today is {getFormattedDate()}.
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-wide text-center text-purple-700">
          🌈 My Magical Todo List
        </h1>

        {/* 📝 Input and Buttons */}
        <form onSubmit={createTodo} className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="✍️ Write something amazing..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                createTodo();
              }
            }}
            className="flex-grow px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="px-4 transition bg-yellow-300 rounded-xl hover:scale-105"
          >
            😀
          </button>

          <button
            type="submit"
            className="px-6 py-3 text-white transition-all bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:scale-105 hover:shadow-lg"
          >
            ➕ Add
          </button>
        </form>

        {showEmojiPicker && (
          <div className="z-50 mb-4">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <h2 className="mb-4 text-2xl font-semibold text-gray-800">🗂️ Your Tasks</h2>

        <div className="pr-2 space-y-4 overflow-y-auto max-h-64 scroll-smooth">
          {todos.length === 0 && (
            <p className="italic text-center text-gray-500">✨ Start by adding something!</p>
          )}

          {todos.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-4 py-3 transition bg-white border border-purple-200 shadow-sm rounded-xl hover:shadow-md hover:bg-purple-50"
            >
              {editingId === item.id ? (
                <div className="flex items-center flex-grow gap-2">
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="flex-grow px-2 py-1 border border-gray-300 rounded-lg"
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
                  <p className="flex-grow font-medium text-gray-800">
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
