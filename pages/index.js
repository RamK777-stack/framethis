import { Fragment, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Client } from "twitter-api-sdk";

const client = new Client(process.env.NEXT_PUBLIC_BEARER_TOKEN);

const people = [
  { name: "Red" },
  { name: "Cyan" },
  { name: "Blue" },
  { name: "White" },
  { name: "Gray" },
];

const Home = () => {
  const [selected, setSelected] = useState(people[0]);

  const getTweetById = async () => {
    const params = {
      "tweet.fields": "author_id",
      "user.fields": "created_at,profile_image_url,name,username"
    }
    const tweet = await client.tweets.findTweetById("1538892208237166592", params);
    console.log(tweet.data.text);
  };

  return (
    <div className="font-Inter bg-[url('/background.svg')] w-full h-screen bg-center bg-cover flex flex-col items-center justify-center py-2">
      <Head>
        <title>Framethis</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="prose flex w-full flex-1 flex-col items-center justify-center">
        <div className="lg:bg-[url('/box.png')] md:lg:bg-[url('/box.png')] bg-center bg-cover w-full h-auto rounded-lg text-center">
          <h3 className="text-slate-200">Enter Tweet URL</h3>
          <div className="px-5 lg:px-20 md:px-20">
            <input
              id="candidates"
              type="search"
              name="search"
              placeholder="Enter Tweet URL"
              className="bg-transparent w-full h-10 rounded-lg border p-2 text-white"
              onKeyDown={getTweetById}
            />
          </div>

          <div className="lg:mt-20 md:mt-10 mt-5 px-5 lg:px-20 md:px-20 pb-10">
            <div className="flex flex-col text-white min-h-[12em] w-full bg-gradient-to-r from-indigo-500 to-pink-300 rounded-lg p-5">
              <div className="flex items-center space-x-2">
                <Image
                  src="/author.jpg"
                  height={70}
                  width={70}
                  className="rounded-full"
                />
                <div className="flex flex-col text-sm text-left">
                  <span>Shane Parrish</span>
                  <span>@ShaneAParrish</span>
                </div>
              </div>
              <div className="text-left">
                <p>Amateurs have a goal. Professionals have a process.</p>
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
                  <span className="block truncate">{selected.name}</span>
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
                    {people.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative select-none py-2 px-2 cursor-pointer hover:text-gray-400`
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center text-amber-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
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
              <div className="rounded-lg bg-gray-200 bg-opacity-10 w-auto px-2 py-2 cursor-pointer mt-1 hover:text-gray-200">
                16px
              </div>
              <div className="rounded-lg bg-gray-200 bg-opacity-10 w-auto px-2 py-2 cursor-pointer mt-1 hover:text-gray-200">
                32px
              </div>
              <div className="rounded-lg bg-gray-200 bg-opacity-10 w-auto px-2 py-2 cursor-pointer mt-1 hover:text-gray-200">
                48px
              </div>
            </div>
          </div>
          <div className="ml-10 mt-6 lg:mt-6 md:mt-6">
            <button className="bg-[url('/button-bg.svg')] bg-no-repeat bg-top w-full px-4 py-2 rounded-lg text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
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
