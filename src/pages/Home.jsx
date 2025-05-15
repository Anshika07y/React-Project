import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center text-center px-6 py-12">
      {/* Hero Section */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-4">
        Welcome to <span className="text-indigo-700">EduVance</span> 🚀
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mb-8">
        Your personal learning tracker – set goals, track progress, and stay
        motivated with smart support built around you.
      </p>
      <Link
        to="/register"
        className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded shadow-md transition duration-300"
      >
        Get Started Now
      </Link>

      {/* Features Section */}
      <section className="mt-20 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {[
          {
            title: "🎯 Set Goals",
            desc: "Stay focused and define your path to success by setting custom learning goals.",
          },
          {
            title: "📊 Visual Progress",
            desc: "Track your development with engaging, interactive charts.",
          },
          {
            title: "🤖 Guided Learning Help with AI",
            desc: "Receive tailored support and insights to make your learning more effective.",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
