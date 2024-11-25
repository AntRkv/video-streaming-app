const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/videos");
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}`);
      setVideos((prevVideos) => prevVideos.filter((video) => video._id !== id));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <div className="container">
      <h1>Video List</h1>
      <ul>
        {videos.length > 0 ? (
          videos.map((video) => (
            <li key={video._id}>
              <h2>{video.title}</h2>
              <p>{video.description}</p>
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Video
              </a>
              <button
                onClick={() => handleDelete(video._id)}
                className="button delete"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
