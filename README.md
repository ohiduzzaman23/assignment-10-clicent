Community Food Sharing (PlateShare)

A MERN Stack project that connects people who have extra food with those who need it — helping reduce food waste and build community support.

\*\*Layout
Navbar

- Guest: Home, Available Foods, Login
- User: Home, Available Foods, Add Food, Manage My Foods, My Requests, Logout
  \*\* Logo, Copyright, Social Links

---

\*\* Home Page

- Hero Section with banner and “View All Foods” button
- Featured Foods (Top 6 by quantity)
- “Show All” button → Available Foods
- 2 Static Sections: _How It Works_, _Our Mission_
- Animations via \_\_Framer Motion / AOS

---

\*\* Authentication (Firebase)

- Register: Name, Email, Photo URL, Password (with validation)
- Login: Email + Password
- Google Login support

---

\*\* Food Management (MongoDB)

\*\*Add Food (Private):\*\*  
 Form with Food Name, Image (imgbb), Quantity, Pickup Location, Expire Date, Notes

- Auto Donator Info from Firebase
- `food_status = "Available"`

- Available Foods (Public):
  Grid cards with food info + “View Details” (Private route)

- Food Details (Private):
  Full info + “Request Food” Modal

- Manage My Foods (Private):
  Update (Modal/Page) & Delete (SweetAlert)

---

\*\* Food Request System

- On “Request Food”: Modal → Location, Reason, Contact No.
- Saves to `requests` collection with status `"pending"`
- Food Owner sees table of requests:
  - Accept: status → `"accepted"`, food → `"donated"`
  - Reject: status → `"rejected"`

---

\*\* Extras

- Loading Spinner / Skeleton
- 404 Page (image + Back to Home)
- Fully Responsive
- Uniform design, consistent fonts & buttons

---

\*\* Tech Stack

Frontend: React, Tailwind CSS, React Router, AOS  
Backend: Node.js, Express.js  
DB: MongoDB (Atlas)  
Auth: Firebase  
Image Hosting: imgbb  
UI Alerts: React Hot Toast, SweetAlert2

---

**Backend**

\*\* bash
cd server && npm install && npm start

````
\*\* Frontend

```bash
cd client && npm install && npm run dev
````

---

\*\* Developer
Author: []  
Project: Community Food Sharing (PlateShare)
live link: http://abcdinquisitive-event.surge.sh/
