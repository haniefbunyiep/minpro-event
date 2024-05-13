import Image from 'next/image';
import { MdCalendarMonth, MdOutlineAccessTimeFilled } from 'react-icons/md';
import { FaMapLocation } from 'react-icons/fa6';
import { SandKEventDetail } from '../../../../components/S&K';

export default function EventDetail() {
  return (
    <div className="mobile:px-2 min-h-screen overflow-hidden px-2 py-10 xl:px-[300px]">
      <div className="bg-congressBlue flex h-[35px] w-[80px] items-center justify-center rounded-lg border border-blue-800 tracking-wide">
        <h1 className="text-sm font-bold text-white">Music</h1>
      </div>
      <h1 className="pt-3 text-3xl font-bold">STONE VALLEY by HeHa</h1>
      <div className="mobile:flex-col flex flex-col gap-10 pt-5 md:flex-row">
        <Image
          src={'/b1.jpg'}
          alt="Heptatix"
          className="mobile:w-[100vw] mobile:h-[150px] h-[250px] rounded-lg md:w-[55vw] lg:h-[300px] lg:w-[60vw] xl:h-[400px] xl:w-[50vw]"
          width={10000}
          height={10000}
          quality={100}
          priority={true}
        />
        <div className="flex flex-col">
          <h1 className="pb-5 text-xl font-bold">Detail Event</h1>
          <div className="flex gap-2 py-3">
            <MdCalendarMonth size={20} />
            <div className="flex flex-col">
              <h1 className="text-sm text-gray-400">Tanggal</h1>
              <h1 className="text-sm font-bold">September 16, 2024</h1>
            </div>
          </div>
          <div className="flex gap-2 py-3">
            <MdOutlineAccessTimeFilled size={20} />
            <div className="flex flex-col">
              <h1 className="text-sm text-gray-400">Waktu</h1>
              <h1 className="text-sm font-bold">09:00 - 23:59</h1>
            </div>
          </div>
          <div className="flex gap-2 py-3">
            <FaMapLocation size={20} />
            <div className="flex flex-col">
              <h1 className="text-sm text-gray-400">Lokasi</h1>
              <h1 className="text-sm font-bold text-blue-500">
                Stone Valley by Heha
              </h1>
            </div>
          </div>
          <div className="pt-16">
            <button
              type="button"
              className="btn btn-primary mobile:w-full cursor-pointer text-white sm:w-full md:w-[250px] lg:w-[300px]"
            >
              Beli Ticket
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-7 pt-10">
        <div className="flex h-[40px] w-[120px] cursor-pointer items-center justify-center rounded-full bg-blue-50 tracking-wide">
          <h1 className="text-sm font-bold text-blue-600">Deskripsi</h1>
        </div>
      </div>
      <div className="px-2 pt-10 text-justify">
        <h1 className="pb-5 text-xl font-bold">Deskripsi Event</h1>
        <p className="pb-5">
          Stone Valley merupakan destinasi wisata baru yang ada di Gunungkidul,
          Yogyakarta!
        </p>
        <p className="pb-5">
          Kami tampil beda, dengan pengalaman wisata area pantai pasir putih,
          Outbound Pantai, Jeep Tour Pantai, Jelajah Desa, Wisata UMKM,
          Restaurant dengan menu Nusantara hingga Western dengan harga
          terjangkau ditambah view perpaduan perbukitan karst dan lautan, Stone
          Valley memiliki berbagai spot foto gratis yang eksotik 🤩🤩🤩
          Fasilitas :
        </p>
        <p className="py-2">- Restaurant</p>
        <p className="py-2">- Horrizon Plaza</p>
        <p className="py-2">- Food Court / Stall</p>
        <p className="py-2">- Souvenir / Oleh-Oleh</p>
        <p className="py-2">- Mushola</p>
        <p className="py-2">- Toilet</p>
      </div>
      <SandKEventDetail />
    </div>
  );
}
