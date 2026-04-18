import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, Mail, MapPin, Heart, Calendar, Briefcase, 
  Star, Clock, ChevronRight, LogOut, Camera,
  CheckCircle, XCircle, AlertCircle, TrendingUp
} from "lucide-react";

function Dashboard() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  useEffect(() => {
    console.log("User from storage:", user);
    fetchDashboardData();
  }, []);
  const [wishlist, setWishlist] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("bookings");

  const fetchDashboardData = async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);

      const wishlistRes = await fetch(`http://localhost:3000/api/wishlist/${user.id}`);
      const wishlistData = await wishlistRes.json();
      setWishlist(wishlistData.data || wishlistData);

      const bookingRes = await fetch(`http://localhost:3000/api/bookings/${user.id}`);
      const bookingData = await bookingRes.json();
      setBookings(bookingData.data || bookingData);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmed': return <CheckCircle size={12} />;
      case 'pending': return <AlertCircle size={12} />;
      case 'cancelled': return <XCircle size={12} />;
      default: return <Clock size={12} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      
      {/* Simple Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <TrendingUp size={16} className="text-white" />
            </div>
            <span className="font-bold text-xl text-gray-800">Ethiopia Tourism</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">{user?.name?.split(' ')[0] || 'Traveler'}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Back Link */}
        <Link 
          to={{ pathname: "/", hash: "destination" }}
          className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 mb-6 group"
        >
          <ChevronRight size={14} className="rotate-180 group-hover:-translate-x-1 transition" />
          Back to destinations
        </Link>

        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name?.split(' ')[0] || 'Explorer'}! ✨</h1>
          <p className="text-gray-500 mt-1">Manage your bookings, wishlist, and profile</p>
        </div>

        {/* Tabs - Simple 3 tabs */}
        <div className="flex gap-1 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-all ${
              activeTab === "bookings"
                ? "bg-white text-indigo-600 border-b-2 border-indigo-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            ✈️ Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-all ${
              activeTab === "wishlist"
                ? "bg-white text-indigo-600 border-b-2 border-indigo-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            ❤️ Wishlist ({wishlist.length})
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-all ${
              activeTab === "profile"
                ? "bg-white text-indigo-600 border-b-2 border-indigo-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            👤 Profile
          </button>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="mt-3 text-gray-500 text-sm">Loading...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-red-600 text-sm">{error}</p>
            <button onClick={fetchDashboardData} className="mt-2 text-sm text-red-700 underline">
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* BOOKINGS TAB */}
            {activeTab === "bookings" && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {bookings.length === 0 ? (
                  <div className="py-16 text-center">
                    <Briefcase size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-400">No bookings yet</p>
                    <Link to="/" className="inline-block mt-3 text-indigo-500 text-sm hover:text-indigo-600">
                      Start exploring →
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {bookings.map((item, idx) => (
                      <div key={idx} className="p-5 hover:bg-gray-50 transition flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center overflow-hidden">
                            {item.image ? (
                              <img src={item.image} alt={item.destination_name} className="w-full h-full object-cover" />
                            ) : (
                              <Camera size={24} className="text-indigo-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{item.destination_name || 'Destination'}</h3>
                            <p className="text-gray-400 text-xs flex items-center gap-1 mt-1">
                              <Calendar size={12} />
                              {item.travel_date || 'Date TBD'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                            {item.status || 'Pending'}
                          </span>
                          <button className="px-4 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-100 transition text-gray-600">
                            Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {wishlist.length === 0 ? (
                  <div className="py-16 text-center">
                    <Heart size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-400">Your wishlist is empty</p>
                    <Link to="/" className="inline-block mt-3 text-indigo-500 text-sm hover:text-indigo-600">
                      Browse destinations →
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-6">
                    {wishlist.map((item) => (
                      <div key={item.id} className="group rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
                        <div className="relative h-44 overflow-hidden bg-gray-100">
                          <img
                            src={item.image || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400'}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                          <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition">
                            <Heart size={14} fill="currentColor" />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          {item.location && (
                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                              <MapPin size={10} />
                              {item.location}
                            </p>
                          )}
                          <div className="mt-3 flex justify-between items-center">
                            {item.price && (
                              <span className="text-indigo-600 font-bold text-sm">${item.price}</span>
                            )}
                            <button className="text-xs text-indigo-500 font-medium hover:text-indigo-600">
                              View →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-md">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mt-4">{user?.name}</h3>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                  <div className="mt-4 flex justify-center gap-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">Member</span>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <button className="w-full py-2.5 bg-gray-50 text-gray-600 rounded-xl font-medium hover:bg-gray-100 transition flex items-center justify-center gap-2">
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <User size={18} className="text-indigo-500" />
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <User size={16} className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-400">Full Name</p>
                        <p className="text-gray-700 font-medium text-sm">{user?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Mail size={16} className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-400">Email Address</p>
                        <p className="text-gray-700 font-medium text-sm">{user?.email}</p>
                      </div>
                    </div>
                    {user?.location && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <MapPin size={16} className="text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-400">Location</p>
                          <p className="text-gray-700 font-medium text-sm">{user.location}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <button className="mt-5 text-sm text-indigo-500 hover:text-indigo-600 font-medium">
                    Edit Profile →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;