import Image from "next/image";

export default function ContactPage() {
  return (
    <section
      className="
        relative
        min-h-screen
        w-full
        text-white
        bg-cover
        bg-center
        bg-no-repeat
        overflow-hidden
      "
      style={{ backgroundImage: "url('/images/bg-contact.png')" }}
    >
      {/* ================= TITLE ================= */}
      <h1
        className="
          text-center
          pt-14 md:pt-20
          text-xl md:text-5xl
          font-extrabold
          tracking-widest
          bg-gradient-to-r
          from-white
          to-[#F4E5A2]
          bg-clip-text
          text-transparent
          drop-shadow-lg
          px-4
        "
      >
        CONTACT US FOR PARTNERSHIP
      </h1>

      {/* ================= MAIN LAYOUT ================= */}
      <div
        className="
          max-w-6xl
          mx-auto
          flex items-center justify-center
          gap-4 md:gap-8
          px-4 md:px-10
          py-6 md:py-0
          md:-mt-10
        "
      >
        {/* ================= WOMAN ================= */}
        <div
          className="
            relative
            shrink-0
            w-[42%]
            md:w-[600px]
            md:-mr-28
            -bottom-2 md:-bottom-7
            aspect-[3/4]
            z-10
          "
        >
          <Image
            src="/images/cp-woman.png"
            alt="woman"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* ================= CARD ================= */}
        <div className="w-[58%] md:w-[600px] z-0">
          <div
            className="
              rounded-[24px] md:rounded-[40px]
              bg-[#03695E]/30
              backdrop-blur-[3px]
              border-[5px] border-[#F4E5A2]
              shadow-xl
            "
          >
            {/* GLASS CARD */}
            <div
              className="
                bg-[#03695E]/20
                backdrop-blur-[3px]
                rounded-[20px] md:rounded-[36px]
                p-4 md:p-10
              "
            >
              <p className="mb-4 md:mb-8 text-xs md:text-lg leading-relaxed">
                The 23rd CENS UI is open to any kind of partnership from
                sponsorship to media partnership. If you are interested in
                partnering with us, reach out to our representative for more
                information.
              </p>

              <h3 className="font-bold text-xs md:text-2xl text-right">
                Media Partner:
              </h3>
              <p className="text-right text-xs md:text-base">
                Falerina Eva +6282176041656
              </p>
              <p className="mb-3 md:mb-6 text-right text-xs md:text-base">
                ea.23rdcensui@gmail.com
              </p>

              <h3 className="font-bold text-xs md:text-2xl text-right">
                Sponsorship:
              </h3>
              <p className="text-right text-xs md:text-base">
                Hasna Sausan +62 82115502774
              </p>
              <p className="text-right text-xs md:text-base">
                hasnasausana@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= WAVE ================= */}
      <div
        className="
          absolute
          left-0
          w-full
          h-[550px] md:h-[750px]
          -bottom-2 md:-bottom-5
          pointer-events-none
          z-30
        "
      >
        <Image
          src="/images/cp-green-layer.png"
          alt="wave"
          fill
          className="object-cover object-bottom"
        />
      </div>
    </section>
  );
}
