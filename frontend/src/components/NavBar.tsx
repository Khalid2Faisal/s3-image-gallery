import { Disclosure } from "@headlessui/react";
import { HiOutlineMenu, HiOutlineX, HiHome } from "react-icons/hi";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface NavBarProps {
  onHome: () => void;
  onNewImage: () => void;
}

export default function NavBar({ onHome, onNewImage }: NavBarProps) {
  const navigation = [
    { name: "Add Image", current: false, onClick: onNewImage },
  ];

  return (
    <Disclosure as="nav" className="bg-teal-800 rounded-2xl">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <HiOutlineX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <HiOutlineMenu
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch">
                <button
                  onClick={onHome}
                  className="flex-shrink-0 flex items-center"
                >
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />

                  <HiHome className="hidden lg:block text-white h-8 w-auto" />
                </button>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={item.onClick}
                        className={classNames(
                          item.current
                            ? "bg-teal-900 text-white"
                            : "text-gray-300 hover:bg-teal-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  onClick={item.onClick}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
