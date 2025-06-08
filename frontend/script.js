const API_URL = 'http://localhost:3000';
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const courseForm = document.getElementById('courseForm');
const courseList = document.getElementById('courseList');
let token = localStorage.getItem('token');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  try {
    const res = await axios.post(`${API_URL}/auth/signup`, { email, password });
    alert(res.data.message || res.data.error);
  } catch (err) {
    alert(err.response?.data?.error || 'Signup failed');
  }
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    if (res.data.token) {
      token = res.data.token;
      localStorage.setItem('token', token);
      alert('Logged in successfully!');
    } else {
      alert(res.data.error);
    }
  } catch (err) {
    alert(err.response?.data?.error || 'Login failed');
  }
});

courseForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;

  try {
    const res = await axios.post(`${API_URL}/courses`,
        { title, description, price },
        { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.status === 201) {
      alert('Course added!');
      courseForm.reset();
    }
  } catch (err) {
    alert(err.response?.data?.error || 'Course creation failed');
  }
});

async function fetchCourses() {
  try {
    const res = await axios.get(`${API_URL}/courses`);
    const courses = res.data.courses;
    courseList.innerHTML = '';
    courses.forEach(course => {
    const li = document.createElement('li');

    const titleEl = document.createElement('div');
    titleEl.textContent = course.title;

    const detailsEl = document.createElement('div');
    detailsEl.textContent = `${course.description}`;

    const priceEl = document.createElement('div');
    priceEl.textContent = `₹${course.price}`;
    
    li.appendChild(titleEl);
    li.appendChild(detailsEl);
    li.appendChild(priceEl)
courseList.appendChild(li);

    });
  } catch (err) {
    alert('Failed to fetch courses');
  }
}

