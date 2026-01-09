<table>
  <tr>
    <td width="200" valign="top">
      <img src="frontend/public/icon.png" alt="Movies Lab Logo" width="200">
    </td>
    <td>
      <h1>Movies Lab</h1>
      <p>
        <strong>Movies Lab</strong> is a high-performance web application built to explore and visualize cinema trends through the lens of big data. This project demonstrates the ability to handle extensive datasets, optimize frontend performance, and deliver a clean user experience for data exploration.
      </p>
      <p>
        🚀 <strong>Live Demo:</strong> <a href="http://movies.talentalk.xyz/">movies.talentalk.xyz</a>
      </p>
    </td>
  </tr>
</table>

---

## 🛠️ Big Data & Technical Skills

This project serves as a "lab" for implementing several core big data and engineering principles:

* **Efficient Data Fetching:** Implements optimized API integration to handle large volumes of movie metadata in real-time.
* **State Management & Scalability:** Built with **React** and **Vite** to ensure a fast, responsive UI even when filtering through thousands of data points.

---

## 🚀 Features

-   **Live Search:** Instant filtering across a vast database of cinema titles.
-   **Data-Driven UI:** Dynamic layout that adapts based on the density of the movie metadata retrieved.
-   **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.
-   **Clean Branding:** Custom-designed SVG iconography representing the intersection of film and data science.

---

## 🗄️ Database Tables & Size

### `titles`
- **Rows:** 9,098,722  
- **Description:**  
  Stores core movie and TV title metadata, including identifiers, names, release years, and searchable text fields.

### `principals`
- **Rows:** 20,112,641  
- **Description:**  
  Contains cast and crew relationships for each title, enabling queries such as actors, directors, and other contributors per movie.


## 💻 Tech Stack

-   **Frontend:** [React.js](https://reactjs.org/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Data Source:** [TMDB API / Custom Dataset]
-   **Icons & Logos:** Custom SVG / PNG
-   **Deployment:** Hetzner

---

## 📥 Installation & Setup

To run the Lab locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anlqt89/big-data-lab.git
   ```

3. Installation and Running Apps:
   ```bash
   #On container
   docker compose up -d --build
   ```
   ```bash
   #On Mac
   ./setup.sh
   ```
   
4. **Access the Application**
- Frontend UI: http://localhost:5173

- Backend API: http://localhost:5001

- Database: Internal port 5432
