import React, { useEffect, useState } from "react";
import {
  Link2,
  Eye,
  Lock,
  Target,
  Activity,
  Calendar,
  Copy,
  ExternalLink,
  Trash2,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  getAnalyticAction,
  deleteUrlAction,
  deleteUrlById,
} from "../../redux/slice/urlshortnerSlice";
import { useNavigate } from "react-router-dom";
import WhatsAppButton from "../SupportUsBottom";

const Card = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    className={`bg-white rounded-2xl hover:cursor-pointer shadow-lg p-6 backdrop-blur-sm bg-opacity-90 hover:shadow-2xl transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const StatCard = ({ stat, onClick }) => (
  <Card>
    <div
      onClick={() => onClick(stat.fn)}
      className="flex items-center space-x-4"
    >
      <div className={`p-4 rounded-xl ${stat.color}`}>
        <stat.icon className="w-7 h-7 text-white" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
        <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
      </div>
    </div>
  </Card>
);

const DateInfoCard = ({ title, date }) => (
  <div className="p-4 rounded-xl">
    <div className="flex items-center gap-3 mb-2">
      <Calendar className="w-5 h-5 text-indigo-600" />
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 text-lg">
      {new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </p>
  </div>
);

const LinkStatusCard = ({ status }) => (
  <div className="flex items-center bg-gray-50 p-4 rounded-xl">
    <div className={`w-4 h-4 rounded-full ${status.color} mr-3`}></div>
    <div>
      <span className="text-sm font-medium text-gray-800">{status.label}</span>
      <p
        className={`text-2xl font-bold ${status.color.replace("bg-", "text-")}`}
      >
        {status.value}
      </p>
    </div>
  </div>
);

const UrlList = ({ listToDisplay, handleCopy, handleDelete }) => (
  <div className="mt-8 border-2 rounded-t-xl border-black">
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-xl p-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        <Link2 className="w-6 h-6" />
        URL List
      </h2>
    </div>
    <div className="rounded-b-xl shadow-lg">
      {listToDisplay?.map((item, index) => (
        <motion.div
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: 10, opacity: 0 }}
          transition={{
            y: { duration: 0.5, ease: "easeIn" },
            opacity: { duration: 0.5, ease: "easeIn" },
          }}
          key={index}
          className="p-4 md:p-6"
        >
          <div className="rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="p-4 bg-white md:p-6 space-y-4">
              <div className="flex flex-col space-y-3">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="text-base font-medium text-gray-500 uppercase tracking-wider min-w-20">
                    Short URL:
                  </span>
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-lg font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                      {`http://localhost:9000/urlshortner/${item.shortUrl}`}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(
                          `http://localhost:9000/urlshortner/${item.shortUrl}`
                        )
                      }
                      className="p-1.5 text-gray-400 hover:text-PrimaryColor-100 hover:bg-PrimaryColor-600 rounded-full transition-colors"
                      title="Copy Short URL"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="text-base font-medium text-gray-500 uppercase tracking-wider min-w-20">
                    Original URL:
                  </span>
                  <div className="flex items-center gap-2 flex-1">
                    <ExternalLink className="w-4 h-4 text-gray-600" />
                    <a
                      href={item.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-gray-600 hover:text-blue-600 truncate"
                    >
                      {item.originalUrl}
                    </a>
                    <button
                      onClick={() => handleCopy(item.originalUrl)}
                      className="p-2 text-gray-400 hover:text-PrimaryColor-100 hover:bg-PrimaryColor-600 rounded-full transition-colors"
                      title="Copy Original URL"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                <div className="flex items-center gap-x-4">
                  <span className="text-base font-medium text-yellow-700 uppercase tracking-wider">
                    Created:
                  </span>
                  <div className="flex items-center gap-2 text-lg">
                    <Calendar className="w-4 h-4 text-gray-900" />
                    <span className="text-yellow-800">
                      {new Date(item.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-yellow-800">
                      {new Date(item.createdAt).toLocaleString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-x-4">
                  <span className="text-base font-medium text-green-600 uppercase tracking-wider">
                    Last Access:
                  </span>
                  <div className="flex items-center gap-2 text-lg">
                    <Activity className="w-4 h-4 text-green-600" />
                    <span className="text-green-500">
                      {new Date(item.lastAccessedAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-green-800">
                      {new Date(item.lastAccessedAt).toLocaleString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-x-4">
                  <span className="text-base font-medium text-red-500 uppercase tracking-wider">
                    Expires:
                  </span>
                  <div className="flex items-center gap-2 text-lg">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span
                      className={`text-red-500 ${
                        Math.ceil(item.expiresAt)
                          ? "text-orange-600 font-medium"
                          : ""
                      }`}
                    >
                      {new Date(item.expiresAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-red-400">
                      {new Date(item.expiresAt).toLocaleString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {Math.ceil(
                      Math.abs(new Date(item.expiresAt) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    ) <= 7}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm font-medium">Total Clicks:</span>
                  <span className="font-bold">{item.click}</span>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-red-500 rounded-full transition-colors"
                  title="Delete URL"
                >
                  <Trash2 className="w-8 h-8" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const LinkStatsDashboard = () => {
  const [displayState, setDisplayState] = useState(false);
  const [listToDisplay, setListToDisplay] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  const { isLogin, email } = currentUser;

  const status = useSelector((state) => state.urlShortnerReducer.status);

  const firstCreateDate = useSelector(
    (state) => state.urlShortnerReducer.firstLinkCreated
  );
  const lastLinkCreated = useSelector(
    (state) => state.urlShortnerReducer.lastLinkCreated
  );

  const totalnoExpire = useSelector(
    (state) => state.urlShortnerReducer.totalnoExpire
  );
  const totalnoVisits = useSelector(
    (state) => state.urlShortnerReducer.totalnoVisits
  );
  const totalnoActive = useSelector(
    (state) => state.urlShortnerReducer.totalnoActive
  );
  const totalnoLinks = useSelector(
    (state) => state.urlShortnerReducer.totalnoLinks
  );

  const totalLinks = useSelector(
    (state) => state.urlShortnerReducer.totalLinks
  );
  const totalVisits = useSelector(
    (state) => state.urlShortnerReducer.totalVisits
  );
  const totalActiveLinks = useSelector(
    (state) => state.urlShortnerReducer.totalActive
  );
  const totalExpireLinks = useSelector(
    (state) => state.urlShortnerReducer.totalExpired
  );

  useEffect(() => {
    if (email !== null) dispatch(getAnalyticAction(email));
  }, [dispatch, email]);

  // useEffect(() => {
  //   if (displayState) {
  //     // Update the displayed list based on current selection
  //     if (listToDisplay === totalLinks) setListToDisplay(totalLinks);
  //     else if (listToDisplay === totalActiveLinks)
  //       setListToDisplay(totalActiveLinks);
  //     else if (listToDisplay === totalExpireLinks)
  //       setListToDisplay(totalExpireLinks);
  //     else if (listToDisplay === totalVisits) setListToDisplay(totalVisits);
  //   }
  // }, [
  //   totalLinks,
  //   totalActiveLinks,
  //   totalExpireLinks,
  //   totalVisits,
  //   dispatch,
  //   status,
  // ]);

  useEffect(() => {
    if (displayState) {
      switch (listToDisplay) {
        case totalLinks:
          setListToDisplay(totalLinks);
          break;
        case totalActiveLinks:
          setListToDisplay(totalActiveLinks);
          break;
        case totalExpireLinks:
          setListToDisplay(totalExpireLinks);
          break;
        case totalVisits:
          setListToDisplay(totalVisits);
          break;
        default:
          setDisplayState(false);
      }
    }
  }, [dispatch, status]);

  function HandleClick(params) {
    setDisplayState(true);
    switch (params) {
      case "TotalLinks":
        setListToDisplay(totalLinks);
        break;
      case "TotalActive":
        setListToDisplay(totalActiveLinks);
        break;
      case "TotalExpire":
        setListToDisplay(totalExpireLinks);
        break;
      case "TotalVisits":
        setListToDisplay(totalVisits);
        break;
      default:
        setListToDisplay([]);
    }
  }

  function handleDelete(id) {
    dispatch(deleteUrlAction(id)).then((result) => {
      if (result.error) {
        toast.error("Unable to Delete ");
        return;
      }
      toast.success("Successfully Deleted the URL");
      dispatch(deleteUrlById(id));
      dispatch(getAnalyticAction(email));
    });
  }

  function handleCopy(text) {
    if (text == null) {
      toast.error("Empty text ");
      return;
    }
    toast.success("Copied text");
    navigator.clipboard.writeText(text);
  }

  const stats = [
    {
      icon: Link2,
      title: "Total Links",
      value: totalnoLinks,
      color: "bg-gradient-to-br from-emerald-400 to-green-600",
      fn: "TotalLinks",
    },
    {
      icon: Eye,
      title: "Total Visits",
      value: totalnoVisits,
      color: "bg-gradient-to-br from-pink-400 to-rose-600",
      fn: "TotalVisits",
    },
    {
      icon: Lock,
      title: "Active Links",
      value: totalnoActive,
      color: "bg-gradient-to-br from-violet-400 to-purple-600",
      fn: "TotalActive",
    },
    {
      icon: Target,
      title: "Expired Links",
      value: totalnoExpire,
      color: "bg-gradient-to-br from-amber-400 to-orange-600",
      fn: "TotalExpire",
    },
  ];

  return (
    <div className="min-h-screen border-2 w-screen flex justify-center p-4 sm:p-6 lg:p-8">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="max-w-7xl w-screen sm:w-[90%] lg:w-[80%] mx-auto">
        <motion.h1
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: 100, opacity: 0 }}
          transition={{
            y: { duration: 0.5, ease: "easeIn" },
            opacity: { duration: 0.5, ease: "easeIn" },
          }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 flex items-center gap-3"
        >
          <Activity className="w-8 h-8 text-indigo-600" />
          Dashboard Analytics
        </motion.h1>

        {status === "Loading" && (
          <div className="flex justify-center items-center h-64">
            <h2 className="text-4xl p-2"> Loading </h2>
            <ClipLoader size={50} color={"#123abc"} loading={true} />
          </div>
        )}

        {status !== "Loading" && (
          <>
            <motion.div
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 200, opacity: 0 }}
              transition={{
                y: { duration: 0.5, ease: "easeIn" },
                opacity: { duration: 0.5, ease: "easeIn" },
              }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileInView={{ x: 0, opacity: 1 }}
                  initial={{ x: -300, opacity: 0 }}
                  transition={{
                    x: { duration: 0.5, ease: "easeIn" },
                    opacity: { duration: 0.5, ease: "easeIn" },
                  }}
                  viewport={{ once: true }}
                >
                  <StatCard key={index} stat={stat} onClick={HandleClick} />
                </motion.div>
              ))}

              <Card className="col-span-1 md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DateInfoCard
                    title="First Link Created"
                    date={firstCreateDate || "No links created yet"}
                  />
                  <DateInfoCard
                    title="Last Link Created"
                    date={lastLinkCreated || "No links created yet"}
                  />
                </div>
              </Card>

              <Card className="col-span-1 md:col-span-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                  <Activity className="w-5 h-5 text-indigo-600" />
                  Links Status
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      color: "bg-yellow-500",
                      label: "Expired Links",
                      value: totalnoExpire,
                    },
                    {
                      color: "bg-green-500",
                      label: "Active Links",
                      value: totalnoActive,
                    },
                  ].map((status, index) => (
                    <LinkStatusCard key={index} status={status} />
                  ))}
                </div>
              </Card>
            </motion.div>

            {displayState && (
              <UrlList
                listToDisplay={listToDisplay}
                handleCopy={handleCopy}
                handleDelete={handleDelete}
              />
            )}
          </>
        )}
      </div>
      <WhatsAppButton />
    </div>
  );
};

export default LinkStatsDashboard;
