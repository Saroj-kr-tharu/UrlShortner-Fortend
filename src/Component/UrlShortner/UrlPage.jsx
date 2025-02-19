import { useState, useEffect } from "react";
import { Link2, Copy } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";

import {
  shortUrlGenerationAction,
  ResetAction,
} from "../../redux/slice/urlshortnerSlice";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const URLShortener = () => {
  const [url, setUrl] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector((state) => state.urlShortnerReducer.status);
  const shortUrl = useSelector((state) => state.urlShortnerReducer.shortUrl);
  const originUrl = useSelector((state) => state.urlShortnerReducer.originUrl);
  const isLogin = useSelector((state) => state.authenticationReducer.isLogin);
  const curUser = useSelector((state) => state.authenticationReducer.curUser);

  useEffect(() => {
    if (status === "Fulfilled") {
      toast.success("Successfully Create Short Link");
    }
    if (status === "Failed") {
      toast.error("Failed Create Short Link");
    }
  }, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = { Url: url };
    if (isEnabled === true) {
      if (!isLogin) {
        toast.error("You have to login ");
        return;
      }
      data = { Url: url, email: curUser.email };
    }
    // alert(data);
    dispatch(shortUrlGenerationAction(data));
  };

  const handleGenerateNewLink = () => {
    setUrl("");
    setIsEnabled(false);
    dispatch(ResetAction());

    toast.success("Reset ... ");
  };

  function handleCopyFn(e, text) {
    e.preventDefault();
    if (text == null) {
      toast.error("Empty Cannot be copied");
      return;
    }
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  }

  return (
    <div className="min-h-screen -mt-20 bg-gradient-to-br from-PrimaryColor-200  via-PrimaryColor-400 to-PrimaryColor-800 flex items-center justify-center p-4">
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="w-full max-w-3xl backdrop-blur-sm bg-white/90 rounded-2xl shadow-2xl border border-PrimaryColor-200">
        {/* Logo and Title Section */}
        <div className="text-center p-8 border-b border-PrimaryColor-200">
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            transition={{
              y: { duration: 0.5, ease: "easeIn" },
              opacity: { duration: 0.5, ease: "easeIn" },
            }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="p-3 bg-PrimaryColor-100 rounded-full">
              <Link2 size={32} className="text-PrimaryColor-600" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-PrimaryColor-600 to-PrimaryColor-800 text-transparent bg-clip-text">
              Zlnk
            </h1>
          </motion.div>
          <motion.h2
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            transition={{
              y: { duration: 0.5, delay: 0.3, ease: "easeIn" },
              opacity: { duration: 0.5, delay: 0.3, ease: "easeIn" },
            }}
            className="text-2xl text-PrimaryColor-700 font-medium"
          >
            Zero Complications, One Solution
          </motion.h2>
          <motion.p
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            transition={{
              y: { duration: 0.5, delay: 0.5, ease: "easeIn" },
              opacity: { duration: 0.5, delay: 0.5, ease: "easeIn" },
            }}
            className="text-PrimaryColor-500 mt-2"
          >
            Transform your long URLs into short, memorable links
          </motion.p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="flex flex-col gap-4">
            <motion.div
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 20, opacity: 0 }}
              transition={{
                y: { duration: 0.5, ease: "easeIn" },
                opacity: { duration: 0.5, ease: "easeIn" },
              }}
              className="relative mt-4 flex items-center"
            >
              <h2 className="mr-4 text-xl text-PrimaryColor-600">
                Original Url
              </h2>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your long URL here..."
                required
                readOnly={status === "Fulfilled"}
                className="flex-1 rounded-lg border border-PrimaryColor-500 bg-white p-3 pr-12 text-gray-700 focus:border-PrimaryColor-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={(e) => handleCopyFn(e, shortUrl)}
                className="-ml-10 rounded-md p-2 text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-blue-500 active:scale-95 active:bg-gray-200"
                aria-label="Copy URL"
              >
                <Copy size={24} />
              </button>
            </motion.div>

            {status === "Fulfilled" ? (
              ""
            ) : (
              <motion.div
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ x: 50, opacity: 0 }}
                transition={{
                  x: { duration: 0.5, ease: "easeIn" },
                  opacity: { duration: 0.5, ease: "easeIn" },
                }}
                className="flex items-center"
              >
                <label className="inline-flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isEnabled}
                      onChange={(e) => setIsEnabled(e.target.checked)}
                    />
                    <div
                      className="w-11 h-6 bg-PrimaryColor-400 peer-checked:bg-PrimaryColor-700 rounded-full peer 
            peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
            after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
            after:h-5 after:w-5 after:transition-all border-gray-300 peer-checked:border-PrimaryColor-700"
                    ></div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    Enable Analytic
                  </span>
                </label>
              </motion.div>
            )}
          </div>

          {status === "Fulfilled" && (
            <div className="relative mt-4 flex items-center">
              <h2 className="mr-4 text-xl text-PrimaryColor-600">Short Url</h2>
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-1 rounded-lg border border-PrimaryColor-500 bg-white p-3 pr-12 text-gray-700 focus:border-PrimaryColor-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={(e) => handleCopyFn(e, shortUrl)}
                className="-ml-10 rounded-md p-2 text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-blue-500 active:scale-95 active:bg-gray-200"
                aria-label="Copy URL"
              >
                <Copy size={24} />
              </button>
            </div>
          )}

          <div className="flex justify-center pt-4">
            <motion.button
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 100, opacity: 0 }}
              transition={{
                y: { duration: 0.7, ease: "circInOut" },
                opacity: { duration: 0.7, ease: "circInOut" },
              }}
              type={status === "Fulfilled" ? "button" : "submit"}
              onClick={
                status === "Fulfilled" ? handleGenerateNewLink : undefined
              }
              disabled={status === "Loading"}
              className="px-12 py-4 bg-gradient-to-r from-PrimaryColor-500 to-PrimaryColor-600 
      text-white rounded-xl font-medium hover:from-PrimaryColor-600 
      hover:to-PrimaryColor-700 transition-all duration-300 
      shadow-lg hover:shadow-xl hover:shadow-PrimaryColor-500/20
      disabled:opacity-70 disabled:cursor-not-allowed
      flex items-center gap-2"
            >
              {status === "Loading" ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  PROCESSING...
                </>
              ) : status === "Fulfilled" ? (
                "GENERATE NEW LINK"
              ) : (
                "SHORTEN URL"
              )}
            </motion.button>

            {isLogin && (
              <motion.button
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: 100, opacity: 0 }}
                transition={{
                  y: { duration: 0.7, ease: "circInOut" },
                  opacity: { duration: 0.7, ease: "circInOut" },
                }}
                onClick={() => navigate("/analytic")}
                disabled={status === "Loading"}
                className="px-12 py-4 bg-gradient-to-r mx-4 from-PrimaryColor-500 to-PrimaryColor-600 
      text-white rounded-xl font-medium hover:from-PrimaryColor-600 
      hover:to-PrimaryColor-700 transition-all duration-300 
      shadow-lg hover:shadow-xl hover:shadow-PrimaryColor-500/20
      disabled:opacity-70 disabled:cursor-not-allowed
      flex items-center gap-2"
              >
                Get Analytic
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default URLShortener;