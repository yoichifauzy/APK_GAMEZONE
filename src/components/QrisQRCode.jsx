import { QRCodeCanvas } from "qrcode.react";

export default function QrisQRCode({ value, amount }) {
  const qrValue = `${value}?amount=${amount}`;

  return (
    <div className="qris-box">
      <h4>Bayar dengan QRIS</h4>
      <QRCodeCanvas value={qrValue} size={200} />
      <p className="qris-box__text">
        Scan QR di atas menggunakan e-wallet atau mobile banking untuk
        menyelesaikan pembayaran.
      </p>
    </div>
  );
}
