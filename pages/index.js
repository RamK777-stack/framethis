import { Fragment, useEffect, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import html2canvas from "html2canvas";

const colorOptions = [
  {
    name: "Candy",
    colorCode:
      "text-white font-semibold bg-gradient-to-r from-indigo-500 to-pink-300",
  },
  {
    name: "Rose",
    colorCode:
      "text-white font-semibold bg-gradient-to-r from-[#f093fb] to-[#f5576c]",
  },
  {
    name: "Blue",
    colorCode:
      "text-white font-semibold bg-gradient-to-r from-[#0093E9] to-[#80D0C7]",
  },
  {
    name: "Cosmic",
    colorCode:
      "text-white font-semibold bg-gradient-to-r from-[#ff00cc] to-[#333399]",
  },
  {
    name: "Love",
    colorCode:
      "text-white font-semibold bg-gradient-to-r from-[#00DBDE] to-[#FC00FF]",
  },
  { name: "Milk", colorCode: "bg-white text-black font-semibold" },
];

const Home = () => {
  const [selected, setSelected] = useState(colorOptions[0]);
  const [tweetDetails, setTweetDetails] = useState();
  const [padding, setPadding] = useState("p-4");
  const [tweetURL, setTweetURL] = useState(
    "https://twitter.com/ShaneAParrish/status/1538892208237166592"
  );
  const exportRef = useRef();

  const getTweetById = async (id) => {
    fetch("/api/tweet?" + new URLSearchParams({ id }))
      .then((data) => data.text())
      .then((details) => {
        if (details) {
          setTweetDetails(JSON.parse(details));
        }
      })
      .catch((error) => {
        console.log("request failed", error);
        alert(error);
        console.error(error);
      });
  };

  useEffect(() => {
    retrieveTweetIDFromURL(tweetURL);
  }, []);

  const retrieveTweetIDFromURL = (URL) => {
    URL = URL.replace(/\?.*/g, "$'");
    const regex =
      /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)$/;
    if (regex.test(URL)) {
      setTweetURL(URL);
      const arr = URL.split("/");
      const tweetId = arr[arr.length - 1];
      console.log(tweetId.toString());
      getTweetById(tweetId.toString());
    } else {
      alert("Enter valid tweet URL");
    }
  };

  const openTweet = () => {
    if (typeof window !== undefined) {
      window?.open(tweetURL, "_blank");
    }
  };

  const renderTweetBody = (text) => {
    return text?.replace(" ", "&nbsp;").replace("\n", "<br>");
  };

  const exportAsImage = async (el, imageFileName) => {
    const canvas = await html2canvas(el);
    const image = canvas.toDataURL("image/jpeg", 1.0);
    downloadImage(image, imageFileName);
  };

  const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };

  return (
    <div className="font-Inter bg-[url('/background.svg')] w-full min-h-screen bg-center bg-cover flex flex-col items-center justify-center py-2">
      <Head>
        <title>Framethis</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="prose flex w-full flex-1 flex-col items-center justify-center scale-95">
        <div className="lg:bg-[url('/box.png')] md:lg:bg-[url('/box.png')] bg-center bg-cover w-full h-auto rounded-lg text-center">
          <h3 className="text-slate-200">Enter Tweet URL</h3>
          <div className="px-5 lg:px-20 md:px-20">
            <input
              id="candidates"
              type="search"
              name="search"
              value={tweetURL}
              onChange={(e) => {
                setTweetURL(e.target.value);
              }}
              placeholder="Enter Tweet URL"
              className="bg-transparent w-full h-10 rounded-lg border p-2 text-white"
              onKeyDown={(e) =>
                e.key === "Enter" && retrieveTweetIDFromURL(e.target.value)
              }
            />
            <small className="text-slate-200">
              Copy & paste URL here and hit enter
            </small>
          </div>

          <div className="lg:mt-16 md:mt-8 mt-5 px-5 lg:px-20 md:px-20 pb-10">
            <div
              className={`flex flex-col min-h-[12em] w-full ${
                selected.colorCode || "bg-white"
              } rounded-lg 
              ${padding} cursor-pointer`}
              onClick={openTweet}
              ref={exportRef}
            >
              <div className="flex">
                <div className="flex flex-1 items-center space-x-2">
                  <Image
                    src={
                      tweetDetails?.includes?.users?.[0].profile_image_url ||
                      "/author.jpg"
                    }
                    height={70}
                    width={70}
                    className="rounded-full"
                  />
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-md">
                      {tweetDetails?.includes?.users?.[0].name}
                    </span>
                    <span className="font-thin text-xs">
                      @{tweetDetails?.includes?.users?.[0].username}
                    </span>
                  </div>
                </div>
                <div className="justify-end text-right">
                  <Image src={selected?.colorCode.includes("bg-white") ? "/twitter.png": "/twitter-white.png" }height={20} width={20} />
                </div>
              </div>
              <div className="text-left">
                <p
                  dangerouslySetInnerHTML={{
                    __html: renderTweetBody(tweetDetails?.data?.text),
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-x-2 lg:space-x-6 md:space-x-6 flex justify-center items-center content-center bg-gray-200 bg-opacity-10 w-full h-auto rounded-lg mt-10 px-1 py-2 lg:px-5 lg:py-5 md:px-5 md:py-5 text-gray-400 text-sm">
          <div className="w-28">
            <span>Colors</span>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full rounded-lg bg-gray-200 bg-opacity-10 text-white py-2 pl-2 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 sm:text-sm cursor-pointer">
                  <div className="flex space-x-1">
                    <div
                      className={`h-5 w-5 rounded-full ${selected.colorCode}`}
                    ></div>
                    <span>{selected.name}</span>
                  </div>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <SelectorIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="list-none absolute bottom-full mb-2 mt-1 h-auto w-full overflow-auto rounded-md bg-zinc-800 bg-opacity-90 text-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {colorOptions.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative select-none py-2 px-2 cursor-pointer hover:text-gray-400`
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            {selected ? (
                              <span className="absolute inset-y-0 right-full flex items-center text-amber-400">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                            <div className="flex space-x-2">
                              <div
                                className={`h-5 w-5 rounded-full ${person.colorCode}`}
                              ></div>
                              <span>{person.name}</span>
                            </div>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div>
            <span>Padding</span>
            <div className="flex space-x-2">
              <div
                onClick={() => {
                  setPadding("p-4");
                }}
                className="rounded-lg bg-gray-200 bg-opacity-10 w-auto px-2 py-2 cursor-pointer mt-1 hover:text-gray-200"
              >
                16px
              </div>
              <div
                onClick={() => {
                  setPadding("p-8");
                }}
                className="rounded-lg bg-gray-200 bg-opacity-10 w-auto px-2 py-2 cursor-pointer mt-1 hover:text-gray-200"
              >
                32px
              </div>
              <div
                onClick={() => {
                  setPadding("p-10");
                }}
                className="rounded-lg bg-gray-200 bg-opacity-10 w-auto px-2 py-2 cursor-pointer mt-1 hover:text-gray-200"
              >
                40px
              </div>
            </div>
          </div>
          <div className="ml-10 mt-6 lg:mt-6 md:mt-6">
            <button
              className="bg-[url('/button-bg.svg')] bg-no-repeat bg-top w-full px-4 py-2 rounded-lg text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              onClick={() => exportAsImage(exportRef.current, "test")}
            >
              Export
            </button>
          </div>
        </div>
      </main>

      <footer className="text-gray-400 text-xs mt-2 cursor-pointer">
        <a href="https://writeonce.dev/" target="_blank" className="flex">
          <h4> Made by </h4>
          <div className="flex ml-1">
            <Image
              src="/icon.png"
              alt="Writeonce Logo"
              width={20}
              height={20}
            />
            <h4 className="text-white ml-1">Writeonce</h4>
          </div>
        </a>
      </footer>
    </div>
  );
};

export default Home;
