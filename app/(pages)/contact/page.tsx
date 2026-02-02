import Image from "next/image";

export default function ContactPage() {
  return (
    <section
      className="relative min-h-screen w-full text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-contact.png')" }}
    >


      {/* TITLE */}
      <h1 className="text-center pt-12 text-5xl font-extrabold tracking-widest bg-gradient-to-r from-white to-[#F4E5A2] bg-clip-text text-transparent drop-shadow-lg tracking-[0.2em]">
        CONTACT US FOR PARTNERSHIP
      </h1>

      {/* CARD CONTAINER ONLY */}
      <div className="relative max-w-7xl mx-auto h-[600px] -translate-y-0">

        {/* CARD */}
        <div className="absolute right-60 top-23 w-[500px] z-10">
          <div className="p-[4px] rounded-[40px] bg-gradient-to-r from-[#F4E5A2] to-[#6EAF5F] backdrop-blur-xl shadow-2xl">

          {/* GLASS CARD */}
          <div
            className="
              bg-[#03695E]/30
              rounded-[36px]
              p-10
              text-white
            "
          >
            <p className="mb-8 text-lg">
              The 23rd CENS UI is open to any kind of partnership from sponsorship to media partnership. 
              If you are interested in partnering with us, reach out to our representative for more information.
            </p>

            <h3 className="font-bold text-2xl text-right">Media Partner:</h3>
            <p className="text-right">Gwenatha Aqilaputri +62 81344001006</p>
            <p className="mb-6 text-right">ea.23rdcensui@gmail.com</p>

            <h3 className="font-bold text-2xl text-right">Sponsorship:</h3>
            <p className="text-right">Hasna Sausan +62 82115502774</p>
            <p className="text-right">hasnasausana@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* WOMAN CP */}
      <Image
        src="/images/cp-woman.png"
        alt="woman"
        width={560}
        height={620}
        className="absolute left-52 bottom-20 z-20"
      />

      {/* WAVE */}
      <div className="absolute bottom-0 left-0 w-full h-[1000px] z-50 pointer-events-none">
      <Image
        src="/images/cp-green-layer.png"
        alt="wave"
        fill
        className="object-cover"
      />
    </div>
    </section>
  );
}
