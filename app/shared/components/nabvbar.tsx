import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";
import { Fragment } from "react";
import { classNames, useUser } from "../../utils";

const userNavigation: {
  name: string;
  action: string;
  method: "get" | "post" | "put" | "delete" | "patch";
}[] = [
  { name: "Profile", action: "/profile", method: "get" },
  { name: "Sign out", action: "/logout", method: "post" },
];

export default function NavBar() {
  const user = useUser();
  return (
    <Disclosure as="header" className="sticky top-0 z-50 bg-yellow-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-yellow-700 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="relative z-10 flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  <a href="/">
                    <img
                      className="block h-8 w-auto"
                      src="/logo.png"
                      alt="Your Company"
                    />
                  </a>
                </div>
              </div>
              <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0"></div>
              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}

                <Disclosure.Button
                  data-testid="profile-menu-button"
                  className="inline-flex items-center justify-center rounded-md p-2 text-yellow-400 hover:bg-yellow-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                <button
                  type="button"
                  className="flex-shrink-0 rounded-full bg-yellow-800 p-1 text-yellow-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-800"
                >
                  <span className="sr-only">View notifications</span>
                  {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-4 flex-shrink-0">
                  <div>
                    <Menu.Button className="flex rounded-full bg-yellow-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Form
                              key={item.name}
                              action={item.action}
                              method={item.method}
                            >
                              <button
                                type="submit"
                                className={classNames(
                                  active ? "bg-yellow-100" : "",
                                  "block w-full px-4 py-2 text-left text-sm text-yellow-700"
                                )}
                              >
                                {item.name}
                              </button>
                            </Form>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel
            as="nav"
            className="sticky top-0 z-50 lg:hidden"
            aria-label="Global"
          >
            <div className="border-t border-yellow-700 pb-3 pt-4">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-yellow-400">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 rounded-full bg-yellow-800 p-1 text-yellow-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-800"
                >
                  <span className="sr-only">View notifications</span>
                  {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <Form
                    key={item.name}
                    action={item.action}
                    method={item.method}
                  >
                    <button
                      type="submit"
                      className="rounded bg-yellow-600 px-4 py-2 text-blue-100 hover:bg-yellow-500 active:bg-yellow-600"
                    >
                      {item.name}
                    </button>
                  </Form>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
