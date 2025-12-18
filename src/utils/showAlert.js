export function showAlert({ title, text, icon }) {
  const swal = window?.Swal;

  if (!swal) {
    window.alert([title, text].filter(Boolean).join("\n"));
    return;
  }

  swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: "#3085d6",
  });
}

export function showConfirm({ title, text, icon = "warning", confirmText }) {
  const swal = window?.Swal;

  if (!swal) {
    return Promise.resolve(
      window.confirm([title, text].filter(Boolean).join("\n"))
    );
  }

  return swal
    .fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText: confirmText || "OK",
      cancelButtonText: "Batal",
      confirmButtonColor: "#3085d6",
    })
    .then((res) => Boolean(res.isConfirmed));
}
