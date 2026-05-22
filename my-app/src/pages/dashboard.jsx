import { useEffect, useState } from "react";
import { getNotice } from "../../services/noticeservice";
import resultPoster from "../assets/home-results-2025.jpeg";
import groupPhoto from "../assets/home-group-photo.jpeg";
import awardLetter from "../assets/home-award-letter.jpeg";
import awardCertificate from "../assets/home-award-certificate.jpeg";
import tinkeringDay from "../assets/home-tinkering-day.jpeg";
import tinkerWorkshop from "../assets/home-tinker-workshop.jpeg";
import printingLab from "../assets/home-3d-printing.jpeg";
import labSession from "../assets/home-lab-session.jpeg";
import roboticsTeam from "../assets/home-robotics-team.jpeg";
import arduinoCloseup from "../assets/home-arduino-closeup.jpeg";
import sensorBuild from "../assets/home-sensor-build.jpeg";
import circuitCloseup from "../assets/home-circuit-closeup.jpeg";

const BellIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.73 21a2 2 0 0 1-3.46 0"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M18 6 6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronIcon = ({ direction = "right", className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d={direction === "left" ? "M15 18 9 12l6-6" : "m9 18 6-6-6-6"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const featuredStats = [
  { value: "100%", label: "Pass result" },
  { value: "17", label: "550+ marks" },
  { value: "37", label: "Students appeared" },
];

const schoolStats = [
  { value: "2006", label: "Established" },
  { value: "600+", label: "Students" },
  { value: "50+", label: "Staff members" },
  { value: "20", label: "Years of service" },
];

const gallerySlides = [
  {
    image: tinkeringDay,
    title: "Mega Tinkering Day",
    caption: "Students exploring tools, circuits, 3D printing, and teamwork.",
  },
  {
    image: roboticsTeam,
    title: "Robotics in Action",
    caption: "Hands-on learning through models, sensors, and smart machines.",
  },
  {
    image: awardCertificate,
    title: "Recognition Moments",
    caption: "Celebrating hard work, achievement, and student confidence.",
  },
  {
    image: printingLab,
    title: "3D Printing Lab",
    caption: "Young makers learning design by building real objects.",
  },
];

const storyCards = [
  { image: groupPhoto, title: "Student Community", label: "Together" },
  { image: awardLetter, title: "Achievement", label: "Proud Moment" },
  { image: tinkerWorkshop, title: "Workshop Energy", label: "Mega Tinkering" },
  { image: labSession, title: "Learning Lab", label: "Projects" },
  { image: arduinoCloseup, title: "Circuit Design", label: "Electronics" },
  { image: sensorBuild, title: "Sensor Build", label: "Robotics" },
  { image: circuitCloseup, title: "Arduino Practice", label: "STEM" },
];

export function Dashboard() {
  const [dismissed, setDismissed] = useState(false);
  const [notice, setNotice] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await getNotice();
        setNotice(res.data?.[0]?.notice || "");
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotice();
  }, []);

  useEffect(() => setDismissed(false), [notice]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((slide) => (slide + 1) % gallerySlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const visible = Boolean(notice) && !dismissed;
  const currentSlide = gallerySlides[activeSlide];

  const moveSlide = (step) => {
    setActiveSlide(
      (slide) => (slide + step + gallerySlides.length) % gallerySlides.length,
    );
  };

  return (
    <div className="min-h-[calc(100vh-80px)] overflow-hidden bg-[radial-gradient(circle_at_12%_12%,rgba(250,204,21,0.22),transparent_28%),radial-gradient(circle_at_88%_10%,rgba(14,165,233,0.2),transparent_30%),linear-gradient(135deg,#f8fafc,#eef6ff_46%,#fff7ed)] px-4 py-6 text-slate-950">
      <div
        className={`mx-auto max-w-7xl transition-all duration-300 ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        {notice && (
          <section className="overflow-hidden rounded-3xl border border-white/80 bg-white/95 shadow-2xl shadow-violet-200/40">
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-400 text-white shadow-lg shadow-violet-200">
                <BellIcon className="h-7 w-7" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-violet-600">
                      Latest Notice
                    </p>
                    <h2 className="mt-1 text-2xl font-black text-gray-950">
                      School Announcement
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDismissed(true)}
                    aria-label="Dismiss notice"
                    className="rounded-2xl bg-gray-50 p-2 text-gray-500 transition hover:bg-violet-50 hover:text-violet-700"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="mt-4 rounded-2xl border border-violet-100 bg-violet-50/70 p-4">
                  <p className="break-words text-base font-semibold leading-7 text-gray-800">
                    {notice}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-400" />
          </section>
        )}
      </div>

      <section className="mx-auto mt-6 grid max-w-7xl items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(420px,560px)]">
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-sky-900/20 sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-300 via-sky-400 to-rose-400" />
          <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="absolute -bottom-28 left-8 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />

          <div className="relative">
            <p className="inline-flex rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-amber-200">
              2024 - 2025 Result Highlight
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Sri Sai Surya School shines with 100% success.
            </h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-200 sm:text-lg">
              A proud academic year for Salur, with outstanding marks, town
              first achievers, and a strong culture of learning beyond the
              classroom.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {featuredStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur"
                >
                  <p className="text-3xl font-black text-amber-200">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-200">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-amber-300 via-sky-400 to-rose-400 opacity-70 blur-xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-2xl shadow-slate-300/60">
            <img
              src={resultPoster}
              alt="Sri Sai Surya School 2024-2025 marks result poster"
              className="aspect-[4/5] w-full rounded-[1.5rem] object-contain"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-2xl shadow-slate-200/70 backdrop-blur">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden bg-slate-950 p-6 text-white sm:p-8">
            <div className="absolute -right-20 top-8 h-48 w-48 rounded-full bg-amber-300/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-wide text-amber-200">
                About Our School
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                Nearly two decades of learning, discipline, and innovation.
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {schoolStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-white/10 bg-white/10 p-4"
                  >
                    <p className="text-3xl font-black text-amber-200">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-200">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-base font-semibold leading-8 text-slate-700">
              Established in 2006, Sri Sai Surya School has been shaping young
              minds for nearly 20 years in Salur, Manyam District, Andhra
              Pradesh. With 600+ students and 50+ dedicated staff members, we
              provide a balanced education focused on academics, discipline,
              creativity, and practical learning.
            </p>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-700">
              Our students benefit from digital classrooms, computer education,
              abacus training, and hands-on robotics projects that encourage
              innovation, problem-solving, and technical skills from an early
              age.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Digital Classrooms",
                "Computer Education",
                "Abacus Training",
                "Robotics Projects",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-black text-sky-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-sky-700">
              Campus Life
            </p>
            <h2 className="mt-1 text-3xl font-black text-slate-950 sm:text-4xl">
              Learning that looks alive
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => moveSlide(-1)}
              aria-label="Previous photo"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-700"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => moveSlide(1)}
              aria-label="Next photo"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white shadow-lg shadow-slate-300 transition hover:bg-sky-700"
            >
              <ChevronIcon />
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
          <div className="group relative min-h-[360px] overflow-hidden rounded-[2rem] bg-slate-900 shadow-2xl shadow-slate-300/60">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[520px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/12 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
              <p className="text-sm font-black uppercase tracking-wide text-amber-200">
                Featured Activity
              </p>
              <h3 className="mt-2 text-3xl font-black sm:text-5xl">
                {currentSlide.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-200 sm:text-base">
                {currentSlide.caption}
              </p>
              <div className="mt-5 flex gap-2">
                {gallerySlides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show ${slide.title}`}
                    className={`h-2.5 rounded-full transition-all ${
                      activeSlide === index
                        ? "w-10 bg-amber-300"
                        : "w-2.5 bg-white/60 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {storyCards.slice(0, 4).map((card, index) => (
              <article
                key={card.title}
                className={`relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/70 ${
                  index === 0 ? "col-span-2" : ""
                }`}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className={`w-full object-cover ${
                    index === 0 ? "h-52" : "h-40"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <p className="text-[11px] font-black uppercase tracking-wide text-amber-200">
                    {card.label}
                  </p>
                  <h3 className="text-base font-black">{card.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {storyCards.slice(4).map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-3xl border border-white bg-white/85 shadow-xl shadow-slate-200/60 backdrop-blur"
            >
              <img
                src={card.image}
                alt={card.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <p className="text-xs font-black uppercase tracking-wide text-sky-700">
                  {card.label}
                </p>
                <h3 className="mt-1 text-lg font-black text-slate-950">
                  {card.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
