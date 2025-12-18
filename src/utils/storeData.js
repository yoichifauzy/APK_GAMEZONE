import defaultProducts from "../data/products.json";

const STORAGE_KEYS = {
  products: "gz_products_v1",
  orders: "gz_orders_v1",
  users: "gz_users_v1",
};

function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

function load(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  return safeParse(raw, fallback);
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function ensureProductsSeeded() {
  const existing = localStorage.getItem(STORAGE_KEYS.products);
  if (existing) return;
  save(
    STORAGE_KEYS.products,
    Array.isArray(defaultProducts) ? defaultProducts : []
  );
}

export function getProducts() {
  ensureProductsSeeded();
  const products = load(STORAGE_KEYS.products, []);
  return Array.isArray(products) ? products : [];
}

export function setProducts(products) {
  save(STORAGE_KEYS.products, Array.isArray(products) ? products : []);
}

export function createProductId(products) {
  const maxId = (products || []).reduce(
    (max, p) => (typeof p?.id === "number" && p.id > max ? p.id : max),
    0
  );
  return maxId + 1;
}

export function ensureUsersSeeded() {
  const existing = localStorage.getItem(STORAGE_KEYS.users);
  if (existing) return;
  save(STORAGE_KEYS.users, [
    { id: 1, username: "gamer", password: "gamer123" },
  ]);
}

export function getUsers() {
  ensureUsersSeeded();
  const users = load(STORAGE_KEYS.users, []);
  return Array.isArray(users) ? users : [];
}

export function setUsers(users) {
  save(STORAGE_KEYS.users, Array.isArray(users) ? users : []);
}

export function createUserId(users) {
  const maxId = (users || []).reduce(
    (max, u) => (typeof u?.id === "number" && u.id > max ? u.id : max),
    0
  );
  return maxId + 1;
}

export function getOrders() {
  const orders = load(STORAGE_KEYS.orders, []);
  return Array.isArray(orders) ? orders : [];
}

export function setOrders(orders) {
  save(STORAGE_KEYS.orders, Array.isArray(orders) ? orders : []);
}

export function addOrder(order) {
  const existing = getOrders();
  const next = [order, ...existing];
  setOrders(next);
  return next;
}

export function createOrderId() {
  const ts = Date.now();
  const rand = Math.random().toString(16).slice(2, 8).toUpperCase();
  return `ORD-${ts}-${rand}`;
}
