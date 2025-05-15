import { useParams } from "react-router-dom";

const Tutorial = () => {
  const { courseId } = useParams(); // Get the dynamic course ID from the URL

  // Video URLs for all courses (YouTube embedded URLs)
  const videos = {
    "Frontend Developer": "https://www.youtube.com/embed/Ke90Tje7VS0", // React tutorial
    "Backend Developer": "https://www.youtube.com/embed/fb4RfHyGGYg", // Node.js tutorial (original from BrowseCourses)
    "Data Science": "https://www.youtube.com/embed/xxFYro8sX8k", // Data Science tutorial
    "Mobile App Development": "https://www.youtube.com/embed/CzRQ9mnmh44", // Flutter tutorial
    "Cloud Computing": "https://www.youtube.com/embed/EN4fEbcFZ_E", // Cloud tutorial
    "Cybersecurity Fundamentals": "https://www.youtube.com/embed/hXSFdwIOfnE", // Cybersecurity tutorial
    "Machine Learning": "https://www.youtube.com/embed/GwIo3gDZCVQ", // Machine Learning tutorial
    "Web Development with Django": "https://www.youtube.com/embed/rHux0gMZ3Eg", // Django tutorial
    "Game Development with Unity": "https://www.youtube.com/embed/gB1F9G0JXOo", // Unity tutorial
  };

  // Get the correct video based on courseId
  const videoSrc = videos[courseId];

  if (!videoSrc) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-red-600 font-semibold">
        Invalid course ID or no tutorial available for this course.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">
        Tutorial for Course: {courseId}
      </h2>

      {/* Video Embed Section */}
      <div className="bg-white p-6 rounded shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Watch the Tutorial</h3>
        <iframe
          width="100%"
          height="400"
          src={videoSrc}
          title={`Tutorial for ${courseId}`}
          frameBorder="0"
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Additional Content Section */}
      <div className="bg-white p-6 rounded shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Course Content</h3>
        <p>Additional content for the course can go here.</p>
      </div>
    </div>
  );
};

export default Tutorial;
