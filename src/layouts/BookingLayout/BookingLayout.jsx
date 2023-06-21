import React from "react";
import "./BookingLayout.scss";
import UserBooking from "../../modules/User/UserBooking/UserBooking";

function BookingLayout() {
  return (
    <div>
      <h3 className="text-center mb-3 py-3 bg-body-secondary">Thông tin dặt phòng</h3>
      <UserBooking />
    </div>
  );
}

export default BookingLayout;
