const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'))

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'InterviewPrep'
});

db.connect((error) => {
  if (error) throw error;
  console.log("Connected to the database");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/Profile_pic');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const storage3 = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = file.fieldname;
    if (fileType === 'video') {
      cb(null, 'uploads/Videos');
    } else if (fileType === 'thumbnail') {
      cb(null, 'uploads/Thumbnails');
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
const upload2 = multer({ storage: storage2 });
const upload3 = multer({ storage: storage3 });

app.post('/register', (req, res) => {
  console.log(req.body);
  const { student, teacher, name, email, password, course, qualification } = req.body;

  if (student) {
    const sql = "INSERT INTO userdata (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ insert: false, error: err.message });
      }
      return res.json({ insert: true });
    });
  } else if (teacher) {
    const sql = "INSERT INTO teacherdata (name, email, password, course, qualification) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, email, password, course, qualification], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ insert: false, error: err.message });
      }
      return res.json({ insert: true });
    });
  }
});

app.post('/login', (req, res) => {
  const { teacher, student, email, password } = req.body;

  if (teacher) {
    const sql = "SELECT * FROM teacherdata WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ found: false, error: err.message });
      }
      if (result.length > 0) {
        return res.json({
          found: true,
          name: [{ id: result[0].id, name: result[0].name, email: result[0].email }],
          pos: 'teacher'
        });
      } else {
        return res.status(401).json({ found: false, message: "Invalid credentials" });
      }
    });
  } else if (student) {
    const sql = "SELECT * FROM userdata WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ found: false, error: err.message });
      }
      if (result.length > 0) {
        return res.json({
          found: true,
          name: [{ id: result[0].id, name: result[0].name, email: result[0].email }],
          pos: 'student'
        });
      } else {
        return res.status(401).json({ found: false, message: "Invalid credentials" });
      }
    });
  }
});

app.post('/course-upload', upload.single('courseFile'), (req, res) => {
  const { id, email, courseTitle, courseDuration, courseDomain, targetAudience, courseDescription, prerequisites, courseAmount } = req.body;
  const filePath = req.file.path;

  const sql = `INSERT INTO uploadedcourses (
    coach_id,
    coach_email,
    course_title,
    course_duration,
    course_domain,
    target_audience,
    course_des,
    prerequisites,
    course_materials,
    course_amount
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [
    id,
    email,
    courseTitle,
    courseDuration,
    courseDomain,
    targetAudience,
    courseDescription,
    prerequisites,
    filePath,
    courseAmount,
  ], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ insert: false, error: err.message });
    }
    return res.json({ insert: true });
  });
});

app.get('/course', (req, res) => {
  const { domain } = req.query;
  const sql = `SELECT id,name,course,course_title,course_id,course_duration,course_domain,course_materials,course_amount FROM teacherdata JOIN uploadedcourses ON teacherdata.id = uploadedcourses.coach_id WHERE course_domain = ?`;
  db.query(sql, [domain], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    return res.json(result);
  });
});

app.get('/profile', (req, res) => {
  const { id, pos } = req.query;
  if (pos === 'teacher') {
    const sql = `SELECT * FROM teacherdata WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      return res.json(result);
    });
  } else {
    const sql = `SELECT * FROM userdata WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      return res.json(result);
    });
  }
});

app.get('/uploaded-course', (req, res) => {
  const { id, pos } = req.query;
  if (pos === 'teacher') {
    const sql = `SELECT * FROM uploadedcourses WHERE coach_id = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      return res.json(result);
    });
  }
});

app.put('/picupdate', upload2.single('profilePic'), (req, res) => {
  const { id, pos } = req.body;
  const profilePic = req.file ? req.file.path : null;
  console.log(id, pos, profilePic);
  const sql = `UPDATE userdata SET profilePic = ? WHERE id = ?`;
  if (pos === 'teacher') {
    const sql = `UPDATE teacherdata SET profile_pic = ? WHERE id = ?`;
    db.query(sql, [profilePic, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      return res.json(result);
    });
  } else {
    const sql = `UPDATE userdata SET profile_pic = ? WHERE id = ?`;
    db.query(sql, [profilePic, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      return res.json(result);
    });
  }
})

app.put('/updatedetails', (req, res) => {
  const { name, email, course, qualification, pos, id } = req.body;


  if (pos === 'teacher') {
    const sql = `UPDATE teacherdata SET name = ?, email = ?, course = ?, qualification = ? WHERE id = ?`;
    db.query(sql, [name, email, course, qualification, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      return res.json(result);
    });
  } else {
    const sql = `UPDATE userdata SET  name = ?, email = ? WHERE id = ?`;
    db.query(sql, [name, email, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      return res.json(result);
    });
  }
});

app.post('/videoUpload', upload3.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), (req, res) => {
  const { course_id, id, title, description } = req.body;
  const video = req.files['video'][0].path;
  const thumbnail = req.files['thumbnail'][0].path;

  const sql = 'INSERT INTO coursevideo (course_id, coach_id, title, description, thumbnail, video) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [course_id, id, title, description, thumbnail, video], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    return res.json(result);
  });
});

app.get('/videoList', (req, res) => {
  const { id, course_id } = req.query;
  const sql = `
    SELECT c.*, t.name, t.email, t.profile_pic 
    FROM coursevideo AS c 
    JOIN teacherdata AS t ON t.id = c.coach_id 
    WHERE c.coach_id = ? AND c.course_id = ?
  `;

  db.query(sql, [id, course_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    return res.json(result);
  });
});


app.delete('/Delete-Content', (req, res) => {
  const { id } = req.query;
  console.log(id);
  const sql = 'DELETE FROM coursevideo where video_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    return res.json(result);
  });
})

// Update-Content

app.delete('/Update-Content', (req, res) => {
  const { id } = req.query;
  console.log(id);
  const sql = 'UPDATE coursevideo SET where video_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    return res.json(result);
  });
})


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));