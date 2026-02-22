const BASE_URL = "http://127.0.0.1:8000/api/v1";

// =============================
// LOGIN USER
// =============================
export async function loginUser(email, password) {
  const response = await fetch(`${BASE_URL}/auth/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}

// =============================
// GET EVENTS
// =============================
export async function getEvents() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/events/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
}

// =============================
// CREATE EVENT
// =============================
export async function createEvent(name, description) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/events/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create event");
  }

  return response.json();
}

// =============================
// ADD PARTICIPANT
// =============================
export async function addParticipant(name, email, event_id) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/participants/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      email,
      event_id,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add participant");
  }

  return response.json();
}

// =============================
// ISSUE CERTIFICATE
// =============================
export async function issueCertificate(participant_id) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/certificates/issue/${participant_id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to issue certificate");
  }

  return response.json();
}