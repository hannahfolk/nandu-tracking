import { useState, useEffect } from "react";
import { useQuery, useMutation, gql, useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { FiMenu, FiX, FiUser, FiHome, FiLogIn, FiLogOut, FiLoader } from "react-icons/fi";

const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      email
    }
  }
`;

const LOGOUT = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();
  const client = useApolloClient();
  const { data, loading, error } = useQuery(GET_ME);
  const [logout] = useMutation(LOGOUT);

  const isLoginPage = router.pathname === "/login";
  const isLoggedIn = !!data?.me;

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    router.events.on("routeChangeComplete", closeMenu);
    return () => router.events.off("routeChangeComplete", closeMenu);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      localStorage.removeItem("token");
      client.cache.evict({ fieldName: "me" });
      client.cache.gc();
      await logout();
      await client.resetStore();
      router.push("/login");
    } catch (err) {
      console.log("Logout completed (server response may have failed)");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav
      className={`bg-white shadow-sm relative ${
        isLoggingOut ? "opacity-75 pointer-events-none" : ""
      }`}
    >
      {/* Loading overlay */}
      {isLoggingOut && (
        <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50">
          <FiLoader className="animate-spin text-indigo-600 h-6 w-6" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Home Link */}
          <div className="flex items-center">
            <button
              onClick={() => router.push("/")}
              className="text-xl font-bold text-indigo-600 hover:text-indigo-800"
              disabled={isLoggingOut}
            >
              Nandu Tracking
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn & !isLoginPage ? (
              <>
                <button
                  onClick={() => router.push("/profile")}
                  className="flex items-center text-gray-700 hover:text-indigo-600"
                  disabled={isLoggingOut}
                >
                  <FiUser className="mr-1" />
                  {data.me.username}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-indigo-600"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <FiLoader className="animate-spin mr-1" />
                  ) : (
                    <FiLogOut className="mr-1" />
                  )}
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </>
            ) : (
              !isLoginPage && (
                <button
                  onClick={() => router.push("/login")}
                  className="flex items-center text-gray-700 hover:text-indigo-600"
                  disabled={isLoggingOut}
                >
                  <FiLogIn className="mr-1" />
                  Login
                </button>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              disabled={isLoggingOut}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isLoggedIn & !isLoginPage ? (
              <>
                <button
                  onClick={() => router.push("/profile")}
                  className="flex items-center w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                  disabled={isLoggingOut}
                >
                  <FiUser className="mr-2" />
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <FiLoader className="animate-spin mr-2" />
                  ) : (
                    <FiLogOut className="mr-2" />
                  )}
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </>
            ) : (
              !isLoginPage && (
                <button
                  onClick={() => router.push("/login")}
                  className="flex items-center w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                  disabled={isLoggingOut}
                >
                  <FiLogIn className="mr-2" />
                  Login
                </button>
              )
            )}
            <button
              onClick={() => router.push("/")}
              className="flex items-center w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
              disabled={isLoggingOut}
            >
              <FiHome className="mr-2" />
              Home
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
