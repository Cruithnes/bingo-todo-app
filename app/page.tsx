"use client";
import React, { useState, useEffect } from 'react';
import { Plus, RotateCcw, Trophy, Target, CheckCircle, Trash2, X } from 'lucide-react';

import clsx from 'clsx';

// type Todo = {
//   id: number;
//   text: string;
//   completed: boolean;
//   position?: number;
// };

export default function Page() {

  const initialTodos = [
    { id: 1, text: 'Kahvaltı yap', completed: false },
    { id: 2, text: 'E-postaları kontrol et', completed: false },
    { id: 3, text: 'Spor yap', completed: false },
    { id: 4, text: 'Kitap oku', completed: false },
    { id: 5, text: 'Projelere bak', completed: false },
    { id: 6, text: 'Ders çalış', completed: false },
    { id: 7, text: 'Su iç (3L)', completed: true },
    { id: 8, text: 'Meditasyon yap', completed: false },
    { id: 9, text: 'Markete git', completed: false },
    { id: 10, text: 'Odayı topla', completed: false },
    { id: 11, text: 'Rusça çalış', completed: true },
    { id: 12, text: 'Arkadaşla buluş', completed: false },
    { id: 13, text: 'Koşuya çık', completed: false },
    { id: 14, text: 'Video izle', completed: false },
    { id: 15, text: 'Dizi izle', completed: false },
    { id: 16, text: 'Anime izle', completed: false },
    { id: 17, text: 'Yaratıcı bir şey yap', completed: false },
    { id: 18, text: 'Planları gözden geçir', completed: false },
    { id: 19, text: 'İş başvurusu yap', completed: false },
    { id: 20, text: 'Hobi ile uğraş', completed: false },
    { id: 21, text: 'Yemek tarifi dene', completed: false },
    { id: 22, text: 'Alışveriş listesi hazırla', completed: false },
    { id: 23, text: 'Bitkileri sula', completed: false },
    { id: 24, text: 'Gitar çalış', completed: false },
    { id: 25, text: 'Ayı hayrnlıkla izle', completed: false },
  ]

  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [bingoLines, setBingoLines] = useState(0);
  const [showBingoAlert, setShowBingoAlert] = useState(false);
  const [prevBingoLines, setPrevBingoLines] = useState(0);

  const totalTodos = initialTodos.length;
  const completionRate = Math.round((completedCount / totalTodos) * 100);

  useEffect(() => {
    const completed = todos.filter(todo => todo.completed).length;
    setCompletedCount(completed);

    const currentBingoLines = checkBingoLines();
    setBingoLines(currentBingoLines);

    if (currentBingoLines > prevBingoLines && currentBingoLines > 0) {
      setShowBingoAlert(true);
      setTimeout(() => {
        setShowBingoAlert(false);
      }, 3000);
    }

    setPrevBingoLines(currentBingoLines);
  }, [todos, prevBingoLines]);

  const checkBingoLines = () => {
    if (todos.length === 0) return 0;

    const grid = Array(5).fill().map(() => Array(5).fill(false));

    todos.forEach((todo, index) => {
      if (todo.completed && index < 25) {
        const row = Math.floor(index / 5);
        const col = index % 5;
        if (row >= 0 && row < 5 && col >= 0 && col < 5) {
          grid[row][col] = true;
        }
      }
    });

    let lines = 0;

    for (let i = 0; i < 5; i++) {
      if (grid[i].every(cell => cell)) {
        lines++;
      }
    }

    for (let i = 0; i < 5; i++) {
      if (grid.every(row => row[i])) {
        lines++;
      }
    }

    if (grid.every((row, i) => row[i])) {
      lines++;
    }

    if (grid.every((row, i) => row[4 - i])) {
      lines++;
    }

    return lines;
  };

  function checkTodo(id: number) {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  }

  function resetGame() {
    setTodos(todos.map(todo => ({ ...todo, completed: false })));
  }

  function clearCompleted() {
    const incompleteTodos = todos.filter(todo => !todo.completed);
    const reorderedTodos = incompleteTodos.map((todo, index) => ({
      ...todo,
    }));
    setTodos(reorderedTodos);
  }

  function clearAll() {
    setTodos([]);
    setDeleteMode(false);
  }

  const addTodo = () => {
    if (newTodo.trim() && todos.length < 25) {
      const newId = Math.max(...todos.map(t => t.id), 0) + 1;
      setTodos([...todos, {
        id: newId,
        text: newTodo.trim(),
        completed: false,
      }]);
      setNewTodo('');
      setShowAddForm(false);
      console.log('Görev eklendi:', newTodo.trim());
    } else {
      console.log('Görev eklenemedi - Boş metin veya kart dolu');
    }
  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-purple-600 to-rose-800 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-4 sm:mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2 sm:mb-4 bg-gradient-to-r from-roseellow-300 to-orange-300 bg-clip-text">
            🤓 Bingo Todo 🤓
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-4 sm:mb-6">BİNGOOO!</p>

          <div className="flex justify-center gap-2 sm:gap-6 mb-4 sm:mb-8 flex-wrap">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-300 mx-auto mb-1 sm:mb-2" />
              <div className="text-xl sm:text-3xl font-bold text-white">{completedCount}</div>
              <div className="text-xs sm:text-sm text-blue-100">Tamamlanan</div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 mx-auto mb-1 sm:mb-2" />
              <div className="text-xl sm:text-3xl font-bold text-white">{bingoLines}</div>
              <div className="text-xs sm:text-sm text-blue-100">Bingo Satırı</div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300 mx-auto mb-1 sm:mb-2" />
              <div className="text-xl sm:text-3xl font-bold text-white">%{completionRate}</div>
              <div className="text-xs sm:text-sm text-blue-100">Tamamlanma</div>
            </div>
          </div>

          <div className="flex justify-center gap-2 sm:gap-4 mb-4 sm:mb-8 flex-wrap px-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className={clsx(
                "text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold flex items-center gap-1 sm:gap-2 transition-all duration-300 hover:transform hover:scale-105 shadow-lg text-sm sm:text-base", {
                "bg-gray-500 cursor-not-allowed": todos.length >= 25,
                "bg-green-500 hover:bg-green-600 text-white cursor-pointer": todos.length < 25
              })}
              disabled={todos.length >= 25}
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              {todos.length >= 25 ? 'Kart Dolu' : 'Görev Ekle'}
            </button>

            <button
              onClick={() => setDeleteMode(!deleteMode)}
              className={clsx(
                "px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold flex items-center gap-1 sm:gap-2 transition-all duration-300 hover:transform hover:scale-105 shadow-lg cursor-pointer text-sm sm:text-base", {
                "bg-red-600 hover:bg-red-700 text-white": deleteMode,
                "bg-red-500 hover:bg-red-600 text-white": deleteMode === false
              })}
              disabled={todos.length === 0}
            >
              {deleteMode ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              {deleteMode ? 'Silme İptal' : 'Görev Sil'}
            </button>

            <button
              onClick={resetGame}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold flex items-center gap-1 sm:gap-2 transition-all duration-300 hover:transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              Sıfırla
            </button>
          </div>

          {/* Silme modu renderi */}
          {deleteMode && (
            <div className="bg-red-500/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-8 border border-red-500/20 animate-slide-down mx-2">
              <h3 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-center">
                🗑️ Silme Modu - Görevlere tıklayarak silin
              </h3>
              <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
                <button
                  onClick={clearCompleted}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-colors duration-300 text-sm sm:text-base"
                  disabled={completedCount === 0}
                >
                  Tamamlananları Sil ({completedCount})
                </button>
                <button
                  onClick={clearAll}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-colors duration-300 text-sm sm:text-base"
                  disabled={todos.length === 0}
                >
                  Tümünü Sil ({todos.length})
                </button>
              </div>
            </div>
          )}

          {/* Yeni görev ekle renderi */}
          {showAddForm && (
            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-8 border border-white/20 animate-slide-down mx-2">
              <h3 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-center">
                Yeni Görev Ekle ({todos.length}/25)
              </h3>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                  placeholder="Yeni görev ekle... (örn: Kitap oku)"
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-sm sm:text-base"
                  maxLength={50}
                  autoFocus
                />
                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={addTodo}
                    disabled={!newTodo.trim()}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-colors duration-300 flex-1 sm:flex-none text-sm sm:text-base ${newTodo.trim()
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-400 cursor-not-allowed text-gray-200'
                      }`}
                  >
                    Ekle
                  </button>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setNewTodo('');
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-colors duration-300 text-sm sm:text-base"
                  >
                    İptal
                  </button>
                </div>
              </div>
            </div>
          )}


          <div className="max-w-4xl mx-auto px-2">
            <div className="grid grid-cols-5 gap-1 sm:gap-3 bg-white/10 backdrop-blur-lg p-3 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl">
              {todos.map(todo => (
                <div
                  className={clsx("relative aspect-square p-1 sm:p-4 rounded-lg sm:rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 flex items-center justify-center text-center font-semibold text-xs sm:text-sm", {
                    "bg-gradient-to-br from-emerald-500 to-lime-400 text-white shadow-lg animate-bounce-once": todo.completed,
                    "bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50": todo.completed === false,
                    "bg-red-500/30 hover:bg-red-500/50 text-white border-2 cursor-pointer animate-pulse": deleteMode
                  })}

                  key={todo.id}
                  onClick={() => checkTodo(todo.id)}
                >
                  <span
                    className={clsx({ "line-through": todo.completed, "leading-tight": todo.completed === false })}
                  >
                    {todo.text}
                  </span>
                  {deleteMode ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 rounded-lg sm:rounded-2xl">
                      <Trash2 className="w-4 h-4 sm:w-8 sm:h-8 text-red-300 animate-bounce" />
                    </div>
                  ) : todo.completed && (
                    <div className="flex items-center justify-center inset-0 absolute">
                      <CheckCircle className="w-6 h-6 sm:w-10 sm:h-10 text-white animate-pulse" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {showBingoAlert && (
            <div className="fixed top-4 sm:top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 sm:px-8 py-2 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-xl shadow-2xl animate-bounce z-50 mx-2 text-center">
              🎉 {bingoLines} Bingo Satırı Tamamlandı! 🎉
            </div>
          )}

          {todos.filter(t => t.completed).length === todos.length && todos.length > 0 && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center shadow-2xl animate-pulse max-w-sm sm:max-w-none">
                <Trophy className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-yellow-300" />
                <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">🎊 TEBRİKLER! 🎊</h2>
                <p className="text-lg sm:text-xl mb-4 sm:mb-6">
                  {todos.length === 25 ? 'Tüm görevleri tamamladın!' : `${todos.length} görevin tümünü tamamladın!`}
                </p>
                <div className="text-base sm:text-lg mb-4 sm:mb-6">
                  🏆 {bingoLines} Bingo Satırı Yaptın Yippie!!
                </div>
                <button
                  onClick={resetGame}
                  className="bg-white text-purple-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base"
                >
                  Yeni Oyun Başlat
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div >

  )
}