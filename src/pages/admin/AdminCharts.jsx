import { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { getOrders, getProducts, getUsers } from "../../utils/storeData";
import { useTheme } from "../../context/useTheme";
import { formatDate, formatMoney } from "./adminFormat";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function cssVar(name, fallback) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name);
  return (v || fallback).trim();
}

function dayKey(iso) {
  try {
    const d = new Date(iso);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  } catch {
    return "";
  }
}

function lastNDays(n) {
  const arr = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    arr.push(dayKey(d.toISOString()));
  }
  return arr;
}

export default function AdminCharts() {
  const { theme } = useTheme();
  const [orders] = useState(() => getOrders());
  const [products] = useState(() => getProducts());
  const [users] = useState(() => getUsers());

  const themeColors = useMemo(() => {
    // Use `theme` so memo recomputes when theme toggles.
    const activeTheme = theme;
    return {
      primary: cssVar("--primary", "currentColor"),
      accent: cssVar("--accent", "currentColor"),
      text: cssVar("--text", "currentColor"),
      textSecondary: cssVar("--text-secondary", "currentColor"),
      border: cssVar("--border", "currentColor"),
      bgCard: cssVar("--bg-card", "transparent"),
      _theme: activeTheme,
    };
  }, [theme]);

  const kpis = useMemo(() => {
    const totalOrders = orders.length;
    const revenue = orders.reduce(
      (sum, o) => sum + Number(o.totalPrice || 0),
      0
    );
    const avgOrder = totalOrders > 0 ? Math.round(revenue / totalOrders) : 0;

    const lowStock = products.filter(
      (p) => Number(p.stock || 0) > 0 && Number(p.stock || 0) <= 5
    ).length;
    const outOfStock = products.filter((p) => Number(p.stock || 0) <= 0).length;

    return {
      totalOrders,
      revenue,
      avgOrder,
      totalUsers: users.length,
      totalProducts: products.length,
      lowStock,
      outOfStock,
    };
  }, [orders, products, users]);

  const ordersByDay = useMemo(() => {
    const days = lastNDays(14);
    const map = new Map(days.map((d) => [d, { count: 0, revenue: 0 }]));

    for (const o of orders) {
      const key = dayKey(o.createdAt);
      if (!map.has(key)) continue;
      const cur = map.get(key);
      cur.count += 1;
      cur.revenue += Number(o.totalPrice || 0);
      map.set(key, cur);
    }

    return {
      labels: days.map((d) => d.slice(5)),
      counts: days.map((d) => map.get(d)?.count || 0),
      revenue: days.map((d) => map.get(d)?.revenue || 0),
    };
  }, [orders]);

  const statusChart = useMemo(() => {
    const statuses = [
      "Diterima",
      "Diproses",
      "Dikirim",
      "Selesai",
      "Dibatalkan",
    ];
    const counts = statuses.map(
      (s) => orders.filter((o) => (o.status || "Diterima") === s).length
    );
    return { statuses, counts };
  }, [orders]);

  const categoryChart = useMemo(() => {
    const map = new Map();
    for (const p of products) {
      const c = p.category || "Lainnya";
      map.set(c, (map.get(c) || 0) + 1);
    }
    const labels = Array.from(map.keys());
    const values = labels.map((l) => map.get(l));
    return { labels, values };
  }, [products]);

  const topProducts = useMemo(() => {
    const sales = new Map();
    for (const o of orders) {
      for (const it of o.items || []) {
        const key = it.name || String(it.id);
        const prev = sales.get(key) || 0;
        sales.set(key, prev + Number(it.quantity || 0));
      }
    }
    const entries = Array.from(sales.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
    return {
      labels: entries.map((e) =>
        e[0].length > 18 ? `${e[0].slice(0, 18)}…` : e[0]
      ),
      values: entries.map((e) => e[1]),
    };
  }, [orders]);

  const commonOptions = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: { labels: { color: themeColors.textSecondary } },
        tooltip: { enabled: true },
      },
      scales: {
        x: {
          ticks: { color: themeColors.textSecondary },
          grid: { color: themeColors.border },
        },
        y: {
          ticks: { color: themeColors.textSecondary },
          grid: { color: themeColors.border },
        },
      },
    }),
    [themeColors]
  );

  const lineData = useMemo(
    () => ({
      labels: ordersByDay.labels,
      datasets: [
        {
          label: "Jumlah Pesanan",
          data: ordersByDay.counts,
          borderColor: themeColors.primary,
          backgroundColor: themeColors.primary,
          tension: 0.35,
          yAxisID: "y",
        },
        {
          label: "Revenue",
          data: ordersByDay.revenue,
          borderColor: themeColors.accent,
          backgroundColor: themeColors.accent,
          tension: 0.35,
          yAxisID: "y1",
        },
      ],
    }),
    [ordersByDay, themeColors]
  );

  const lineOptions = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: { labels: { color: themeColors.textSecondary } },
      },
      scales: {
        x: {
          ticks: { color: themeColors.textSecondary },
          grid: { color: themeColors.border },
        },
        y: {
          position: "left",
          ticks: { color: themeColors.textSecondary },
          grid: { color: themeColors.border },
          title: {
            display: true,
            text: "Pesanan",
            color: themeColors.textSecondary,
          },
        },
        y1: {
          position: "right",
          ticks: { color: themeColors.textSecondary },
          grid: { drawOnChartArea: false },
          title: {
            display: true,
            text: "Revenue",
            color: themeColors.textSecondary,
          },
        },
      },
    }),
    [themeColors]
  );

  const statusData = useMemo(
    () => ({
      labels: statusChart.statuses,
      datasets: [
        {
          label: "Status",
          data: statusChart.counts,
          backgroundColor: [
            themeColors.primary,
            cssVar("--primary-soft", themeColors.primary),
            themeColors.accent,
            cssVar("--success", themeColors.primary),
            cssVar("--danger", themeColors.accent),
          ],
          borderColor: themeColors.bgCard,
        },
      ],
    }),
    [statusChart, themeColors]
  );

  const categoryData = useMemo(
    () => ({
      labels: categoryChart.labels,
      datasets: [
        {
          label: "Jumlah Produk",
          data: categoryChart.values,
          backgroundColor: themeColors.primary,
        },
      ],
    }),
    [categoryChart, themeColors]
  );

  const topProductsData = useMemo(
    () => ({
      labels: topProducts.labels,
      datasets: [
        {
          label: "Qty Terjual",
          data: topProducts.values,
          backgroundColor: themeColors.accent,
        },
      ],
    }),
    [topProducts, themeColors]
  );

  const latestOrders = useMemo(() => orders.slice(0, 10), [orders]);

  return (
    <section className="admin-charts">
      <div className="admin-section">
        <div className="admin-section__header">
          <div>
            <h2>Grafik & Analitik</h2>
            <p className="admin-section__subtitle">
              Ringkasan data dari Products / Users / Orders (localStorage)
            </p>
          </div>
          <div className="admin-section__meta">Last 14 days</div>
        </div>

        <div className="admin-kpis">
          <div className="admin-kpi">
            <div className="admin-kpi__label">Total Orders</div>
            <div className="admin-kpi__value">{kpis.totalOrders}</div>
          </div>
          <div className="admin-kpi">
            <div className="admin-kpi__label">Revenue</div>
            <div className="admin-kpi__value">{formatMoney(kpis.revenue)}</div>
          </div>
          <div className="admin-kpi">
            <div className="admin-kpi__label">Avg Order</div>
            <div className="admin-kpi__value">{formatMoney(kpis.avgOrder)}</div>
          </div>
          <div className="admin-kpi">
            <div className="admin-kpi__label">Total Users</div>
            <div className="admin-kpi__value">{kpis.totalUsers}</div>
          </div>
          <div className="admin-kpi">
            <div className="admin-kpi__label">Total Products</div>
            <div className="admin-kpi__value">{kpis.totalProducts}</div>
          </div>
          <div className="admin-kpi">
            <div className="admin-kpi__label">Low Stock (≤5)</div>
            <div className="admin-kpi__value">{kpis.lowStock}</div>
          </div>
          <div className="admin-kpi">
            <div className="admin-kpi__label">Out of Stock</div>
            <div className="admin-kpi__value">{kpis.outOfStock}</div>
          </div>
        </div>

        <div className="admin-charts-grid">
          <div className="admin-chart-card">
            <div className="admin-chart-card__title">
              Orders & Revenue (14 hari)
            </div>
            <Line data={lineData} options={lineOptions} />
          </div>

          <div className="admin-chart-card">
            <div className="admin-chart-card__title">
              Distribusi Status Pesanan
            </div>
            <Doughnut
              data={statusData}
              options={{
                plugins: {
                  legend: { labels: { color: themeColors.textSecondary } },
                },
              }}
            />
          </div>

          <div className="admin-chart-card">
            <div className="admin-chart-card__title">Produk per Kategori</div>
            <Bar data={categoryData} options={commonOptions} />
          </div>

          <div className="admin-chart-card">
            <div className="admin-chart-card__title">
              Top Produk (Qty Terjual)
            </div>
            {topProducts.values.length === 0 ? (
              <div className="admin-empty">
                Belum ada penjualan. Buat pesanan via Checkout.
              </div>
            ) : (
              <Bar data={topProductsData} options={commonOptions} />
            )}
          </div>
        </div>

        <div className="admin-section" style={{ marginTop: "1rem" }}>
          <div className="admin-section__header">
            <div>
              <h2>Pesanan Terbaru</h2>
              <p className="admin-section__subtitle">10 pesanan terakhir</p>
            </div>
          </div>

          {latestOrders.length === 0 ? (
            <div className="admin-empty">Belum ada pesanan.</div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table" style={{ minWidth: "900px" }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tanggal</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {latestOrders.map((o) => (
                    <tr key={o.id}>
                      <td className="admin-table__mono">{o.id}</td>
                      <td>{formatDate(o.createdAt)}</td>
                      <td>
                        <div className="admin-table__name">
                          {o.customer?.name}
                        </div>
                        <div
                          style={{
                            color: themeColors.textSecondary,
                            fontSize: "0.9rem",
                          }}
                        >
                          {o.customer?.email}
                        </div>
                      </td>
                      <td>{o.status || "Diterima"}</td>
                      <td>{formatMoney(o.totalPrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
