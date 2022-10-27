const baseUrl = "http://localhost:8080";

const getProducts = async () => {
  const res = await fetch(`${baseUrl}/api/products`);
  if (res) {
    const data = await res.json();
    return data;
  }
};

const getProduct = async (id) => {
  const res = await fetch(`${baseUrl}/api/products/${id}`);
  if (res) {
    const data = await res.json();
    return data;
  }
};

const userRegister = async (name, email, password) => {
  const response = await fetch("http://localhost:8080/api/user/register", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ name, email, password }),
  });

  if (response) {
    const data = await response.json();

    if (response.ok == false) {
      throw Error(data.message);
    }
    return data;
  }
};

const userLogin = async (email, password) => {
  const response = await fetch("http://localhost:8080/api/user/login", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ email, password }),
  });

  if (response) {
    const data = await response.json();

    if (response.ok == false) {
      throw Error(data.message);
    }
    return data;
  }
};

const updateProfile = async (name, email, password, token) => {
  const res = await fetch("http://localhost:8080/api/user/updateProfile", {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ name, email, password }),
  });

  if (res) {
    const data = await res.json();

    if (res.ok === false) {
      throw Error(data.message);
    }

    return data;
  }
};

const createOrder = async (
  cartArr,
  shippingDetails,
  paymentMethod,
  shippingPrice,
  token
) => {
  const res = await fetch(`${baseUrl}/api/order`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      cartArr,
      shippingDetails,
      paymentMethod,
      shippingPrice,
    }),
  });

  if (res) {
    const data = await res.json();

    if (res.ok === false) {
      throw Error(data.message);
    }

    return data;
  }
};

const getOrderById = async (id, token) => {
  const res = await fetch(`${baseUrl}/api/order/${id}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });

  if (res) {
    const data = await res.json();

    if (res.ok === false) {
      throw Error(res.message);
    }

    return data;
  }
};
const getUserOrders = async (token) => {
  const res = await fetch(`${baseUrl}/api/order/myorders`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });

  if (res) {
    const data = await res.json();

    if (res.ok === false) {
      throw Error(res.message);
    }

    return data;
  }
};

const orderPaid = async (id, isPaid, token) => {
  const res = await fetch(`${baseUrl}/api/order/orderPaid`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      id,
      isPaid,
    }),
  });

  if (res) {
    const data = await res.json();

    if (res.ok === false) {
      throw Error(res.message);
    }

    return data;
  }
};

export {
  getProducts,
  getProduct,
  userRegister,
  userLogin,
  updateProfile,
  createOrder,
  getOrderById,
  getUserOrders,
  orderPaid,
};
