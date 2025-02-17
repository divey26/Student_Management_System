import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../common/authContext"; // Adjust the path if needed

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    console.log("User Data:", user); // Check if user data is available

    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/announcements");
        console.log("Fetched Announcements:", response.data); // Check API response

        if (user?.grade) {
          console.log("User Grade:", user.grade); // Debug user grade

          const filteredAnnouncements = response.data.filter(
            (announcement) => String(announcement.grade) === String(user.grade)
          );

          console.log("Filtered Announcements:", filteredAnnouncements); // Check filtering result
          setAnnouncements(filteredAnnouncements);
        } else {
          console.warn("User grade is missing!"); // Warning if user grade is not available
          setAnnouncements([]);
        }
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    fetchAnnouncements();
  }, [user]);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Announcements</h1>
      {announcements.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No announcements for your grade.</p>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
              }}
            >
              <h2 style={{ marginBottom: "10px", color: "#333" }}>{announcement.title}</h2>
              <p style={{ color: "#555" }}>{announcement.description}</p>
              <small><strong>Grade:</strong> {announcement.grade}</small><br />
              <small><strong>Author:</strong> {announcement.author}</small><br />
              <small><strong>Posted on:</strong> {new Date(announcement.timePosted).toLocaleString()}</small><br />
              {announcement.links && announcement.links.some(link => link.trim() !== '') && (
                <div style={{ marginTop: "10px" }}>
                  <h4>Links:</h4>
                  <ul>
                    {announcement.links
                      .filter(link => link.trim() !== '')
                      .map((link, index) => (
                        <li key={index}>
                          <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementList;
