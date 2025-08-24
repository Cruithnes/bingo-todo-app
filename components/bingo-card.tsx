export default function BingoCard() {

    const initialTodos = [
        "Kahvaltıyı yap",
        "E-postaları kontrol et",
        "30 dakika spor yap",
        "Kitap oku",
        "Alışveriş listesi hazırla",
        "Arkadaşla konuş",
        "Odayı topla",
        "Su iç",
        "Müzik dinle",
        "Yazılım projesi üzerinde çalış",
        "Fotoğraf çek",
        "Meditasyon yap",
        "Yemek tarifi dene",
        "Blog yazısı oku",
        "Bitkileri sula",
        "Günlük tut",
        "Yeni kelime öğren",
        "Egzersiz yap",
        "Video izle",
        "Temizlik yap",
        "Aileyle zaman geçir",
        "Hobi ile uğraş",
        "Planları gözden geçir",
        "Yaratıcı bir şey yap",
        "Doğada vakit geçir"
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-5 gap-3 bg-white/10 backdrop-blur-lg p-6 rounded-2xl border-white/20">

        {initialTodos.map((task, index) => (
            <div 
            key={index}
            className="aspect-square p-4 text-emerald-400 border-4 flex items-center font-semibold text-sm rounded-lg cursor-pointer justify-center text-center hover:bg-amber-300 hover:text-black hover:transorm hover:scale-105 transition-all duration-500">
                {task}
            </div>
        ))}

            </div>
        </div>
    )
}