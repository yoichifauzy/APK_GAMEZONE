import jsPDF from "jspdf";
import "jspdf-autotable";

export function exportCartToPDF(cartItems, totalPrice) {
  const doc = new jsPDF();

  doc.text("Ringkasan Keranjang - GamerZone", 14, 16);

  const tableColumn = ["Produk", "Qty", "Harga", "Subtotal"];
  const tableRows = [];

  cartItems.forEach((item) => {
    tableRows.push([
      item.name,
      item.quantity,
      `Rp ${item.price.toLocaleString("id-ID")}`,
      `Rp ${(item.price * item.quantity).toLocaleString("id-ID")}`,
    ]);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.text(
    `Total: Rp ${totalPrice.toLocaleString("id-ID")}`,
    14,
    doc.lastAutoTable.finalY + 10
  );

  doc.save("keranjang-gamerzone.pdf");
}
