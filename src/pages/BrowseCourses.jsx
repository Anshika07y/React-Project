import { useNavigate } from "react-router-dom";

const BrowseCourses = () => {
  const navigate = useNavigate();

  const sampleCourses = [
    {
      title: "Frontend Developer",
      topics: "HTML, CSS, JS, React",
      videoId: "Ke90Tje7VS0",
    }, // React tutorial
    {
      title: "Backend Developer",
      topics: "Node.js, MongoDB, API Design",
      videoId: "fb4RfHyGGYg",
    }, // Node.js tutorial
    {
      title: "Data Science",
      topics: "Python, Pandas, ML, DL",
      videoId: "xxFYro8sX8k",
    }, // Data Science tutorial
    {
      title: "Mobile App Development",
      topics: "Flutter, Dart, Firebase",
      videoId: "M7rOdGA0U5A",
    }, // Flutter tutorial
    {
      title: "Cloud Computing",
      topics: "AWS, Azure, GCP, DevOps",
      videoId: "ZDgglthR-cE",
    }, // Cloud tutorial
    {
      title: "Cybersecurity Fundamentals",
      topics: "Encryption, Network Security, Ethical Hacking",
      videoId: "tq_H7cqW0iI",
    }, // Cybersecurity tutorial
    {
      title: "Machine Learning",
      topics: "ML Algorithms, TensorFlow, Scikit-Learn",
      videoId: "fQkfae5_ZMw",
    }, // Machine Learning tutorial
    {
      title: "Web Development with Django",
      topics: "Python, Django, REST APIs, PostgreSQL",
      videoId: "kjEZZU5_fiw",
    }, // Django tutorial
    {
      title: "Game Development with Unity",
      topics: "C#, Unity, 2D/3D Game Design",
      videoId: "2b6U8jtccTo",
    }, // Unity tutorial
    
  ];

  const handleCourseClick = (courseTitle) => {
    // Navigate to the tutorial page based on course title
    navigate(`/tutorial/${courseTitle}`);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Curated Learning Paths
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleCourses.map((course, idx) => (
          <div
            key={idx}
            className="bg-white p-6 shadow-md rounded-lg hover:shadow-xl transition border-t-4 border-blue-500 cursor-pointer"
            onClick={() => handleCourseClick(course.title)} // Click to navigate
          >
            <h3 className="text-xl font-bold text-blue-700">{course.title}</h3>
            <p className="text-gray-600 mt-2">{course.topics}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseCourses;
