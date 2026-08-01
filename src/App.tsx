import React, { useState, useEffect, useRef } from "react";
import { Heart, Music, Pause, ChevronDown } from "lucide-react";

export default function LoveStory() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSection, setCurrentSection] =
  useState<keyof typeof sectionMusic>("intro");
const [started, setStarted] = useState(false);

const audioRef = useRef<HTMLAudioElement | null>(null);
  const sectionMusic = {
    intro: {
      url: "https://www.dropbox.com/scl/fi/noelqxuc4bqi9ne9umzja/Nanku-Lambo-Drive-Pyar-Ki-Si-Lyrics.mp3?rlkey=4pvvns14k3iryile2htbupjd3s&dl=1",
      startTime: 44, // Start at 0 seconds
      duration: 76, // Play for 60 seconds
    },
    meeting: {
      url: "https://www.dropbox.com/scl/fi/slnzqa82m337kdpsoutg8/TU-Official-Music-Video-_-TALWIINDER-JACKIE-SHROFF-NEELAM-KOTHARI-SANJOY-BHUSHAN-KUMAR.mp3?rlkey=5z8zo659bj1kx2pp8a7qfq0we&st=3c1vxhqc&dl=1",
      startTime: 31, // Start at 5 seconds (skip first 5 seconds)
      duration: 50, // Play for 50 seconds
    },
    firstDate: {
      url: "https://www.dropbox.com/scl/fi/3q897abiznyet9p18wkqe/Piche-Tere-Official-Video-Kunwarr-Punjabi-Song-2026-New-Punjabi-Pop-Song-Punjabi-Music.mp3?rlkey=69p485o0y2q1je7c6raqe9yhh&st=jn0kvu7v&dl=1",
      startTime: 18,
      duration: 50,
    },
    difficult: {
      url: "https://www.dropbox.com/scl/fi/ydz8cor9949pq63eqlzuz/Afusic-Heer-Official-Music-Video-Prod.-AliSoomroMusic.mp3?rlkey=0yn8exxeearp1fhkkicxbmwir&st=944dc455&dl=1",
      startTime: 14, // Start at 10 seconds
      duration: 45,
    },
    breakup: {
      url: "https://www.dropbox.com/scl/fi/mgmuidr2puwxi8ldzz8qi/Heeriye-feat.-Barf.mp3?rlkey=t4azvqksa8i107okkb5k249h6&st=ke1p2ciq&dl=1",
      startTime: 46,
      duration: 50,
    },
    reunion: {
      url: "https://www.dropbox.com/scl/fi/iu22p6bz0oyn9z02zms6a/Aarzu-with-Asim-Azhar-Official-Music-Video-Asim-Azhar-Noor-Khan-Madhurxo.mp3?rlkey=43bwt0t3gf0lhuywdv6irw5fe&st=6ao3ld3o&dl=1",
      startTime: 65, // Start at 15 seconds
      duration: 60,
    },
    happy: {
      url: "https://www.dropbox.com/scl/fi/m5om1g5evt91m9iomtmxn/Bhadrankar-Ladki-Kathiyawadi.mp3?rlkey=kt45c7hz5z64ckcix31we5qca&st=f7vrsvfq&dl=1",
      startTime: 95,
      duration: 60,
    },
  };

  useEffect(() => {
    if (audioRef.current && sectionMusic[currentSection]) {
      const music = sectionMusic[currentSection];
      audioRef.current.src = music.url;
      audioRef.current.currentTime = music.startTime; // Set start time

      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSection, isPlaying]);

  // Add this NEW useEffect to stop music after duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const music = sectionMusic[currentSection];
    if (!music) return;

    const handleTimeUpdate = () => {
      if (
        audio &&
        audio.currentTime >= music.startTime + music.duration
      ) {
        audio.pause();
        audio.currentTime = music.startTime;
      }
    };
    
    audio.addEventListener("timeupdate", handleTimeUpdate);
    
    return () =>
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    }, [currentSection]);

 
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const startStory = async () => {
    setStarted(true);
  
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Autoplay blocked", err);
      }
    }
  };


  // PHOTO CAROUSEL WITH FRAME & TRANSITIONS
  const PhotoCarousel = ({
    photoArray,
  }: {
    photoArray: string[];
    sectionId?: string;
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
      if (photoArray.length <= 1) return;

      const interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % photoArray.length);
          setIsTransitioning(false);
        }, 300);
      }, 1500);

      return () => clearInterval(interval);
    }, [photoArray.length]);

    return (
      <div className="relative w-full max-w-sm mx-auto my-6">
        {/* Frame with border */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-pink-300 bg-white p-1">
          <div className="rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={photoArray[currentIndex]}
              alt="memory"
              className={`w-full h-auto object-contain transition-opacity duration-500 ease-in-out ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>
        </div>

        {/* Photo counter */}
        {photoArray.length > 1 && (
          <div className="flex justify-center gap-4 mt-6">
            <div className="px-6 py-2 bg-gradient-to-r from-pink-200 to-rose-200 text-pink-700 font-bold rounded-full shadow-lg">
              {currentIndex + 1} / {photoArray.length}
            </div>
          </div>
        )}
      </div>
    );
  };

  // SECTION COMPONENT
  const Section = ({
    id,
    title,
    children,
  }: {
    id: string;
    title?: string;
    children: React.ReactNode;
  }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentSection(id);
          }
        },
        { threshold: 0.5 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, [id]);

    return (
      <div
        ref={ref}
        className="min-h-screen flex flex-col justify-center items-center px-6 py-20 scroll-smooth"
      >
        {title && (
          <h2 className="text-4xl md:text-5xl font-bold text-pink-600 mb-8 text-center max-w-2xl">
            {title}
          </h2>
        )}
        <div className="max-w-2xl w-full text-center">{children}</div>
      </div>
    );
  };

  // YOUR PHOTOS
  const photos = {
    meetingPhotos: [
      "https://www.dropbox.com/scl/fi/i5u7lagwlddsdy9shuukw/IMG_1208.JPG?rlkey=2dv56ka4duy5qrdk1x8mhryq1&st=v2n7f9kf&dl=1",
      "https://www.dropbox.com/scl/fi/3g84w6qb64zw5gx0r6m5n/IMG_0200.jpg?rlkey=wys4qi38n26390ma7bhsj8h1g&st=t659yb2b&dl=1",
    ],
    firstDatePhotos: [
      "https://www.dropbox.com/scl/fi/7c6fog3nsyw0dgmxe3byi/IMG_4451-1.JPG?rlkey=litpontfigzgd4hexs4973au7&st=aq60f0so&dl=1",
      "https://www.dropbox.com/scl/fi/gncv4gq7jft129tbxe6t6/IMG_4450.JPG?rlkey=o8vacngcs6vqmvqzdrggbeq10&st=ba5urmkd&dl=1",
    ],
    breakupPhotos: [
      "https://www.dropbox.com/scl/fi/2ar4r1u1c5d65g2wl1iir/IMG_4447-1.JPG?rlkey=xwcq2p9q3z395pcv5jjqd6kfx&st=o7jvs6p3&dl=1",
    ],
    reunionPhotos: [
      "https://www.dropbox.com/scl/fi/coqr40vdpb5qpjz06phty/IMG_4432-1.JPG?rlkey=93entyqafnhf2rhnbgo1kz09r&st=5ljhh4zm&dl=1",
      "https://www.dropbox.com/scl/fi/on7cnftb0rzxtvhob5euj/IMG_4430-1.JPG?rlkey=onggpt8akdx5zbd65wsitu6z1&st=c78xj82u&dl=1",
    ],
    happyPhotos: [
      "https://www.dropbox.com/scl/fi/626gzvr1gu2q54eko4sdi/IMG_4428.JPG?rlkey=0f0254yb0bup1jrlf4wmr9ldm&st=taw4fne2&dl=1",
      "https://www.dropbox.com/scl/fi/hib2bwpjyeqia2xhd5u1p/IMG_4429-2.JPG?rlkey=n2zyky185alw8ytov6erh4ui2&st=k8bxbntj&dl=1",
      "https://www.dropbox.com/scl/fi/60rcox09urqztb8p7t7zr/IMG_4436.JPG?rlkey=2fppzxh2k8xduiuw7mqq8zxv9&st=pp24f5wl&dl=1",
      "https://www.dropbox.com/scl/fi/rxf0d9r7b2687h9xeikpu/IMG_4223.JPG?rlkey=kc3iowh5djykvufixr2tycbje&st=qpfwpph6&dl=1",
    ],
  };
  return (
    <>
    {!started && (
  <div className="fixed inset-0 bg-pink-50 z-[9999] flex flex-col items-center justify-center">
    <Heart className="w-20 h-20 text-pink-600 fill-pink-600 animate-pulse mb-6" />

    <h1 className="text-5xl font-bold text-pink-600 mb-4">
      Happy Girlfriend's Day ❤️
    </h1>

    <p className="text-gray-600 text-center mb-8 px-6">
      I made something special just for you.
      <br />
      Put on your headphones and press Start.
    </p>

    <button
      onClick={startStory}
      className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full text-xl font-bold shadow-xl"
    >
      ▶ Start Experience
    </button>
  </div>
)}
    <div className="bg-gradient-to-b from-pink-50 via-white to-pink-50 min-h-screen">
      <audio
  ref={audioRef}
  loop
  playsInline
  preload="auto"
/>

      {/* Music Control */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 bg-white shadow-lg rounded-full p-4 hover:bg-pink-100 transition"
        title="Toggle Music"
      >
        {isPlaying ? (
          <Music className="w-6 h-6 text-pink-600" />
        ) : (
          <Pause className="w-6 h-6 text-pink-600" />
        )}
      </button>

      {/* Music Section Indicator */}
      <div className="fixed top-20 right-6 z-50 bg-white shadow-lg rounded-full px-4 py-2 text-sm text-pink-600 font-semibold">
        🎵 {currentSection}
      </div>

      {/* Section 1: Hello Baby Girl */}
      <Section id="intro">
        <div className="animate-bounce">
          <Heart className="w-20 h-20 text-pink-600 fill-pink-600 mx-auto mb-8" />
        </div>
        <h1 className="text-6xl md:text-7xl font-bold text-pink-600 mb-12">
          Hello Babygurl 💕
        </h1>
        <div className="text-center">
          <p className="text-gray-400 mb-8">
            Scroll down to see something special...
          </p>
          <ChevronDown className="w-8 h-8 text-pink-400 mx-auto animate-pulse" />
        </div>
      </Section>

      {/* Section 2: Girlfriend Photo */}
      <Section id="meeting">
        <div className="mb-8">
          <PhotoCarousel photoArray={photos.meetingPhotos} sectionId="photo1" />
        </div>
      </Section>

      {/* Section 3: Happy Girlfriends Day Message */}
      <Section id="message" title="Happy Girlfriends Day to My Beautiful Lady">
        <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-pink-200">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 font-light">
            Super lucky and super grateful to have you in my life.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 font-light">
            Thank you for making it colourful and just as beautiful as you are.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 font-light">
            Thank you for teaching me what is love.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 font-light">
            Thank you for teaching me how to love.
          </p>
          <p className="text-lg md:text-xl text-pink-600 leading-relaxed font-semibold">
            Thank you for making me a man.
          </p>
        </div>
      </Section>

      {/* Section 4: Journey Begins */}
      <Section
        id="journey"
        title="The Days That Made Me Feel The World Is Beautiful"
      >
        <p className="text-gray-600 mb-8 text-lg">
          and life is worth living ✨
        </p>
      </Section>

      {/* Section 5: August 24 2022 */}
      <Section id="meeting" title="August 24, 2022">
        <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-3xl shadow-lg p-8 mb-8">
          <p className="text-2xl text-pink-600 font-bold mb-2">
            We Started Dating 💑
          </p>
          <p className="text-gray-700 text-lg">
            The beginning of the most beautiful journey...
          </p>
        </div>
        <PhotoCarousel photoArray={photos.meetingPhotos} sectionId="aug2022" />
      </Section>

      {/* Section 6: October 2 2022 - First Date */}
      <Section id="firstDate" title="October 2, 2022">
        <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-3xl shadow-lg p-8 mb-8">
          <p className="text-2xl text-pink-600 font-bold mb-2">
            Our First Date 🌙
          </p>
        </div>
        <PhotoCarousel
          photoArray={photos.firstDatePhotos}
          sectionId="oct2022"
        />
      </Section>

      {/* Section 7: First Kiss */}
      <Section id="firstDate">
        <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-pink-200">
          <p className="text-3xl text-pink-600 font-bold mb-4">
            Our First Kiss 💋
          </p>
          <p className="text-xl text-gray-700 mb-2">October 2, 2022</p>
          <p className="text-lg text-gray-600 mb-4">5:02 PM</p>
          <p className="text-lg text-gray-700 leading-relaxed italic">
            "In the car while it was raining... the most magical moment of my
            life"
          </p>
        </div>
      </Section>

      {/* Section 8: Growing Distant */}
      <Section id="difficult">
        <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-300">
          <p className="text-3xl text-gray-700 font-bold mb-4">
            The Difficult Times...
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Here things take a bad turn. We couldn't go on anymore dates because
            the timings wouldn't match and we were growing distant. 😔
          </p>
        </div>
      </Section>

      {/* Section 9: School Gathering */}
      <Section id="difficult">
        <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-300">
          <p className="text-2xl text-gray-700 font-bold mb-4">
            December 31, 2022
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            We finally met during our school gathering and things didn't work
            out so well even then.
          </p>
          <p className="text-xl text-gray-600 italic mb-4">
            "I acted like shit and I was being a dick. My fault totally and I am
            sorry for that still."
          </p>
        </div>
        <PhotoCarousel photoArray={photos.breakupPhotos} sectionId="dec2022" />
      </Section>

      {/* Section 10: Breakup */}
      <Section id="breakup">
        <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-red-300">
          <p className="text-3xl text-red-600 font-bold mb-4">
            January 10, 2023
          </p>
          <p className="text-xl text-gray-700 mb-4">Soon after, we broke up.</p>
          <p className="text-lg text-gray-600 italic">
            (Totally my fault, and it was my decision to break up)
          </p>
        </div>
      </Section>

      {/* Section 11: But Not The End */}
      <Section id="breakup" title="But The Story Doesn't End Here... 💫">
        <p className="text-gray-600 mb-8 text-xl">
          It's going to start, all over again...
        </p>
      </Section>

      {/* Section 12: Six Months Later */}
      <Section id="reunion">
        <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-pink-200">
          <p className="text-2xl text-pink-600 font-bold mb-6">
            Six Months Later...
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            After leaving every day in constant regret and loneliness, a good
            friend pushed me forward to speak with you again, apologize, and ask
            if you would get back with me.
          </p>
        </div>
      </Section>

      {/* Section 13: Growing Balls */}
      <Section id="reunion">
        <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-pink-200">
          <p className="text-xl text-gray-700 leading-relaxed italic">
            After hours of overthinking, I finally grew balls again to get in
            touch with you.
          </p>
        </div>
      </Section>

      {/* Section 14: July 10 2023 */}
      <Section id="reunion" title="July 10, 2023">
        <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-3xl shadow-lg p-8 mb-8">
          <p className="text-xl text-pink-600 font-semibold">
            We decided to meet 🌟
          </p>
        </div>
      </Section>

      {/* Section 15: Reunion & Forgiveness */}
      <Section id="reunion" title="We Met, We Spoke, We Forgave">
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          You forgave me for my mistakes and we got back together. 💕
        </p>
        <PhotoCarousel photoArray={photos.reunionPhotos} sectionId="reunion" />
      </Section>

      {/* Section 16: Happy Ever After */}
      <Section id="happy" title="Here On Out... Happily Ever After 🌈">
        <p className="text-gray-600 mb-8 text-lg">
          With ups and downs, we've made it work. Every moment with you is
          precious.
        </p>
        <PhotoCarousel photoArray={photos.happyPhotos} sectionId="happy" />
      </Section>

      {/* Section 17: Future Together */}
      <Section id="happy">
        <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-pink-200">
          <p className="text-2xl text-pink-600 font-bold mb-4">
            A Prayer & A Promise
          </p>
          <p className="text-lg text-gray-700 leading-relaxed italic">
            I pray and hope that we spend every minute of our remaining lives
            together.
          </p>
          <p className="text-xl text-gray-600 mt-6">Ameen. 🤲</p>
        </div>
      </Section>

      {/* Section 18: The End - I Love You */}
      <Section id="happy">
        <div className="animate-pulse">
          <Heart className="w-24 h-24 text-pink-600 fill-pink-600 mx-auto mb-8" />
        </div>
        <h2 className="text-6xl md:text-7xl font-bold text-pink-600 mb-4">
          I Love You AFU
        </h2>
        <p className="text-2xl text-gray-600 mb-12">❤️</p>
        <p className="text-gray-500 mb-8">Forever and Always...</p>
        <div className="text-pink-400 text-sm">~ The End ~</div>
      </Section>

      {/* Footer */}
      <div className="bg-white border-t-2 border-pink-200 py-8 text-center">
        <p className="text-gray-600">
          Made with ❤️ for the most beautiful person in my life
        </p>
      </div>
  </div>
</>
);
}