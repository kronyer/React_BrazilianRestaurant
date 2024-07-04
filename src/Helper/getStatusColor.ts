const getStatusColor = (status: string) => {
  return status === "Confirmed"
    ? "primary"
    : status === "Pending"
    ? "secondary"
    : status === "Cancelled"
    ? "danger"
    : status === "Completed"
    ? "success"
    : status === "Being Cooked"
    ? "info"
    : status === "Ready for Pickup" && "warning";
};

export default getStatusColor;
