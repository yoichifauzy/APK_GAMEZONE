import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportProductsToExcel(products, fileName = "products.xlsx") {
  const worksheet = XLSX.utils.json_to_sheet(products);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const data = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });
  saveAs(data, fileName);
}
