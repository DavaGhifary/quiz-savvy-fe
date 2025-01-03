// Contoh data untuk card
import Image from "../../assets/img/BalikUbin.png";

const cardData = [
  {
    id: 1,
    image: Image,
    title: "Balik Ubin",
    description:
      "Jelajahi serangkaian ubin dua sisi dengan mengetuk untuk memperbesar dan menggesek untuk membaliknya",
  },
  {
    id: 2,
    image: Image,
    title: "Membuka Kotak",
    description:
      "Temukan desain menarik lainnya dengan fitur interaktif yang inovatif.",
  },
  {
    id: 3,
    image: Image,
    title: "Anagram",
    description: "Ciptakan pola kreatif untuk mendekorasi ruang favorit Anda.",
  },
  {
    id: 4,
    image: Image,
    title: "Mencari Kata",
    description: "Ciptakan pola kreatif untuk mendekorasi ruang favorit Anda.",
  },
  {
    id: 5,
    image: Image,
    title: "Benarkan Kalimatnya",
    description: "Ciptakan pola kreatif untuk mendekorasi ruang favorit Anda.",
  },
  {
    id: 6,
    image: Image,
    title: "Teka Teki silang",
    description: "Ciptakan pola kreatif untuk mendekorasi ruang favorit Anda.",
  },
];

const CardTemplate = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-10">
      {cardData.map((card) => (
        <div
          key={card.id}
          className="bg-white w-[180px] h-[324px] shadow-md rounded-tr-[40px] rounded-bl-[40px]"
        >
          <img
            src={card.image}
            className="rounded-tr-[40px] rounded-bl-[40px]"
          />
          <div className="px-4 py-4">
            <p className="pb-2 text-[#FFBA00] font-semibold">{card.title}</p>
            <p className="text-xs text-[#666666]">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardTemplate;
